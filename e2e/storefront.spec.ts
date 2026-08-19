import { expect, test } from "@playwright/test";

test("filters the fictional catalog from the header search", async ({ page }) => {
  await page.goto("/");

  const search = page.getByPlaceholder("Buscar produtos, categorias e coleções...");
  await search.fill("Garrafa");
  await search.press("Enter");

  await expect(page).toHaveURL(/busca=Garrafa/);
  const products = page.locator("#produtos");
  await expect(products.getByRole("heading", { name: "Resultados para “Garrafa”" })).toBeVisible();
  await expect(products.getByRole("heading", { name: "Garrafa térmica Move 750" })).toBeVisible();
  await expect(products.getByRole("heading", { name: "Kit Daily Balance" })).toHaveCount(0);
});

test("persists cart state and exposes a safe checkout draft", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Adicionar Kit Daily Balance ao carrinho" }).click();
  const cartDialog = page.getByRole("dialog", { name: "Cesta" });
  await expect(cartDialog).toBeVisible();
  await expect(cartDialog.getByText("1 item", { exact: true })).toBeVisible();

  await page.reload();
  await expect(page.getByRole("button", { name: "Abrir carrinho com 1 itens" })).toBeVisible();

  await page.goto("/carrinho");
  await expect(page.getByRole("heading", { name: "Cesta de compras" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Kit Daily Balance" })).toBeVisible();

  await page.getByLabel("Cupom de desconto").fill("DEMO15");
  await page.getByRole("button", { name: "Aplicar" }).click();
  await expect(page.getByText("Cupom DEMO15 validado em modo mock.")).toBeVisible();

  await expect(page.getByRole("link", { name: "Prosseguir" })).toHaveAttribute(
    "href",
    /^mailto:hello@example\.com/,
  );
});

test("validates and adds a fictional account address", async ({ page }) => {
  await page.goto("/minha-conta/endereco");

  await page.getByRole("button", { name: "Adicionar endereço" }).click();
  await page.getByRole("button", { name: "Adicionar endereço" }).click();
  await expect(page.getByText("Informe o nome do destinatário.")).toBeVisible();

  await page.locator("#address-name").fill("Pessoa Demonstrativa");
  await page.locator("#address-postal-code").fill("01310-100");
  await page.locator("#address-street").fill("Avenida Exemplo, 100");
  await page.locator("#address-city").fill("São Paulo");
  await page.locator("#address-state").fill("SP");
  await page.locator("#address-phone").fill("11999999999");
  await page.getByRole("button", { name: "Adicionar endereço" }).click();

  await expect(page.getByText("Pessoa Demonstrativa")).toBeVisible();
  await expect(page.getByText("Endereço adicionado.")).toHaveText("Endereço adicionado.");
});
