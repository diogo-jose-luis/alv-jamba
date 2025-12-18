import TopBar from "@/components/TopBar";
import ContactBar from "@/components/ContactBar";
import MainNav from "@/components/MainNav";
import ProposalDrawer from "@/components/ProposalDrawer";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import AboutCompanySection from "@/components/AboutCompanySection";
import MissionVisionValues from "@/components/MissionVisionValues";
import PolicyPrinciples from "@/components/PolicyPrinciples";
import ClientsMarquee from "@/components/ClientsMarquee";

export const metadata = {
  title: "Quem somos — ALVJAMBA",
  description: "História, missão e valores da ALVJAMBA Segurança Privada.",
};

export default function QuemSomosPage() {
  return (
    <>
      
      <ContactBar />
      <MainNav />

      <main>
        <PageHero
          title="Quem somos"
          subtitle="Confiança, disciplina e processos — a base da nossa proteção."
          image="/hero/team.jpg"
          objectPosition="center top" // mantém o topo visível
        />

       <AboutCompanySection videoId="7O6MZep__2I" />

       <MissionVisionValues />

       <PolicyPrinciples />

       <ClientsMarquee />

      </main>

      <SiteFooter />
      <ProposalDrawer />
    </>
  );
}
