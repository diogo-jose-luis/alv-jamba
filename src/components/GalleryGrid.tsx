"use client";

import Image from "next/image";
import { useState } from "react";
import { ZoomIn } from "lucide-react";
import { motion } from "framer-motion";

type Shot = {
  src: string;
  alt: string;
  date: string;      // ex: "12 Jul 2024"
  caption: string;   // descrição curta
};

const SHOTS: Shot[] = [
  { src: "/gallery/g1.jpg", alt: "Segurança executiva no aeródromo", date: "12 Jul 2024", caption: "Proteção executiva e escolta em pista." },
  { src: "/gallery/g2.jpg", alt: "Guarda em perímetro", date: "18 Jul 2024", caption: "Controlo de acesso e perímetro." },
  { src: "/gallery/g3.jpg", alt: "Escolta motorizada", date: "22 Jul 2024", caption: "Convoi e escolta de viaturas." },
  { src: "/gallery/g4.jpg", alt: "Supervisor em ronda", date: "02 Ago 2024", caption: "Ronda e comunicação operacional." },
  { src: "/gallery/g5.jpg", alt: "Back-office de operações", date: "11 Ago 2024", caption: "SOC, CCTV e despacho." },
  { src: "/gallery/g6.jpg", alt: "Operador de vigilância", date: "19 Ago 2024", caption: "Observação e protocolo QRF." },
  { src: "/gallery/g7.jpg", alt: "Triagem e controlo", date: "25 Ago 2024", caption: "Fluxo de pessoas e triagem." },
  { src: "/gallery/g8.jpg", alt: "Comunicação em missão", date: "03 Set 2024", caption: "Logística e coordenação em campo." },
];

export default function GalleryGrid() {
  const [open, setOpen] = useState<Shot | null>(null);

  return (
    <section className="py-12 md:py-16">
      <div className="container-xl">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand-ink">
            Galeria de Operações
          </h2>
          <p className="mt-3 text-black/70">
            Registos visuais de ações, processos e disciplina em serviço.
          </p>
          <div className="mx-auto mt-4 h-1.5 w-24 bg-brand-secondary" />
        </div>

        {/* GRID 4 col / 2 linhas (8 itens de exemplo) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {SHOTS.map((s, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
              className="group relative bg-white border border-black/10 overflow-hidden"
            >
              {/* imagem */}
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  className="object-cover transition-transform duration-[700ms] group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 280px, (min-width: 768px) 45vw, 100vw"
                />
                {/* overlay ao hover */}
                <button
                  onClick={() => setOpen(s)}
                  className="absolute inset-0 flex flex-col items-center justify-center
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white"
                  aria-label={`Abrir ${s.alt}`}
                  title="Pré-visualizar"
                  type="button"
                >
                  <div className="absolute inset-0 bg-brand-primary/90" />
                  <div className="relative z-10 flex flex-col items-center gap-2 px-4">
                    <ZoomIn size={26} className="text-white" />
                    <div className="text-xs uppercase tracking-wider text-white/90">{s.date}</div>
                    <div className="text-center text-sm leading-relaxed max-w-[30ch]">
                      {s.caption}
                    </div>
                  </div>
                </button>
              </div>

              {/* legenda (opcional fora do hover) */}
              <figcaption className="px-3 py-3">
                <div className="text-sm font-semibold text-brand-ink">{s.alt}</div>
                <div className="text-xs text-black/60">{s.date}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      {/* LIGHTBOX simples */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-[90] bg-black/70"
            onClick={() => setOpen(null)}
          />
          <div className="fixed inset-0 z-[100] p-4 flex items-center justify-center">
            <div className="bg-white max-w-5xl w-full shadow-2xl">
              <div className="relative w-full aspect-[16/10] bg-black">
                <Image
                  src={open.src}
                  alt={open.alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex items-center justify-between px-4 py-3 border-t border-black/10">
                <div>
                  <div className="font-semibold text-brand-ink">{open.alt}</div>
                  <div className="text-xs text-black/60">
                    {open.date} • {open.caption}
                  </div>
                </div>
                <button
                  onClick={() => setOpen(null)}
                  className="h-10 px-4 border border-black/20 hover:bg-black/5 btn-primary"
                  type="button"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
