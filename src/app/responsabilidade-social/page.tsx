// src/app/responsabilidade-social/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import {
  GraduationCap,
  ShieldCheck,
  Leaf,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import TopBar from "@/components/TopBar";
import ContactBar from "@/components/ContactBar";
import MainNav from "@/components/MainNav";
import SiteFooter from "@/components/SiteFooter";
import ProposalDrawer from "@/components/ProposalDrawer";


export default function ResponsabilidadeSocialPage() {
  return (
    <>
      
      <ContactBar />
      <MainNav />
      <main>
        <PageHero
          title="Responsabilidade Social"
          subtitle="Crescemos com a nossa comunidade: educação, segurança e sustentabilidade."
          image="/hero/slide5.png"
          objectPosition="center 35%"
          className="h-[40vh] md:h-[46vh]"
        />
        


        {/* INTRO */}
        <section className="container-xl py-10 md:py-14">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-black/70 leading-relaxed">
              A ALVJAMBA assume o compromisso de devolver valor à sociedade.
              Atuamos em três frentes: capacitação educacional, sensibilização
              para a segurança cidadã e proteção ambiental.
            </p>
            <div className="mx-auto mt-5 h-1.5 w-24 bg-brand-secondary" />
          </div>
        </section>

        {/* INICIATIVAS */}
        <section className="container-xl pb-14 md:pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            <InitiativeCard
              icon={<GraduationCap className="text-brand-primary" size={22} />}
              title="Educação & Bolsas"
              image="/social/about.png"
              points={[
                "Workshops gratuitos trimestrais",
                "Bolsas para cursos técnicos",
                "Mentoria para jovens em risco",
              ]}
              href="/contactos"
            >
              Desenvolvemos programas de formação e apoio a estudantes com foco
              em competências práticas para o mercado de trabalho (IT,
              segurança, atendimento e logística).
            </InitiativeCard>

            <InitiativeCard
              icon={<ShieldCheck className="text-brand-primary" size={22} />}
              title="Comunidade & Segurança"
              image="/social/slide3.png"
              points={[
                "Palestras em escolas e igrejas",
                "Planos de evacuação simulados",
                "Campanhas anti-violência e fraude",
              ]}
              href="/contactos"
            >
              Realizamos ações de sensibilização sobre prevenção, primeiros
              socorros e cultura de paz, ajudando a reduzir riscos no dia a dia.
            </InitiativeCard>

            <InitiativeCard
              icon={<Leaf className="text-brand-primary" size={22} />}
              title="Sustentabilidade & Ambiente"
              image="/social/slide2.png"
              points={[
                "Rotas otimizadas para reduzir CO₂",
                "Reciclagem e gestão de resíduos",
                "Plantio anual de árvores",
              ]}
              href="/contactos"
            >
              Integramos práticas ecológicas na operação e apoiamos iniciativas
              locais de reflorestamento e reciclagem com voluntários da empresa.
            </InitiativeCard>
          </div>

          {/* CTA final */}
          <div className="text-center mt-10">
            <Link
              href="/contactos"
              className="inline-flex items-center gap-2 btn btn-primary"
            >
              Propor parceria <ArrowRight size={16} />
            </Link>
          </div>
        </section>

      </main>
      <SiteFooter />
      <ProposalDrawer />
    </>
  );
}


/* ---------- Card de iniciativa ---------- */
function InitiativeCard({
  icon,
  title,
  image,
  points,
  href,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  image: string;
  points: string[];
  href: string;
  children: React.ReactNode;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="group relative border border-black/10 bg-white overflow-hidden"
    >
      {/* filete top */}
      <div className="absolute inset-x-0 top-0 h-1 bg-brand-secondary" />

      {/* imagem de capa */}
      <div className="relative w-full h-40 md:h-44">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* conteúdo */}
      <div className="p-6 md:p-7 relative z-10">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 grid place-content-center border-2 border-brand-secondary
                       transition-colors group-hover:bg-brand-secondary"
          >
            {icon}
          </div>
          <h3 className="font-heading text-xl text-brand-ink">{title}</h3>
        </div>

        <p className="mt-3 text-black/70 leading-relaxed">{children}</p>

        <ul className="mt-4 space-y-2 text-sm text-black/75">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-2">
              <CheckCircle2 size={16} className="mt-0.5 text-brand-secondary" />
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5">
          <Link
            href={href}
            className="inline-flex items-center gap-2 h-10 px-4 border border-black/15 hover:bg-black/5"
          >
            Juntar-me / Apoiar <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* overlay hover */}
      <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.article>
  );
}
