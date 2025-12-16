// src/app/legal-reportes/page.tsx
import TopBar from "@/components/TopBar";
import ContactBar from "@/components/ContactBar";
import MainNav from "@/components/MainNav";
import PageHero from "@/components/PageHero";
import SiteFooter from "@/components/SiteFooter";
import ProposalDrawer from "@/components/ProposalDrawer";
import LegalReportsBand from "@/components/LegalReportsBand";

export const metadata = {
  title: "Legal & Reportes — ALVJAMBA",
  description:
    "Documentos legais e reportes em PDF relacionados à atividade de segurança privada.",
};

export default function LegalReportesPage() {
  return (
    <>
      
      <ContactBar />
      <MainNav />
      <main>
        <PageHero
          title="Legal & Reportes"
          subtitle="Documentação em PDF para consulta e descarregamento. Regulamentos, decretos e reportes relevantes para o sector da segurança."
          image="/hero/reporte.png"
          objectPosition="center 35%"
        />

        <LegalReportsBand />
      </main>
      <SiteFooter />
      <ProposalDrawer />
    </>
  );
}
