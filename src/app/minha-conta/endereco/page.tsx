import type { Metadata } from "next";

import { AccountAddress } from "@/components/account/account-address";
import { AccountShell } from "@/components/account/account-shell";

export const metadata: Metadata = {
  title: "Endereço | Wellness Market Demo",
  description: "Gerencie os endereços cadastrados na sua conta.",
};

export default function AccountAddressPage() {
  return (
    <AccountShell activeHref="/minha-conta/endereco">
      <AccountAddress />
    </AccountShell>
  );
}
