"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  getCartSubtotalCents,
  getCartTotalQuantity,
  type CartItem,
  type CartProduct,
} from "@/lib/cart";

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  isHydrated: boolean;
  totalQuantity: number;
  subtotalCents: number;
  addItem: (product: CartProduct) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  setCartOpen: (open: boolean) => void;
};

const CART_STORAGE_KEY = "wellness-market-demo-cart-v1";
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    queueMicrotask(() => {
      if (!isMounted) {
        return;
      }

      try {
        const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

        if (storedCart) {
          const parsedItems = JSON.parse(storedCart);
          setItems(sanitizeCartItems(parsedItems));
        }
      } catch {
        try {
          window.localStorage.removeItem(CART_STORAGE_KEY);
        } catch {
          // Storage is unavailable; retain the in-memory cart.
        }
      } finally {
        setIsHydrated(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage is unavailable; keep the session cart in memory.
    }
  }, [isHydrated, items]);

  const addItem = useCallback((product: CartProduct) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, 10) }
            : item,
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });

    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    const nextQuantity = Math.max(0, Math.min(quantity, 10));

    setItems((currentItems) => {
      if (nextQuantity === 0) {
        return currentItems.filter((item) => item.id !== productId);
      }

      return currentItems.map((item) =>
        item.id === productId ? { ...item, quantity: nextQuantity } : item,
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      isOpen,
      isHydrated,
      totalQuantity: getCartTotalQuantity(items),
      subtotalCents: getCartSubtotalCents(items),
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      setCartOpen: setIsOpen,
    }),
    [addItem, clearCart, isHydrated, isOpen, items, removeItem, updateQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}

function sanitizeCartItems(items: unknown): CartItem[] {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .filter(isStoredCartItem)
    .map((item) => ({
      ...item,
      quantity: Math.max(1, Math.min(Math.trunc(item.quantity), 10)),
    }));
}

function isStoredCartItem(item: unknown): item is CartItem {
  if (typeof item !== "object" || item === null) {
    return false;
  }

  const maybeItem = item as Partial<CartItem>;

  return (
    typeof maybeItem.id === "string" &&
    typeof maybeItem.name === "string" &&
    typeof maybeItem.image === "string" &&
    Number.isFinite(maybeItem.priceCents) &&
    Number.isFinite(maybeItem.quantity)
  );
}
