"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Hourglass, Lightbulb, Anchor, ArrowRight } from "lucide-react";

/* ------------ helpers ------------ */
function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.3, ...options }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [options]);
  return { ref, inView };
}

function Counter({
  to,
  start,
  duration = 1500,
  className = "",
}: {
  to: number;
  start: boolean;
  duration?: number;
  className?: string;
}) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 2))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, to, duration]);
  return <span className={className}>{val.toLocaleString()}</span>;
}

/* ------------ UI ------------ */
type Feature = {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  text: string;
};

const FEATURES: Feature[] = [
  {
    icon: Hourglass,
    title: "25 anos de experiência",
    text: "Processos maduros, disciplina operacional e melhoria contínua.",
  },
  {
    icon: Lightbulb,
    title: "Equipa motivada",
    text: "Pessoas treinadas, supervisionadas e alinhadas a KPIs claros.",
  },
  {
    icon: Anchor,
    title: "Técnicas e tecnologia atuais",
    text: "Integração de CCTV, controle de acesso e SOC para resposta veloz.",
  },
];

function FeatureRow({ icon: Icon, title, text }: Feature) {
  return (
    <div className="flex gap-5">
      <div
        className="w-[72px] h-[72px] flex items-center justify-center border-2 transition-colors
                   group/icon hover:bg-brand-primary"
        style={{ borderColor: "#d6a434" }}
      >
        <Icon
          size={28}
          className="text-brand-primary transition-colors group-hover/icon:text-white"
        />
      </div>
      <div>
        <h4 className="font-heading text-xl text-brand-ink">
          {title.toUpperCase()}
        </h4>
        <p className="mt-2 text-black/70 leading-relaxed max-w-[52ch]">
          {text}
        </p>
      </div>
    </div>
  );
}

export default function WhyChooseUsSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 });

  return (
    <section className="relative py-16 md:py-24">
      <div className="container-xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Coluna esquerda */}
        <div>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand-ink">
            POR QUE ESCOLHER A ALVJAMBA
          </h2>
          <p className="mt-3 text-black/70">
            Proteção confiável com processos, pessoas e tecnologia para
            operações onshore e offshore.
          </p>

          <div className="mt-10 space-y-10">
            {FEATURES.map((f, i) => (
              <FeatureRow key={i} {...f} />
            ))}
          </div>
        </div>

        {/* Coluna direita: imagem + painel de métricas */}
        <div ref={ref} className="relative">
          <Image
            src="/why/guard.png"
            alt="Guarda de segurança"
            width={1200}
            height={800}
            className="w-full h-[420px] md:h-[520px] object-cover"
            priority
          />

          {/* Painel 2x2 sobre a imagem */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="grid grid-cols-2 w-full max-w-[640px]">
              <div className="p-8 flex flex-col items-center justify-center bg-[#520b29]/45 text-white backdrop-blur-[2px]">
                <Counter to={3500} start={inView} className="font-heading text-4xl md:text-5xl font-extrabold" />
                <div className="mt-2 text-white/90">Total de Guardas</div>
              </div>
              <div className="p-8 flex flex-col items-center justify-center bg-brand-primary text-white">
                <Counter to={2340} start={inView} className="font-heading text-4xl md:text-5xl font-extrabold" />
                <div className="mt-2 text-white/90">Clientes Satisfeitos</div>
              </div>
              <div className="p-8 flex flex-col items-center justify-center bg-brand-primary text-white">
                <Counter to={38} start={inView} className="font-heading text-4xl md:text-5xl font-extrabold" />
                <div className="mt-2 text-white/90">Prémios</div>
              </div>
              <div className="p-8 flex flex-col items-center justify-center bg-[#520b29]/45 text-white backdrop-blur-[2px]">
                <Counter to={35} start={inView} className="font-heading text-4xl md:text-5xl font-extrabold" />
                <div className="mt-2 text-white/90">Sucursais</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA para Quem Somos */}
      <div className="container-xl mt-10 md:mt-12 text-center">
        <Link href="/quem-somos" className="inline-flex items-center gap-2 btn btn-primary">
          Conheça a nossa história <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
