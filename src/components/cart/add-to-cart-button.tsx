"use client";

import { Plus } from "lucide-react";

import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import type { CartProduct } from "@/lib/cart";

type AddToCartButtonProps = {
  product: CartProduct;
  className?: string;
};

export function AddToCartButton({ className, product }: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <Button
      type="button"
      size="icon-lg"
      aria-label={`Adicionar ${product.name} ao carrinho`}
      className={className}
      onClick={() => addItem(product)}
    >
      <Plus className="size-4" strokeWidth={3} />
    </Button>
  );
}
