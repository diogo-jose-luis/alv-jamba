"use client";
import Image from "next/image";
import { Clock4, Phone, Mail } from "lucide-react";

function InfoItem({
  icon: Icon,
  title,
  value,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {/* h-10 ≈ altura de duas linhas de texto  */}
      <div className="shrink-0 flex items-center justify-center h-10 w-10 bg-brand-primary/10 text-brand-primary">
        <Icon size={18} />
      </div>
      <div className="leading-tight">
        <div className="font-semibold text-brand-ink">{title}</div>
        <div className="text-sm text-brand-muted">{value}</div>
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
          {/* <div className="leading-tight">
            <strong className="font-heading text-xl text-brand-primary">ALVJAMBA</strong>
            <div className="text-sm text-brand-muted">Segurança Privada</div>
          </div> */}
        </div>

        <div className="hidden lg:flex items-center gap-10 text-sm">
          <InfoItem icon={Clock4} title="Horário" value="Seg-Dom: 8h00–22h30" />
          <InfoItem icon={Phone}  title="Ligue"   value="+244 999 000 000" />
          <InfoItem icon={Mail}   title="E-mail"  value="contato@alvjamba.com" />
        </div>
      </div>
      <div className="h-px bg-black/10" />
    </div>
  );
}
