import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BackToStoreLinkProps = {
  className?: string;
};

export function BackToStoreLink({ className }: BackToStoreLinkProps) {
  return (
    <Link
      href="/"
      className={cn(
        buttonVariants({ size: "lg" }),
        "w-fit rounded-xl font-bold",
        className,
      )}
    >
      <ArrowLeft className="size-4" />
      Voltar para a loja
    </Link>
  );
}
