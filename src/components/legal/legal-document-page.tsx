import { FileText } from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BackToStoreLink } from "@/components/shared/back-to-store-link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { LegalDocument } from "@/content/legal";

type LegalDocumentPageProps = {
  document: LegalDocument;
};

export function LegalDocumentPage({ document }: LegalDocumentPageProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="border-b bg-card">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 md:px-8 lg:flex-row lg:items-end lg:justify-between lg:py-12">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4 gap-1">
              <FileText className="size-3" />
              Documento legal
            </Badge>
            <h1 className="text-3xl font-bold leading-tight md:text-5xl">
              {document.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
              {document.description}
            </p>
            {document.updatedAt ? (
              <p className="mt-3 text-xs font-medium text-muted-foreground">
                Última atualização: {document.updatedAt}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2">
            <BackToStoreLink />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:px-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:py-10">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="text-xl">{document.sourceTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 text-sm leading-7 md:text-base md:leading-8">
            {document.intro.length > 0 ? (
              <div className="space-y-3 text-muted-foreground">
                {document.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : null}

            {document.intro.length > 0 ? <Separator /> : null}

            {document.sections.map((section, index) => (
              <section
                key={section.title}
                id={getSectionId(section.title, index)}
                className="scroll-mt-36"
              >
                <h2 className="text-xl font-bold leading-snug text-foreground md:text-2xl">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-muted-foreground">
                  {section.blocks.map((block, blockIndex) => {
                    if (block.type === "list") {
                      return (
                        <ul
                          key={`${section.title}-${blockIndex}`}
                          className="ml-5 list-disc space-y-2"
                        >
                          {block.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      );
                    }

                    return <p key={`${section.title}-${blockIndex}`}>{block.text}</p>;
                  })}
                </div>
              </section>
            ))}

            {document.closing?.length ? (
              <>
                <Separator />
                <div className="space-y-3 font-medium text-foreground">
                  {document.closing.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </>
            ) : null}
          </CardContent>
        </Card>

        <aside className="lg:sticky lg:top-44 lg:self-start">
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">
                Nesta página
              </CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="grid gap-1 text-sm">
                {document.sections.map((section, index) => (
                  <a
                    key={section.title}
                    href={`#${getSectionId(section.title, index)}`}
                    className="rounded-md px-2 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </CardContent>
          </Card>
        </aside>
      </section>

      <SiteFooter />
    </main>
  );
}

function getSectionId(title: string, index: number) {
  const normalizedTitle = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `secao-${index + 1}-${normalizedTitle}`;
}
