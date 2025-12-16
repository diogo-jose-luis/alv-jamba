// src/app/contactos/page.tsx
import TopBar from "@/components/TopBar";
import ContactBar from "@/components/ContactBar";
import MainNav from "@/components/MainNav";
import PageHero from "@/components/PageHero";
import ContactMapBand from "@/components/ContactMapBand";
import SiteFooter from "@/components/SiteFooter";
import ProposalDrawer from "@/components/ProposalDrawer";
import ContactFormBand from "@/components/ContactFormBand";

export const metadata = {
  title: "Contactos — ALVJAMBA",
  description: "Localização, e-mail e telefone da ALVJAMBA.",
};

export default function ContactosPage() {
  return (
    <>
      
      <ContactBar />
      <MainNav />
      <main>
        <PageHero
          title="Contactos"
          subtitle="Trabalhamos 24/24H, garantindo o contacto a todo tempo
através de sistemas integrado de gestão de corrências, controlo
de acessos e rádio de comunicação."
          image="/hero/slide7.png"
          objectPosition="center 35%"
        />
        <ContactMapBand />
        <ContactFormBand />
        {/* se quiseres, podes adicionar o teu formulário abaixo */}
      </main>
      <SiteFooter />
      <ProposalDrawer />
    </>
  );
}
