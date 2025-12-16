"use client";

import { useMemo, useState } from "react";
import { FileText, Download, ExternalLink, Search, Filter, Tag } from "lucide-react";

type DocCategory = "Regulamentos" | "Reportes" | "Mapas" | "Outros";

type LegalDoc = {
  id: string;
  title: string;
  description?: string;
  category: DocCategory;
  date?: string;
  fileUrl: string;
};

const DOCS: LegalDoc[] = [
  {
    id: "doc-1",
    title: "Decreto Presidencial n.º 225/17 (27 de Setembro)",
    description:
      "Regulamento da Lei das Empresas Privadas de Segurança e orientações gerais aplicáveis ao sector.",
    category: "Regulamentos",
    date: "27/09/2017",
    fileUrl: "/docs/legal/decreto-presidencial-225-17.pdf",
  },
  {
    id: "doc-2",
    title: "Controlo Atualizado (10/09/2025)",
    description:
      "Documento interno de referência para verificação/controlo e validações operacionais (PDF).",
    category: "Reportes",
    date: "10/09/2025",
    fileUrl: "/docs/legal/controlo-atualizado-10092025.pdf",
  },
  {
    id: "doc-3",
    title: "Mapa de Localização dos Membros 2025",
    description: "Mapa/registro para localização e identificação de membros (PDF).",
    category: "Mapas",
    date: "2025",
    fileUrl: "/docs/legal/mapa-localizacao-membros-2025.pdf",
  },
];

const CATEGORIES = ["Todos", "Regulamentos", "Reportes", "Mapas", "Outros"] as const;
type CategoryFilter = (typeof CATEGORIES)[number];

function DocCard({ doc }: { doc: LegalDoc }) {
  return (
    <article className="group rounded-2xl bg-white ring-1 ring-black/5 overflow-hidden hover:ring-brand-primary/25 transition">
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary ring-1 ring-brand-primary/15">
              <FileText size={18} />
            </span>

            <div>
              <h3 className="font-heading text-lg font-extrabold text-brand-ink leading-snug">
                {doc.title}
              </h3>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="inline-flex items-center gap-1 rounded-full bg-black/5 px-3 py-1 text-brand-ink">
                  <Tag size={14} className="text-brand-secondary" />
                  {doc.category}
                </span>
                {doc.date ? (
                  <span className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-brand-ink">
                    {doc.date}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {doc.description ? (
          <p className="mt-3 text-sm text-black/70 leading-relaxed">{doc.description}</p>
        ) : null}

        <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:items-center">
          <a
            href={doc.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-5 py-2.5 font-semibold text-white hover:opacity-95"
          >
            <ExternalLink size={16} />
            Abrir PDF
          </a>

          <a
            href={doc.fileUrl}
            download
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 font-semibold text-brand-ink ring-1 ring-black/10 hover:ring-brand-primary/25"
          >
            <Download size={16} className="text-brand-secondary" />
            Descarregar
          </a>
        </div>
      </div>

      <div className="h-1 w-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary opacity-70" />
    </article>
  );
}

export default function LegalReportsBand() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CategoryFilter>("Todos");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return DOCS.filter((d) => {
      const matchCat = cat === "Todos" ? true : d.category === cat;
      const matchQ =
        !query ||
        d.title.toLowerCase().includes(query) ||
        (d.description ?? "").toLowerCase().includes(query);
      return matchCat && matchQ;
    });
  }, [q, cat]);

  return (
    <section className="py-16 md:py-24">
      <div className="container-xl">
        <div className="mb-8 md:mb-10 rounded-2xl bg-white ring-1 ring-black/5 p-5 md:p-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-brand-ink">
                Biblioteca de documentos (PDF)
              </h2>
              <p className="mt-2 text-black/70">
                Consulta rápida de regulamentos e reportes. Podes abrir no navegador ou descarregar.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-black/50"
                />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Pesquisar documento…"
                  className="w-full sm:w-[320px] rounded-full bg-white ring-1 ring-black/10 pl-9 pr-4 py-2.5 outline-none focus:ring-brand-primary/35"
                />
              </div>

              <div className="relative">
                <Filter
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-black/50"
                />
                <select
                  value={cat}
                  onChange={(e) => setCat(e.target.value as CategoryFilter)}
                  className="w-full sm:w-[220px] appearance-none rounded-full bg-white ring-1 ring-black/10 pl-9 pr-9 py-2.5 outline-none focus:ring-brand-primary/35"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {filtered.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((doc) => (
              <DocCard key={doc.id} doc={doc} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white ring-1 ring-black/5 p-6 text-black/70">
            Nenhum documento encontrado para o filtro/pesquisa atual.
          </div>
        )}
      </div>
    </section>
  );
}
