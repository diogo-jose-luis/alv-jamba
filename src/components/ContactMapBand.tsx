// src/components/ContactMapBand.tsx
"use client";

import { MapPin, Mail, Phone } from "lucide-react";

type Props = {
  /** URL do embed do Google Maps (podes trocar por outro query/local) */
  mapSrc?: string;
};

export default function ContactMapBand({
  mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.777904036636!2d13.235!3d-8.827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f31b9b9b9b9b%3A0x0!2sMaianga%2C%20Luanda!5e0!3m2!1spt-PT!2sao!4v1690000000000",
}: Props) {
  return (
    <section className="relative">
      {/* MAPA full-width */}
      <div className="w-full h-[320px] md:h-[420px]">
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          aria-label="Mapa — localização ALVJAMBA"
        />
      </div>

      {/* STRIP DE INFORMAÇÕES */}
      <div className="container-xl py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* VISIT US */}
          <InfoCard
            icon={<MapPin size={20} />}
            title="Visite-nos"
            lines={[
              "Rua Comandante Argueles Nº 158",
              "Bairro do Prenda, Maianga",
              "Luanda — Angola",
            ]}
          />

          {/* MAIL US */}
          <InfoCard
            icon={<Mail size={20} />}
            title="Envie-nos um e-mail"
            lines={[
              "geral@alvjamba.co.ao",
              "comercial@alvjamba.co.ao",
            ]}
            isLink
          />

          {/* CALL US */}
          <InfoCard
            icon={<Phone size={20} />}
            title="Ligue-nos"
            lines={[
              "+244 9XX XXX XXX",
              "+244 9XX XXX XXX",
            ]}
            isTel
          />
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  title,
  lines,
  isLink = false,
  isTel = false,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
  isLink?: boolean;
  isTel?: boolean;
}) {
  return (
    <div className="group flex items-start gap-4 p-5 md:p-6 bg-white border border-black/10 hover:shadow-lg transition-shadow">
      {/* Badge amarelo */}
      <div className="shrink-0 w-12 h-12 grid place-content-center bg-brand-primary text-white">
        {icon}
      </div>

      {/* Texto */}
      <div>
        <h3 className="font-heading text-brand-ink text-lg font-extrabold mb-1">
          {title}
        </h3>
        <ul className="space-y-1.5 text-sm text-black/80">
          {lines.map((l, i) => {
            const href = isTel ? `tel:${l.replace(/\s+/g, "")}` : isLink ? `mailto:${l}` : undefined;
            return (
              <li key={i}>
                {href ? (
                  <a
                    href={href}
                    className="hover:text-brand-primary underline-offset-4 hover:underline"
                  >
                    {l}
                  </a>
                ) : (
                  <span>{l}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
