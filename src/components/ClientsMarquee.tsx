// src/components/ClientsMarquee.tsx
"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

type Logo = { src: string; alt: string };
type MarqueeVars = CSSProperties & {
  "--speed"?: string; // ex.: "30s"
  "--gap"?: string;   // ex.: "40px"
};

const LOGOS: Logo[] = [
  { src: "/clients/cogimbo.jpg", alt: "COGIMBO Imobiliária" },
  { src: "/clients/darling.jpg", alt: "Darling" },
  { src: "/clients/embaixada.jpg", alt: "Embaixada da Rússia" },
  { src: "/clients/ende.jpg", alt: "ENDE" },
  { src: "/clients/escola_russa.jpg", alt: "Escola Russa" },
  { src: "/clients/generics.jpg", alt: "Generics" },
  { src: "/clients/interoil.jpg", alt: "InterOil Angola" },
  { src: "/clients/macsteel.jpg", alt: "MACSTEEL" },
  { src: "/clients/palmeiras.jpg", alt: "Palmeiras Suite Hotel" },
  { src: "/clients/prezioso.jpg", alt: "PREZIOSO ALTRAD" },
];

// Tile consistente com logos MAIORES
function LogoTile({ l }: { l: Logo }) {
  return (
    <div className="flex items-center">
      <div className="relative h-16 md:h-20 w-auto grayscale hover:grayscale-0 transition-[filter] opacity-85 hover:opacity-100">
        <Image
          src={l.src}
          alt={l.alt}
          width={340}
          height={140}
          className="h-full w-auto object-contain"
          sizes="(min-width: 1024px) 300px, 220px"
          priority={false}
        />
      </div>
    </div>
  );
}

export default function ClientsMarquee() {
  // Velocidade e gap facilmente ajustáveis
  const vars: MarqueeVars = {
    "--speed": "36s",
    "--gap": "44px",
  };

  // Duplicamos a lista na MESMA <ul> para loop perfeito
  const items = [...LOGOS, ...LOGOS];

  return (
    <section className="relative py-12 md:py-16 bg-white">
      {/* máscara sutil nas bordas para fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      />

      <div className="container-xl">
        <div className="text-center mb-6 md:mb-8">
          <div className="text-xs tracking-[0.2em] uppercase text-black/60">
            Alguns clientes
          </div>
          <h3 className="font-heading text-2xl md:text-3xl font-extrabold text-brand-ink">
            Confiança que atravessa setores
          </h3>
          <div className="mx-auto mt-4 h-1.5 w-24 bg-brand-secondary" />
        </div>
      </div>

      {/* SCROLLER */}
      <div className="scroller group/rail" style={vars}>
        <ul className="track">
          {items.map((l, i) => (
            <li key={`${l.src}-${i}`} className="tile">
              <LogoTile l={l} />
            </li>
          ))}
        </ul>
      </div>

      {/* estilos */}
      <style jsx global>{`
        .scroller {
          overflow: hidden;
          position: relative;
          user-select: none;
        }

        /* A faixa é do tamanho do conteúdo (max-content) e vem DUPLICADA na mesma <ul> */
        .track {
          display: flex;
          align-items: center;
          gap: var(--gap, 40px);
          width: max-content; /* evita quebra de linha */
          min-width: 100%;    /* garante preenchimento */
          animation: scroll var(--speed, 36s) linear infinite;
          will-change: transform;
        }

        .tile {
          list-style: none;
          flex: 0 0 auto; /* não encolher */
        }

        /* Pausa no hover */
        .group\\/rail:hover .track {
          animation-play-state: paused;
        }

        /* Loop perfeito: com a lista duplicada, -50% equivale a 1 vez o conteúdo */
        @keyframes scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Acessibilidade */
        @media (prefers-reduced-motion: reduce) {
          .track { animation: none !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
}
