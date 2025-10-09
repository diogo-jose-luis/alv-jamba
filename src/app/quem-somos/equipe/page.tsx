import TopBar from "@/components/TopBar";
import ContactBar from "@/components/ContactBar";
import MainNav from "@/components/MainNav";
import PageHero from "@/components/PageHero";
import TeamGrid from "@/components/TeamGrid";
import SiteFooter from "@/components/SiteFooter";
import ProposalDrawer from "@/components/ProposalDrawer";

export const metadata = {
  title: "Equipe — ALVJAMBA",
  description: "Conheça a equipa da ALVJAMBA: liderança e operações.",
};

export default function EquipePage() {
  return (
    <>
      <TopBar />
      <ContactBar />
      <MainNav />
      <main>
        <PageHero
          title="A nossa equipa"
          subtitle="Profissionais certificados, processos sólidos e execução disciplinada."
          image="/hero/about.png"
          objectPosition="center top"
        />
        <TeamGrid />
      </main>
      <SiteFooter />
      <ProposalDrawer />
    </>
  );
}
