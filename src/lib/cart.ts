export type CartProduct = {
  id: string;
  name: string;
  image: string;
  priceCents: number;
  brand?: string;
  size?: string;
};

export type CartItem = CartProduct & {
  quantity: number;
};

export function formatCurrency(valueInCents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valueInCents / 100);
}

export function getCartSubtotalCents(items: CartItem[]) {
  return items.reduce(
    (subtotal, item) => subtotal + item.priceCents * item.quantity,
    0,
  );
}

export function getCartTotalQuantity(items: CartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function getCartItemLabel(quantity: number) {
  return quantity === 1 ? "1 item" : `${quantity} itens`;
}
