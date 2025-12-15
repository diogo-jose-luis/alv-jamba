"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  IdCard,
  User,
  Mail,
  Phone,
  BriefcaseBusiness,
  Layers3,
  Home,
  Clock8,
  ShieldCheck,
  ChevronDown,
  MapPin,
} from "lucide-react";

// Tipar o evento customizado
declare global {
  interface WindowEventMap {
    "open-proposal": CustomEvent<void>;
  }
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, "") || "https://sisgema-alvjamba-api.alv-jamba.com/api";

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
] as const;

const PROVINCIAS = [
  "Bengo",
  "Benguela",
  "Bié",
  "Cabinda",
  "Cuando Cubango",
  "Cuanza Norte",
  "Cuanza Sul",
  "Cunene",
  "Huambo",
  "Huíla",
  "Luanda",
  "Lunda Norte",
  "Lunda Sul",
  "Malanje",
  "Moxico",
  "Namibe",
  "Uíge",
  "Zaire",
] as const;

type FormShape = {
  nome?: string;
  empresa?: string;
  nif?: string;
  actividade?: string;
  email?: string;
  contacto?: string;
  provincia?: string;
  servico?: string;
  tempo?: string;
  postos?: string | number;
  categoria?: string;
  mensagem?: string;
};

type ErrorBag = Record<string, string>;

export default function ProposalDrawer() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<ErrorBag>({});

  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener("open-proposal", openHandler as EventListener);
    return () =>
      window.removeEventListener("open-proposal", openHandler as EventListener);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key == "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function validate(payload: FormShape): ErrorBag {
    const errs: ErrorBag = {};
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

    const phoneDigits = (payload.contacto ?? "").replace(/\D/g, "");
    if (!payload.nome || payload.nome.trim().length < 2) {
      errs.nome = "Informe o seu nome.";
    }
    if (!payload.email || !emailRx.test(payload.email)) {
      errs.email = "E-mail inválido.";
    }
    if (!payload.contacto || phoneDigits.length < 9) {
      errs.contacto = "Contacto inválido (mín. 9 dígitos).";
    }
    if (!payload.provincia) {
      errs.provincia = "Selecione a província.";
    }
    if (!payload.tempo) {
      errs.tempo = "Selecione o tempo.";
    }
    // Campo opcional: servico
    if (payload.postos != null && String(payload.postos).trim() !== "") {
      const n = Number(payload.postos);
      if (Number.isNaN(n) || n < 0) errs.postos = "Informe um número válido.";
    }
    return errs;
  }

 
  function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v == "object" && v !== null;
}

