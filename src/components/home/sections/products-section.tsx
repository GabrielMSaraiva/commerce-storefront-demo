import Image from "next/image";
import { Star } from "lucide-react";

import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { SectionHeading } from "@/components/home/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { products } from "@/content/home/products";
import { cn } from "@/lib/utils";

export function ProductsSection({ searchQuery = "" }: { searchQuery?: string }) {
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase("pt-BR");
  const visibleProducts = normalizedQuery
    ? products.filter((product) =>
        [product.name, product.brand, product.badge, product.size].some((value) =>
          value.toLocaleLowerCase("pt-BR").includes(normalizedQuery),
        ),
      )
    : products;

  return (
    <section id="produtos" className="py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          eyebrow={normalizedQuery ? "Busca no catálogo" : "Ofertas do dia"}
          title={
            normalizedQuery
              ? `Resultados para “${searchQuery.trim()}”`
              : "Mais comprados da semana"
          }
          action={normalizedQuery ? "Limpar busca" : "Ver mais ofertas"}
          href={normalizedQuery ? "/#produtos" : "#produtos"}
        />

        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {visibleProducts.map((product) => (
              <Card
                key={product.name}
                className="group relative gap-0 py-0 transition hover:shadow-(--shadow-elevated)"
              >
                <Badge
                  className={cn(
                    "absolute left-0 top-3 z-10 rounded-l-none rounded-r px-2 py-0.5 text-xs font-bold uppercase tracking-wider",
                    product.badgeType === "discount"
                      ? "bg-primary text-primary-foreground"
                      : "bg-foreground text-white",
                  )}
                >
                  {product.badge}
                </Badge>
                <div className="relative aspect-square overflow-hidden bg-muted/40">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 180px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <AddToCartButton
                    product={product}
                    className="absolute bottom-2 right-2 rounded-full shadow-md"
                  />
                </div>
                <CardContent className="flex flex-1 flex-col p-3">
                  <div className="flex items-center gap-0.5">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "size-3",
                          star < product.rating
                            ? "fill-primary text-primary"
                            : "text-border",
                        )}
                      />
                    ))}
                    <span className="ml-1 text-xs text-muted-foreground">
                      ({product.reviews})
                    </span>
                  </div>
                  <h3 className="mt-1.5 line-clamp-2 min-h-8 text-xs font-medium leading-4">
                    {product.name}
                  </h3>
                  <div className="mt-auto pt-2">
                    <div className="flex flex-wrap items-baseline gap-1.5">
                      <span className="text-base font-bold">
                        R$ {product.price}
                      </span>
                      {product.oldPrice ? (
                        <span className="text-xs text-muted-foreground line-through">
                          R$ {product.oldPrice}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div
            className="rounded-xl border border-dashed bg-card px-6 py-12 text-center"
            role="status"
          >
            <h3 className="text-lg font-bold">Nenhum produto encontrado</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Tente outro nome, categoria ou coleção demonstrativa.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
