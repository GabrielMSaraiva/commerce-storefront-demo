import { Clock, MapPin, Navigation } from "lucide-react";

import { LeafletMap } from "@/components/home/components/leaflet-map";
import { SectionHeading } from "@/components/home/components/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { business } from "@/config/business";
import { cn } from "@/lib/utils";

export function LocationSection() {
  return (
    <section id="local" className="py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          align="center"
          eyebrow="Experiência local"
          eyebrowVariant="badge"
          title="Mapa demonstrativo"
          description="Integração visual com Leaflet usando uma coordenada ilustrativa, sem representar uma loja real."
        />

        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="relative isolate z-0 aspect-16/10 overflow-hidden rounded-xl border border-border bg-white lg:aspect-auto lg:min-h-95">
            <LeafletMap
              center={business.map.coordinates}
              title={business.map.title}
              zoom={17}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Card className="gap-0 p-5">
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-primary" />
                <span className="text-sm font-bold">Local ilustrativo</span>
              </div>
              <p className="mt-2 text-sm">
                {business.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <a
                href={business.map.googleMapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-4 w-full rounded-full",
                )}
              >
                <Navigation className="size-3.5" />
                Voltar à seção
              </a>
            </Card>

            <Card className="gap-0 p-5">
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-primary" />
                <span className="text-sm font-bold">
                  Status da demonstração
                </span>
              </div>
              <div className="mt-3 space-y-1.5 text-xs">
                <div className="flex justify-between gap-3">
                  <span className="text-muted-foreground">
                    {business.hours.weekday.label}
                  </span>
                  <span className="font-semibold">
                    {business.hours.weekday.display}
                  </span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-muted-foreground">
                    {business.hours.sunday.label}
                  </span>
                  <span className="font-semibold">
                    {business.hours.sunday.display}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
