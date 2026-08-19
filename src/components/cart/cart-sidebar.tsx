"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Trash2 } from "lucide-react";

import { useCart } from "@/components/cart/cart-provider";
import { CartQuantitySelect } from "@/components/cart/cart-quantity-select";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, getCartItemLabel, type CartItem } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function CartSidebar() {
  const {
    closeCart,
    isOpen,
    items,
    removeItem,
    setCartOpen,
    subtotalCents,
    totalQuantity,
    updateQuantity,
  } = useCart();

  const hasItems = items.length > 0;

  return (
    <Sheet modal="trap-focus" open={isOpen} onOpenChange={setCartOpen}>
      <SheetContent
        side="right"
        className="!inset-y-3 !right-3 !h-auto !w-[calc(100vw-1.5rem)] max-w-[22.5rem] gap-0 overflow-hidden rounded-2xl border bg-card p-0 sm:!inset-y-4 sm:!right-4 sm:!w-[22.5rem] sm:max-w-[22.5rem]"
      >
        <SheetHeader className="px-6 pb-3 pt-8">
          <SheetTitle className="text-2xl font-bold">Cesta</SheetTitle>
          <SheetDescription>{getCartItemLabel(totalQuantity)}</SheetDescription>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
          {hasItems ? (
            <div className="grid gap-5">
              {items.map((item) => (
                <CartSidebarItem
                  key={item.id}
                  item={item}
                  onRemove={() => removeItem(item.id)}
                  onQuantityChange={(quantity) =>
                    updateQuantity(item.id, quantity)
                  }
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[22rem] flex-col items-center justify-center text-center">
              <div className="grid size-14 place-items-center rounded-full bg-muted text-primary">
                <ShoppingBag className="size-6" />
              </div>
              <h3 className="mt-4 text-base font-bold">Sua cesta está vazia</h3>
              <p className="mt-2 max-w-56 text-sm leading-6 text-muted-foreground">
                Adicione produtos para ver o resumo da compra por aqui.
              </p>
            </div>
          )}
        </div>

        <SheetFooter className="gap-3 border-t bg-card px-6 py-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-base font-bold">
              {formatCurrency(subtotalCents)}
            </span>
          </div>

          {hasItems ? (
            <Link
              href="/carrinho"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full font-bold",
              )}
              onClick={closeCart}
            >
              Ir para cesta
            </Link>
          ) : null}

          <button
            type="button"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-full font-bold",
            )}
            onClick={closeCart}
          >
            Continuar comprando
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

type CartSidebarItemProps = {
  item: CartItem;
  onRemove: () => void;
  onQuantityChange: (quantity: number) => void;
};

function CartSidebarItem({
  item,
  onQuantityChange,
  onRemove,
}: CartSidebarItemProps) {
  return (
    <article className="grid grid-cols-[4rem_minmax(0,1fr)_2rem] gap-3">
      <div className="relative size-16 overflow-hidden rounded-lg bg-muted">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0">
        <h3 className="line-clamp-2 text-sm font-medium leading-5">
          {item.name}
        </h3>
        {item.brand ? (
          <p className="mt-1 truncate text-xs text-muted-foreground">
            {item.brand}
          </p>
        ) : null}
        {item.size ? (
          <p className="truncate text-xs text-muted-foreground">
            Tamanho: {item.size}
          </p>
        ) : null}
      </div>

      <button
        type="button"
        className="grid size-8 place-items-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-destructive"
        aria-label={`Remover ${item.name}`}
        onClick={onRemove}
      >
        <Trash2 className="size-4" />
      </button>

      <div className="col-span-3 flex items-center justify-between gap-4">
        <span className="text-base font-bold">
          {formatCurrency(item.priceCents * item.quantity)}
        </span>

        <CartQuantitySelect
          value={item.quantity}
          ariaLabel={`Quantidade de ${item.name}`}
          onValueChange={onQuantityChange}
        />
      </div>

      <Separator className="col-span-3" />
    </article>
  );
}
