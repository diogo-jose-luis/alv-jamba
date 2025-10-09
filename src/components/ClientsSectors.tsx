// src/components/ClientsSectors.tsx
"use client";

import { motion } from "framer-motion";
import {
  Building2, Home, Factory, Fuel, Ship, GraduationCap, Hospital, ShieldCheck
} from "lucide-react";

type Sector = { icon: React.ReactNode; title: string; desc: string };

const SECTORS: Sector[] = [
  { icon: <Building2 size={22} className="text-brand-secondary" />, title: "Condomínio", desc: "Controlo de acessos, portaria 24/7 e rondas internas." },
  { icon: <Home size={22} className="text-brand-secondary" />, title: "Residências", desc: "Planos residenciais com alarme, CCTV e vigilância." },
  { icon: <Factory size={22} className="text-brand-secondary" />, title: "Indústria", desc: "Proteção de ativos, perímetros e compliance QHSE." },
  { icon: <Fuel size={22} className="text-brand-secondary" />, title: "Apoio às Petrolíferas", desc: "On/Offshore, QRF e gestão de risco operativo." },
  { icon: <Ship size={22} className="text-brand-secondary" />, title: "Portos e Aeroportos", desc: "Zonas restritas, ISPS-like, triagem e escoltas." },
  { icon: <GraduationCap size={22} className="text-brand-secondary" />, title: "Educação", desc: "Ambientes escolares seguros e fluxos controlados." },
  { icon: <Hospital size={22} className="text-brand-secondary" />, title: "Saúde", desc: "Hospitais e clínicas com circuitos críticos protegidos." },
  { icon: <ShieldCheck size={22} className="text-brand-secondary" />, title: "Escolta e Valores", desc: "CIT, comboios e transporte com rastreabilidade." },
];

export default function ClientsSectors() {
  return (
    <section className="relative py-14 md:py-20 bg-white">
      {/* textura muito sutil para profundidade */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04] bg-center bg-no-repeat bg-contain"
        style={{ backgroundImage: "url('/dotted-map.png')" }}
      />

      <div className="container-xl">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand-ink">
            Principais Clientes
          </h2>
          <p className="mt-3 text-black/70">
            Os nossos clientes apresentam-se segregados em vários nichos do mercado.
          </p>
          <div className="mx-auto mt-4 h-1.5 w-24 bg-brand-secondary" />
        </motion.div>

        {/* grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {SECTORS.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: i * 0.03 }}
              className="group relative border border-black/10 bg-white overflow-hidden"
            >
              {/* filete topo dourado */}
              <div className="absolute inset-x-0 top-0 h-1 bg-brand-secondary" />

              <div className="p-6 md:p-7">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 grid place-content-center border-2 border-brand-secondary
                               transition-colors group-hover:bg-brand-secondary"
                  >
                    {s.icon}
                  </div>
                  <h3 className="font-heading text-xl text-brand-ink">{s.title}</h3>
                </div>

                <p className="mt-3 text-black/70 leading-relaxed">{s.desc}</p>
              </div>

              {/* overlay sutil ao hover */}
              <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
