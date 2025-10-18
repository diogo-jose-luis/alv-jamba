// src/components/TrainingVideos.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, X } from "lucide-react";

type TrainingVideo = {
  title: string;   // usado só para acessibilidade
  url: string;     // MP4 direto ou YouTube/Vimeo
  poster?: string; // thumbnail opcional
};

const VIDEOS: TrainingVideo[] = [
  {
    title: "Formação de Condução Defensiva",
    url: "/videos/formacao1.mp4",
    poster: "/videos/posters/formacao1.jpg",
  },
  {
    title: "Segurança Pessoal — Estudo de Caso",
    url: "/videos/formacao2.mp4",
    poster: "/videos/posters/formacao2.jpg",
  },
  {
    title: "Procedimentos de Posto — Rotina e Reporte",
    url: "/videos/formacao3.mp4",
    poster: "/videos/posters/formacao3.jpg",
  },
];

export default function TrainingVideos({ items = VIDEOS }: { items?: TrainingVideo[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  // fechar com ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenIdx(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="relative py-16 md:py-24">
      <div className="container-xl">
        {/* Cabeçalho simples, sem fundo/overlay */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand-ink">
            Formação em Vídeo
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-black/70">
            Seleção de conteúdos que evidenciam prática, disciplina e foco operacional.
          </p>
        </div>

        {/* Grade dos vídeos — só poster + play */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((v, i) => (
            <motion.article
              key={v.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group relative overflow-hidden border border-black/10 bg-white"
            >
              {/* filete superior discreto na cor secundária */}
              <div className="absolute inset-x-0 top-0 h-1 bg-brand-secondary" />

              <button
                onClick={() => setOpenIdx(i)}
                className="w-full text-left"
                aria-label={`Reproduzir: ${v.title}`}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    style={{
                      backgroundImage: `url('${v.poster ?? "/videos/posters/fallback.jpg"}')`,
                    }}
                  />
                  {/* vinheta sutil para legibilidade do botão */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/15 to-transparent" />
                  <div className="absolute inset-0 grid place-content-center">
                    <PlayCircle
                      size={64}
                      className="text-white drop-shadow-md transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              </button>

              {/* overlay sutil no hover para dar “respiro” sem poluir */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-brand-primary/5" />
            </motion.article>
          ))}
        </div>

     
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {openIdx !== null && (
          <Lightbox onClose={() => setOpenIdx(null)}>
            <VideoPlayer item={items[openIdx]} />
          </Lightbox>
        )}
      </AnimatePresence>
    </section>
  );
}

function Lightbox({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const onBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[60] grid place-items-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        ref={backdropRef}
        onClick={onBackdropClick}
        className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
      />
      <motion.div
        className="relative w-full max-w-5xl"
        initial={{ y: 20, scale: 0.98, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 20, scale: 0.98, opacity: 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 18 }}
      >
        <button
          aria-label="Fechar"
          onClick={onClose}
          className="absolute -top-10 right-0 inline-flex items-center gap-2 px-3 h-9 bg-white text-black border border-black/10"
        >
          <X size={18} /> Fechar
        </button>
        <div className="relative aspect-[16/9] bg-black">{children}</div>
      </motion.div>
    </motion.div>
  );
}

function VideoPlayer({ item }: { item: TrainingVideo }) {
  const isYouTube = /youtube\.com|youtu\.be/.test(item.url);
  const isVimeo = /vimeo\.com/.test(item.url);

  if (isYouTube) {
    const src = toYouTubeEmbed(item.url);
    return (
      <iframe
        src={src}
        className="absolute inset-0 w-full h-full"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  }
  if (isVimeo) {
    const src = toVimeoEmbed(item.url);
    return (
      <iframe
        src={src}
        className="absolute inset-0 w-full h-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    );
  }
  return (
    <video
      className="absolute inset-0 w-full h-full"
      src={item.url}
      poster={item.poster}
      controls
      preload="metadata"
    />
  );
}

function toYouTubeEmbed(url: string) {
  const idMatch =
    url.match(/[?&]v=([^&]+)/)?.[1] ||
    url.match(/youtu\.be\/([^?]+)/)?.[1] ||
    "";
  const params = new URLSearchParams({ rel: "0", modestbranding: "1" });
  return `https://www.youtube.com/embed/${idMatch}?${params.toString()}`;
}

function toVimeoEmbed(url: string) {
  const idMatch = url.match(/vimeo\.com\/(\d+)/)?.[1] || "";
  return `https://player.vimeo.com/video/${idMatch}?byline=0&title=0&portrait=0`;
}
