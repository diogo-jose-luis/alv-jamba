"use client";

import { motion, type Variants } from "framer-motion";
import { Target, Eye, ShieldCheck, CheckCircle2 } from "lucide-react";

// Tipagem correta dos variants
const container: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.12,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function MissionVisionValues() {
  return (
    <section className="relative">
      {/* imagem de fundo + overlay primário */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('/about/mvv-bg.png')" }}
        />
        <div className="absolute inset-0 bg-brand-primary/90" />
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/40 via-transparent to-brand-secondary/20" />
      </div>

      <div className="container-xl py-14 md:py-20 text-white">
        {/* título da section */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold">
            Missão, Visão & Valores
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-24 bg-brand-secondary" />
        </motion.div>

        {/* cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {/* Missão */}
          <motion.article
            variants={item}
            className="group bg-white/5 border border-white/10 p-6 md:p-7 backdrop-blur-[1px]
                       transition-transform duration-300 hover:translate-y-[-4px] hover:bg-white/8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 grid place-content-center border-2 border-brand-secondary
                              transition-colors group-hover:bg-brand-secondary">
                <Target className="text-brand-secondary group-hover:text-black" size={22} />
              </div>
              <h3 className="font-heading text-xl md:text-2xl font-extrabold">Missão</h3>
            </div>
            <p className="text-white/90 leading-relaxed">
              Garantir a proteção e conservação de património, fornecendo serviços de
              intervenção rápida de alta qualidade que asseguram o sucesso dos nossos
              clientes com precisão.
            </p>
          </motion.article>

          {/* Visão */}
          <motion.article
            variants={item}
            className="group bg-white/5 border border-white/10 p-6 md:p-7 backdrop-blur-[1px]
                       transition-transform duration-300 hover:translate-y-[-4px] hover:bg-white/8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 grid place-content-center border-2 border-brand-secondary
                              transition-colors group-hover:bg-brand-secondary">
                <Eye className="text-brand-secondary group-hover:text-black" size={22} />
              </div>
              <h3 className="font-heading text-xl md:text-2xl font-extrabold">Visão</h3>
            </div>
            <p className="text-white/90 leading-relaxed">
              Ser a principal referência no setor de segurança, reconhecida pela nossa
              abordagem proativa e resultados consistentes em situações de Segurança
              de Ativos fixos, mercadorias e intervenção rápida.
            </p>
          </motion.article>

          {/* Valores */}
          <motion.article
            variants={item}
            className="group bg-white/5 border border-white/10 p-6 md:p-7 backdrop-blur-[1px]
                       transition-transform duration-300 hover:translate-y-[-4px] hover:bg-white/8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 grid place-content-center border-2 border-brand-secondary
                              transition-colors group-hover:bg-brand-secondary">
                <ShieldCheck className="text-brand-secondary group-hover:text-black" size={22} />
              </div>
              <h3 className="font-heading text-xl md:text-2xl font-extrabold">Valores</h3>
            </div>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 text-brand-secondary" />
                <div>
                  <span className="font-semibold">Integridade:</span>{" "}
                  <span className="text-white/90">
                    Compromisso com a ética, transparência e honestidade em todas as ações.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 text-brand-secondary" />
                <div>
                  <span className="font-semibold">Dedicação:</span>{" "}
                  <span className="text-white/90">
                    Foco na excelência e em exceder as expectativas dos clientes.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 text-brand-secondary" />
                <div>
                  <span className="font-semibold">Responsabilidade:</span>{" "}
                  <span className="text-white/90">
                    Assumir a responsabilidade pelas ações e resultados, garantindo a segurança dos clientes.
                  </span>
                </div>
              </li>
            </ul>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
