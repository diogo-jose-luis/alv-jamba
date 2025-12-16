// src/app/artigos/page.tsx
import TopBar from "@/components/TopBar";
import ContactBar from "@/components/ContactBar";
import MainNav from "@/components/MainNav";
import PageHero from "@/components/PageHero";
import SiteFooter from "@/components/SiteFooter";
import ProposalDrawer from "@/components/ProposalDrawer";

import NewsSection from "@/components/NewsSection"; // ajusta o path se necessário

export const metadata = {
  title: "Artigos — ALVJAMBA",
  description: "Artigos, atualizações e utilidade pública da ALVJAMBA.",
};

export default function ArtigosPage() {
  return (
    <>
      <TopBar />
      <ContactBar />
      <MainNav />

      <main>
        <PageHero
          title="Artigos"
          subtitle="Atualizações, operações e insights da ALVJAMBA — utilidade pública, boas práticas e resposta operacional."
          image="/hero/slide5.png"
          objectPosition="center 35%"
        />

        {/* Na página de artigos: sem header (porque já tens o banner acima) */}
        <NewsSection showHeader={false} />
        {/* Se no futuro quiseres mostrar mais: <NewsSection showHeader={false} itemsToShow={9} /> */}
      </main>

      <SiteFooter />
      <ProposalDrawer />
    </>
  );
}
