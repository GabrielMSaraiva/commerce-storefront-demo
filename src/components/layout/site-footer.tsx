import { Code2, Mail, MonitorSmartphone } from "lucide-react";

import { WellnessMarketLogo } from "@/components/brand/wellness-market-logo";
import { business } from "@/config/business";
import { footerColumns } from "@/content/footer";

const projectLinks = [
  {
    label: "Código no GitHub",
    href: "https://github.com/GabrielMSaraiva/commerce-storefront-demo",
    icon: Code2,
  },
  {
    label: "E-mail demonstrativo",
    href: business.contacts.email.href,
    icon: Mail,
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-10 bg-primary text-primary-foreground">
      <div className="border-b border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-8">
          <WellnessMarketLogo compact />
          <div className="flex flex-col gap-4 text-sm md:flex-row md:items-center md:gap-8">
            <a
              href={business.contacts.footerPhone.href}
              className="flex items-center gap-2 rounded-lg transition hover:text-white"
            >
              <MonitorSmartphone className="size-4" />
              <div>
                <div className="text-xs uppercase opacity-75">
                  {business.contacts.footerPhone.label}
                </div>
                <div className="font-bold">
                  {business.contacts.footerPhone.display}
                </div>
              </div>
            </a>
            <a
              href={business.contacts.email.href}
              className="flex items-center gap-2 rounded-lg transition hover:text-white"
            >
              <Mail className="size-4" />
              <div>
                <div className="text-xs uppercase opacity-75">Contato fictício</div>
                <div className="font-bold">{business.contacts.email.display}</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4 md:px-8">
        {footerColumns.map((column) => (
          <div key={column.title}>
            <div className="mb-3 text-xs font-bold uppercase tracking-wider">
              {column.title}
            </div>
            <ul className="space-y-2 text-xs text-primary-foreground/85">
              {column.items.map((item) => (
                <li key={item.label}>
                  <a className="hover:text-white hover:underline" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <div className="mb-3 text-xs font-bold uppercase tracking-wider">
            Projeto
          </div>
          <div className="flex gap-2">
            {projectLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="grid size-9 place-items-center rounded-full border border-white/30 transition hover:bg-white/15"
                aria-label={label}
              >
                <Icon className="size-4" aria-hidden="true" />
              </a>
            ))}
          </div>
          <div className="mt-5 text-xs text-primary-foreground/85">
            <div className="font-semibold">Disponibilidade</div>
            <div>{business.hours.footer}</div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-primary-foreground/80 md:px-8">
          © {new Date().getFullYear()} {business.name}. Projeto fictício de
          portfólio. Nenhuma compra ou solicitação é processada.
        </div>
      </div>
    </footer>
  );
}
