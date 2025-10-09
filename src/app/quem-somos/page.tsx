import TopBar from "@/components/TopBar";
import ContactBar from "@/components/ContactBar";
import MainNav from "@/components/MainNav";
import ProposalDrawer from "@/components/ProposalDrawer";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import AboutCompanySection from "@/components/AboutCompanySection";
import MissionVisionValues from "@/components/MissionVisionValues";
import ClientsStrip from "@/components/ClientsStrip";

export const metadata = {
  title: "Quem somos — ALVJAMBA",
  description: "História, missão e valores da ALVJAMBA Segurança Privada.",
};

export default function QuemSomosPage() {
  return (
    <>
      <TopBar />
      <ContactBar />
      <MainNav />

      <main>
        <PageHero
          title="Quem somos"
          subtitle="Confiança, disciplina e processos — a base da nossa proteção."
          image="/hero/about.png"
          objectPosition="center top" // mantém o topo visível
        />

       <AboutCompanySection videoId="SEU_VIDEO_ID" />

       <MissionVisionValues />

       <ClientsStrip />

      </main>

      <SiteFooter />
      <ProposalDrawer />
    </>
  );
}
