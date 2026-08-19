import { ShieldCheck } from "lucide-react";

import { BackToStoreLink } from "@/components/shared/back-to-store-link";

export function AccountHeader() {
  return (
    <section className="border-b bg-card">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 md:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-xl font-bold leading-tight">Minha conta</h1>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <ShieldCheck className="size-3.5" />
            Ambiente protegido - seus dados estão seguros
          </p>
        </div>

        <BackToStoreLink />
      </div>
    </section>
  );
}
