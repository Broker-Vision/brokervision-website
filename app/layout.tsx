import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | Der digitale Arbeitsplatz für Versicherungsbroker`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/favicon-32.svg", type: "image/svg+xml", sizes: "32x32" },
      { url: "/brand/app-icon.svg", type: "image/svg+xml", sizes: "512x512" },
    ],
    apple: [{ url: "/brand/apple-touch-icon.svg", sizes: "180x180" }],
  },
  openGraph: {
    title: site.name,
    description: site.description,
    locale: "de_CH",
    type: "website",
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Broker Vision – Logo Feld",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: ["/brand/social-preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-CH">
      <body className={`${inter.variable} flex min-h-screen flex-col antialiased`}>
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-navy-900"
        >
          Zum Inhalt springen
        </a>
        <Header />
        <main id="inhalt" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
