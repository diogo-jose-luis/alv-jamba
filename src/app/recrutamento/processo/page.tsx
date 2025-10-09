// app/recrutamento/processo/page.tsx
import TopBar from "@/components/TopBar";
import ContactBar from "@/components/ContactBar";
import MainNav from "@/components/MainNav";
import PageHero from "@/components/PageHero";
import SelectionProcess from "@/components/SelectionProcess";
import SiteFooter from "@/components/SiteFooter";
import ProposalDrawer from "@/components/ProposalDrawer";

export const metadata = {
  title: "Processo de Seleção — ALVJAMBA",
  description:
    "Conheça as etapas do processo de seleção da ALVJAMBA Segurança Privada: candidatura, entrevistas, avaliações e formação.",
};

export default function ProcessoPage() {
  return (
    <>
      <TopBar />
      <ContactBar />
      <MainNav />
      <main>
        <PageHero
          title="Processo de Seleção"
          subtitle="Rigor, transparência e foco no mérito."
          image="/hero/about.png"
           objectPosition="center 20%"
          className="h-[40vh] md:h-[46vh]"
        />
        <SelectionProcess />
      </main>
      <SiteFooter />
      <ProposalDrawer />
    </>
  );
}
