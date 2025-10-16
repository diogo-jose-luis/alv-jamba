// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { dupletSans, dupletHeading } from "./fonts"; // ← localFont

export const metadata: Metadata = {
  title: "ALVJAMBA – Segurança Privada",
  description: "Proteção, Defesa e Controlo de Acesso",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={`${dupletSans.variable} ${dupletHeading.variable}`}>
      <body className="antialiased bg-brand-bg text-brand-ink">
        {children}
      </body>
    </html>
  );
}
