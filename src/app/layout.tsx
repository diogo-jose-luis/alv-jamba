import "./globals.css";
import type { Metadata } from "next";
import { Cinzel, Manrope } from "next/font/google";

const heading = Cinzel({ subsets: ["latin"], variable: "--font-heading" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "ALVJAMBA – Segurança Privada",
  description: "Proteção, Defesa e Controlo de Acesso",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className={`${heading.variable} ${sans.variable} antialiased bg-brand-bg text-brand-ink`}>
        {children}
      </body>
    </html>
  );
}
