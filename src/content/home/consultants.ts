export type Consultant = {
  name: string;
  role: string;
  image: string;
  initials: string;
  contactLabel: string;
  contactHref: string;
};

export const consultants = [
  {
    name: "Catálogo",
    role: "Dúvidas sobre produtos",
    image: "",
    initials: "CA",
    contactLabel: "Explorar",
    contactHref: "/#produtos",
  },
  {
    name: "Pedidos",
    role: "Fluxo demonstrativo",
    image: "",
    initials: "PE",
    contactLabel: "Ver carrinho",
    contactHref: "/carrinho",
  },
  {
    name: "Conta",
    role: "Área do cliente simulada",
    image: "",
    initials: "CO",
    contactLabel: "Acessar",
    contactHref: "/minha-conta",
  },
  {
    name: "Projeto",
    role: "Formulário sem envio",
    image: "",
    initials: "PR",
    contactLabel: "Saiba mais",
    contactHref: "mailto:hello@example.com",
  },
] satisfies Consultant[];
