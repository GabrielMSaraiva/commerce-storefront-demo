"use client";

import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";
import { cn } from "@/lib/utils";

type CartButtonProps = {
  className?: string;
  badgeClassName?: string;
};

export function CartButton({ className, badgeClassName }: CartButtonProps) {
  const { openCart, totalQuantity } = useCart();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-lg"
      className={cn(
        "relative hover:bg-white/10 hover:!text-primary-foreground aria-expanded:!text-primary-foreground",
        className,
      )}
      aria-label={`Abrir carrinho com ${totalQuantity} itens`}
      onClick={openCart}
    >
      <ShoppingCart className="size-5" />
      <span
        className={cn(
          "absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-white text-xs font-bold text-primary",
          badgeClassName,
        )}
      >
        {totalQuantity}
      </span>
    </Button>
  );
}
