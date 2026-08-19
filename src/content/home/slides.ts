export type HeroSlide = {
  image: string;
  tag: string;
  title: string;
  price: string;
  description: string;
  cta: string;
};

export const slides = [
  {
    image: "/images/hero-1.webp",
    tag: "Rotina equilibrada",
    title: "Essenciais para cuidar de cada dia",
    price: "Seleção demonstrativa",
    description:
      "Uma experiência de compra clara, acolhedora e responsiva para hábitos cotidianos.",
    cta: "Explorar catálogo",
  },
  {
    image: "/images/hero-2.webp",
    tag: "Movimento",
    title: "Produtos que acompanham seu ritmo",
    price: "Coleção ativa",
    description:
      "Acessórios e nutrição para uma rotina prática, apresentados em uma vitrine fictícia.",
    cta: "Ver seleção",
  },
  {
    image: "/images/hero-3.webp",
    tag: "Autocuidado",
    title: "Pequenos rituais, grandes pausas",
    price: "Momentos de bem-estar",
    description:
      "Texturas, aromas e objetos simples reunidos em uma experiência visual tranquila.",
    cta: "Descobrir produtos",
  },
] satisfies HeroSlide[];
