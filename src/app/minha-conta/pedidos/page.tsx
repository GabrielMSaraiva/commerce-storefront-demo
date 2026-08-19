import type { Metadata } from "next";

import { AccountOrders } from "@/components/account/account-orders";
import { AccountShell } from "@/components/account/account-shell";

export const metadata: Metadata = {
  title: "Pedidos | Wellness Market Demo",
  description: "Acompanhe pedidos recentes e compras pendentes.",
};

export default function AccountOrdersPage() {
  return (
    <AccountShell activeHref="/minha-conta/pedidos">
      <AccountOrders />
    </AccountShell>
  );
}
