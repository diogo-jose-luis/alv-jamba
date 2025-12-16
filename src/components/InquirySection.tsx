"use client";

import { useState } from "react";

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

  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOk(null);
    setErr(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      FormDataEntryValue
    >;

    // honeypot (sem any)
    const gotcha = typeof data["_gotcha"] == "string" ? data["_gotcha"] : "";
    if (gotcha) return;

    const name = String(data["name"] ?? "");
    const email = String(data["email"] ?? "");
    const message = String(data["message"] ?? "");

    if (!name || !email || !message) {
      setErr("Por favor, preencha Nome, E-mail e Mensagem.");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch(
        `https://sisgema-alvjamba-api.alv-jamba.com/api/contactos`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        }
      );

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        alert(json?.message ?? "Ocorreu um erro ao enviar. Tente novamente.");
        return;
      }

      form.reset();
      alert("Mensagem enviada com sucesso. Em breve entraremos em contacto.");
    } catch {
      alert("Ocorreu um erro ao enviar. Tente novamente.");
    } finally {
      setSubmitting(false);
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
