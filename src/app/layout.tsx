// src/app/layout.tsx
import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import Providers from "@/components/layout/Providers";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Mother's Hope", template: "%s | Mother's Hope" },
  description: "Un espacio de historia, galería, reflexiones y comunidad.",
  icons: {
    icon: "/esperanza.png",
    apple: "/esperanza.png",
  },
  openGraph: {
    title: "Mother's Hope",
    description: "Un espacio de historia, galería, reflexiones y comunidad.",
    type: "website",
    locale: "es_EC",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${dmSans.variable}`}
    >
      <body>
        <Providers>
          <div className="site-wrapper">
            <Header />
            <main className="site-main">{children}</main>
            <Footer />
            <ScrollToTop />
          </div>
        </Providers>
      </body>
    </html>
  );
}