"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutCompanySection({
  videoId = "7O6MZep__2I",
}: { videoId?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section className="relative py-14 md:py-20">
      {/* textura sutil opcional */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04] bg-center bg-no-repeat bg-contain"
        style={{ backgroundImage: "url('/dotted-map.png')" }}
      />

      <div className="container-xl grid grid-cols-1 lg:grid-cols-[1.1fr_0px_1fr] gap-10 lg:gap-12 items-start">
        {/* COLUNA ESQUERDA — TEXTO */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-7"
        >
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand-ink">
              ALVJAMBA — <span className="text-brand-primary">Comércio Geral, Lda.</span>
            </h2>
            <div className="mt-3 h-1.5 w-24 bg-brand-secondary" />
          </div>

          <div className="prose max-w-none prose-p:leading-relaxed prose-p:text-black/80">
            <p className="text-lg text-black/80">
              A <strong>ALVJAMBA - COMÉRCIO GERAL LIMITADA</strong> é uma empresa de direito
              Angolano, vocacionada a prestar <strong>serviços de Segurança Privada</strong>.
              Fundada aos <strong>14 de Dezembro de 2011</strong> pela sócia-gerente
              <strong> Stiviandra Ribeiro de Oliveira</strong>.
            </p>
            <p>
              Sede social em <strong>Luanda</strong>, Distrito Urbano da Maianga, bairro do
              Prenda, <strong>rua Comandante Argueles Nº 158</strong>.
            </p>
            <p>
              Matrícula na conservatória do registo comercial de Luanda sob o número
              <strong> 1998.155</strong>, NIF <strong>5403089950</strong>.
            </p>
          </div>

          {/* CALL-OUT: ALVJAMBA SECURITY SOLUTIONS */}
          <div className="border-l-4 border-brand-primary bg-black/[0.03] p-4 md:p-5">
            <h3 className="font-heading text-lg md:text-xl font-extrabold text-brand-ink">
              ALVJAMBA SECURITY SOLUTIONS.
            </h3>
            <p className="mt-2 text-black/75 leading-relaxed">
              Estamos comprometidos em ser seu parceiro confiável e eficiente, oferecendo uma
              proteção imbatível com base em nossos valores essenciais: integridade, dedicação e
              responsabilidade. Sua segurança é a nossa prioridade máxima, e buscamos
              constantemente superar suas expectativas.
            </p>
          </div>
        </motion.div>

        {/* DIVISOR VERTICAL (desktop) */}
        <div className="hidden lg:block h-full w-px bg-black/10 mx-auto" />

        {/* COLUNA DIREITA — VÍDEO + MAPA (MAPA ABAIXO DO VÍDEO) */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          {/* Poster do vídeo */}
          <div className="relative w-full aspect-video bg-black/5 overflow-hidden group ring-1 ring-black/10">
            <Image
              src="/about/about.png"
              alt="Apresentação ALVJAMBA"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/25 via-transparent to-brand-secondary/20" />
            <div className="absolute left-0 top-0 px-4 py-2 bg-white/90 text-brand-ink text-sm font-semibold tracking-wide">
              VÍDEO INSTITUCIONAL
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="absolute inset-0 m-auto h-14 px-6 inline-flex items-center justify-center gap-2
                         bg-brand-secondary text-black font-semibold tracking-wide overflow-hidden"
              aria-label="Reproduzir vídeo institucional"
              title="Reproduzir vídeo"
            >
              <Play size={20} />
              PLAY
              <span className="pointer-events-none absolute inset-y-0 -left-1 w-8 translate-x-[-120%]
                                bg-white/40 skew-x-[-18deg]
                                group-hover:animate-[shine_1.1s_ease-out_forwards]" />
            </button>
          </div>
          <p className="text-sm text-black/60">
            Conheça a nossa equipa, processos e operações no terreno.
          </p>

          {/* CARD DO MAPA — agora abaixo do vídeo */}
          <div className="relative border border-black/10 bg-white shadow-sm">
            <div className="absolute inset-x-0 top-0 h-1 bg-brand-secondary" />
            <div className="px-4 pt-5 pb-4">
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="font-heading text-base font-extrabold text-brand-ink">
                  Cobertura Nacional
                </h3>
                <span className="text-xs text-black/50">Postos & Operações</span>
              </div>
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src="/about/mapa.png"
                  alt="Mapa de Angola com presença ALVJAMBA"
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 520px, 100vw"
                  priority
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* MODAL DO VÍDEO */}
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-black/60"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-full max-w-4xl bg-black">
              <div className="relative w-full aspect-video">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                  title="Vídeo institucional ALVJAMBA"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setOpen(false)}
                  className="h-11 px-5 bg-white text-black hover:bg-black hover:text-white border border-white"
                >
                  Fechar
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </section>
  );
}
