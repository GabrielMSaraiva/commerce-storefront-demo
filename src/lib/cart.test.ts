import { describe, expect, it } from "vitest";

import {
  formatCurrency,
  getCartItemLabel,
  getCartSubtotalCents,
  getCartTotalQuantity,
  type CartItem,
} from "./cart";

const items: CartItem[] = [
  {
    id: "daily-balance-kit",
    name: "Kit Daily Balance",
    image: "/daily-balance.webp",
    priceCents: 12990,
    quantity: 2,
  },
  {
    id: "travel-organizer",
    name: "Organizador",
    image: "/organizer.webp",
    priceCents: 5990,
    quantity: 1,
  },
];

describe("cart calculations", () => {
  it("calculates subtotal in cents", () => {
    expect(getCartSubtotalCents(items)).toBe(31970);
  });

  it("counts quantities across items", () => {
    expect(getCartTotalQuantity(items)).toBe(3);
  });

  it("formats Brazilian currency", () => {
    expect(formatCurrency(12990)).toMatch(/129,90/);
  });

  it("uses singular and plural labels", () => {
    expect(getCartItemLabel(1)).toBe("1 item");
    expect(getCartItemLabel(3)).toBe("3 itens");
  });
});
