// src/components/CoursesCatalogue.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Shield, Layers, Medal, BadgeCheck, HandCoins, Handshake,
  UsersRound, Car, Briefcase, ClipboardList,
  type LucideIcon, // 👈 importa o tipo certo
} from "lucide-react";

// Tipagem dos ícones (aceita className, size, etc.)
type IconType = LucideIcon;

type Course = {
  title: string;
  desc: string;
  icon: IconType; // 👈 agora os lucide aceitam className
};

// ✅ RefreshIcon compatível com LucideIcon
function RefreshIcon({
  size,
  className,
  ...rest
}: React.ComponentProps<typeof Shield>) {
  return (
    <svg
      width={size ?? 22}
      height={size ?? 22}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      {...rest}
    >
      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
      <polyline points="21 3 21 9 15 9" />
    </svg>
  );
}

const COURSES: Course[] = [
  { title: "Curso Básico de Segurança", desc: "Fundamentos operacionais, postura, comunicação e normas.", icon: Shield },
  { title: "Curso Contínuo Avançado", desc: "Aperfeiçoamento prático com foco em cenários reais.", icon: Layers },
  { title: "Curso Avançado (Senior)", desc: "Liderança de equipa, planeamento e gestão de incidentes.", icon: Medal },
  { title: "Curso de Oficiais", desc: "Procedimentos, reporte, auditoria e comando de turno.", icon: BadgeCheck },
  { title: "Porteiro Hoteleiro", desc: "Excelência no atendimento, triagem e protocolo.", icon: Briefcase },
  { title: "Porteiro de Prédio Urbano", desc: "Controlo de acessos, rondas e registos diários.", icon: ClipboardList },
  { title: "Segurança Pessoal", desc: "Close protection, rotas, evasão e análise dinâmica de risco.", icon: UsersRound },
  { title: "Escolta e Transporte de Valores", desc: "Técnicas CIT, comboios e procedimentos de transferência.", icon: HandCoins },
  { title: "Formação de Motoristas", desc: "Protocolos corporativos, condução executiva e rotas.", icon: Handshake },
  { title: "Condução Defensiva", desc: "Prevenção, reação e segurança a bordo.", icon: Handshake },
  { title: "Reciclagens", desc: "Atualizações periódicas para manter a performance.", icon: RefreshIcon as IconType },
  { title: "Formação on Job", desc: "Capacitação diretamente no posto de trabalho.", icon: Car },
];

export default function CoursesCatalogue() {
  return (
    <section className="relative py-14 md:py-20">
      {/* Fundo: imagem (baixo) + overlay primário (cima) */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('/about/mvv-bg.png')" }}
        />
        {/* overlay mais presente; ajuste a opacidade conforme preferir */}
        <div className="absolute inset-0 bg-brand-primary/45" />
      </div>

      <div className="container-xl">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white">
            Cursos Disponíveis
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {COURSES.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.03 }}
              className="group relative border border-black/10 bg-white overflow-hidden"
            >
              {/* filete top */}
              <div className="absolute inset-x-0 top-0 h-1 bg-brand-secondary" />

              <div className="p-6 md:p-7 relative z-10">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 grid place-content-center border-2 border-brand-secondary
                               transition-colors group-hover:bg-brand-secondary"
                  >
                    <c.icon size={22} className="text-brand-secondary group-hover:text-black" />
                  </div>
                  <h3 className="font-heading text-xl text-brand-ink">{c.title}</h3>
                </div>

                <p className="mt-3 text-black/70 leading-relaxed">{c.desc}</p>

                <div className="mt-5">
                  <Link
                    href="/contactos"
                    className="inline-flex items-center h-10 px-4 border border-black/15 hover:bg-black/5"
                  >
                    Pedir programa
                  </Link>
                </div>
              </div>

              {/* overlay sutil no hover, sem interferir com o conteúdo */}
              <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/contactos" className="btn btn-primary">
            Falar com o Centro de Formação
          </Link>
        </div>
      </div>
    </section>
  );
}
