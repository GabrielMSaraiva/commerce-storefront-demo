import type { Metadata } from "next";

import { LegalDocumentPage } from "@/components/legal/legal-document-page";
import { legalDocuments } from "@/content/legal";

const document = legalDocuments.politicaDeReembolso;

export const metadata: Metadata = {
  title: `${document.title} | Wellness Market Demo`,
  description: document.description,
};

export default function RefundPolicyPage() {
  return <LegalDocumentPage document={document} />;
}
