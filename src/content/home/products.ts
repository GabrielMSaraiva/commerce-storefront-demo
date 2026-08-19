import type { CartProduct } from "@/lib/cart";

export type Product = CartProduct & {
  price: string;
  oldPrice: string;
  badge: string;
  badgeType: "discount" | "promo";
  rating: number;
  reviews: number;
};

export const products = [
  {
    id: "daily-balance-kit",
    name: "Kit Daily Balance",
    image: "/images/products/daily-balance.webp",
    priceCents: 12990,
    price: "129,90",
    oldPrice: "149,90",
    brand: "Everyday",
    size: "3 itens",
    badge: "-13%",
    badgeType: "discount",
    rating: 5,
    reviews: 48,
  },
  {
    id: "plant-protein-vanilla",
    name: "Blend vegetal sabor baunilha",
    image: "/images/products/active-nutrition.webp",
    priceCents: 8990,
    price: "89,90",
    oldPrice: "",
    brand: "Active",
    size: "450 g",
    badge: "Novidade",
    badgeType: "promo",
    rating: 5,
    reviews: 31,
  },
  {
    id: "recovery-bath-salts",
    name: "Sais de banho Recovery Ritual",
    image: "/images/products/recovery-ritual.webp",
    priceCents: 4990,
    price: "49,90",
    oldPrice: "59,90",
    brand: "Slow Care",
    size: "300 g",
    badge: "-17%",
    badgeType: "discount",
    rating: 4,
    reviews: 26,
  },
  {
    id: "hydration-bottle-750",
    name: "Garrafa térmica Move 750",
    image: "/images/products/active-nutrition.webp",
    priceCents: 7490,
    price: "74,90",
    oldPrice: "",
    brand: "Move",
    size: "750 ml",
    badge: "Mais escolhido",
    badgeType: "promo",
    rating: 5,
    reviews: 67,
  },
  {
    id: "sleep-ritual-tea",
    name: "Infusão botânica Noite Calma",
    image: "/images/products/recovery-ritual.webp",
    priceCents: 3290,
    price: "32,90",
    oldPrice: "39,90",
    brand: "Slow Care",
    size: "15 sachês",
    badge: "-18%",
    badgeType: "discount",
    rating: 5,
    reviews: 39,
  },
  {
    id: "travel-organizer",
    name: "Organizador compacto Everyday",
    image: "/images/products/daily-balance.webp",
    priceCents: 5990,
    price: "59,90",
    oldPrice: "",
    brand: "Everyday",
    size: "Único",
    badge: "Prático",
    badgeType: "promo",
    rating: 4,
    reviews: 22,
  },
] satisfies Product[];
