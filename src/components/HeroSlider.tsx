"use client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type Slide = { src: string; title: string; subtitle?: string };

const SLIDES: Slide[] = [
  {
    src: "/hero/slide1.png",
    title: "SER SEGURANÇA É UM PROCESSO",
    subtitle: "Proteção, Defesa & Controlo de Acesso",
  },
  {
    src: "/hero/slide2.png",
    title: "VIGILÂNCIA MARÍTIMA & OFFSHORE",
    subtitle: "Resposta rápida e experiente",
  },
  {
    src: "/hero/slide3.png",
    title: "ESCOLTA DE VALORES E CIT",
    subtitle: "Rigor, disciplina e confiança",
  },
];

export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5200, stopOnInteraction: false }),
  ]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <section className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {SLIDES.map((s, i) => (
            <div className="relative min-w-0 flex-[0_0_100%]" key={i}>
              <div className="relative h-[72vh] md:h-[78vh]">
                <Image
                  src={s.src}
                  alt="..."
                  fill
                  className="object-cover"
                  priority
                />

                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/30 via-transparent to-brand-secondary/20" />

                {/* conteúdo */}
                <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                  <motion.div
                    key={`slide-${selected}`} // reanima ao trocar de slide
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: { opacity: 0, y: 42 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 1.15, // ← mais lento
                          ease: [0.22, 1, 0.36, 1], // easeOutCubic
                          when: "beforeChildren",
                          staggerChildren: 0.12, // leve escalonamento dos filhos
                        },
                      },
                    }}
                    className="max-w-4xl"
                  >
                    <motion.p
                      variants={{
                        hidden: { opacity: 0, y: 24 },
                        show: { opacity: 1, y: 0, transition: { duration: 1 } },
                      }}
                      className="text-white/90 mb-4"
                    >
                      {s.subtitle}
                    </motion.p>

                    <motion.h1
                      variants={{
                        hidden: { opacity: 0, y: 28 },
                        show: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 1.1 },
                        },
                      }}
                      className="heading-black text-3xl md:text-5xl text-white leading-tight drop-shadow"
                    >
                      {s.title}
                    </motion.h1>

                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 24 },
                        show: { opacity: 1, y: 0, transition: { duration: 1 } },
                      }}
                      className="mt-8 flex items-center justify-center gap-4"
                    >
                      <a href="#orcamento" className="btn btn-primary">
                        Pedir Cotação
                      </a>
                      <a
                        href="/contactos"
                        className="btn btn-ghost border border-white/20"
                      >
                        Contactar
                      </a>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* setas retas */}
      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/85 hover:bg-white text-brand-ink"
        aria-label="Anterior"
      >
        ‹
      </button>
      <button
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/85 hover:bg-white text-brand-ink"
        aria-label="Seguinte"
      >
        ›
      </button>
    </section>
  );
}
