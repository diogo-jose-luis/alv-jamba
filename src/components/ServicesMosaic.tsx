"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Service = {
  title: string;
  slug: string;
  image: string;
  excerpt: string;
};

const SERVICES: Service[] = [
  { title: "Segurança Física", slug: "seguranca-fisica", image: "/services/s1.png",
    excerpt: "Proteção presencial de pessoas e património com rondas, controlo de acesso e procedimentos claros." },
  { title: "Segurança Marítima / Offshore", slug: "seguranca-maritima-offshore", image: "/services/s2.png",
    excerpt: "Equipas treinadas para plataformas e operações costeiras, com protocolos de emergência e QHSE." },
  { title: "Segurança Onshore", slug: "seguranca-onshore", image: "/services/s3.png",
    excerpt: "Planos táticos para instalações industriais, minas e logística, integrando segurança eletrónica." },
  { title: "Segurança Eletrónica", slug: "seguranca-eletronica", image: "/services/s4.png",
    excerpt: "CCTV, alarmes, controlo de acesso e monitorização 24/7 via SOC para resposta célere." },
  { title: "Assistente de Porto e Aeroporto", slug: "assistente-porto-aeroporto", image: "/services/s5.png",
    excerpt: "Apoio VIP/Corporativo, coordenação de embarque/desembarque e escolta dentro do perímetro." },
  { title: "Escolta de Mercadorias e Valores", slug: "escolta-de-mercadorias-e-valores", image: "/services/s6.png",
    excerpt: "Planeamento de rotas, análise de risco e acompanhamento permanente por equipas dedicadas." },
  { title: "Vigilância Marítima", slug: "vigilancia-maritima", image: "/services/s7.png",
    excerpt: "Supervisão de cais, terminais e embarcações com integração de sensores e patrulhas." },
  { title: "QRF — Força de Reação Armada", slug: "qrf-forca-de-reacao", image: "/services/s8.png",
    excerpt: "Unidades de resposta rápida para incidentes críticos e reforço tático em campo." },
  { title: "CIT — Transporte de Valores", slug: "cit-transporte-de-valores", image: "/services/s9.png",
    excerpt: "Procedimentos seguros de recolha, transferência e entrega com rastreabilidade total." },
  { title: "Serviço de Escolta", slug: "servico-de-escolta", image: "/services/s10.png",
    excerpt: "Viaturas de apoio e agentes credenciados para comboios estratégicos e eventos." },
  { title: "Serviços de Motoristas", slug: "servicos-de-motoristas", image: "/services/s11.png",
    excerpt: "Condutores treinados em condução defensiva, rotas discretas e protocolo executivo." },
  { title: "Segurança Contra Incêndios", slug: "seguranca-contra-incendios", image: "/services/s12.png",
    excerpt: "Brigadas, planos de evacuação e inspeções para conformidade e prevenção ativa." },
  { title: "Recepcionistas", slug: "recepcionistas", image: "/services/s13.png",
    excerpt: "Primeira linha de atendimento com disciplina, triagem e controlo de acessos." },
];

export default function ServicesMosaic() {
  return (
    <section className="py-12 md:py-16">
      <div className="container-xl">
        {/* cabeçalho */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand-ink">
            O que fazemos
          </h2>
          <p className="mt-3 text-black/70">
            Soluções modulares que combinam presença física, tecnologia e resposta rápida.
          </p>
          <div className="mx-auto mt-4 h-1.5 w-24 bg-brand-secondary" />
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((s, idx) => (
            <motion.article
              key={s.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: idx * 0.04 }}
              className="group relative overflow-hidden border border-black/10 bg-white"
            >
              {/* imagem */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]"
                  sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 100vw"
                />

                {/* gradient base + filete */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-1 bg-brand-secondary" />

                {/* ★ legenda slide-up (fica DENTRO da imagem) */}
                <div
                  className="
                    absolute inset-x-0 bottom-0 z-[2]
                    translate-y-4 opacity-0
                    group-hover:translate-y-0 group-hover:opacity-100
                    transition-all duration-300
                    px-4 pb-4
                  "
                >
                  <div className="bg-black/55 text-white text-sm px-3 py-2">
                    Solução alinhada à sua operação. Combine com Segurança Electrónica e QRF.
                  </div>
                </div>

                {/* overlay primário no hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-brand-primary/30" />
              </div>

              {/* conteúdo */}
              <div className="p-5 relative">
                <h3 className="font-heading text-xl text-brand-ink">{s.title}</h3>
                <p className="mt-2 text-black/70 leading-relaxed">{s.excerpt}</p>

                <div className="mt-5">
                  <Link href="#" className="inline-flex items-center gap-2 btn btn-outline">
                    Saber mais <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
