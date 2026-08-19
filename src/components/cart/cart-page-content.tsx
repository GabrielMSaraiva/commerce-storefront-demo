"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronRight,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Trash2,
} from "lucide-react";
import { useForm } from "react-hook-form";

import { useCart } from "@/components/cart/cart-provider";
import { CartQuantitySelect } from "@/components/cart/cart-quantity-select";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { business } from "@/config/business";
import {
  formatCurrency,
  getCartItemLabel,
  type CartItem,
} from "@/lib/cart";
import {
  couponFormSchema,
  type CouponFormValues,
} from "@/lib/forms/schemas";
import { cn } from "@/lib/utils";

export function CartPageContent() {
  const {
    isHydrated,
    items,
    removeItem,
    subtotalCents,
    totalQuantity,
    updateQuantity,
  } = useCart();
  const [couponMessage, setCouponMessage] = useState("");
  const couponForm = useForm<CouponFormValues>({
    resolver: zodResolver(couponFormSchema),
    defaultValues: {
      coupon: "",
    },
  });

  if (!isHydrated) {
    return <CartPageLoading />;
  }

  if (items.length === 0) {
    return <EmptyCartPage />;
  }

  const checkoutHref = getCheckoutHref(items, subtotalCents);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8 lg:py-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_21rem] xl:grid-cols-[minmax(0,1fr)_23rem]">
        <div className="min-w-0">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">
                Cesta de compras
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {getCartItemLabel(totalQuantity)} na sua cesta.
              </p>
            </div>
          </div>

          <div className="grid gap-3">
            {items.map((item) => (
              <CartPageItem
                key={item.id}
                item={item}
                onRemove={() => removeItem(item.id)}
                onQuantityChange={(quantity) =>
                  updateQuantity(item.id, quantity)
                }
              />
            ))}
          </div>
        </div>

        <aside className="grid gap-4 lg:sticky lg:top-44 lg:self-start">
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Resumo do pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Subtotal ({totalQuantity})
                </span>
                <span>{formatCurrency(subtotalCents)}</span>
              </div>
              <form
                className="space-y-2"
                onSubmit={couponForm.handleSubmit(({ coupon }) => {
                  setCouponMessage(
                    `Cupom ${coupon.toUpperCase()} validado em modo mock.`,
                  );
                })}
              >
                <Label htmlFor="coupon-code">Cupom de desconto</Label>
                <div className="flex gap-2">
                  <Input
                    id="coupon-code"
                    placeholder="Digite seu cupom"
                    className="h-9"
                    aria-invalid={Boolean(couponForm.formState.errors.coupon)}
                    {...couponForm.register("coupon")}
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    size="lg"
                    className="font-bold"
                  >
                    <Tag className="size-4" />
                    Aplicar
                  </Button>
                </div>
                {couponForm.formState.errors.coupon?.message ? (
                  <p className="text-xs font-medium text-destructive">
                    {couponForm.formState.errors.coupon.message}
                  </p>
                ) : null}
                {couponMessage ? (
                  <p className="text-xs text-muted-foreground">
                    {couponMessage}
                  </p>
                ) : null}
              </form>
              <Separator />
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total</span>
                  <span className="text-2xl font-bold">
                    {formatCurrency(subtotalCents)}
                  </span>
                </div>
                <p className="text-right text-xs text-muted-foreground">
                  3x s/ juros de {formatCurrency(Math.ceil(subtotalCents / 3))}
                </p>
              </div>
              <a
                href={checkoutHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full rounded-full font-bold",
                )}
              >
                Prosseguir
              </a>
              <Link
                href="/#produtos"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "lg" }),
                  "w-full rounded-full font-bold",
                )}
              >
                Continuar comprando
              </Link>
            </CardContent>
          </Card>

          <a
            href={business.map.googleMapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-lg bg-muted px-4 py-4 text-sm font-bold transition hover:bg-accent hover:text-accent-foreground"
          >
            <span className="flex items-center gap-3">
              <MapPin className="size-5" />
              Ver mapa demonstrativo
            </span>
            <ChevronRight className="size-5" />
          </a>

          <div className="flex items-start gap-3 rounded-lg border bg-card p-4 text-sm text-muted-foreground">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
            <p>
              Checkout demonstrativo. Nenhum pedido ou pagamento será
              processado.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function CartPageLoading() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8 lg:py-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_21rem] xl:grid-cols-[minmax(0,1fr)_23rem]">
        <div className="min-w-0">
          <div className="mb-6 space-y-2">
            <div className="h-8 w-56 rounded-lg bg-muted" />
            <div className="h-4 w-36 rounded-lg bg-muted" />
          </div>
          <div className="grid gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="rounded-lg">
                <CardContent className="grid gap-4 p-4 md:grid-cols-[5rem_minmax(0,1fr)_7rem_5rem_7rem] md:items-center md:gap-5 md:p-5">
                  <div className="size-20 rounded-lg bg-muted" />
                  <div className="space-y-2">
                    <div className="h-4 w-3/4 rounded-lg bg-muted" />
                    <div className="h-3 w-1/3 rounded-lg bg-muted" />
                  </div>
                  <div className="h-5 rounded-lg bg-muted" />
                  <div className="h-8 rounded-full bg-muted" />
                  <div className="h-5 rounded-lg bg-muted" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="h-fit rounded-lg lg:sticky lg:top-44">
          <CardContent className="space-y-5 p-6">
            <div className="h-5 w-40 rounded-lg bg-muted" />
            <div className="h-4 w-full rounded-lg bg-muted" />
            <div className="h-10 w-full rounded-lg bg-muted" />
            <Separator />
            <div className="h-8 w-full rounded-lg bg-muted" />
            <div className="h-12 w-full rounded-full bg-muted" />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function EmptyCartPage() {
  return (
    <section className="mx-auto grid min-h-[32rem] w-full max-w-7xl place-items-center px-4 py-12 md:px-8">
      <Card className="w-full max-w-xl rounded-lg text-center">
        <CardContent className="flex flex-col items-center px-6 py-10">
          <div className="grid size-16 place-items-center rounded-full bg-muted text-primary">
            <ShoppingBag className="size-7" />
          </div>
          <h1 className="mt-5 text-2xl font-bold">Sua cesta está vazia</h1>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
            Escolha produtos e adicione à cesta para iniciar sua compra.
          </p>
          <Link
            href="/#produtos"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-6 rounded-full font-bold",
            )}
          >
            Ver produtos
          </Link>
        </CardContent>
      </Card>
    </section>
  );
}

