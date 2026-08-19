export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type LegalSection = {
  title: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  slug: string;
  href: string;
  title: string;
  sourceTitle: string;
  description: string;
  updatedAt?: string;
  sourceUrl: string;
  intro: string[];
  sections: LegalSection[];
  closing?: string[];
};

export const legalDocuments = {
  termosDeUso: {
    slug: "termos-de-uso",
    href: "/termos-de-uso",
    title: "Termos da demonstração",
    sourceTitle: "Aviso de projeto fictício",
    description: "Escopo e limitações desta demonstração de portfólio.",
    updatedAt: "19 de agosto de 2026",
    sourceUrl: "#",
    intro: [
      "Este site é um projeto fictício de portfólio. Não representa uma empresa, loja ou operação comercial real.",
    ],
    sections: [
      {
        title: "1. Finalidade",
        blocks: [
          {
            type: "paragraph",
            text: "A interface demonstra decisões de produto e engenharia em um storefront responsivo construído com Next.js.",
          },
        ],
      },
      {
        title: "2. Interações simuladas",
        blocks: [
          {
            type: "list",
            items: [
              "Produtos, preços, avaliações, pessoas e pedidos são fictícios.",
              "Cadastro, pagamento, cupom e envio de formulário não criam transações reais.",
              "O endereço hello@example.com é reservado para exemplos e não funciona como suporte.",
            ],
          },
        ],
      },
      {
        title: "3. Uso do código",
        blocks: [
          {
            type: "paragraph",
            text: "O código-fonte é disponibilizado conforme a licença do repositório. Marcas, conteúdos ou serviços de terceiros continuam sujeitos aos termos de seus respectivos titulares.",
          },
        ],
      },
    ],
  },
  politicaDePrivacidade: {
    slug: "politica-de-privacidade",
    href: "/politica-de-privacidade",
    title: "Privacidade da demonstração",
    sourceTitle: "Como os dados funcionam nesta demo",
    description: "Resumo transparente do armazenamento local e dos serviços externos.",
    updatedAt: "19 de agosto de 2026",
    sourceUrl: "#",
    intro: [
      "Esta demonstração não possui backend próprio, autenticação real ou banco de dados de clientes.",
    ],
    sections: [
      {
        title: "1. Dados no navegador",
        blocks: [
          {
            type: "paragraph",
            text: "O carrinho usa localStorage para permanecer disponível neste navegador. Esses dados podem ser apagados nas configurações do navegador.",
          },
        ],
      },
      {
        title: "2. Formulários",
        blocks: [
          {
            type: "paragraph",
            text: "Os formulários validam entradas apenas para demonstrar estados da interface. Nenhum dado preenchido é enviado ou armazenado por este projeto.",
          },
        ],
      },
      {
        title: "3. Conteúdo externo",
        blocks: [
          {
            type: "paragraph",
            text: "O mapa usa tiles públicos de terceiros, que podem receber dados técnicos padrão da requisição, como endereço IP e agente do navegador.",
          },
        ],
      },
    ],
  },
  politicaDeReembolso: {
    slug: "politica-de-reembolso-e-devolucoes",
    href: "/politica-de-reembolso-e-devolucoes",
    title: "Pedidos e reembolsos simulados",
    sourceTitle: "Aviso sobre o fluxo de checkout",
    description: "Explica por que esta demonstração não processa pedidos ou pagamentos.",
    updatedAt: "19 de agosto de 2026",
    sourceUrl: "#",
    intro: [
      "Não existem compras, cobranças, entregas ou reembolsos reais neste projeto.",
    ],
    sections: [
      {
        title: "1. Carrinho",
        blocks: [
          {
            type: "paragraph",
            text: "Adicionar, remover e alterar quantidades serve somente para demonstrar gerenciamento de estado e persistência local.",
          },
        ],
      },
      {
        title: "2. Finalização",
        blocks: [
          {
            type: "paragraph",
            text: "A ação de prosseguir prepara um e-mail demonstrativo. Ela não reserva estoque, captura pagamento ou envia um pedido a uma empresa.",
          },
        ],
      },
      {
        title: "3. Suporte",
        blocks: [
          {
            type: "paragraph",
            text: "Como não há operação comercial, não há atendimento ao consumidor. Use o repositório do projeto para questões técnicas.",
          },
        ],
      },
    ],
  },
} satisfies Record<string, LegalDocument>;

export const legalDocumentList = [
  legalDocuments.termosDeUso,
  legalDocuments.politicaDePrivacidade,
  legalDocuments.politicaDeReembolso,
] as const;
