// src/components/SiteFooter.tsx
"use client";

import Image from "next/image";
import { Facebook, Linkedin, Instagram, Mail, Phone } from "lucide-react";
import { useState } from "react";

const LINKS = [
  { label: "Sobre nós", href: "/quem-somos" },
  { label: "Serviços", href: "/o-que-fizemos" },
  { label: "Vantagens", href: "#vantagens" },
  { label: "Testemunhos", href: "#testemunhos" },
  { label: "Solicitações", href: "#orcamento" },
  { label: "Suporte", href: "/suporte" },
  { label: "Contactos", href: "/contactos" },
];

const UPDATES = [
  { label: "Integração CCTV + SOC", href: "/blog/cctv-soc" },
  { label: "Procedimentos QRF", href: "/blog/qrf-procedimentos" },
  { label: "Boas práticas Onshore", href: "/blog/onshore-praticas" },
];

export default function SiteFooter() {

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
      alert("Ocorreu um erro ao enviar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <footer className="relative">
      {/* bloco principal escuro */}
      <div className="bg-[#17202A] text-white">
        <div className="container-xl py-12 md:py-16 grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* ABOUT */}
          <div>
            <h4 className="font-heading text-lg font-extrabold mb-4">SOBRE NÓS</h4>
            <div className="w-56 h-32 relative mb-4">
              <Image
                src="/team/team.jpg"
                alt="ALVJAMBA"
                fill
                className="object-cover"
                priority
              />
            </div>
            <p className="text-white/80 leading-relaxed max-w-[42ch]">
              A ALVJAMBA oferece segurança privada com equipas certificadas, processos
              robustos e tecnologia integrada para proteger pessoas e património. 
            </p>
            <div className="mt-4 space-y-1 text-white/80 text-sm">
              <div className="flex items-center gap-2"><Phone size={16} className="text-brand-secondary" /> (+244) 973 722 035</div>
              <div className="flex items-center gap-2"><Mail size={16} className="text-brand-secondary" /> comercial@alv-jamba.com</div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-heading text-lg font-extrabold mb-4">LINKS RÁPIDOS</h4>
            <ul className="space-y-2">
              {LINKS.map((l, i) => (
                <li key={i}>
                  <a href="#" className="inline-block py-1 text-white/85 hover:text-brand-secondary">
                    » {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* UPDATES (substitui Twitter) */}
          <div>
            <h4 className="font-heading text-lg font-extrabold mb-4">ÚLTIMAS ATUALIZAÇÕES</h4>
            <ul className="divide-y divide-white/10">
              {UPDATES.map((u, i) => (
                <li key={i} className="py-3">
                  <a href="#" className="text-white/85 hover:text-brand-secondary">
                    {u.label}
                  </a>
                  <div className="mt-1 text-xs text-white/60">Leia no nosso blog</div>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT FORM */}
          <div className="bg-white/05 p-6 border border-white/10">
            <h4 className="font-heading text-lg font-extrabold mb-4 text-white">CONTACTE-NOS</h4>
            <form
              className="space-y-3"
              onSubmit={onSubmit}
            >
              <input
                name="name"
                placeholder="Nome"
                className="w-full h-11 px-3 bg-white text-black border border-white/10 outline-none"
                required
              />
              <input
                name="email"
                placeholder="Email"
                type="email"
                className="w-full h-11 px-3 bg-white text-black border border-white/10 outline-none"
                required
              />
              <textarea
                name="message"
                placeholder="Mensagem"
                rows={3}
                className="w-full px-3 py-2 bg-white text-black border border-white/10 outline-none resize-y"
              />
              <button
                type="submit"
                className="h-11 px-6 font-semibold bg-brand-primary text-white hover:brightness-110"
              >
                ENVIAR MENSAGEM
              </button>
            </form>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-4 text-white/80">
              <a href="https://www.facebook.com/profile.php?id=61584614113824" aria-label="Facebook" className="hover:text-brand-secondary"><Facebook size={18} /></a>
              <a href="https://www.linkedin.com/company/alvjamba-ao/?viewAsMember=true" aria-label="LinkedIn" className="hover:text-brand-secondary"><Linkedin size={18} /></a>
              <a href="https://www.instagram.com/alvjamba.ao?igsh=c2Y3MGRoOTY2eTR3" aria-label="Instagram" className="hover:text-brand-secondary"><Instagram size={18} /></a>
            </div>
          </div>
        </div>
      </div>

      {/* barra inferior */}
      <div className="bg-[#111821] text-white/80">
        <div className="container-xl h-12 flex flex-col md:flex-row items-center justify-between gap-2 text-sm">
          <div>© {new Date().getFullYear()} ALVJAMBA Segurança. Todos os direitos reservados.</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-brand-secondary">Política de Privacidade</a>
            <a href="#" className="hover:text-brand-secondary">Termos & Condições</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
