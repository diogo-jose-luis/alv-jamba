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

type InquiryForm = {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
};

const INITIAL: InquiryForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

export default function InquirySection() {
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState<InquiryForm>(INITIAL);

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert("Preencha pelo menos Nome e E-mail.");
      return;
    }
    try {
      setSending(true);
      // TODO: enviar para sua API
      console.log("Inquiry:", form);
      setForm(INITIAL); // limpa
      alert("Enviado. Em breve entraremos em contacto.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="relative">
      <div className="container-xl -mt-0 md:-mt-0">
        <div className="relative bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-black/5">
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

          <form className="p-5 md:p-8" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Nome */}
              <Field
                label="Nome *"
                name="name"
                placeholder="Seu nome"
                value={form.name}
                onChange={onChange}
                required
              />
              {/* Email */}
              <Field
                label="Email *"
                name="email"
                type="email"
                placeholder="voce@empresa.com"
                value={form.email}
                onChange={onChange}
                required
              />
              {/* Phone */}
              <Field
                label="Telefone"
                name="phone"
                type="tel"
                placeholder="+244 ..."
                value={form.phone}
                onChange={onChange}
              />

              {/* Serviço pretendido */}
              <SelectField
                label="Interessado em"
                name="service"
                value={form.service}
                onChange={onChange}
              >
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
                name="message"
                placeholder="Como podemos ajudar?"
                value={form.message}
                onChange={onChange}
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
  value,
  onChange,
  required,
}: {
  label: string;
  name: keyof InquiryForm | string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
  required?: boolean;
}) {
  return (
    <div>
      <Label htmlFor={name as string}>{label}{required && " *"}</Label>
      <input
        id={name as string}
        name={name as string}
        type={type}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={onChange}
        required={required}
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
  value,
  onChange,
}: {
  label: string;
  name: keyof InquiryForm | string;
  children: React.ReactNode;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <div>
      <Label htmlFor={name as string}>{label}</Label>
      <select
        id={name as string}
        name={name as string}
        className="w-full h-11 bg-transparent outline-none
                   border-0 border-b border-black/20
                   focus:border-brand-primary focus:ring-0"
        value={value ?? ""}
        onChange={onChange}
      >
        {children}
      </select>
    </div>
  );
}
