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

      <div className="container-xl py-10 md:py-12">
        <div className="grid grid-cols-[auto_1px_1fr_auto] items-center gap-6 md:gap-8">
          {/* Caixa ícone dourada */}
          <div
            className="w-16 h-16 flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, #d6a434 0%, #f0d07a 50%, #b68c2c 100%)",
            }}
          >
            <PenSquare size={28} className="text-black" />
          </div>

          {/* separador vertical */}
          <span className="hidden md:block w-px h-12 bg-white/25" />

          {/* Texto */}
          <div className="text-white">
            <h3 className="font-heading text-xl md:text-2xl font-extrabold">
              OBTENHA UMA CONSULTA GRATUITA &nbsp;
              <span className="text-brand-secondary">(+244) 999 000 000</span>
            </h3>
            <p className="mt-1 text-white/85">
              Soluções sob medida para proteger pessoas, património e operações.
            </p>
          </div>

          {/* Botão */}
          <button
            onClick={() =>
              window.dispatchEvent(new CustomEvent("open-proposal"))
            }
            className="justify-self-end h-12 px-6 md:px-8 font-semibold
                       bg-brand-secondary text-black hover:brightness-110"
          >
            SOLICITAR PROPOSTA
          </button>
        </div>
      </div>
    </section>
  );
}
