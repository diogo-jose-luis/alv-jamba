// src/components/TrainingOverview.tsx
"use client";

import { motion } from "framer-motion";
import { GraduationCap, Target, Users, ShieldCheck, RefreshCcw, HeartHandshake, Sparkles } from "lucide-react";

const POINTS = [
  "Proporcionar qualificações iniciais a jovens que ingressam no mercado de trabalho.",
  "Assegurar a formação contínua dos trabalhadores da empresa.",
  "Qualificação ou reconversão profissional de colaboradores em risco de desemprego.",
  "Integração sócio-profissional de grupos com maiores dificuldades de inserção.",
];

export default function TrainingOverview() {
  return (
    <section className="relative py-14 md:py-20">
      {/* textura suave */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.04] bg-center bg-no-repeat bg-contain"
        style={{ backgroundImage: "url('/dotted-map.png')" }}
      />

      <div className="container-xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* copy principal */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 grid place-content-center bg-brand-secondary">
              <GraduationCap size={22} className="text-black" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand-ink">
              Centro de Formação
            </h2>
          </div>

          <p className="mt-4 text-lg text-black/80 leading-relaxed">
            Formamos os nossos profissionais com o objetivo de dotá-los de competências
            para o exercício de uma ou várias atividades — acreditando que <strong>ainda vale a pena
            investir em capital humano</strong>.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {POINTS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="group flex items-start gap-3 p-4 border border-black/10 bg-white hover:-translate-y-1
                           transition-all duration-300 hover:shadow-sm"
              >
                <div className="mt-0.5 w-9 h-9 grid place-content-center border-2 border-brand-secondary
                                group-hover:bg-brand-secondary transition-colors">
                  <Sparkles size={18} className="text-brand-secondary group-hover:text-black" />
                </div>
                <p className="text-black/80">{p}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3 text-sm text-black/70">
            <Badge icon={<Target size={14} />}>Excelência</Badge>
            <Badge icon={<Users size={14} />}>Capacitação</Badge>
            <Badge icon={<ShieldCheck size={14} />}>Compliance</Badge>
            <Badge icon={<RefreshCcw size={14} />}>Reciclagens</Badge>
            <Badge icon={<HeartHandshake size={14} />}>Integração</Badge>
          </div>
        </motion.div>

        {/* bloco destacado à direita */}
        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }}
          className="relative border border-black/10 bg-white"
        >
          <div className="absolute inset-x-0 top-0 h-1.5 bg-brand-secondary" />
          <div className="p-6 md:p-8">
            <h3 className="font-heading text-xl md:text-2xl font-extrabold text-brand-ink">
              Porquê investir em formação?
            </h3>
            <p className="mt-3 text-black/80 leading-relaxed">
              Aumenta a eficiência, a segurança e a consistência dos protocolos em campo. A formação
              prepara equipas para <strong>responder com precisão</strong> e fortalecer a cultura de
              <strong> integridade, dedicação e responsabilidade</strong> da ALVJAMBA.
            </p>
            <a
              href="/contactos"
              className="mt-6 inline-flex items-center h-11 px-5 bg-brand-secondary text-black font-semibold hover:brightness-110"
            >
              Falar com o Centro de Formação
            </a>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

function Badge({ children, icon }: { children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 h-9 border border-black/10 bg-white hover:bg-black/5 transition">
      {icon} {children}
    </span>
  );
}
