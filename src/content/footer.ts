export type FooterLink = {
  label: string;
  href: string;
};

export type FooterColumn = {
  title: string;
  items: FooterLink[];
};

export const footerColumns = [
  {
    title: "Projeto",
    items: [
      { label: "Sobre a demonstração", href: "/#contato" },
      { label: "Experiência responsiva", href: "/#produtos" },
      { label: "Local ilustrativo", href: "/#local" },
      { label: "Privacidade", href: "/politica-de-privacidade" },
      { label: "Termos de uso", href: "/termos-de-uso" },
    ],
  },
  {
    title: "Categorias",
    items: [
      { label: "Nutrição diária", href: "/#produtos" },
      { label: "Movimento", href: "/#produtos" },
      { label: "Recuperação", href: "/#produtos" },
      { label: "Autocuidado", href: "/#produtos" },
      { label: "Acessórios", href: "/#produtos" },
    ],
  },
  {
    title: "Explore",
    items: [
      { label: "Catálogo", href: "/#produtos" },
      { label: "Carrinho", href: "/carrinho" },
      { label: "Conta simulada", href: "/minha-conta" },
      { label: "Formulário demonstrativo", href: "/#contato" },
      {
        label: "Pedidos simulados",
        href: "/politica-de-reembolso-e-devolucoes",
      },
    ],
  },
] satisfies FooterColumn[];
