import type { AccountAddress } from "@/lib/account-addresses";

export type AccountNavItem = {
  label: string;
  href: string;
  disabled?: boolean;
};

export type AccountOrderStatus =
  | "Impresso"
  | "Aguardando"
  | "Pagamento pendente"
  | "Concluído"
  | "Cancelado";

export type AccountOrder = {
  id: string;
  date: string;
  itemCount: number;
  productSummary: string;
  amount: string;
  status: AccountOrderStatus;
  total: string;
  actions: Array<"Pagar" | "Visualizar" | "Cancelar">;
};

export const accountNavItems = [
  { label: "Pedidos", href: "/minha-conta/pedidos" },
  { label: "Endereço", href: "/minha-conta/endereco" },
  { label: "Perfil", href: "/minha-conta/perfil" },
] satisfies AccountNavItem[];

export const accountUser = {
  firstName: "Alex",
  lastName: "Demo",
  displayName: "Alex Demo",
  email: "alex@example.com",
  initials: "AD",
  phone: "(00) 00000-0000",
  taxId: "000.000.000-00",
  customerSince: "agosto de 2026",
};

export const accountAddresses = [
  {
    id: "address-billing-demo",
    type: "billing",
    name: "Alex Demo",
    street: "Rua Exemplo, 100",
    city: "Cidade Demo",
    state: "São Paulo",
    postalCode: "00000-000",
    phone: accountUser.phone,
  },
  {
    id: "address-delivery-demo",
    type: "delivery",
    name: "Alex Demo",
    street: "Avenida Demonstração, 200",
    city: "Cidade Demo",
    state: "São Paulo",
    postalCode: "00000-000",
    phone: accountUser.phone,
  },
] satisfies AccountAddress[];

export const accountOrders = [
  {
    id: "#DEMO-1042",
    date: "10 de ago. de 2026",
    itemCount: 2,
    productSummary: "Kit Daily Balance · Garrafa térmica Move 750",
    amount: "R$ 204,80",
    status: "Aguardando",
    total: "R$ 204,80 de 2 itens",
    actions: ["Visualizar"],
  },
  {
    id: "#DEMO-1038",
    date: "08 de ago. de 2026",
    itemCount: 1,
    productSummary: "Blend vegetal sabor baunilha",
    amount: "R$ 89,90",
    status: "Pagamento pendente",
    total: "R$ 89,90 de 1 item",
    actions: ["Pagar", "Visualizar"],
  },
  {
    id: "#DEMO-1021",
    date: "01 de ago. de 2026",
    itemCount: 3,
    productSummary: "Sais de banho · Infusão botânica · Organizador",
    amount: "R$ 142,70",
    status: "Concluído",
    total: "R$ 142,70 de 3 itens",
    actions: ["Visualizar"],
  },
  {
    id: "#DEMO-1015",
    date: "29 de jul. de 2026",
    itemCount: 1,
    productSummary: "Organizador compacto Everyday",
    amount: "R$ 59,90",
    status: "Cancelado",
    total: "R$ 59,90 de 1 item",
    actions: ["Visualizar"],
  },
] satisfies AccountOrder[];
