// src/components/ContactFormBand.tsx
"use client";

import { useState } from "react";
import { Mail, Send, User } from "lucide-react";

export default function ContactFormBand() {
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

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
    const gotcha = typeof data["_gotcha"] === "string" ? data["_gotcha"] : "";
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
      setErr("Ocorreu um erro ao enviar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="py-12 md:py-16 bg-[#f8f8f8]">
      <div className="container-xl">
        <h3 className="font-heading text-brand-ink text-lg md:text-xl font-extrabold mb-6">
          ENTRE EM CONTACTO
        </h3>

        {/* feedback */}
        {ok ? (
          <div className="mb-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-3">
            {ok}
          </div>
        ) : null}
        {err ? (
          <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3">
            {err}
          </div>
        ) : null}

        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 gap-4 md:gap-6"
          noValidate
        >
          {/* linha: nome + email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Field
              label="Nome"
              name="name"
              placeholder="Seu nome"
              icon="user"
              required
            />
            <Field
              label="Email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              icon="mail"
              required
            />
          </div>

          {/* mensagem */}
          <TextArea
            label="Mensagem"
            name="message"
            placeholder="Escreva a sua mensagem…"
            rows={7}
            required
          />

          {/* honeypot */}
          <input
            type="text"
            name="_gotcha"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-6 h-11 font-semibold
                         bg-brand-primary text-white hover:brightness-110
                         disabled:opacity-60"
            >
              {submitting ? "A enviar…" : "Enviar mensagem"}
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

/* ---------- Inputs com “badge” dourada à direita ---------- */

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  icon,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  icon?: "user" | "mail";
}) {
  return (
    <div>
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className="w-full h-11 pl-3 pr-12 bg-white border border-black/10 outline-none
                     focus:border-brand-primary text-brand-ink placeholder-black/40"
        />
        <span
          className="absolute inset-y-0 right-0 w-10 grid place-content-center
                     bg-brand-primary text-white pointer-events-none"
          aria-hidden
        >
          {icon === "user" ? (
            <User size={16} />
          ) : icon === "mail" ? (
            <Mail size={16} />
          ) : null}
        </span>
      </div>
    </div>
  );
}

function TextArea({
  label,
  name,
  placeholder,
  rows = 6,
  required,
}: {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          rows={rows}
          required={required}
          className="w-full bg-white border border-black/10 outline-none
                     focus:border-brand-primary text-brand-ink placeholder-black/40
                     p-3"
        />
      </div>
    </div>
  );
}
