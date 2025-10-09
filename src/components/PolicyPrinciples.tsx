// src/components/PolicyPrinciples.tsx
"use client";

import { motion } from "framer-motion";
import {
  Smile,
  ShieldAlert,
  GraduationCap,
  Cpu,
  Scale,
  MessageSquare,
  TrendingUp,
  HeartPulse,
} from "lucide-react";

type Principle = {
  icon: React.ReactNode;
  title: string;
  text: string;
};

const PRINCIPLES: Principle[] = [
  {
    icon: <Smile size={22} className="text-brand-secondary" />,
    title: "Satisfação do Cliente",
    text:
      "Nosso principal objetivo é a satisfação dos nossos clientes. Entendemos necessidades individuais e entregamos soluções de segurança personalizadas e eficientes.",
  },
  {
    icon: <ShieldAlert size={22} className="text-brand-secondary" />,
    title: "Redução de Riscos",
    text:
      "Identificamos, avaliamos e reduzimos proativamente riscos de roubos, danos a ativos e outras ameaças, com estratégias e medidas preventivas.",
  },
  {
    icon: <GraduationCap size={22} className="text-brand-secondary" />,
    title: "Profissionalismo & Treinamento",
    text:
      "Investimos em capacitação contínua para manter nossa equipa atualizada em práticas de segurança e comportamento ético.",
  },
  {
    icon: <Cpu size={22} className="text-brand-secondary" />,
    title: "Tecnologia & Inovação",
    text:
      "Aplicamos tecnologias e inovações de ponta para aprimorar serviços e aumentar a eficácia das operações.",
  },
  {
    icon: <Scale size={22} className="text-brand-secondary" />,
    title: "Conformidade Legal",
    text:
      "Cumprimos leis, normas e regulamentos do setor, assegurando conformidade legal e de segurança.",
  },
  {
    icon: <MessageSquare size={22} className="text-brand-secondary" />,
    title: "Comunicação Transparente",
    text:
      "Mantemos comunicação clara com clientes, colaboradores e partes interessadas para melhoria contínua.",
  },
  {
    icon: <TrendingUp size={22} className="text-brand-secondary" />,
    title: "Melhoria Contínua",
    text:
      "Avaliamos desempenho regularmente e otimizamos processos, serviços e sistemas de gestão da qualidade.",
  },
  {
    icon: <HeartPulse size={22} className="text-brand-secondary" />,
    title: "Integridade Física",
    text:
      "Garantimos a segurança e a integridade física de colaboradores e clientes em todas as situações.",
  },
];

export default function PolicyPrinciples() {
  return (
    <section className="bg-white">
      <div className="container-xl py-14 md:py-20">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand-ink">
            Nossa Política
          </h2>
          <p className="mt-3 text-black/70">
            A gestão da <strong>ALVJAMBA Security Solutions</strong> está empenhada na
            implementação efetiva desta política, comunicada e aplicada em todos os níveis.
          </p>
          <div className="mx-auto mt-5 h-1.5 w-24 bg-brand-secondary" />
        </motion.div>

        {/* Grid de princípios (cards claros) */}
        <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {PRINCIPLES.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: i * 0.03 }}
              className="group relative bg-white border border-black/10 p-6 md:p-7 shadow-sm
                         hover:shadow-md transition-shadow"
            >
              {/* filete superior dourado */}
              <div className="absolute inset-x-0 top-0 h-1 bg-brand-secondary" />

              <div className="flex items-start gap-3">
                <div
                  className="w-12 h-12 grid place-content-center border-2 border-brand-secondary
                             transition-colors group-hover:bg-brand-secondary"
                >
                  {p.icon}
                </div>
                <div>
                  <h3 className="font-heading text-xl md:text-2xl font-extrabold text-brand-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-black/80 leading-relaxed">{p.text}</p>
                </div>
              </div>

              {/* highlight sutil ao hover */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                   style={{ background: "linear-gradient(180deg, rgba(214,164,52,0.06), transparent 50%)" }} />
            </motion.article>
          ))}
        </div>

        {/* Nota de compromisso */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="mt-10 md:mt-12 text-center text-black/70"
        >
          A gestão assegura recursos, monitorização e revisão para o
          cumprimento e a evolução contínua desta política.
        </motion.div>
      </div>
    </section>
  );
}
