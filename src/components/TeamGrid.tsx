"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

type Member = {
  name: string;
  role: string;
  image: string;
  bio?: string;
  href?: string;
};

const TEAM: Member[] = [
  { name: "Stiviandra Ribeiro de Oliveira", role: "Sócia-Gerente", image: "/team/user2.jpeg", bio: "Direção estratégica e supervisão operacional.", href: "#" },
  { name: "António Vicente", role: "Diretor de Operações", image: "/team/user1.jpeg", bio: "Gestão de operações onshore e offshore.", href: "#" },
  { name: "Célia Mboa", role: "RH & Formação", image: "/team/user3.jpg", bio: "Programas de capacitação e compliance.", href: "#" },
  { name: "Paulo Neto", role: "Supervisor QRF", image: "/team/user4.jpg", bio: "Resposta rápida, protocolos e incidentes.", href: "#" },
  { name: "Helena Costa", role: "Coordenação SOC", image: "/team/user6.jpeg", bio: "Monitorização CCTV e controlo de rondas.", href: "#" },
  { name: "Mário Dinis", role: "Controlo de Acesso", image: "/team/user7.jpeg", bio: "Processos, credenciação e perímetros.", href: "#" },
  { name: "Rui Armando", role: "Segurança Patrimonial", image: "/team/user5.jpg", bio: "Planos preventivos e dissuasão.", href: "#" },
  { name: "Vera Lucas", role: "Comunicações & Logística", image: "/team/user9.jpg", bio: "Coordenação, rádio e escalas.", href: "#" },
];

function TeamCard({ m, i }: { m: Member; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
      className="group relative bg-white border border-black/10 overflow-hidden"
    >
      {/* Foto */}
      <div className="relative w-full aspect-[4/5]">
        <Image
          src={m.image}
          alt={m.name}
          fill
          className="object-cover transition-transform duration-[700ms] group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 280px, (min-width: 768px) 45vw, 100vw"
        />
        {/* Overlay no hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            {m.bio && <p className="text-sm text-white/95 leading-relaxed mb-3">{m.bio}</p>}
            {m.href && (
              <Link
                href={m.href}
                className="inline-flex items-center h-10 px-4 bg-brand-secondary text-black font-semibold hover:brightness-110"
              >
                Ver perfil
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Nome + cargo */}
      <div className="px-4 py-4">
        <h3 className="font-heading text-lg text-brand-ink font-extrabold leading-tight">{m.name}</h3>
        <div className="mt-1 text-sm text-black/70">{m.role}</div>
      </div>
    </motion.article>
  );
}

export default function TeamGrid() {
  return (
    <section className="py-12 md:py-16">
      <div className="container-xl">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand-ink">A Nossa Equipa</h2>
          <p className="mt-3 text-black/70">Pessoas, processos e disciplina — a base da nossa performance.</p>
          <div className="mx-auto mt-4 h-1.5 w-24 bg-brand-secondary" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {TEAM.map((m, i) => (
            <TeamCard key={`${m.name}-${i}`} m={m} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
