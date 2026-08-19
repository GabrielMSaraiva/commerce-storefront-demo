import Link from "next/link";
import { Leaf } from "lucide-react";

import { cn } from "@/lib/utils";

export function WellnessMarketLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      className={cn("flex shrink-0 items-center gap-2.5", compact && "w-fit")}
      href="/"
      aria-label="Wellness Market Demo"
    >
      <span className="grid size-10 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25">
        <Leaf className="size-5" strokeWidth={2.5} aria-hidden="true" />
      </span>
      <span className={cn("leading-none", compact && "hidden sm:block")}>
        <span className="block text-sm font-black tracking-tight">WELLNESS</span>
        <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.22em] text-primary-foreground/70">
          Market Demo
        </span>
      </span>
    </Link>
  );
}
