// src/components/ServicesProcess.tsx
"use client";

import { motion } from "framer-motion";
import {
  FileCheck2, ClipboardCheck, Handshake, BadgeCheck, ShieldCheck, Workflow,
  Users, Truck, Building2, PackageCheck, Smile,
  type LucideIcon,        // 👈 importa o tipo
} from "lucide-react";

// 👇 agora cada ícone aceita className sem erro
type Step = { label: string; icon: LucideIcon };

const TOP_ROW: Step[] = [
  { label: "Requisito (cliente)", icon: Workflow },
  { label: "Proposta técnica", icon: ClipboardCheck },
  { label: "Proposta comercial", icon: FileCheck2 },
  { label: "Contratação", icon: Handshake },
  { label: "Controlo de qualidade", icon: ShieldCheck },
  { label: "Operações (Direção de produção)", icon: BadgeCheck },
];

const BOTTOM_ROW: Step[] = [
  { label: "Recursos Humanos & Formação", icon: Users },
  { label: "Procurement (logística)", icon: Truck },
  { label: "Infraestrutura", icon: Building2 },
  { label: "Entrega", icon: PackageCheck },
  { label: "Cliente satisfeito (final do processo)", icon: Smile },
];

export default function ServicesProcess() {
  return (
    <section className="relative bg-brand-primary">
      {/* leve textura/gradiente opcional para dar profundidade */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-brand-primary via-brand-primary to-brand-secondary/20 opacity-90" />

      <div className="container-xl py-14 md:py-20">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="text-center mb-10 md:mb-12 text-white"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold">
            Descrição dos Processos
          </h2>
          <p className="mt-3 text-white/85">
            Do requisito à operação — fluxo integrado para qualidade e previsibilidade.
          </p>
          <div className="mx-auto mt-4 h-1.5 w-24 bg-brand-secondary" />
        </motion.div>

        {/* trilho superior */}
        <Rail>
          {TOP_ROW.map((s, i) => (
            <ProcessNode key={i} index={i} total={TOP_ROW.length} label={s.label} Icon={s.icon} />
          ))}
        </Rail>

        {/* separador entre trilhos */}
        <div className="hidden md:block my-10">
          <div className="h-0 border-t-2 border-dashed border-white/25" />
        </div>

        {/* trilho inferior */}
        <Rail>
          {BOTTOM_ROW.map((s, i) => (
            <ProcessNode key={i} index={i} total={BOTTOM_ROW.length} label={s.label} Icon={s.icon} />
          ))}
        </Rail>
      </div>
    </section>
  );
}

/* ---------- Subcomponentes ---------- */

function Rail({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* linha pontilhada (desktop) */}
      <div className="hidden md:block absolute inset-x-0 top-1/2 -translate-y-1/2 h-0 border-t-2 border-dashed border-white/25" />
      <div className="grid grid-cols-1 md:grid-cols-6 gap-8">{children}</div>
    </div>
  );
}

function ProcessNode({
  label,
  Icon,
  index,
  total,
}: {
  label: string;
  Icon: LucideIcon;   // 👈 trocado para LucideIcon
  index: number;
  total: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.03 }}
      className="relative flex md:block items-center gap-4"
    >
      {/* círculo branco perfeitamente centrado */}
      <div
        className="
          shrink-0 md:mx-auto w-28 h-28 md:w-32 md:h-32 rounded-full bg-white
          ring-2 ring-brand-secondary shadow-lg
          flex flex-col items-center justify-center text-center px-3
          transition-transform duration-300 hover:scale-[1.03]
        "
      >
        <Icon size={22} className="text-brand-primary mb-2" />
        <div className="text-[11px] md:text-[12px] font-semibold leading-snug text-brand-ink">
          {label}
        </div>
      </div>

      {/* rótulo extra (mobile, para acessibilidade) */}
      <div className="md:hidden text-sm text-white/90 leading-relaxed">
        {label}
      </div>
    </motion.div>
  );
}
