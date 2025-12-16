
import TopBar from "@/components/TopBar";
import ContactBar from "@/components/ContactBar";
import MainNav from "@/components/MainNav";
import HeroSlider from "@/components/HeroSlider";
import ProposalDrawer from "@/components/ProposalDrawer";
import InquirySection from "@/components/InquirySection";
import ServicesSplitSection from "@/components/ServicesSplitSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import CtaBand from "@/components/CtaBand";
import NewsSection from "@/components/NewsSection";
import SiteFooter from "@/components/SiteFooter";
import ClientsMarquee from "@/components/ClientsMarquee";

export default function Home() {
  return (
    <>
      
      <ContactBar />
      <MainNav />
      <main>
        <HeroSlider />
        <InquirySection />  {/* ← flutuando acima do slider */}
        <ServicesSplitSection />
        <AdvantagesSection  />
        <WhyChooseUsSection  />
        <CtaBand />
        <NewsSection  itemsToShow={3} showHeader />
        <ClientsMarquee />
        <SiteFooter />
      </main>
      <ProposalDrawer />
    </>
  );
}
