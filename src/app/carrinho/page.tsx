import type { Metadata } from "next";

import { CartPageContent } from "@/components/cart/cart-page-content";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Cesta de compras | Wellness Market Demo",
  description:
    "Revise os produtos adicionados, ajuste quantidades e finalize sua compra.",
};

export default function CartPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <div className="flex-1">
        <CartPageContent />
      </div>
      <SiteFooter />
    </main>
  );
}
