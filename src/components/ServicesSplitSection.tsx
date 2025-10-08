"use client";

import Image from "next/image";
import {
  Shield,
  Eye,
  Lock,
  AlertTriangle,
  BadgeCheck,
  Radio,
  Camera,
  KeyRound,
  UserCheck,
  ShieldPlus,
  ArrowRight,
  type LucideIcon, // 👈 importe o tipo
} from "lucide-react";

type Item = {
  title: string;
  desc: string;
  icon: LucideIcon; // 👈 agora aceita className, size, strokeWidth, etc.
};


const LEFT: Item[] = [
  {
    title: "Consultoria de Segurança",
    desc: "Planeamento, auditoria e mitigação de risco.",
    icon: Shield,
  },
  {
    title: "Segurança Operacional",
    desc: "Equipa treinada e pronta a responder.",
    icon: BadgeCheck,
  },
  {
    title: "Comunicações & Suporte",
    desc: "Coordenação, rádio e controlo de rondas.",
    icon: Radio,
  },
  {
    title: "Vigilância Eletrónica",
    desc: "CCTV, alarmes e monitorização remota 24/7.",
    icon: Camera,
  },
  {
    title: "Proteção Executiva",
    desc: "Acompanhamento de executivos e delegações.",
    icon: UserCheck,
  },
];

const RIGHT: Item[] = [
  {
    title: "Vigilância & Monitorização",
    desc: "Cobertura contínua onshore e offshore.",
    icon: Eye,
  },
  {
    title: "Controlo de Acesso",
    desc: "Políticas, procedimentos e tecnologia.",
    icon: Lock,
  },
  {
    title: "QRF & Incidentes",
    desc: "Resposta rápida e gestão de crises.",
    icon: AlertTriangle,
  },
  {
    title: "Segurança Patrimonial",
    desc: "Rondas, barreiras e dissuasão ativa.",
    icon: ShieldPlus,
  },
  {
    title: "Gestão de Chaves",
    desc: "Registo, custódia e rastreabilidade.",
    icon: KeyRound,
  },
];

function Feature({
  title,
  desc,
  Icon,
}: {
  title: string;
  desc: string;
  Icon: LucideIcon; // 👈 idem aqui
}) {
  return (
    <div className="group flex items-start gap-4">
      <div
        className="w-[64px] h-[64px] flex items-center justify-center border-2
                   transition-colors duration-200 bg-white group-hover:bg-brand-primary"
        // mantém borda dourada
        style={{ borderColor: "#d6a434" }}
      >
        <Icon
          size={26}
          className="text-brand-primary transition-colors duration-200 group-hover:text-white"
        />
      </div>

      <div>
        <h4 className="font-heading text-lg text-brand-ink">{title}</h4>
        <p className="text-sm text-black/70 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function ServicesSplitSection() {
  return (
    <section className="relative py-16 md:py-24">
      {/* fundo com mapa pontilhado */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div
          className="w-full h-full bg-no-repeat bg-center"
          style={{ backgroundImage: "url('/dotted-map.png')" }}
        />
      </div>

      <div className="container-xl">
        {/* título */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand-ink">
            OS NOSSOS MELHORES SERVIÇOS
          </h2>
          <p className="mt-3 text-black/70">
            Soluções de proteção completas para pessoas, património e operações.
          </p>
          <div className="mx-auto mt-4 h-1.5 w-24 bg-brand-secondary" />
        </div>

        {/* layout 3 colunas com imagem ao centro */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* coluna esquerda */}
          <div className="space-y-10 order-2 lg:order-1">
            {LEFT.map((it, i) => (
              <Feature key={i} title={it.title} desc={it.desc} Icon={it.icon} />
            ))}
          </div>

          {/* imagem central */}
          <div className="order-1 lg:order-2 flex items-center justify-center">
            <div className="relative w-[260px] md:w-[300px] lg:w-[340px] xl:w-[380px]">
              <Image
                src="/police-man.png"
                alt="ALVJAMBA Security"
                width={344}
                height={578}
                priority
                className="w-full h-auto select-none pointer-events-none"
              />
            </div>
          </div>

          {/* coluna direita */}
          <div className="space-y-10 order-3">
            {RIGHT.map((it, i) => (
              <Feature key={i} title={it.title} desc={it.desc} Icon={it.icon} />
            ))}
          </div>
        </div>

        {/* link para página de serviços */}
        <div className="text-center mt-12">
          <a
            href="/o-que-fizemos"
            className="inline-flex items-center gap-2 font-semibold
                       text-brand-primary hover:text-brand-ink"
          >
            Ver todos os serviços
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
