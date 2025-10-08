"use client";

import { useState } from "react";

const SERVICOS = [
  "Segurança Física",
  "Segurança Marítima/Offshore",
  "Segurança Onshore",
  "Segurança Electrónica",
  "Assistente de Porto e Aeroporto",
  "Escolta de Mercadorias e Valores",
  "Vigilância Marítima",
  "QRF – Força de Reação Armada",
  "CIT – Transporte de Valores",
  "Serviço de Escolta",
  "Serviços de Motoristas",
  "Divisão de Segurança Contra Incêndios",
  "Recepcionistas",
];

export default function InquirySection() {
  const [sending, setSending] = useState(false);

  async function onSubmit(form: HTMLFormElement) {
    const data = Object.fromEntries(new FormData(form).entries());
    if (!data.name || !data.email) {
      alert("Preencha pelo menos Nome e E-mail.");
      return;
    }
    try {
      setSending(true);
      // TODO: enviar para sua API
      console.log("Inquiry:", data);
      (form as any).reset();
      alert("Enviado. Em breve entraremos em contacto.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="relative">
      {/* empurra o card para cima para “invadir” o slider */}
      <div className="container-xl -mt-0 md:-mt-0">
        {/* CARD */}
        <div className="relative bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-black/5">
          {/* TÍTULO EM FAIXA */}
          <div
            className="absolute -top-8 md:-top-9 left-0 px-5 md:px-7 py-2 md:py-3 text-[13px] md:text-sm font-extrabold tracking-wide
                       text-black"
            style={{
              background:
                "linear-gradient(135deg, #d6a434 0%, #f0d07a 50%, #b68c2c 100%)",
            }}
          >
            CONTACTE-NOS PARA SOLICITAÇÃO
          </div>

          {/* FORM */}
          <form
            className="p-5 md:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(e.currentTarget);
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Nome */}
              <Field label="Nome *" name="name" placeholder="Seu nome" />
              {/* Email */}
              <Field
                label="Email *"
                name="email"
                type="email"
                placeholder="voce@empresa.com"
              />
              {/* Phone */}
              <Field
                label="Telefone"
                name="phone"
                type="tel"
                placeholder="+244 ..."
              />

              {/* Interested In */}
              <SelectField label="Interessado em" name="interested">
                <option value="">— selecione —</option>
                {SERVICOS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </SelectField>

              {/* Comentários */}
              <Field
                label="Os seus comentários"
                name="comments"
                placeholder="Como podemos ajudar?"
              />

              {/* Botão */}
              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full md:w-auto h-12 px-8 font-semibold
                             bg-brand-primary text-white border border-brand-primary
                             hover:bg-transparent hover:text-brand-primary transition disabled:opacity-70"
                >
                  {sending ? "A enviar..." : "ENVIAR PEDIDO  →"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* sombra suave “caindo” abaixo do card */}
        <div className="h-10 w-full bg-gradient-to-b from-black/5 to-transparent" />
      </div>
    </section>
  );
}

/* ---------- Inputs estilo “underline” ---------- */

function Label({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-semibold text-black/70 mb-2"
    >
      {children}
    </label>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full h-11 bg-transparent outline-none
                   border-0 border-b border-black/20
                   focus:border-brand-primary focus:ring-0 placeholder:text-black/40"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  children,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <select
        id={name}
        name={name}
        className="w-full h-11 bg-transparent outline-none
                   border-0 border-b border-black/20
                   focus:border-brand-primary focus:ring-0"
        defaultValue=""
      >
        {children}
      </select>
    </div>
  );
}
