import TopBar from "@/components/TopBar";
import ContactBar from "@/components/ContactBar";
import MainNav from "@/components/MainNav";
import PageHero from "@/components/PageHero";
import SiteFooter from "@/components/SiteFooter";
import ProposalDrawer from "@/components/ProposalDrawer";
import SpontaneousApplication from "@/components/SpontaneousApplication";

export const metadata = {
  title: "Candidatura Espontânea — ALVJAMBA",
  description: "Envie a sua candidatura espontânea para integrar a ALVJAMBA Segurança Privada.",
};

export default function CandidaturaPage() {
  return (
    <>
      <TopBar />
      <ContactBar />
      <MainNav />

      <main>
        <PageHero
          title="Candidatura Espontânea"
          subtitle="Profissionais com disciplina, integridade e foco no cliente."
          image="/hero/about.png"
          objectPosition="center top"
        />

        <SpontaneousApplication />
      </main>

      <SiteFooter />
      <ProposalDrawer />
    </>
  );
}
