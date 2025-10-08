"use client";

import Image from "next/image";
import { Headphones, Star, XCircle, ArrowRight } from "lucide-react";

type Card = {
  title: string;
  desc: string;
  image: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  href?: string;
};

const CARDS: Card[] = [
  {
    title: "Suporte 24/7",
    desc: "Atendimento contínuo e coordenação de operações, sem interrupções.",
    image: "/advantages/ops-1.png",
    icon: Headphones,
    href: "/o-que-fizemos#suporte",
  },
  {
    title: "Equipa Certificada",
    desc: "Profissionais treinados, protocolos claros e execução disciplinada.",
    image: "/advantages/ops-2.png",
    icon: Star,
    href: "/o-que-fizemos#equipa",
  },
  {
    title: "Resposta Imediata",
    desc: "QRF preparada para incidentes e gestão de crises com eficiência.",
    image: "/advantages/ops-3.png",
    icon: XCircle,
    href: "/o-que-fizemos#qrf",
  },
];

function AdvantageCard({ title, desc, image, icon: Icon, href = "#" }: Card) {
  return (
    <article className="group relative bg-white/0">
      {/* Imagem */}
      <div className="overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={800}
          height={520}
          className="w-full h-60 md:h-64 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          priority
        />
      </div>

      {/* Bloco de conteúdo */}
      <div className="relative bg-transparent pt-6 pl-20 pr-6 md:pl-24 md:pr-8 pb-8">
        {/* quadrado dourado com ícone (sobreposto ao lado esquerdo) */}
        <div
          className="absolute -left-0 top-0 translate-y-[-50%] w-16 h-16 flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, #d6a434 0%, #f0d07a 50%, #b68c2c 100%)",
          }}
        >
          <Icon size={24} className="text-black" />
        </div>

        <h3 className="font-heading text-white text-lg md:text-xl font-extrabold tracking-wide">
          {title.toUpperCase()}
        </h3>
        <p className="mt-3 text-white/85 max-w-[46ch]">{desc}</p>

        <a
          href={href}
          className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-secondary hover:text-white transition-colors"
        >
          READ MORE
          <ArrowRight size={16} />
        </a>
      </div>

      {/* borda superior discreta ao passar */}
      <div className="absolute inset-x-0 -bottom-[1px] h-[1px] bg-white/10" />
    </article>
  );
}

export default function AdvantagesSection() {
  return (
    <section className="relative py-16 md:py-24">
      {/* Fundo escuro com leve textura/overlay */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* 1) Cor base (fica por baixo) */}
        <div className="absolute inset-0 bg-brand-primary" />

        {/* 2) Imagem por cima da cor */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('/hero/slide2.png')" }}
        />

        {/* 3) Overlay com a cor primária (ajuste a opacidade) */}
        <div className="absolute inset-0 bg-[#520b29]/90" />
      </div>

      <div className="container-xl">
        {/* Título */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white">
            AS NOSSAS VANTAGENS
          </h2>
          <p className="mt-3 text-white/80">
            Compromisso com prontidão, qualidade operacional e apoio contínuo.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CARDS.map((c, i) => (
            <AdvantageCard key={i} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}
