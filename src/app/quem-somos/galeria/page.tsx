import TopBar from "@/components/TopBar";
import ContactBar from "@/components/ContactBar";
import MainNav from "@/components/MainNav";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import SiteFooter from "@/components/SiteFooter";
import ProposalDrawer from "@/components/ProposalDrawer";

export const metadata = {
  title: "Galeria — ALVJAMBA",
  description: "Registos visuais de operações e atividades da ALVJAMBA.",
};

export default function GaleriaPage() {
  return (
    <>
      
      <ContactBar />
      <MainNav />
      <main>
        <PageHero
          title="Galeria"
          subtitle="Operações, protocolos e momentos em campo."
          image="/team/operacoes (8).jpeg"
          objectPosition="center center"
        />
        <GalleryGrid />
      </main>
      <SiteFooter />
      <ProposalDrawer />
    </>
  );
}
