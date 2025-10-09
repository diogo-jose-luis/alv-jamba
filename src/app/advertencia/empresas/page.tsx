// src/app/advertencia/empresas/page.tsx
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
  Building2,
  ShieldAlert,
  Lock,
  Camera,
  KeyRound,
  Truck,
  Users,
  FileCheck2,
  Server,
  WifiOff,
  CheckCircle2,
  BellRing,
  ClipboardList,
  ArrowRight,
} from "lucide-react";

/* ---- Card reutilizável ---- */
function TipCard({
  title,
  subtitle,
  icon,
  bullets,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  bullets: string[];
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative border border-black/10 bg-white overflow-hidden"
    >
      {/* filete dourado superior */}
      <div className="absolute inset-x-0 top-0 h-1 bg-brand-secondary" />

      <div className="p-6 md:p-7">
        <div className="flex items-center gap-3">
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
          {bullets.map((t, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 size={18} className="mt-0.5 text-brand-secondary" />
              <span className="text-black/80 leading-relaxed">{t}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* overlay hover sutil */}
      <div className="absolute inset-0 bg-brand-primary/4 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.article>
  );
}

export default function BusinessTipsPage() {
  return (
    <>
      <TopBar />
      <ContactBar />
      <MainNav />

      <main>
        <PageHero
          title="Dicas de Segurança para Empresas"
          subtitle="Proteja pessoas, ativos e operações — políticas, tecnologia e resposta integrada."
          image="/hero/slide6.png"
          objectPosition="center 35%"
          className="h-[40vh] md:h-[46vh]"
        />

        {/* Intro */}
        <section className="container-xl py-10 md:py-14">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-black/70 leading-relaxed">
              Boas práticas corporativas reduzem incidentes, mitigam perdas e
              aumentam a resiliência operacional. Abaixo reunimos diretrizes
              essenciais para empresas de diferentes portes e sectores.
            </p>
            <div className="mx-auto mt-5 h-1.5 w-24 bg-brand-secondary" />
          </div>
        </section>

        {/* vCards */}
        <section className="container-xl pb-14 md:pb-20">
          {/* AVISO DE FRAUDE CORPORATIVA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="mb-8 md:mb-10 border border-brand-primary/30 bg-brand-primary text-white"
          >
            <div className="px-5 py-4 md:px-6 md:py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-6 w-6 grid place-content-center bg-white/15">
                  {/* ícone de alerta */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="text-white"
                  >
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <div>
                  <div className="font-heading font-extrabold tracking-wide">
                    Atenção a fraudes corporativas recorrentes
                  </div>
                  <p className="text-white/90 mt-1">
                    Reforce validações em pedidos sensíveis e estandardize
                    aprovações. Incidentes comuns:
                  </p>
                </div>
              </div>

              {/* “pills” com os tipos mais comuns */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-sm bg-white/10">
                  BEC / CEO Fraud
                </span>
                <span className="px-3 py-1 text-sm bg-white/10">
                  Faturas adulteradas
                </span>
                <span className="px-3 py-1 text-sm bg-white/10">
                  Fornecedores falsos
                </span>
                <span className="px-3 py-1 text-sm bg-white/10">
                  Phishing & QRishing
                </span>
                <span className="px-3 py-1 text-sm bg-white/10">
                  Tailgating físico
                </span>
              </div>
            </div>

            {/* linha de ação */}
            <div className="px-5 pb-4 md:px-6 md:pb-5">
              <div className="text-sm text-white/90">
                Boas práticas: <strong>dupla confirmação fora do e-mail</strong>
                , <strong>regra dos 4 olhos</strong>, whitelists de IBAN e
                <strong> lista de fornecedores verificada</strong>. Precisa de
                um workshop rápido?{" "}
                <a
                  href="/contactos"
                  className="underline decoration-white/50 hover:decoration-white"
                >
                  Fale connosco
                </a>
                .
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            <TipCard
              title="Perímetro & Acessos"
              subtitle="Controlo físico"
              icon={<Building2 className="text-brand-secondary" size={22} />}
              bullets={[
                "Zonas bem demarcadas, iluminação, barreiras e rondas programadas.",
                "Portarias com identificação, credenciais e registos de entrada/saída.",
                "Visitantes sempre acompanhados; crachás temporários visíveis.",
                "Planos de lock/unlock por turnos com checklist de conferência.",
              ]}
            />

            <TipCard
              title="CCTV & Monitorização"
              subtitle="Cobertura e evidência"
              icon={<Camera className="text-brand-secondary" size={22} />}
              bullets={[
                "Câmaras estratégicas (acessos, docas, armazéns, áreas críticas).",
                "Gravação redundante, retenção por política e auditorias periódicas.",
                "Proteção física dos NVR/SVR; perfis de acesso por função.",
                "Sinalização de videovigilância para dissuasão e compliance.",
              ]}
            />

            <TipCard
              title="Chaves & Segredos"
              subtitle="Custódia e rastreio"
              icon={<KeyRound className="text-brand-secondary" size={22} />}
              bullets={[
                "Livro de registo com hora, responsável e finalidade; inventário mensal.",
                "Chaves-mestre num cofre selado; política de duplicação controlada.",
                "Acesso lógico a sistemas com MFA e rotação periódica de palavras-passe.",
                "Revogação imediata em desligamentos e trocas de função.",
              ]}
            />

            <TipCard
              title="Ciber & Dados"
              subtitle="Disponibilidade e confidencialidade"
              icon={<Server className="text-brand-secondary" size={22} />}
              bullets={[
                "Backups testados, segmentação de rede e princípio do menor privilégio.",
                "Antiphishing e conscientização contínua com simulações.",
                "Política de BYOD/MDM; encriptação em repouso e em trânsito.",
                "Planos de resposta a incidentes e contatos de escalonamento.",
              ]}
            />

            <TipCard
              title="Logística & Valores"
              subtitle="Rotas e custódia"
              icon={<Truck className="text-brand-secondary" size={22} />}
              bullets={[
                "Planeamento de rotas com janelas variáveis e avaliação de risco.",
                "Selo/ lacre e conferência cruzada; picking e expedição segregados.",
                "Escolta conforme criticidade; geofencing e telemetria.",
                "Procedimentos de incidentes em via (paragens seguras, contactos).",
              ]}
            />

            <TipCard
              title="Pessoas & Cultura"
              subtitle="Treino e compliance"
              icon={<Users className="text-brand-secondary" size={22} />}
              bullets={[
                "Background check proporcional à função e confidencialidade assinada.",
                "Formação inicial e reciclagens (QHSE, primeiros socorros, evacuação).",
                "Código de conduta, canal de denúncias e sanções claras.",
                "Simulados trimestrais com reporte e lições aprendidas.",
              ]}
            />
          </div>

          {/* Checklist rápido */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="border border-black/10 bg-white p-6">
              <div className="flex items-center gap-2 mb-2">
                <ClipboardList className="text-brand-primary" />
                <h4 className="font-heading text-brand-ink">
                  Políticas & Procedimentos
                </h4>
              </div>
              <p className="text-black/70">
                Documentos simples, versionados e comunicados; auditoria e
                melhoria contínua.
              </p>
            </div>

            <div className="border border-black/10 bg-white p-6">
              <div className="flex items-center gap-2 mb-2">
                <BellRing className="text-brand-primary" />
                <h4 className="font-heading text-brand-ink">
                  Resposta a Incidentes
                </h4>
              </div>
              <p className="text-black/70">
                Contatos de emergência, papéis definidos e exercícios de mesa
                regulares.
              </p>
            </div>

            <div className="border border-black/10 bg-white p-6">
              <div className="flex items-center gap-2 mb-2">
                <WifiOff className="text-brand-primary" />
                <h4 className="font-heading text-brand-ink">Continuidade</h4>
              </div>
              <p className="text-black/70">
                Planos de contingência (energia, comunicações, substituições e
                fallback).
              </p>
            </div>
          </motion.div>

          {/* CTA final */}
          <div className="text-center mt-12">
            <Link
              href="/contactos"
              className="inline-flex items-center gap-2 btn btn-primary"
            >
              Falar com um consultor <ArrowRight size={16} />
            </Link>
            <p className="mt-3 text-sm text-black/60">
              Precisa de auditoria, plano de segurança ou escolta? A nossa
              equipa ajuda a estruturar políticas, treinar pessoas e operar no
              terreno.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ProposalDrawer />
    </>
  );
}
