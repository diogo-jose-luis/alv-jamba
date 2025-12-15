"use client";
import Image from "next/image";
import { Clock4, Phone, Mail, MessageCircle } from "lucide-react";
import { Facebook, Linkedin, Instagram } from "lucide-react";

const WHATSAPP_NUMBER = "+244 973 722 035";
const WHATSAPP_LINK = `https://wa.me/244973722035?text=${encodeURIComponent(
  "Olá, gostaria de solicitar uma proposta."
)}`;

type ItemProps = {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  value: string;
  href?: string;
};


function InfoItem({ icon: Icon, title, value, href }: ItemProps) {
  const Inner = (
    <>
      {/* era: text-white/80 */}
      <div className="text-[13px] leading-none text-brand-muted">{title}</div>
      {/* era: text-white */}
      <div className="text-sm font-semibold text-brand-ink">{value}</div>
    </>
  );

  return (
    <div className="flex items-center gap-3">
      <div className="h-11 w-11 rounded-md grid place-items-center bg-brand-primary text-brand-secondary">
        <Icon size={18} />
      </div>
      <div className="leading-tight">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-inherit"
            aria-label={`${title}: ${value}`}
            title={`${title}: ${value}`}
          >
            {Inner}
          </a>
        ) : (
          Inner
        )}
      </div>
    </div>
  );
}


export default function ContactBar() {
  return (
    <div className="bg-white">
      {/* faixa superior com logo + infos + redes */}
      <div className="container-xl flex items-center justify-between gap-6 py-4">
        {/* logo */}
        <div className="shrink-0">
          <Image
            src="/logo.png"
            alt="ALVJAMBA"
            width={68}
            height={68}
            className="rounded"
            priority
          />
        </div>

        {/* infos – desktop */}
        <div className="hidden xl:flex items-center gap-10">
          <InfoItem
            icon={Clock4}
            title="Horário"
            value="Seg-Dom: 08h00 - 22h30"
          />
          <InfoItem icon={Phone} title="Ligue" value="+244 973 722 035" />
          <InfoItem icon={Mail} title="E-mail" value="comercial@alv-jamba.com" />
          <InfoItem
            icon={MessageCircle}
            title="WhatsApp"
            value={WHATSAPP_NUMBER}
            href={WHATSAPP_LINK}
          />
        </div>

        {/* redes sociais à direita */}
        <div className="hidden md:flex items-center gap-4">
          <a
            aria-label="LinkedIn"
            href="https://www.linkedin.com/company/alvjamba-ao/?viewAsMember=true"
            className="rounded-md p-2 bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white transition"
          >
            <Linkedin size={18} />
          </a>
          <a
            aria-label="Instagram"
            href="#"
            className="rounded-md p-2 bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white transition"
          >
            <Instagram size={18} />
          </a>
          <a
            aria-label="Facebook"
            href="https://www.facebook.com/profile.php?id=61584614113824"
            className="rounded-md p-2 bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white transition"
          >
            <Facebook size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
