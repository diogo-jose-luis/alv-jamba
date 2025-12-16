// app/recrutamento/formacao/page.tsx
import TopBar from "@/components/TopBar";
import ContactBar from "@/components/ContactBar";
import MainNav from "@/components/MainNav";
import PageHero from "@/components/PageHero";
import SiteFooter from "@/components/SiteFooter";
import ProposalDrawer from "@/components/ProposalDrawer";
import TrainingOverview from "@/components/TrainingOverview";
import TrainingVideos from "@/components/TrainingVideos";

export const metadata = {
  title: "Formação — ALVJAMBA",
  description: "Centro de formação da ALVJAMBA: objetivos e cursos oferecidos.",
};

export default function FormacaoPage() {
  return (
    <>
      
      <ContactBar />
      <MainNav />

      <main>
        <PageHero
          title="Formação"
          subtitle="Investimos em pessoas — competência, disciplina e excelência operacional."
          image="/hero/formacao.jpg"
          objectPosition="center 20%"
        />

        <TrainingOverview />

        {/* ⬇️ Secção de vídeos */}
        <TrainingVideos
        // opcional: podes sobrescrever a lista default
        // items={[
        //   { title: "...", url: "/videos/1.mp4", poster: "/videos/posters/1.jpg", tag: "..." },
        //   { title: "...", url: "https://www.youtube.com/watch?v=XXXX", poster: "/videos/posters/2.jpg", tag: "..." },
        //   { title: "...", url: "/videos/3.mp4", poster: "/videos/posters/3.jpg", tag: "..." },
        // ]}
        />

        {/* <CoursesCatalogue /> */}
      </main>

      <SiteFooter />
      <ProposalDrawer />
    </>
  );
}
