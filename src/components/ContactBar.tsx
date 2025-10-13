"use client";
import Image from "next/image";
import { Clock4, Phone, Mail, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "+244 999 000 000"; // troque pelo número oficial, se necessário
const WHATSAPP_LINK = `https://wa.me/244999000000?text=${encodeURIComponent(
  "Olá, gostaria de solicitar uma proposta."
)}`;

function InfoItem({
  icon: Icon,
  title,
  value,
  href,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <div className="font-semibold text-brand-ink">{title}</div>
      <div className="text-sm text-brand-muted">{value}</div>
    </>
  );

  return (
    <div className="flex items-center gap-3">
      <div className="shrink-0 flex items-center justify-center h-10 w-10 bg-brand-primary/10 text-brand-primary">
        <Icon size={18} />
      </div>
      <div className="leading-tight">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-block"
            aria-label={`${title}: ${value}`}
            title={`${title}: ${value}`}
          >
            {content}
          </a>
        ) : (
          content
        )}
      </div>
    </div>
  );
}

export default function ContactBar() {
  return (
    <div className="bg-white">
      <div className="container-xl flex items-center justify-between gap-6 py-4">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="ALVJAMBA" width={56} height={56} className="rounded" />
        </div>

        <div className="hidden lg:flex items-center gap-10 text-sm">
          <InfoItem icon={Clock4} title="Horário" value="Seg-Dom: 8h00–22h30" />
          <InfoItem icon={Phone}  title="Ligue"   value="+244 999 000 000" />
          <InfoItem icon={Mail}   title="E-mail"  value="contato@alvjamba.com" />
          {/* Novo item: WhatsApp */}
          <InfoItem
            icon={MessageCircle}
            title="WhatsApp"
            value={WHATSAPP_NUMBER}
            href={WHATSAPP_LINK}
          />
        </div>
      </div>
      <div className="h-px bg-black/10" />
    </div>
  );
}