async function onSubmit(form: HTMLFormElement) {
  setErrors({});
  const raw = Object.fromEntries(new FormData(form).entries()) as FormShape;

  if (raw.contacto) raw.contacto = raw.contacto.replace(/\s+/g, " ").trim();
  if (raw.email) raw.email = raw.email.trim();

  const clientErrors = validate(raw);
  if (Object.keys(clientErrors).length > 0) {
    setErrors(clientErrors);
    return;
  }

  try {
    setSubmitting(true);

    const res = await fetch(`${API_BASE}/propostas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: globalThis.JSON.stringify(raw),
    });

    if (!res.ok) {
      if (res.status == 422) {
        const data: unknown = await res.json().catch(() => ({}));
        const bag: ErrorBag = {};

        if (isRecord(data) && isRecord(data.errors)) {
          const errs = data.errors as Record<string, string[] | string>;
          for (const [field, msgs] of Object.entries(errs)) {
            bag[field] = Array.isArray(msgs) ? msgs[0] : String(msgs);
          }
        } else if (isRecord(data) && typeof data.message == "string") {
          bag._ = data.message;
        } else {
          bag._ = "Falha ao submeter. Verifique os dados.";
        }
        setErrors(bag);
        return;
      }

      const text = await res.text().catch(() => "");
      throw new Error(text || `Erro ${res.status}`);
    }

    form.reset();
    setOpen(false);
    alert("Solicitação enviada com sucesso! Em breve entraremos em contacto.");
  } catch (err: unknown) {
    // Narrowing seguro sem 'any'
    if (err instanceof Error) {
      console.error(err);
    } else {
      console.error("Unknown error", err);
    }
    setErrors({ _: "Não foi possível enviar agora. Tente novamente." });
  } finally {
    setSubmitting(false);
  }
}


  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            className="fixed right-0 top-0 bottom-0 z-[90] w-full max-w-[560px] bg-white shadow-xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28 }}
          >
            <div className="px-6 py-4 border-b border-black/10">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-brand-primary" size={20} />
                <h2 className="font-heading text-xl text-brand-primary">
                  Solicitação de Proposta
                </h2>
              </div>
              <div className="mt-3 h-1.5 w-28 bg-gold-gradient" />
              <p className="mt-3 text-sm text-black/70 leading-relaxed">
                Preencha os dados abaixo e nossa equipa entrará em contacto para
                preparar uma proposta sob medida.
              </p>
              {errors._ && (
                <p className="mt-3 text-sm text-red-600">{errors._}</p>
              )}
            </div>

            <form
              className="p-6 overflow-y-auto"
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(e.currentTarget);
              }}
              noValidate
            >
              <SectionTitle>Identificação</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <Field
                  icon={User}
                  label="Nome completo"
                  name="nome"
                  required
                  placeholder="Seu nome"
                  errorMessage={errors.nome}
                />
                <Field
                  icon={Building2}
                  label="Empresa"
                  name="empresa"
                  placeholder="Nome da empresa"
                  errorMessage={errors.empresa}
                />
                <Field
                  icon={IdCard}
                  label="NIF"
                  name="nif"
                  placeholder="Número de contribuinte"
                  errorMessage={errors.nif}
                />
                <Field
                  icon={BriefcaseBusiness}
                  label="Actividade comercial"
                  name="actividade"
                  placeholder="Ex.: Oil & Gas"
                  errorMessage={errors.actividade}
                />
              </div>

              <SectionTitle>Contacto</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <Field
                  icon={Mail}
                  label="E-mail"
                  name="email"
                  type="email"
                  required
                  placeholder="voce@empresa.com"
                  errorMessage={errors.email}
                />
                <Field
                  icon={Phone}
                  label="Contacto"
                  name="contacto"
                  type="tel"
                  required
                  placeholder="+244 ..."
                  errorMessage={errors.contacto}
                />

                <SelectField
                  icon={MapPin}
                  label="Província"
                  name="provincia"
                  options={PROVINCIAS as unknown as string[]}
                  placeholder="— selecione —"
                  required
                  errorMessage={errors.provincia}
                />
              </div>

              <SectionTitle>Detalhes do serviço</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <SelectField
                  icon={Layers3}
                  label="Serviço que pretende"
                  name="servico"
                  placeholder="— selecione —"
                  options={SERVICOS as unknown as string[]}
                  errorMessage={errors.servico}
                />
                <SelectField
                  icon={Clock8}
                  label="Tempo"
                  name="tempo"
                  placeholder="— selecione —"
                  options={["12h", "24h", "48h"]}
                  required
                  errorMessage={errors.tempo}
                />
                <Field
                  icon={Home}
                  label="Quantos postos (residência)"
                  name="postos"
                  type="number"
                  min={0}
                  placeholder="0"
                  errorMessage={errors.postos}
                />
                <Field
                  icon={BriefcaseBusiness}
                  label="Categoria"
                  name="categoria"
                  placeholder="Ex.: Vigilante, Supervisor..."
                  errorMessage={errors.categoria}
                />
              </div>

              <TextArea
                label="Mensagem"
                name="mensagem"
                rows={5}
                placeholder="Especifique necessidades, locais, horários, SLAs, etc."
                errorMessage={errors.mensagem}
              />

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary w-full sm:w-auto disabled:opacity-70"
                >
                  {submitting ? "Enviando..." : "Enviar solicitação"}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="btn border border-black/20 text-brand-ink hover:bg-black/5 w-full sm:w-auto"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ==== UI ==== */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[13px] uppercase tracking-wide text-black/60 mb-3">
      {children}
    </h3>
  );
}

function Label({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor: string;
}) {
  return (
    <label
      className="text-sm font-semibold text-brand-ink mb-1 block"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}

function Field({
  icon: Icon,
  label,
  name,
  type = "text",
  required,
  min,
  placeholder,
  errorMessage,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  min?: number;
  placeholder?: string;
  errorMessage?: string;
}) {
  const erro = Boolean(errorMessage);
  return (
    <div>
      <Label htmlFor={name}>
        {label}
        {required && " *"}
      </Label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-11 flex items-center justify-center text-brand-primary">
          <Icon size={18} />
        </div>
        <input
          id={name}
          name={name}
          type={type}
          min={min}
          required={required}
          placeholder={placeholder}
          aria-invalid={erro}
          aria-describedby={erro ? `${name}-error` : undefined}
          className={`w-full h-11 pl-11 pr-3 border outline-none placeholder:text-black/40
            focus:shadow-[0_0_0_2px_rgba(214,164,52,.25)]
            ${erro ? "border-red-500 focus:border-red-500" : "border-black/20 focus:border-brand-primary"}`}
        />
      </div>
      {erro && (
        <p id={`${name}-error`} className="mt-1 text-xs text-red-600">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

function SelectField({
  icon: Icon,
  label,
  name,
  options,
  placeholder = "— selecione —",
  required,
  errorMessage,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  name: string;
  options: string[];
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
}) {
  const erro = Boolean(errorMessage);
  return (
    <div>
      <Label htmlFor={name}>
        {label}
        {required && " *"}
      </Label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-11 flex items-center justify-center text-brand-primary">
          <Icon size={18} />
        </div>
        <select
          id={name}
          name={name}
          required={required}
          defaultValue=""
          aria-invalid={erro}
          aria-describedby={erro ? `${name}-error` : undefined}
          className={`appearance-none w-full h-11 pl-11 pr-9 border bg-white outline-none
            focus:shadow-[0_0_0_2px_rgba(214,164,52,.25)]
            ${erro ? "border-red-500 focus:border-red-500" : "border-black/20 focus:border-brand-primary"}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/40"
          size={16}
        />
      </div>
      {erro && (
        <p id={`${name}-error`} className="mt-1 text-xs text-red-600">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

function TextArea({
  label,
  name,
  rows = 4,
  required,
  placeholder,
  errorMessage,
}: {
  label: string;
  name: string;
  rows?: number;
  required?: boolean;
  placeholder?: string;
  errorMessage?: string;
}) {
  const erro = Boolean(errorMessage);
  return (
    <div>
      <Label htmlFor={name}>
        {label}
        {required && " *"}
      </Label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        aria-invalid={erro}
        aria-describedby={erro ? `${name}-error` : undefined}
        className={`w-full px-3 py-3 border outline-none resize-y placeholder:text-black/40
          focus:shadow-[0_0_0_2px_rgba(214,164,52,.25)]
          ${erro ? "border-red-500 focus:border-red-500" : "border-black/20 focus:border-brand-primary"}`}
      />
      {erro && (
        <p id={`${name}-error`} className="mt-1 text-xs text-red-600">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
