"use client";

import { PenSquare } from "lucide-react";

export default function CtaBand() {
  return (
    <section className="relative">
      {/* BG: imagem + overlay na cor primária */}
      <div
        className="absolute inset-0 -z-10 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(82,11,41,0.70), rgba(82,11,41,0.70)), url('/hero/slide1.png')",
        }}
      />

      <div className="container-xl py-8 md:py-12">
        <div
          className="
            grid grid-cols-1 items-center gap-4
            md:grid-cols-[auto_1px_1fr_auto] md:gap-6 lg:gap-8
          "
        >
          {/* Caixa ícone dourada */}
          <div
            className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shrink-0"
            style={{
              background:
                "linear-gradient(135deg, #d6a434 0%, #f0d07a 50%, #b68c2c 100%)",
            }}
          >
            <PenSquare
              size={24}
              className="text-black md:w-[28px] md:h-[28px]"
              aria-hidden="true"
            />
          </div>

          {/* separador (horizontal no mobile, vertical no desktop) */}
          <span className="block h-px w-full bg-white/25 md:hidden" />
          <span className="hidden md:block w-px h-12 bg-white/25" />

          {/* Texto */}
          <div className="text-white">
            <h3 className="font-heading text-[1.125rem] md:text-xl lg:text-2xl font-extrabold leading-snug">
              OBTENHA UMA CONSULTA GRATUITA&nbsp;
              <a
                href="tel:+244999000000"
                className="underline decoration-transparent hover:decoration-current text-brand-secondary"
              >
                (+244) 999 000 000
              </a>
            </h3>
            <p className="mt-1 text-white/85 text-sm md:text-base">
              Soluções sob medida para proteger pessoas, património e operações.
            </p>
          </div>

          {/* Botão */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-proposal"))}
            className="
              h-11 md:h-12 px-5 md:px-8 font-semibold
              bg-brand-secondary text-black hover:brightness-110
              w-full md:w-auto justify-self-stretch md:justify-self-end
            "
            aria-label="Solicitar proposta"
          >
            SOLICITAR PROPOSTA
          </button>
        </div>
      </div>
    </section>
  );
}
