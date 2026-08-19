import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "leaflet/dist/leaflet.css";
import "./globals.css";

import { CartProvider } from "@/components/cart/cart-provider";
import { CartSidebar } from "@/components/cart/cart-sidebar";
import { business } from "@/config/business";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function getRequestOrigin(requestHeaders: Headers) {
  const forwardedHost = requestHeaders
    .get("x-forwarded-host")
    ?.split(",")[0]
    ?.trim();
  const host = forwardedHost ?? requestHeaders.get("host") ?? "localhost:3000";
  const forwardedProtocol = requestHeaders
    .get("x-forwarded-proto")
    ?.split(",")[0]
    ?.trim();
  const isLocalHost = /^(localhost|127\.0\.0\.1|\[::1\])(?::|$)/.test(host);
  const protocol =
    forwardedProtocol ?? (isLocalHost ? "http" : "https");

  try {
    return new URL(`${protocol}://${host}`);
  } catch {
    return new URL("http://localhost:3000");
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const origin = getRequestOrigin(await headers());
  const socialImage = new URL("/og.png", origin).toString();

  return {
    metadataBase: origin,
    applicationName: business.name,
    title: business.metadata.title,
    description: business.metadata.description,
    creator: "Gabriel Saraiva",
    openGraph: {
      title: business.metadata.openGraphTitle,
      description: business.metadata.openGraphDescription,
      type: "website",
      locale: "pt_BR",
      url: origin,
      siteName: business.name,
      images: [
        {
          url: socialImage,
          width: 1729,
          height: 910,
          alt: "Wellness Market Demo storefront interface",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: business.metadata.openGraphTitle,
      description: business.metadata.openGraphDescription,
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          {children}
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
