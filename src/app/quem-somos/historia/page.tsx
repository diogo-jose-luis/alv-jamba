import TopBar from "@/components/TopBar";
import ContactBar from "@/components/ContactBar";
import MainNav from "@/components/MainNav";
import PageHero from "@/components/PageHero";
import SiteFooter from "@/components/SiteFooter";
import ProposalDrawer from "@/components/ProposalDrawer";
import HistoryTimeline from "@/components/HistoryTimeline";

export const metadata = {
  title: "História — ALVJAMBA",
  description: "Linha do tempo de marcos e conquistas da ALVJAMBA.",
};

export default function HistoriaPage() {
  return (
    <>
      
      <ContactBar />
      <MainNav />

      <main>
        <PageHero
          title="História"
          subtitle="Expansão, disciplina e resultados — a nossa jornada até aqui."
          image="/hero/about.png"
          objectPosition="center top"
        />

        <HistoryTimeline />
      </main>

      <SiteFooter />
      <ProposalDrawer />
    </>
  );
}
