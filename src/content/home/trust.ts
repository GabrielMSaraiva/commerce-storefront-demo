import type { LucideIcon } from "lucide-react";
import { Clock, MonitorSmartphone, ShieldCheck, ShoppingBag } from "lucide-react";

export type TrustItem = {
  icon: LucideIcon;
  label: string;
  description: string;
};

export const trustItems = [
  {
    icon: MonitorSmartphone,
    label: "Responsivo",
    description: "Navegação pensada para celular, tablet e desktop.",
  },
  {
    icon: Clock,
    label: "Interações rápidas",
    description: "Busca, formulários e estados com feedback imediato.",
  },
  {
    icon: ShieldCheck,
    label: "Dados fictícios",
    description: "Nenhuma informação real de clientes ou empresas.",
  },
  {
    icon: ShoppingBag,
    label: "Carrinho persistente",
    description: "Itens salvos localmente para demonstrar o fluxo de compra.",
  },
] satisfies TrustItem[];
