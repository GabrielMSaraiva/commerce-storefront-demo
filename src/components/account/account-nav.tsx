import Link from "next/link";
import { MapPin, Package, UserRound } from "lucide-react";

import { accountNavItems, accountUser } from "@/content/account";
import { cn } from "@/lib/utils";

type AccountNavProps = {
  activeHref: string;
};

export function AccountNav({ activeHref }: AccountNavProps) {
  return (
    <aside className="grid min-w-0 gap-5 lg:sticky lg:top-44 lg:self-start">
      <div className="flex min-w-0 items-center gap-3 rounded-xl border bg-card p-4">
        <div className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary">
          {accountUser.initials}
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-bold">
            {accountUser.displayName}
          </div>
          <div className="truncate text-xs text-muted-foreground">
            {accountUser.email}
          </div>
        </div>
      </div>

      <nav aria-label="Navegação da conta">
        <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-2 lg:grid-cols-1">
          {accountNavItems.map((item) => {
            const isActive = item.href === activeHref;
            const Icon = getAccountNavIcon(item.href);
            const className = cn(
              "flex h-11 min-w-0 items-center gap-1.5 rounded-xl px-1.5 text-xs font-semibold transition sm:gap-3 sm:px-4 sm:text-sm",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            );

            return (
              <Link
                key={item.label}
                href={item.href}
                className={className}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="size-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}

function getAccountNavIcon(href: string) {
  if (href.includes("endereco")) {
    return MapPin;
  }

  if (href.includes("perfil")) {
    return UserRound;
  }

  return Package;
}
