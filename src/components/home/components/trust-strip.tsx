import { trustItems } from "@/content/home/trust";

export function TrustStrip() {
  return (
    <section className="py-5">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-border bg-white px-4 py-4 sm:grid-cols-2 md:grid-cols-4 md:px-6">
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-primary">
                <item.icon className="size-4" />
              </div>
              <div>
                <div className="text-sm font-bold leading-tight">
                  {item.label}
                </div>
                <div className="text-xs leading-tight text-muted-foreground">
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
