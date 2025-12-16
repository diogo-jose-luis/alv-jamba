import TopBar from "@/components/TopBar";
import ContactBar from "@/components/ContactBar";
import MainNav from "@/components/MainNav";
import PageHero from "@/components/PageHero";
import SiteFooter from "@/components/SiteFooter";

import CandidateWizardForm from "@/components/CandidateWizardForm";

export const metadata = {
  title: "Candidatura — ALVJAMBA",
  description: "Ficha de candidatura online (modelo oficial).",
};

export default function CandidaturaPage() {
  return (
    <>
      
      <ContactBar />
      <MainNav />

      <main>
        <PageHero
          title="Candidatura"
          subtitle="Formulário oficial — baseado na ficha usada em papel."
          image="/hero/about.png"
          objectPosition="center top"
        />

        <CandidateWizardForm />
      </main>

      <SiteFooter />
    </>
  );
}
