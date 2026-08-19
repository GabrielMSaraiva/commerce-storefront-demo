import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SectionHeading({
  action,
  align = "left",
  description,
  eyebrow,
  eyebrowVariant = "text",
  href,
  title,
}: {
  action?: string;
  align?: "left" | "center";
  description?: string;
  eyebrow: string;
  eyebrowVariant?: "text" | "badge";
  href?: string;
  title: string;
}) {
  const isCentered = align === "center";
  const eyebrowElement =
    eyebrowVariant === "badge" ? (
      <Badge className="bg-accent text-primary hover:bg-accent">{eyebrow}</Badge>
    ) : (
      <div className="text-xs font-bold uppercase tracking-wider text-primary">
        {eyebrow}
      </div>
    );

  return (
    <div
      className={cn(
        "gap-4",
        isCentered ? "text-center" : "flex items-end justify-between",
        isCentered ? "mb-8" : "mb-4",
      )}
    >
      <div>
        {eyebrowElement}
        <h2
          className={cn(
            "font-bold",
            isCentered ? "mt-3 text-2xl md:text-3xl" : "text-xl md:text-2xl",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action && href ? (
        <a
          href={href}
          className="shrink-0 text-xs font-bold text-primary hover:underline"
        >
          {action} →
        </a>
      ) : null}
    </div>
  );
}
