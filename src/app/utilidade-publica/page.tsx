// src/app/utilidade-publica/page.tsx
import TopBar from "@/components/TopBar";
import ContactBar from "@/components/ContactBar";
import MainNav from "@/components/MainNav";
import PageHero from "@/components/PageHero";
import SiteFooter from "@/components/SiteFooter";
import ProposalDrawer from "@/components/ProposalDrawer";
import PublicSafetyBand from "@/components/PublicSafetyBand";

export const metadata = {
  title: "Utilidade Pública — ALVJAMBA",
  description:
    "Informação pública sobre zonas mais vulneráveis e mais seguras, com incidências e pedidos de detalhe.",
};

export default function UtilidadePublicaPage() {
  return (
    <>
      <TopBar />
      <ContactBar />
      <MainNav />

      <main>
        <PageHero
          title="Utilidade Pública"
          subtitle="Visão geral de zonas com maior incidência de furtos/assaltos e áreas com menor risco reportado, para apoio à prevenção e planeamento."
          image="/hero/safe.png"
          objectPosition="center 35%"
        />

        <PublicSafetyBand />
      </main>

      <SiteFooter />
      <ProposalDrawer />
    </>
  );
}
