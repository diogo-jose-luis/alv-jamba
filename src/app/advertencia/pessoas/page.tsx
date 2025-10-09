// src/app/advertencia/pessoas/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import TopBar from "@/components/TopBar";
import ContactBar from "@/components/ContactBar";
import MainNav from "@/components/MainNav";
import SiteFooter from "@/components/SiteFooter";
import ProposalDrawer from "@/components/ProposalDrawer";
import {
  Home,
  Car,
  ShieldAlert,
  CheckCircle2,
  BellRing,
  Lock,
  Camera,
  MapPin,
  Smartphone,
  WifiOff,
  ArrowRight,
} from "lucide-react";

type Tip = { text: string };

function TipCard({
  title,
  subtitle,
  icon,
  tips,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  tips: Tip[];
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative border border-black/10 bg-white overflow-hidden"
    >
      {/* filete superior dourado */}
      <div className="absolute inset-x-0 top-0 h-1 bg-brand-secondary" />

      <div className="p-6 md:p-7">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-12 h-12 grid place-content-center border-2 border-brand-secondary
                       transition-colors group-hover:bg-brand-secondary"
          >
            {icon}
          </div>
          <div>
            <h3 className="font-heading text-xl text-brand-ink">{title}</h3>
            <p className="text-xs text-black/60">{subtitle}</p>
          </div>
        </div>

        <ul className="mt-4 space-y-3">
          {tips.map((t, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 size={18} className="mt-0.5 text-brand-secondary" />
              <span className="text-black/80 leading-relaxed">{t.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* overlay hover sutil */}
      <div className="absolute inset-0 bg-brand-primary/4 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.article>
  );
}

export default function TipsForPeoplePage() {
  return (
    <>
      <TopBar />
      <ContactBar />
      <MainNav />

      <main>
        <PageHero
          title="Dicas de Segurança para Particulares"
          subtitle="Medidas simples, impacto enorme: proteja-se em casa, na rua e online."
          image="/hero/slide6.png"
          objectPosition="center 35%"
          className="h-[40vh] md:h-[46vh]"
        />

        {/* Intro curta */}
        <section className="container-xl py-10 md:py-14">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-black/70 leading-relaxed">
              Reunimos recomendações práticas para aumentar a sua segurança e da
              sua família. Em caso de risco, priorize sempre o contacto imediato
              com as autoridades locais.
            </p>
            <div className="mx-auto mt-5 h-1.5 w-24 bg-brand-secondary" />
          </div>
        </section>

        {/* vCards de dicas */}
        <section className="container-xl pb-14 md:pb-20">
          {/* AVISO RÁPIDO – EMERGÊNCIAS */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="mb-8 md:mb-10 border border-brand-primary/30 bg-brand-primary text-white"
          >
            <div className="px-5 py-4 md:px-6 md:py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-6 w-6 grid place-content-center bg-white/15">
                  {/* ícone de alerta */}
                  <ShieldAlert size={16} className="text-white" />
                </div>
                <div>
                  <div className="font-heading font-extrabold tracking-wide">
                    EM EMERGÊNCIA, LIGUE 113 / POLÍCIA
                  </div>
                  <p className="text-white/90 text-sm">
                    Priorize sempre a sua segurança e contacte as autoridades
                    locais.
                  </p>
                </div>
              </div>

              {/* ações rápidas (opcional) */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs md:text-sm bg-white/10">
                  Partilhe localização
                </span>
                <span className="px-3 py-1 text-xs md:text-sm bg-white/10">
                  Mantenha-se visível
                </span>
                <span className="px-3 py-1 text-xs md:text-sm bg-white/10">
                  Evite confrontos
                </span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {/* 1) Em Casa */}
            <TipCard
              title="Em Casa"
              subtitle="Rotina, prevenção e dissuasão"
              icon={<Home className="text-brand-secondary" size={22} />}
              tips={[
                {
                  text: "Mantenha portas e janelas trancadas; use fechaduras reforçadas e olho mágico.",
                },
                {
                  text: "Instale iluminação com sensor de movimento em entradas e zonas escuras.",
                },
                {
                  text: "Evite divulgar ausências longas em redes sociais; peça a um vizinho para recolher correio.",
                },
                {
                  text: "Guarde objetos de valor fora de vista; use cofres fixos (ancorados).",
                },
                {
                  text: "Considere CCTV/alarme com alerta no telemóvel e cartazes de dissuasão visíveis.",
                },
              ]}
            />

            {/* 2) Em Deslocações */}
            <TipCard
              title="Em Deslocações"
              subtitle="Rua e viatura"
              icon={<Car className="text-brand-secondary" size={22} />}
              tips={[
                {
                  text: "Planeie rotas e evite trajetos isolados; informe alguém do seu destino.",
                },
                {
                  text: "Ao aproximar-se de casa, esteja atento; se suspeitar de seguimento, dirija-se a local seguro.",
                },
                {
                  text: "No carro, mantenha portas trancadas e vidros fechados em paragens.",
                },
                {
                  text: "Evite ostentação de joias/telemóveis em locais movimentados.",
                },
                {
                  text: "Estacione em áreas iluminadas e com vigilância sempre que possível.",
                },
              ]}
            />

            {/* 3) Fraudes & Online */}
            <TipCard
              title="Fraudes & Online"
              subtitle="Ciber-higiene pessoal"
              icon={<ShieldAlert className="text-brand-secondary" size={22} />}
              tips={[
                {
                  text: "Desconfie de contactos inesperados a pedir códigos, dados bancários ou cliques urgentes.",
                },
                {
                  text: "Ative 2FA nas contas importantes e utilize palavras-passe fortes e únicas.",
                },
                {
                  text: "No Wi-Fi público, evite transações sensíveis; prefira dados móveis ou VPN.",
                },
                {
                  text: "Atualize apps/sistema e instale apenas de fontes oficiais.",
                },
                {
                  text: "Em entregas em casa, valide identidade antes de abrir; use intercomunicador/câmara.",
                },
              ]}
            />
          </div>

          {/* Bloco rápido de “Checklist” */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="border border-black/10 bg-white p-6">
              <div className="flex items-center gap-2 mb-2">
                <BellRing className="text-brand-primary" />
                <h4 className="font-heading text-brand-ink">
                  Alarmes & Iluminação
                </h4>
              </div>
              <p className="text-black/70">
                Sensores de presença e alertas no telemóvel aumentam a dissuasão
                e a resposta.
              </p>
            </div>

            <div className="border border-black/10 bg-white p-6">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="text-brand-primary" />
                <h4 className="font-heading text-brand-ink">
                  Acessos controlados
                </h4>
              </div>
              <p className="text-black/70">
                Fechaduras reforçadas, rotinas de trancar e regras para
                visitantes.
              </p>
            </div>

            <div className="border border-black/10 bg-white p-6">
              <div className="flex items-center gap-2 mb-2">
                <Camera className="text-brand-primary" />
                <h4 className="font-heading text-brand-ink">CCTV doméstico</h4>
              </div>
              <p className="text-black/70">
                Câmaras posicionadas e visíveis, com gravação e acesso remoto.
              </p>
            </div>
          </motion.div>

          {/* CTA final */}
          <div className="text-center mt-12">
            <Link
              href="/contactos"
              className="inline-flex items-center gap-2 btn btn-primary"
            >
              Falar com um especialista <ArrowRight size={16} />
            </Link>
            <div className="mt-3 text-sm text-black/60 flex items-center justify-center gap-2">
              <MapPin size={16} /> Atendemos em todo o território nacional •{" "}
              <Smartphone size={16} /> Suporte e orientação em segurança pessoal
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ProposalDrawer />
    </>
  );
}
