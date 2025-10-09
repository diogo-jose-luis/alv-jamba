// src/components/SelectionProcess.tsx
"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import {
  UserPlus,
  FileCheck2,
  ShieldCheck,
  ClipboardCheck,
  GraduationCap,
  ContactRound,
  FileSignature,
  BadgeCheck,
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
    title: "Triagem & Verificação",
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
    title: "Formação & Certificação",
    desc: "Módulos de segurança, QHSE e compliance no nosso Centro.",
    icon: GraduationCap,
  },
  {
    title: "Admissão",
    desc: "Contrato, afetação ao posto e integração operacional.",
    icon: BadgeCheck,
  },
];

export default function SelectionProcess() {
  return (
    <section className="relative py-14 md:py-20">
      {/* leve textura ao fundo */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.05] bg-center bg-no-repeat bg-contain"
        style={{ backgroundImage: "url('/dotted-map.png')" }}
      />

      <div className="container-xl">
        {/* título */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand-ink">
            Processo de Seleção
          </h2>
          <p className="mt-3 text-black/70">
            Rigor, transparência e meritocracia — selecionamos profissionais com
            integridade, disciplina e foco no cliente.
          </p>
          <div className="mx-auto mt-4 h-1.5 w-24 bg-brand-secondary" />
        </motion.div>

        {/* timeline responsiva */}
        <div className="relative">
          {/* linha guia (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-black/10" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-10 md:gap-x-20">
            {STEPS.map((s, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="group relative bg-white border border-black/10 p-6 md:p-7"
              >
                {/* DOT + conector: alinha no centro entre as colunas */}
                <div
                  className={clsx(
                    "hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full",
                    "border-2 border-brand-secondary bg-white",
                    // par (coluna esquerda) -> encosta na direita; ímpar (coluna direita) -> encosta na esquerda
                    i % 2 === 0 ? "right-[-10px]" : "left-[-10px]"
                  )}
                />
                <div
                  className={clsx(
                    "hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] bg-brand-secondary/40",
                    "w-8", // comprimento do traço até a linha central
                    i % 2 === 0 ? "right-[-18px]" : "left-[-18px]"
                  )}
                />

                {/* cabeçalho do passo */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="w-12 h-12 grid place-content-center border-2 border-brand-secondary transition-colors group-hover:bg-brand-secondary">
                    <s.icon
                      size={22}
                      className="text-brand-secondary group-hover:text-black"
                    />
                  </div>
                  <div className="font-heading text-xl text-brand-ink">
                    {String(i + 1).padStart(2, "0")} — {s.title}
                  </div>
                </div>

                <p className="text-black/70 leading-relaxed">{s.desc}</p>

                {/* hover sutil */}
                <div className="absolute inset-0 bg-brand-primary/3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.article>
            ))}
          </div>
        </div>

        {/* requisitos & documentos */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6 }}
            className="border border-black/10 bg-white p-6 md:p-7"
          >
            <div className="flex items-center gap-3 mb-4">
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

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="border border-black/10 bg-white p-6 md:p-7"
          >
            <div className="flex items-center gap-3 mb-4">
              <FileSignature className="text-brand-primary" />
              <h3 className="font-heading text-xl text-brand-ink">
                Documentos Necessários
              </h3>
            </div>
            <ul className="space-y-2 text-black/75">
              <li>• Bilhete de Identidade e NIF;</li>
              <li>• CV atualizado e 1 foto tipo passe;</li>
              <li>• Atestado médico e certificado de residência;</li>
              <li>• Certidão/Registo Criminal atualizado;</li>
              <li>• Certificados de formações (se houver);</li>
              <li>• Carta de condução (para vagas que exijam).</li>
            </ul>
          </motion.div>
        </div>

        {/* chamada para ação */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
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
