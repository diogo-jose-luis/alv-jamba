import TopBar from "@/components/TopBar";
import ContactBar from "@/components/ContactBar";
import MainNav from "@/components/MainNav";
import PageHero from "@/components/PageHero";
import ServicesMosaic from "@/components/ServicesMosaic";
import SiteFooter from "@/components/SiteFooter";
import ProposalDrawer from "@/components/ProposalDrawer";

export const metadata = {
  title: "Serviços — ALVJAMBA",
  description:
    "Soluções de segurança física, eletrónica, escoltas, QRF e operações on/offshore da ALVJAMBA.",
};

export default function ServicosPage() {
  return (
    <>
      <TopBar />
      <ContactBar />
      <MainNav />

      <main>
        <PageHero
          title="Serviços"
          subtitle="Proteção integrada com pessoas, tecnologia e resposta rápida."
          image="/hero/slide3.png"   // pode reutilizar uma hero existente
          objectPosition="center 30%"
        />
        <ServicesMosaic />
      </main>

      <SiteFooter />
      <ProposalDrawer />
    </>
  );
}
