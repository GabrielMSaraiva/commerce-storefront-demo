import type { Metadata } from "next";

import { AccountLoginRegister } from "@/components/account/account-login-register";
import { AccountShell } from "@/components/account/account-shell";

export const metadata: Metadata = {
  title: "Minha conta | Wellness Market Demo",
  description:
    "Acesse sua conta ou crie um cadastro para acompanhar pedidos e dados de compra.",
};

export default function AccountPage() {
  return (
    <AccountShell withNav={false}>
      <AccountLoginRegister />
    </AccountShell>
  );
}
