import { HeroCarousel } from "@/components/home/components/hero-carousel";
import { TrustStrip } from "@/components/home/components/trust-strip";
import { CategoriesSection } from "@/components/home/sections/categories-section";
import { ContactSection } from "@/components/home/sections/contact-section";
import { LocationSection } from "@/components/home/sections/location-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ProductsSection } from "@/components/home/sections/products-section";

export function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <HeroCarousel />
      <TrustStrip />
      <CategoriesSection />
      <ProductsSection />
      <ContactSection />
      <LocationSection />
      <SiteFooter />
    </main>
  );
}
