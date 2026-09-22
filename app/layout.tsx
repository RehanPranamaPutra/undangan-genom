import type { Metadata } from "next";
import { Fraunces, Libre_Caslon_Text, Archivo, Caveat } from "next/font/google";
import "./globals.css";
import { event } from "@/lib/event";

const fraunces = Fraunces({
  weight: ["500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const caslonText = Libre_Caslon_Text({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-caslon-text",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const caveat = Caveat({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `Undangan Wisuda ${event.graduate.name}`,
    template: `%s · Undangan Wisuda ${event.graduate.name}`,
  },
  description: `Undangan wisuda ${event.graduate.name}: ${event.ceremony.day}, ${event.ceremony.dateLabel} di ${event.ceremony.venue}. Silakan buka undangannya.`,
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: `Undangan Wisuda ${event.graduate.name}`,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${fraunces.variable} ${caslonText.variable} ${archivo.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
