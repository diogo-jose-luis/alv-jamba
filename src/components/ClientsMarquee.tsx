// src/components/ClientsMarquee.tsx
"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

type Logo = { src: string; alt: string; width?: number; height?: number };

// ✅ tipo auxiliar para CSS custom properties
type MarqueeVars = CSSProperties & {
  "--speed"?: string;
  "--dir"?: string;
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

// um “tile” de logo com estilo consistente
function LogoTile({ l }: { l: Logo }) {
  return (
    <div className="mx-6 flex items-center opacity-80 hover:opacity-100 transition-opacity">
      <div className="relative h-10 md:h-12 w-auto grayscale hover:grayscale-0 transition-[filter]">
        <Image
          src={l.src}
          alt={l.alt}
          width={220}
          height={80}
          className="h-full w-auto object-contain"
          sizes="(min-width: 1024px) 220px, 160px"
        />
      </div>
    </div>
  );
}

function Row({
  items,
  reverse = false,
  speed = 32,
}: {
  items: Logo[];
  reverse?: boolean;
  speed?: number;
}) {
  // ✅ sem any
  const vars: MarqueeVars = {
    "--speed": `${speed}s`,
    "--dir": reverse ? "-1" : "1",
  };
  return (
    <div className="marquee-row" style={vars}>
      <div className="marquee">
        {items.map((l, i) => (
          <LogoTile key={`a-${i}-${l.src}`} l={l} />
        ))}
      </div>
      <div className="marquee">
        {items.map((l, i) => (
          <LogoTile key={`b-${i}-${l.src}`} l={l} />
        ))}
      </div>
    </div>
  );
}

export default function ClientsMarquee() {
  return (
    <section className="relative py-10 md:py-14 bg-white">
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

      {/* wrapper pausa no hover */}
      <div className="group/rail select-none">
        <Row items={LOGOS} speed={36} />
        <Row items={LOGOS.slice().reverse()} reverse speed={40} />
      </div>

      {/* estilos da animação */}
      <style jsx global>{`
        .marquee-row {
          display: flex;
          overflow: hidden;
          position: relative;
          white-space: nowrap;
        }
        .marquee {
          display: inline-flex;
          align-items: center;
          will-change: transform;
          animation: marquee var(--speed, 30s) linear infinite;
          animation-direction: normal;
          transform: translateZ(0);
        }
        /* direção controlada por --dir (1 = esquerda, -1 = direita) */
        .marquee-row .marquee {
          animation-direction: normal;
        }
        .marquee-row[style*="--dir: -1"] .marquee {
          animation-direction: reverse;
        }
        /* pausa elegante no hover da section */
        .group\\/rail:hover .marquee {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
