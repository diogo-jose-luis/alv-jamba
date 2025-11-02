// src/components/SelectionProcess.tsx
"use client";

import { motion } from "framer-motion";
import {
  UserPlus,
  FileCheck2,
  ClipboardCheck,
  GraduationCap,
  ContactRound,
  BadgeCheck,
  ShieldCheck,
  FileSignature,
  MailCheck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

type Step = {
  title: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const STEPS: Step[] = [
  {
    title: "Candidatura Online",
    desc: "Envie o formulário com dados pessoais e experiência relevante.",
    icon: UserPlus,
  },
  {
    title: "Triagem e Verificação",
    desc: "Análise curricular, referências e verificação documental.",
    icon: FileCheck2,
  },
  {
    title: "Entrevista",
    desc: "Avaliação comportamental e alinhamento com os valores ALVJAMBA.",
    icon: ContactRound,
  },
  {
    title: "Avaliações Técnicas",
    desc: "Testes práticos: postura, protocolos, comunicação e relatório.",
    icon: ClipboardCheck,
  },
  {
    title: "Formação e Certificação",
    desc: "Módulos de segurança, QHSE e compliance no nosso Centro.",
    icon: GraduationCap,
  },
  {
    title: "Admissão",
    desc: "Contrato, afetação ao posto e integração operacional.",
    icon: BadgeCheck,
  },
];

// ordem visual do mock: 1-2-3 à esquerda | 5-4-6 à direita
const LEFT_IDX = [0, 1, 2];
const RIGHT_IDX = [4, 3, 5];

function StepCard({
  step,
  index,
}: {
  step: Step;
  index: number; // 0..5 para desenhar "01".."06"
}) {
  const Icon = step.icon;
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45 }}
      className="relative pl-20"
    >
      {/* bloco do ícone à esquerda (vinho) */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-16 w-16 rounded-md grid place-items-center bg-brand-primary text-brand-secondary">
        <Icon size={24} />
      </div>

      {/* ribbon superior (número + título) */}
      <div className="inline-flex items-stretch h-8">
        <div className="px-3 grid place-items-center bg-brand-primary text-white text-sm font-bold rounded-l-md">
          {num}
        </div>
        <div className="px-3 grid place-items-center bg-gold-gradient text-brand-ink text-[13px] font-extrabold tracking-wide rounded-r-md uppercase">
          {step.title}
        </div>
      </div>

      {/* corpo branco com leve gradiente */}
      <div className="mt-2 rounded-md bg-white/90 border border-black/10 shadow-sm">
        <div className="px-4 py-4 text-black/80 text-sm leading-relaxed">
          {step.desc}
        </div>
      </div>
    </motion.article>
  );
}

export default function SelectionProcess() {
  return (
    <section className="relative py-14 md:py-20">
      <div className="container-xl">
        {/* título */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand-ink">
            Processo de Seleção
          </h2>
          <p className="mt-3 text-center text-black/70 max-w-3xl mx-auto">
            Rigor, transparência e meritocracia — selecionamos profissionais com
            integridade, disciplina e foco no cliente.
          </p>
          <div className="mx-auto mt-4 h-1.5 w-24 bg-brand-secondary" />
        </motion.div>

        {/* duas colunas com ordem do mock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {LEFT_IDX.map((i) => (
              <StepCard key={i} step={STEPS[i]} index={i} />
            ))}
          </div>
          <div className="space-y-6">
            {RIGHT_IDX.map((i) => (
              <StepCard key={i} step={STEPS[i]} index={i} />
            ))}
          </div>
        </div>

        {/* faixa cinza de fundo com os 2 blocos */}
        <div
          className="mt-12 md:mt-14 rounded-xl p-6 md:p-8"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.03) 50%, rgba(0,0,0,0.06) 100%)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Requisitos Gerais (cartão claro) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45 }}
              className="rounded-xl bg-white border border-black/10 p-6 md:p-7"
            >
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="text-brand-primary" />
                <h3 className="font-heading text-xl text-brand-ink">
                  Requisitos Gerais
                </h3>
              </div>
              <ul className="space-y-2 text-black/75">
                <li>• Idade mínima 21 anos e ensino médio completo;</li>
                <li>• Registo criminal sem antecedentes relevantes;</li>
                <li>• Boa apresentação, comunicação e postura profissional;</li>
                <li>• Disponibilidade para turnos/escala e mobilidade;</li>
                <li>• Condição física compatível com a função (exame médico);</li>
                <li>• Compromisso com integridade, sigilo e disciplina.</li>
              </ul>
            </motion.div>

            {/* Documentos Necessários (cartão vinho) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="rounded-xl p-6 md:p-7 text-white"
              style={{ backgroundColor: "#520b29" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <FileSignature className="text-brand-secondary" />
                <h3 className="font-heading text-xl">Documentos Necessários</h3>
              </div>
              <ul className="space-y-2 text-white/90">
                <li>• Bilhete de Identidade e NIF;</li>
                <li>• CV atualizado e 1 foto tipo passe;</li>
                <li>• Atestado médico e certificado de residência;</li>
                <li>• Certidão/Registo Criminal atualizado;</li>
                <li>• Certificados de formações (se houver);</li>
                <li>• Carta de condução (para vagas que exijam).</li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* chamada para ação */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45 }}
          className="mt-12 md:mt-14 flex flex-col items-center text-center"
        >
          <div className="font-heading text-2xl text-brand-ink">
            Pronto para fazer parte da ALVJAMBA?
          </div>
          <p className="mt-2 text-black/70">
            Envie a sua candidatura e dê o próximo passo na sua carreira.
          </p>
          <Link
            href="/recrutamento/candidatura"
            className="mt-5 inline-flex items-center gap-2 btn btn-primary"
          >
            Candidatar-me <ArrowRight size={16} />
          </Link>
          <div className="mt-3 text-sm text-black/60 flex items-center gap-2">
            <MailCheck size={16} /> Em caso de dúvidas, contacte{" "}
            <a className="underline hover:text-brand-primary" href="/contactos">
              a nossa equipa
            </a>
            .
          </div>
        </motion.div>
      </div>
    </section>
  );
}
