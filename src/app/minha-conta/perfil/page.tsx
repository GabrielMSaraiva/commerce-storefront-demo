import type { Metadata } from "next";

import { AccountProfile } from "@/components/account/account-profile";
import { AccountShell } from "@/components/account/account-shell";

export const metadata: Metadata = {
  title: "Perfil | Wellness Market Demo",
  description: "Atualize dados pessoais e configurações da sua conta.",
};

export default function AccountProfilePage() {
  return (
    <AccountShell activeHref="/minha-conta/perfil">
      <AccountProfile />
    </AccountShell>
  );
}
