import type { ReactNode } from "react";

import { AccountHeader } from "@/components/account/account-header";
import { AccountNav } from "@/components/account/account-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

type AccountShellProps = {
  activeHref?: string;
  children: ReactNode;
  withNav?: boolean;
};

export function AccountShell({
  activeHref = "/minha-conta",
  children,
  withNav = true,
}: AccountShellProps) {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <AccountHeader />
      <div className="mx-auto grid w-full max-w-7xl flex-1 gap-8 px-4 py-8 md:px-8 lg:py-10">
        {withNav ? (
          <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)] xl:gap-10">
            <AccountNav activeHref={activeHref} />
            <div className="min-w-0">{children}</div>
          </div>
        ) : (
          children
        )}
      </div>
      <SiteFooter />
    </main>
  );
}
