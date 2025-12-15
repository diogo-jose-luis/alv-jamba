"use client";

import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  FileText,
  Briefcase,
  Phone,
  Mail,
  User,
  Calendar,
  Upload,
  CheckCircle2,
} from "lucide-react";
import clsx from "clsx";

type FormFields = {
  nome: string;
  email: string;
  telefone: string;
  provincia: string;
  cargoPretendido: string;
  disponibilidade: string;
  inicio: string;
  mensagem: string;
  consent: boolean;
};

const PROVINCIAS = [
  "Luanda",
  "Bengo",
  "Benguela",
  "Bié",
  "Cabinda",
  "Cuando-Cubango",
  "Cuanza Norte",
  "Cuanza Sul",
  "Cunene",
  "Huambo",
  "Huíla",
  "Lunda Norte",
  "Lunda Sul",
  "Malanje",
  "Moxico",
  "Namibe",
  "Uíge",
  "Zaire",
];

const DISPONIBILIDADE = ["Imediata", "15 dias", "30 dias", "60 dias"];

export default function SpontaneousApplication() {
  const [submitting, setSubmitting] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [msg, setMsg] = useState<null | { type: "ok" | "err"; text: string }>(
    null
  );
  const dropRef = useRef<HTMLLabelElement | null>(null);

  useEffect(() => {
    const el = dropRef.current;
    if (!el) return;

    const onDragEnter = (e: Event) => {
      const ev = e as DragEvent;
      ev.preventDefault();
      el.classList.add("ring-2", "ring-brand-secondary");
    };
    const onDragOver = (e: Event) => {
      const ev = e as DragEvent;
      ev.preventDefault();
      el.classList.add("ring-2", "ring-brand-secondary");
    };
    const onDragLeave = (e: Event) => {
      const ev = e as DragEvent;
      ev.preventDefault();
      el.classList.remove("ring-2", "ring-brand-secondary");
    };
    const onDrop = (e: Event) => {
      const ev = e as DragEvent;
      ev.preventDefault();
      el.classList.remove("ring-2", "ring-brand-secondary");
      const file = ev.dataTransfer?.files?.[0] ?? null;
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert("Ficheiro excede 5MB.");
          return;
        }
        setCvFile(file);
      }
    };

    el.addEventListener("dragenter", onDragEnter);
    el.addEventListener("dragover", onDragOver);
    el.addEventListener("dragleave", onDragLeave);
    el.addEventListener("drop", onDrop);

    return () => {
      el.removeEventListener("dragenter", onDragEnter);
      el.removeEventListener("dragover", onDragOver);
      el.removeEventListener("dragleave", onDragLeave);
      el.removeEventListener("drop", onDrop);
    };
  }, []);

  async function onSubmit(form: HTMLFormElement) {
    
    const data = new FormData(form);
    const f: FormFields = {
      nome: String(data.get("nome") || ""),
      email: String(data.get("email") || ""),
      telefone: String(data.get("telefone") || ""),
      provincia: String(data.get("provincia") || ""),
      cargoPretendido: String(data.get("cargoPretendido") || ""),
      disponibilidade: String(data.get("disponibilidade") || ""),
      inicio: String(data.get("inicio") || ""),
      mensagem: String(data.get("mensagem") || ""),
      consent: Boolean(data.get("consent")),
    };

    if (!f.nome || !f.email || !f.telefone || !f.cargoPretendido) {
      setMsg({
        type: "err",
        text: "Preencha Nome, E-mail, Contacto e Cargo pretendido.",
      });
      return;
    }
    if (!cvFile) {
      setMsg({ type: "err", text: "Anexe o seu CV em PDF ou DOC." });
      return;
    }

    try {
      setSubmitting(true);
      setMsg(null);

      const payload = new FormData();
      Object.entries(f).forEach(([k, v]) => payload.append(k, String(v)));
      payload.append("cv", cvFile);
      // await fetch("/api/candidaturas", { method: "POST", body: payload });

      setMsg({
        type: "ok",
        text: "Candidatura enviada com sucesso! Obrigado.",
      });
      form.reset();
      setCvFile(null);
    } catch {
      setMsg({ type: "err", text: "Ocorreu um erro. Tente novamente." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="container-xl">
        {/* cabeçalho clean */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand-ink">
            Envie a sua candidatura
          </h2>
          <p className="mt-3 text-black/70">
            Integre uma equipa disciplinada, orientada a processos e resultados.
          </p>
          <div className="mx-auto mt-4 h-1.5 w-24 bg-brand-secondary" />
        </div>

        {/* layout com contraste suave no fundo da área */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 md:gap-10">
          {/* ESQUERDA: cartões informativos */}
          <aside className="space-y-6">
            <InfoCard
              icon={<ShieldCheck className="text-brand-primary" />}
              title="O que valorizamos"
            >
              <ul className="space-y-2 text-black/75">
                <li>• Integridade e confidencialidade.</li>
                <li>• Postura, comunicação e disciplina operacional.</li>
                <li>• Disponibilidade para turnos e mobilidade.</li>
                <li>• Trabalho em equipa e foco no cliente.</li>
              </ul>
            </InfoCard>

            <InfoCard
              icon={<FileText className="text-brand-primary" />}
              title="Documentos"
            >
              <ul className="space-y-2 text-black/75">
                <li>• CV atualizado (PDF/DOC).</li>
                <li>• Bilhete de Identidade & NIF.</li>
                <li>• Certificados de formação (se houver).</li>
                <li>• Carta de condução (para vagas específicas).</li>
              </ul>
            </InfoCard>

            <InfoCard
              icon={<Briefcase className="text-brand-primary" />}
              title="Áreas típicas"
            >
              <p className="text-black/75">
                Segurança Física, Onshore/Offshore, QRF, CIT, Recepção,
                Motoristas, Segurança Electrónica e Operações.
              </p>
            </InfoCard>
          </aside>

          {/* DIREITA: FORM clean */}
          <div className="relative border border-black/10 bg-white shadow-sm">
            <div className="absolute inset-x-0 top-0 h-1 bg-brand-secondary" />
            <form
              className="p-6 md:p-7 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(e.currentTarget);
              }}
            >
              {msg && (
                <div
                  className={clsx(
                    "p-3 text-sm border",
                    msg.type === "ok"
                      ? "bg-green-50 border-green-200 text-green-700"
                      : "bg-red-50 border-red-200 text-red-700"
                  )}
                >
                  {msg.text}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  name="nome"
                  label="Nome completo *"
                  icon={<User size={16} />}
                  required
                />
                <Field
                  name="email"
                  type="email"
                  label="E-mail *"
                  icon={<Mail size={16} />}
                  required
                />
                <Field
                  name="telefone"
                  type="tel"
                  label="Contacto *"
                  icon={<Phone size={16} />}
                  required
                />
                <SelectField name="provincia" label="Província">
                  <option value="">— selecione —</option>
                  {PROVINCIAS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </SelectField>
                <Field
                  name="cargoPretendido"
                  label="Cargo / Função pretendida *"
                  icon={<Briefcase size={16} />}
                  required
                />
                <SelectField name="disponibilidade" label="Disponibilidade">
                  <option value="">— selecione —</option>
                  {DISPONIBILIDADE.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </SelectField>
                <Field
                  name="inicio"
                  type="date"
                  label="Prev. início"
                  icon={<Calendar size={16} />}
                />
              </div>

              <TextArea
                name="mensagem"
                label="Mensagem"
                rows={5}
                placeholder="Resumo da sua experiência, postos onde já atuou, certificações..."
              />

              {/* Upload CV */}
              <div>
                <span className="text-sm font-semibold text-brand-ink mb-1 block">
                  Curriculum Vitae *
                </span>
                <label
                  ref={dropRef}
                  className="group flex items-center gap-3 p-4 border border-black/20 cursor-pointer
                             hover:bg-black/5 transition-colors"
                >
                  <Upload size={18} className="text-brand-primary" />
                  <div className="flex-1">
                    <div className="text-sm">
                      {cvFile ? (
                        <strong>{cvFile.name}</strong>
                      ) : (
                        "Arraste o arquivo aqui ou clique para selecionar"
                      )}
                    </div>
                    <div className="text-xs text-black/60">
                      Formatos aceites: PDF, DOC, DOCX (máx. 5MB)
                    </div>
                  </div>
                  <input
                    type="file"
                    name="cv"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.currentTarget.files?.[0] || null;
                      if (f && f.size > 5 * 1024 * 1024) {
                        alert("Ficheiro excede 5MB.");
                        e.currentTarget.value = "";
                        return;
                      }
                      setCvFile(f);
                    }}
                  />
                </label>
              </div>

              <label className="flex items-start gap-3 text-sm text-black/70">
                <input name="consent" type="checkbox" className="mt-1" />
                Autorizo o tratamento dos meus dados para efeitos de
                recrutamento e contacto posterior, nos termos da política de
                privacidade.
              </label>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary disabled:opacity-70"
                >
                  {submitting ? "A enviar..." : "Submeter candidatura"}
                </button>
                <a
                  href="/recrutamento/processo"
                  className="inline-flex items-center h-11 px-4 border border-black/15 hover:bg-black/5"
                >
                  Ver processo de seleção
                </a>
              </div>

              <div className="mt-3 text-xs text-black/60 flex items-center gap-1">
                <CheckCircle2 size={14} className="text-brand-primary" /> Os
                seus dados são utilizados apenas para recrutamento.
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ——— Sub-componentes ——— */
function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-black/10 bg-white p-6 md:p-7 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <h3 className="font-heading text-xl text-brand-ink">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  icon,
  required,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  icon?: React.ReactNode;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-sm font-semibold text-brand-ink mb-1 block"
      >
        {label}
      </label>
      <div className="flex items-center gap-2 border border-black/20 focus-within:border-brand-primary px-3 h-11">
        {icon ? <span className="text-black/60">{icon}</span> : null}
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className="w-full outline-none"
        />
      </div>
    </div>
  );
}

function SelectField({
  name,
  label,
  children,
  required,
}: {
  name: string;
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-sm font-semibold text-brand-ink mb-1 block"
      >
        {label}
      </label>
      <div className="border border-black/20 focus-within:border-brand-primary h-11">
        <select
          id={name}
          name={name}
          required={required}
          className="w-full h-full px-3 bg-white outline-none"
        >
          {children}
        </select>
      </div>
    </div>
  );
}

function TextArea({
  name,
  label,
  rows = 4,
  required,
  placeholder,
}: {
  name: string;
  label: string;
  rows?: number;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-sm font-semibold text-brand-ink mb-1 block"
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        className="w-full px-3 py-3 border border-black/20 focus:border-brand-primary outline-none resize-y"
      />
    </div>
  );
}