type CartPageItemProps = {
  item: CartItem;
  onRemove: () => void;
  onQuantityChange: (quantity: number) => void;
};

function CartPageItem({ item, onQuantityChange, onRemove }: CartPageItemProps) {
  return (
    <article className="grid gap-4 rounded-lg bg-card p-4 ring-1 ring-foreground/10 md:grid-cols-[5rem_minmax(0,1fr)_7rem_5rem_7rem] md:items-center md:gap-5 md:p-5">
      <div className="relative size-20 overflow-hidden rounded-lg bg-muted">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0">
        <h2 className="line-clamp-2 wrap-break-word text-sm font-medium leading-5 md:text-base">
          {item.name}
        </h2>
        {item.brand ? (
          <p className="mt-1 truncate text-sm text-muted-foreground">
            {item.brand}
          </p>
        ) : null}
        {item.size ? (
          <p className="truncate text-xs text-muted-foreground">
            Tamanho: {item.size}
          </p>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-4 md:block md:text-right">
        <span className="text-xs font-medium uppercase text-muted-foreground md:hidden">
          Unitário
        </span>
        <span className="font-bold">{formatCurrency(item.priceCents)}</span>
      </div>

      <CartQuantitySelect
        value={item.quantity}
        ariaLabel={`Quantidade de ${item.name}`}
        className="w-full md:w-20"
        onValueChange={onQuantityChange}
      />

      <div className="flex items-center justify-between gap-3 md:justify-end">
        <button
          type="button"
          className="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-destructive"
          aria-label={`Remover ${item.name}`}
          onClick={onRemove}
        >
          <Trash2 className="size-4" />
        </button>
        <span className="text-base font-bold">
          {formatCurrency(item.priceCents * item.quantity)}
        </span>
      </div>
    </article>
  );
}

function getCheckoutHref(items: CartItem[], subtotalCents: number) {
  const messageLines = [
    "Olá! Este é um pedido demonstrativo:",
    "",
    ...items.map(
      (item) =>
        `${item.quantity}x ${item.name} - ${formatCurrency(
          item.priceCents * item.quantity,
        )}`,
    ),
    "",
    `Subtotal: ${formatCurrency(subtotalCents)}`,
  ];

  const subject = encodeURIComponent("Pedido demonstrativo");
  const body = encodeURIComponent(messageLines.join("\n"));

  return `${business.contacts.whatsapp.href}?subject=${subject}&body=${body}`;
}
