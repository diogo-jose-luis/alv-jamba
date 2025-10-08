"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, IdCard, User, Mail, Phone, BriefcaseBusiness,
  Layers3, Home, Clock8, ShieldCheck, ChevronDown
} from "lucide-react";

// Tipar o evento customizado
declare global {
  interface WindowEventMap {
    "open-proposal": CustomEvent<void>;
  }
}

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

export default function ProposalDrawer() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener("open-proposal", openHandler as EventListener);
    return () => window.removeEventListener("open-proposal", openHandler as EventListener);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function onSubmit(form: HTMLFormElement) {
    const data = Object.fromEntries(new FormData(form).entries());
    if (!data.nome || !data.email || !data.contacto) {
      alert("Por favor, preencha Nome, E-mail e Contacto.");
      return;
    }
    try {
      setSubmitting(true);
      console.log("Proposta enviada:", data);
      setOpen(false);
      form.reset(); // ✅ válido em HTMLFormElement
      alert("Solicitação enviada com sucesso! Em breve entraremos em contacto.");
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
                <h2 className="font-heading text-xl text-brand-primary">Solicitação de Proposta</h2>
              </div>
              <div className="mt-3 h-1.5 w-28 bg-gold-gradient" />
              <p className="mt-3 text-sm text-black/70 leading-relaxed">
                Preencha os dados abaixo e nossa equipa entrará em contacto para preparar uma proposta sob medida.
              </p>
            </div>

            <form
              className="p-6 overflow-y-auto"
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(e.currentTarget);
              }}
            >
              <SectionTitle>Identificação</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <Field icon={User} label="Nome completo" name="nome" required placeholder="Seu nome" />
                <Field icon={Building2} label="Empresa" name="empresa" placeholder="Nome da empresa" />
                <Field icon={IdCard} label="NIF" name="nif" placeholder="Número de contribuinte" />
                <Field icon={BriefcaseBusiness} label="Actividade comercial" name="actividade" placeholder="Ex.: Oil & Gas" />
              </div>

              <SectionTitle>Contacto</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <Field icon={Mail} label="E-mail" name="email" type="email" required placeholder="voce@empresa.com" />
                <Field icon={Phone} label="Contacto" name="contacto" type="tel" required placeholder="+244 ..." />
              </div>

              <SectionTitle>Detalhes do serviço</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <SelectField
                  icon={Layers3}
                  label="Serviço que pretende"
                  name="servico"
                  placeholder="— selecione —"
                  options={SERVICOS}
                />
                <SelectField
                  icon={Clock8}
                  label="Tempo"
                  name="tempo"
                  placeholder="— selecione —"
                  options={["12h", "24h", "48h"]}
                  required
                />
                <Field icon={Home} label="Quantos postos (residência)" name="postos" type="number" min={0} placeholder="0" />
                <Field icon={BriefcaseBusiness} label="Categoria" name="categoria" placeholder="Ex.: Vigilante, Supervisor..." />
              </div>

              <TextArea
                label="Mensagem"
                name="mensagem"
                rows={5}
                placeholder="Especifique necessidades, locais, horários, SLAs, etc."
              />

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button type="submit" disabled={submitting} className="btn btn-primary w-full sm:w-auto disabled:opacity-70">
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

/* ====== UI ====== */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[13px] uppercase tracking-wide text-black/60 mb-3">{children}</h3>;
}

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return (
    <label className="text-sm font-semibold text-brand-ink mb-1 block" htmlFor={htmlFor}>
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
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  min?: number;
  placeholder?: string;
}) {
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
          className="w-full h-11 pl-11 pr-3 border border-black/20 outline-none
                     focus:border-brand-primary focus:shadow-[0_0_0_2px_rgba(214,164,52,.25)]
                     placeholder:text-black/40"
        />
      </div>
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
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  name: string;
  options: string[];
  placeholder?: string;
  required?: boolean;
}) {
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
          className="appearance-none w-full h-11 pl-11 pr-9 border border-black/20 bg-white outline-none
                     focus:border-brand-primary focus:shadow-[0_0_0_2px_rgba(214,164,52,.25)]"
          defaultValue=""
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
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/40" size={16} />
      </div>
    </div>
  );
}

function TextArea({
  label,
  name,
  rows = 4,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  rows?: number;
  required?: boolean;
  placeholder?: string;
}) {
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
        className="w-full px-3 py-3 border border-black/20 outline-none resize-y
                   focus:border-brand-primary focus:shadow-[0_0_0_2px_rgba(214,164,52,.25)]
                   placeholder:text-black/40"
      />
    </div>
  );
}
