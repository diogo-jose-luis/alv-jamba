"use client";

import { CalendarClock } from "lucide-react";
import clsx from "clsx";
import React from "react";

type Item = {
  year: string;
  content: React.ReactNode;
};

const DATA: Item[] = [
  {
    year: "2012",
    content: (
      <>
        A ALVJAMBA expande para a <strong>Lunda Norte</strong>, assumindo a segurança dos
        projetos de construção das centralidades e a <strong>escolta de caravanas de
        camiões (dia e noite)</strong>. Mais de <strong>900 colaboradores</strong> envolvidos.
        <br />
        <span className="text-black/70">
          Luanda, Malange, Lunda-Sul (Saurimo) e Lunda Norte (Dundo)
        </span>
      </>
    ),
  },
  { year: "2013", content: <>Abertura do contrato com a <strong>NDAD</strong> (armazéns de distribuição alimentar) em <strong>Luanda, Lubango e Namibe</strong>.</> },
  { year: "2014", content: <>Abertura do contrato com a <strong>ODEBRECHT</strong> em <strong>Luanda, Sumbe e Benguela</strong>.</> },
  {
    year: "2015",
    content: (
      <>
        A <strong>ANGOALISSAR</strong> adjudica à ALVJAMBA o controlo de conferência e a
        proteção de ativos físicos nas províncias <strong>Huambo, Lubango e Namibe</strong>,
        com <strong>200 colaboradores</strong> envolvidos.
      </>
    ),
  },
  { year: "2016", content: <>A <strong>ENDE</strong> adjudica o contrato de proteção de ativos físicos e materiais em <strong>Lunda-Sul (Saurimo), Malange, Sumbe, Lubango e Cunene</strong>.</> },
  { year: "2017", content: <>Criação de equipas para gestão de <strong>segurança eletrónica</strong>.</> },
  { year: "2018", content: <>A <strong>PREZIOSO-ALTRAD</strong> adjudica contrato de proteção de ativos físicos e materiais.</> },
  { year: "2019", content: <>Criação de <strong>porteiros</strong> para proteção de condomínios e ativos fixos e materiais.</> },
  { year: "2020", content: <>Adjudicação do contrato da <strong>Fábrica DARLING VIDA CABELOS</strong>.</> },
  { year: "2021", content: <>Adjudicação do contrato da <strong>INTEROIL</strong> para proteção de ativos físicos e materiais.</> },
  { year: "2022", content: <>Abertura do contrato de prestação de serviços com o <strong>RESORT MUPAS</strong>.</> },
  {
    year: "2023",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Abertura do contrato de proteção dos ativos da <strong>GUIMANOS</strong>.</li>
        <li>Criação do Centro de Formação Profissional <strong>ALVACADEMIC</strong>.</li>
        <li>Criação da <strong>Divisão Marítima</strong> de intervenção e supervisão.</li>
        <li>Criação da <strong>Divisão para Portos e Aeroportos</strong>.</li>
      </ul>
    ),
  },
];

export default function HistoryTimeline() {
  return (
    <section className="relative py-14 md:py-20">
      {/* textura de fundo */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.035] bg-center bg-no-repeat bg-contain"
        style={{ backgroundImage: "url('/dotted-map.png')" }}
      />

      <div className="container-xl">
        {/* Cabeçalho */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand-ink">
            A Nossa História
          </h2>
          <p className="mt-3 text-black/70">
            Marcos que consolidaram a atuação da ALVJAMBA em todo o território.
          </p>
          <div className="mx-auto mt-4 h-1.5 w-24 bg-brand-secondary" />
        </div>

        {/* Linha do tempo (estática, sem animações) */}
        <ol className="relative border-l border-black/10 pl-6 md:pl-0 md:border-none">
          {/* eixo central (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-black/10" />

          {DATA.map((entry, i) => {
            const isLeft = i % 2 === 0;
            return (
              <li
                key={i}
                className={clsx(
                  "relative mb-10 md:mb-14",
                  "md:flex md:items-stretch md:gap-10"
                )}
              >
                {/* Coluna esquerda / direita (card alternado) */}
                <div
                  className={clsx(
                    "md:w-1/2",
                    isLeft ? "md:pr-10 md:order-1" : "md:pl-10 md:order-2"
                  )}
                >
                  <div className="group bg-white border border-black/10 p-5 md:p-6 shadow-sm transition hover:shadow-lg hover:-translate-y-0.5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-9 h-9 grid place-content-center border-2 border-brand-secondary">
                        <CalendarClock size={18} className="text-brand-secondary" />
                      </div>
                      <span className="font-heading text-xl font-extrabold text-brand-primary">
                        {entry.year}
                      </span>
                    </div>
                    <div className="[&_strong]:text-brand-ink/95 text-black/80 leading-relaxed">
                      {entry.content}
                    </div>
                  </div>
                </div>

                {/* Nó da linha (desktop) */}
                <div className="hidden md:flex items-center justify-center md:order-2">
                  <div className="relative -ml-0.5">
                    <span className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-white border border-black/15" />
                    <span className="relative z-10 block w-3.5 h-3.5 rounded-full bg-brand-secondary border border-white shadow" />
                  </div>
                </div>

                {/* Coluna oposta vazia para manter alternância */}
                <div
                  className={clsx(
                    "hidden md:block md:w-1/2",
                    isLeft ? "md:order-3" : "md:order-1"
                  )}
                />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
