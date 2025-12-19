"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  MapPin,
  Send,
  SlidersHorizontal,
} from "lucide-react";

type IncidentType = "FURTO" | "ASSALTO" | "MAO_ARMADA" | "OUTROS";
type RiskLevel = "ALTA" | "MEDIA" | "BAIXA";

type Zone = {
  id: string;
  name: string;
  risk: RiskLevel;
  topIncidents: { type: IncidentType; value: number }[];
  trend: "↑" | "→" | "↓";
  x: number; // 0-100
  y: number; // 0-100
};

const PROVINCES = [
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

type Province = (typeof PROVINCES)[number];

const INCIDENT_LABEL: Record<IncidentType, string> = {
  FURTO: "Furtos",
  ASSALTO: "Assaltos",
  MAO_ARMADA: "Mão armada",
  OUTROS: "Outros",
};

const INCIDENT_COLOR: Record<IncidentType, string> = {
  FURTO: "bg-amber-500",
  ASSALTO: "bg-orange-500",
  MAO_ARMADA: "bg-red-600",
  OUTROS: "bg-slate-500",
};

const RISK_BADGE: Record<RiskLevel, string> = {
  ALTA: "bg-red-600/10 text-red-700 ring-1 ring-red-600/20",
  MEDIA: "bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20",
  BAIXA: "bg-emerald-600/10 text-emerald-700 ring-1 ring-emerald-600/20",
};

/**
 * MOCKUP: zonas mantêm-se iguais independentemente da província.
 * (Mais tarde: podes filtrar/alterar ZONES por província.)
 */
const ZONES: Zone[] = [
  {
    id: "z1",
    name: "Zona A (exemplo)",
    risk: "ALTA",
    topIncidents: [
      { type: "MAO_ARMADA", value: 12 },
      { type: "ASSALTO", value: 18 },
      { type: "FURTO", value: 25 },
    ],
    trend: "↑",
    x: 62,
    y: 40,
  },
  {
    id: "z2",
    name: "Zona B (exemplo)",
    risk: "ALTA",
    topIncidents: [
      { type: "ASSALTO", value: 21 },
      { type: "FURTO", value: 19 },
      { type: "OUTROS", value: 6 },
    ],
    trend: "→",
    x: 48,
    y: 55,
  },
  {
    id: "z3",
    name: "Zona C (exemplo)",
    risk: "MEDIA",
    topIncidents: [
      { type: "FURTO", value: 17 },
      { type: "ASSALTO", value: 11 },
      { type: "OUTROS", value: 4 },
    ],
    trend: "↑",
    x: 70,
    y: 62,
  },
  {
    id: "z4",
    name: "Zona D (exemplo)",
    risk: "MEDIA",
    topIncidents: [
      { type: "FURTO", value: 14 },
      { type: "ASSALTO", value: 9 },
      { type: "MAO_ARMADA", value: 3 },
    ],
    trend: "↓",
    x: 35,
    y: 38,
  },
  {
    id: "z5",
    name: "Zona E (exemplo)",
    risk: "BAIXA",
    topIncidents: [
      { type: "FURTO", value: 4 },
      { type: "ASSALTO", value: 2 },
      { type: "OUTROS", value: 1 },
    ],
    trend: "→",
    x: 26,
    y: 62,
  },
  {
    id: "z6",
    name: "Zona F (exemplo)",
    risk: "BAIXA",
    topIncidents: [
      { type: "FURTO", value: 3 },
      { type: "ASSALTO", value: 2 },
      { type: "OUTROS", value: 1 },
    ],
    trend: "↓",
    x: 18,
    y: 42,
  },
  {
    id: "z7",
    name: "Zona G (exemplo)",
    risk: "BAIXA",
    topIncidents: [
      { type: "FURTO", value: 2 },
      { type: "ASSALTO", value: 1 },
      { type: "OUTROS", value: 1 },
    ],
    trend: "→",
    x: 40,
    y: 70,
  },
  {
    id: "z8",
    name: "Zona H (exemplo)",
    risk: "BAIXA",
    topIncidents: [
      { type: "FURTO", value: 2 },
      { type: "ASSALTO", value: 1 },
      { type: "OUTROS", value: 0 },
    ],
    trend: "↓",
    x: 58,
    y: 72,
  },
];

function ZoneRow({
  zone,
  active,
  onSelect,
}: {
  zone: Zone;
  active: boolean;
  onSelect: () => void;
}) {
  const total = zone.topIncidents.reduce((s, i) => s + i.value, 0);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "w-full text-left rounded-2xl p-4 transition",
        "ring-1 ring-black/5 hover:ring-brand-primary/30 hover:bg-black/[0.02]",
        active ? "ring-brand-primary/40 bg-black/[0.03]" : "bg-white",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="w-full">
          <div className="flex items-center gap-2">
            <span className="font-heading font-extrabold text-brand-ink">
              {zone.name}
            </span>
            <span
              className={[
                "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
                RISK_BADGE[zone.risk],
              ].join(" ")}
            >
              {zone.risk}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-black/70">
            <span className="inline-flex items-center gap-1">
              <MapPin size={16} className="text-brand-secondary" />
              Incidências (índice): <b className="text-brand-ink">{total}</b>
            </span>
            <span className="text-black/40">•</span>
            <span>
              Tendência: <b className="text-brand-ink">{zone.trend}</b>
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {zone.topIncidents.map((it) => (
              <span
                key={it.type}
                className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-brand-ink"
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    INCIDENT_COLOR[it.type]
                  }`}
                />
                {INCIDENT_LABEL[it.type]}: {it.value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}

function ProvinceFilter({
  province,
  setProvince,
}: {
  province: Province;
  setProvince: (p: Province) => void;
}) {
  return (
    <div className="mb-6 rounded-2xl bg-white ring-1 ring-black/5 p-4 md:p-5">
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/[0.04] ring-1 ring-black/5">
            <SlidersHorizontal size={18} className="text-brand-secondary" />
          </span>
          <div>
            <div className="font-heading font-extrabold text-brand-ink">
              Filtrar por província
            </div>
            <div className="text-sm text-black/60">
              Altera a provincia no mapa.
            </div>
          </div>
        </div>

        <div className="md:ml-auto w-full md:w-[380px]">
          <select
            value={province}
            onChange={(e) => setProvince(e.target.value as Province)}
            className="w-full rounded-xl bg-white ring-1 ring-black/10 px-4 py-3 outline-none focus:ring-brand-primary/40"
          >
            {PROVINCES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function MiniMap({
  zones,
  selectedId,
  onPick,
  province,
}: {
  zones: Zone[];
  selectedId: string;
  onPick: (id: string) => void;
  province: Province;
}) {
  return (
    <div className="rounded-2xl bg-white ring-1 ring-black/5 overflow-hidden">
      <div className="p-5 border-b border-black/5">
        <h3 className="font-heading text-lg font-extrabold text-brand-ink">
          Mapa de incidências ({province})
        </h3>
        <p className="mt-1 text-sm text-black/70">
          Marcação ilustrativa. Substitui por um mapa real quando tiverem a
          camada/coords.
        </p>
      </div>

      <div className="relative aspect-[16/11] bg-gradient-to-b from-black/[0.02] to-black/[0.05]">
        <svg
          viewBox="0 0 100 70"
          className="absolute inset-0 h-full w-full opacity-60"
          aria-hidden="true"
        >
          <path
            d="M8 46 C14 22, 36 10, 56 12 C72 14, 88 26, 92 40 C96 56, 78 64, 62 62 C48 60, 34 66, 20 62 C10 60, 6 54, 8 46 Z"
            fill="rgba(0,0,0,0.06)"
          />
          <path
            d="M16 44 C20 28, 38 18, 54 20 C70 22, 82 30, 84 40 C86 52, 72 56, 60 54 C48 52, 34 58, 22 54 C16 52, 14 48, 16 44 Z"
            fill="rgba(0,0,0,0.05)"
          />
        </svg>

        {zones.map((z) => {
          const mainType = z.topIncidents[0]?.type ?? "OUTROS";
          const active = z.id == selectedId;

          return (
            <button
              key={z.id}
              type="button"
              onClick={() => onPick(z.id)}
              className="absolute -translate-x-1/2 -translate-y-full group focus:outline-none"
              style={{ left: `${z.x}%`, top: `${z.y}%` }}
              aria-label={`Selecionar ${z.name}`}
            >
              <span
                className={[
                  "relative inline-flex h-7 w-7 items-center justify-center rounded-full",
                  INCIDENT_COLOR[mainType],
                  "shadow-sm ring-2 ring-white transition",
                  active ? "scale-110" : "scale-100",
                ].join(" ")}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-white/90" />
                <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-inherit ring-2 ring-white" />
              </span>

              <span className="pointer-events-none absolute left-1/2 top-[-10px] -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full bg-brand-ink px-3 py-1 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition">
                {z.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="p-5 border-t border-black/5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-brand-ink">Legenda:</span>

          {(["MAO_ARMADA", "ASSALTO", "FURTO", "OUTROS"] as IncidentType[]).map(
            (t) => (
              <span
                key={t}
                className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-brand-ink"
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${INCIDENT_COLOR[t]}`}
                />
                {INCIDENT_LABEL[t]}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function RequestInfoForm({ defaultZone }: { defaultZone?: string }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [zone, setZone] = useState(defaultZone ?? "");
  const [incident, setIncident] = useState<IncidentType | "">("");
  const [message, setMessage] = useState("");

  return (
    <div className="rounded-2xl bg-white ring-1 ring-black/5 overflow-hidden">
      <div className="p-6 md:p-7 border-b border-black/5">
        <h3 className="font-heading text-2xl font-extrabold text-brand-ink">
          Solicitar mais detalhes
        </h3>
        <p className="mt-2 text-black/70">
          Indica o bairro/zona e o tipo de incidência. A equipa ALVJAMBA
          responde com informação adicional.
        </p>
      </div>

      <form
        className="p-6 md:p-7"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Pedido submetido.");
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <label className="block md:col-span-4">
            <span className="text-sm font-semibold text-brand-ink">Nome</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-xl bg-white ring-1 ring-black/10 px-4 py-3 outline-none focus:ring-brand-primary/40"
              placeholder="Ex: João Manuel"
              required
            />
          </label>

          <label className="block md:col-span-4">
            <span className="text-sm font-semibold text-brand-ink">
              Contacto (telefone ou e-mail)
            </span>
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="mt-2 w-full rounded-xl bg-white ring-1 ring-black/10 px-4 py-3 outline-none focus:ring-brand-primary/40"
              placeholder="Ex: +244 9xx xxx xxx ou email@dominio.com"
              required
            />
          </label>

          <label className="block md:col-span-4">
            <span className="text-sm font-semibold text-brand-ink">
              Zona/Bairro
            </span>
            <input
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="mt-2 w-full rounded-xl bg-white ring-1 ring-black/10 px-4 py-3 outline-none focus:ring-brand-primary/40"
              placeholder="Ex: Talatona, Maianga, Viana..."
              required
            />
          </label>

          <label className="block md:col-span-4">
            <span className="text-sm font-semibold text-brand-ink">
              Tipo de incidência
            </span>
            <select
              value={incident}
              onChange={(e) => setIncident(e.target.value as IncidentType | "")}
              className="mt-2 w-full rounded-xl bg-white ring-1 ring-black/10 px-4 py-3 outline-none focus:ring-brand-primary/40"
              required
            >
              <option value="">Selecionar...</option>
              <option value="FURTO">Furtos</option>
              <option value="ASSALTO">Assaltos</option>
              <option value="MAO_ARMADA">Mão armada</option>
              <option value="OUTROS">Outros</option>
            </select>
          </label>

          <label className="block md:col-span-8">
            <span className="text-sm font-semibold text-brand-ink">
              Mensagem
            </span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-2 w-full min-h-[52px] md:min-h-[54px] rounded-xl bg-white ring-1 ring-black/10 px-4 py-3 outline-none focus:ring-brand-primary/40"
              placeholder="Ex: Pretendo detalhes do período, horários comuns e recomendações de prevenção."
            />
          </label>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p className="text-xs text-black/60">
            Ao enviar, confirma que os dados são de contacto válido para
            retorno.
          </p>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3 font-semibold text-white hover:opacity-95"
          >
            <Send size={18} />
            Enviar pedido
          </button>
        </div>
      </form>
    </div>
  );
}

export default function PublicSafetyBand() {
  const [province, setProvince] = useState<Province>("Luanda");
  const [selectedId, setSelectedId] = useState(ZONES[0]?.id ?? "");

  const selected = useMemo(
    () => ZONES.find((z) => z.id == selectedId) ?? ZONES[0],
    [selectedId]
  );

  const vulnerable = useMemo(
    () =>
      ZONES.filter((z) => z.risk == "ALTA" || z.risk == "MEDIA").slice(0, 4),
    []
  );

  const safe = useMemo(
    () => ZONES.filter((z) => z.risk == "BAIXA").slice(0, 4),
    []
  );

  const allPins = useMemo(() => [...vulnerable, ...safe], [vulnerable, safe]);

  return (
    <section className="py-16 md:py-24">
      <div className="container-xl">
        {/* FILTRO (acima dos dois lados) */}
        <ProvinceFilter province={province} setProvince={setProvince} />

        {/* TOP: 2 colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ESQUERDA */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-white ring-1 ring-black/5 p-6 md:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-brand-ink">
                    Zonas e níveis de incidência
                  </h2>
                  <p className="mt-2 text-black/70">
                    Mockup: o filtro altera apenas o título do mapa. As zonas
                    mantêm-se iguais por agora.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-600/10 px-3 py-1 text-sm font-semibold text-red-700">
                    <AlertTriangle size={16} />
                    Mais vulneráveis
                  </div>

                  <div className="space-y-3">
                    {vulnerable.map((z) => (
                      <ZoneRow
                        key={z.id}
                        zone={z}
                        active={z.id == selectedId}
                        onSelect={() => setSelectedId(z.id)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-600/10 px-3 py-1 text-sm font-semibold text-emerald-700">
                    <CheckCircle2 size={16} />
                    Mais seguras
                  </div>

                  <div className="space-y-3">
                    {safe.map((z) => (
                      <ZoneRow
                        key={z.id}
                        zone={z}
                        active={z.id == selectedId}
                        onSelect={() => setSelectedId(z.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {selected && (
                <div className="mt-6 rounded-2xl bg-black/[0.03] ring-1 ring-black/5 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-heading font-extrabold text-brand-ink">
                      Selecionado: {selected.name}
                    </div>
                    <span
                      className={[
                        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
                        RISK_BADGE[selected.risk],
                      ].join(" ")}
                    >
                      {selected.risk}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-black/70">
                    Principais ocorrências reportadas (índice ilustrativo):
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {selected.topIncidents.map((it) => (
                      <span
                        key={it.type}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-ink ring-1 ring-black/5"
                      >
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            INCIDENT_COLOR[it.type]
                          }`}
                        />
                        {INCIDENT_LABEL[it.type]}: {it.value}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* DIREITA */}
          <div className="lg:col-span-6">
            <MiniMap
              zones={allPins}
              selectedId={selectedId}
              onPick={setSelectedId}
              province={province}
            />

            <div className="mt-6 rounded-2xl bg-white ring-1 ring-black/5 p-6">
              <h4 className="font-heading text-lg font-extrabold text-brand-ink">
                Como ler a legenda
              </h4>
              <p className="mt-2 text-sm text-black/70">
                Cada pin assume a cor da incidência mais dominante na zona (ex.:
                “mão armada” em vermelho). Na prática, podes trocar isso para
                “nível de risco” ou “tipo selecionado”.
              </p>
            </div>
          </div>
        </div>

        {/* FORM: abaixo */}
        <div className="mt-10 md:mt-12">
          <RequestInfoForm defaultZone={selected?.name} />
        </div>
      </div>
    </section>
  );
}
