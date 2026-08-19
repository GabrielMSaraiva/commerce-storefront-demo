import Image from "next/image";

import { SectionHeading } from "@/components/home/components/section-heading";
import { categories, type Category } from "@/content/home/categories";
import { cn } from "@/lib/utils";

export function CategoriesSection() {
  const [feature, ...rest] = categories;

  return (
    <section className="py-6">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          eyebrow="Navegue por categoria"
          title="Escolhas para cada momento da rotina"
          action="Ver todas"
          href="#produtos"
        />

        <div className="grid grid-cols-2 gap-3 md:h-80 md:grid-cols-4 md:grid-rows-2">
          <a
            href="#produtos"
            className="group relative col-span-2 row-span-2 overflow-hidden rounded-xl bg-muted"
          >
            <Image
              src="/images/products/daily-balance.webp"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 560px"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative flex h-full min-h-55 flex-col justify-end p-5 text-white">
              <feature.icon className="mb-3 size-6" />
              <div className="text-base font-bold md:text-lg">{feature.title}</div>
              <p className="mt-1 max-w-md text-xs text-white/85">
                {feature.description}
              </p>
              <div className="mt-2 text-xs font-bold">{feature.action} →</div>
            </div>
          </a>

          {rest.map((category) => (
            <CategoryTile key={category.title} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryTile({
  category,
}: {
  category: Category;
}) {
  const variantClass = {
    feature: "",
    primary: "bg-primary text-primary-foreground hover:brightness-110",
    accent: "bg-accent text-primary hover:brightness-105",
    plain: "border border-border bg-white text-foreground hover:border-primary/40",
  }[category.variant];

  return (
    <a
      href="#produtos"
      className={cn(
        "group relative overflow-hidden rounded-xl p-4 transition",
        variantClass,
      )}
    >
      <category.icon className="absolute right-3 top-3 size-5 opacity-85" />
      <div className="mt-8 text-sm font-bold">{category.title}</div>
      <p
        className={cn(
          "text-xs",
          category.variant === "plain"
            ? "text-muted-foreground"
            : "opacity-85",
        )}
      >
        {category.description}
      </p>
      <div className="mt-2 text-xs font-bold">{category.action} →</div>
    </a>
  );
}
