// app/recrutamento/formacao/page.tsx
import TopBar from "@/components/TopBar";
import ContactBar from "@/components/ContactBar";
import MainNav from "@/components/MainNav";
import PageHero from "@/components/PageHero";
import SiteFooter from "@/components/SiteFooter";
import ProposalDrawer from "@/components/ProposalDrawer";
import TrainingOverview from "@/components/TrainingOverview";
import CoursesCatalogue from "@/components/CoursesCatalogue";

export const metadata = {
  title: "Formação — ALVJAMBA",
  description: "Centro de formação da ALVJAMBA: objetivos e cursos oferecidos.",
};

export default function FormacaoPage() {
  return (
    <>
      <TopBar />
      <ContactBar />
      <MainNav />

      <main>
        <PageHero
          title="Formação"
          subtitle="Investimos em pessoas — competência, disciplina e excelência operacional."
          image="/hero/about.png"
          objectPosition="center 20%"
        />

        <TrainingOverview />
        <CoursesCatalogue />
      </main>

      <SiteFooter />
      <ProposalDrawer />
    </>
  );
}
