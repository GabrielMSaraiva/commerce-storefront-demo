export const business = {
  name: "Wellness Market Demo",
  placeName: "Wellness Market Demo",
  metadata: {
    title: "Wellness Market Demo - Storefront em Next.js",
    description:
      "Storefront demonstrativo com catálogo responsivo, carrinho persistente e fluxos de conta simulados.",
    openGraphTitle: "Wellness Market Demo",
    openGraphDescription:
      "Uma experiência de comércio eletrônico fictícia construída como projeto de portfólio.",
  },
  address: {
    lines: [
      "Loja totalmente fictícia",
      "Localização usada apenas na demonstração",
    ],
  },
  contacts: {
    servicePhone: {
      label: "Telefone",
      display: "Contato não disponível",
      href: "/#contato",
    },
    footerPhone: {
      label: "Operação",
      display: "Demonstração sem vendas reais",
      href: "/#contato",
    },
    whatsapp: {
      label: "Pedido simulado",
      display: "hello@example.com",
      href: "mailto:hello@example.com",
    },
    email: {
      label: "E-mail demonstrativo",
      display: "hello@example.com",
      href: "mailto:hello@example.com",
    },
  },
  hours: {
    weekday: {
      label: "Disponibilidade",
      display: "Projeto de portfólio",
    },
    sunday: {
      label: "Atendimento",
      display: "Não disponível",
    },
    footer: "Projeto demonstrativo · Sem operação comercial",
  },
  map: {
    coordinates: [-23.5505, -46.6333] as [number, number],
    googleMapsHref: "/#local",
    title: "Mapa ilustrativo da demonstração",
  },
} as const;
