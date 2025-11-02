"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { useScrollDirection } from "./useScrollDirection";

type Child = { label: string; href: string };
type Item = { label: string; href: string; children?: Child[] };

const ITEMS: Item[] = [
  { label: "Início", href: "/" },
  {
    label: "Quem somos",
    href: "/quem-somos",
    children: [
      { label: "Sobre nós", href: "/quem-somos" },
      { label: "História", href: "/quem-somos/historia" },
      { label: "Equipe", href: "/quem-somos/equipe" },
      { label: "Galeria", href: "/quem-somos/galeria" },
    ],
  },
  { label: "Serviços", href: "/servicos" },
  {
    label: "Recrutamento",
    href: "/recrutamento/formacao",
    children: [
      { label: "Formação", href: "/recrutamento/formacao" },
      { label: "Processo de Seleção", href: "/recrutamento/processo" },
      { label: "Candidatura Espontânea", href: "/recrutamento/candidatura" },
    ],
  },
  { label: "Responsabilidade social", href: "/responsabilidade-social" },
  {
    label: "Advertência",
    href: "/advertencia/empresas",
    children: [
      { label: "Dicas para particulares", href: "/advertencia/pessoas" },
      { label: "Dicas para empresas", href: "/advertencia/empresas" },
    ],
  },
  { label: "Contactos", href: "/contactos" },
];

export default function MainNav() {
  const pinned = useScrollDirection(140);
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null); // accordion no mobile

  const toggleMobile = () => setMobileOpen((p) => !p);
  const closeMobile = () => setMobileOpen(false);

  // Fecha o drawer sempre que a rota muda (garante “funcionou o clique”).
  useEffect(() => {
    if (mobileOpen) setMobileOpen(false);
    setOpenIdx(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Scroll-lock no body quando o drawer está aberto
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <div
        className={clsx(
          "w-full transition-all",
          pinned && "fixed top-0 z-40 bg-white/95 backdrop-blur shadow"
        )}
      >
        <nav className="container-xl flex items-center justify-between h-14">
          {/* --- desktop --- */}
          <ul className="hidden md:flex items-stretch gap-2">
            {ITEMS.map((it, idx) => {
              const isActive =
                pathname === it.href || pathname?.startsWith(it.href + "/");
              return (
                <li key={idx} className="relative group">
                  <Link
                    href={it.href}
                    className={clsx(
                      "px-4 h-14 flex items-center text-sm font-semibold text-brand-ink hover:text-brand-primary relative",
                      isActive &&
                        "after:absolute after:inset-x-0 after:top-0 after:h-[3px] after:bg-brand-primary"
                    )}
                  >
                    {it.label}
                  </Link>

                  {/* submenu (desktop hover) */}
                  {it.children?.length ? (
                    <ul className="absolute left-0 top-full z-50 hidden group-hover:block min-w-[240px] bg-brand-primary text-white border border-white/10 shadow-md">
                      <li className="h-[3px] bg-brand-primary" />
                      {it.children.map((c, i) => (
                        <li key={i} className="border-t border-white/15">
                          <Link
                            href={c.href}
                            className="block px-4 py-3 text-sm hover:bg-brand-secondary hover:text-black"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>

          {/* CTA desktop */}
          <a
            href="#proposta"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent("open-proposal"));
            }}
            className="hidden md:inline-flex items-center justify-center h-full px-5
                       bg-brand-primary text-white border border-brand-primary
                       hover:bg-transparent hover:text-brand-primary"
          >
            Solicitar Proposta
          </a>

          {/* hamburger mobile */}
          <button
            onClick={toggleMobile}
            className="md:hidden text-brand-ink hover:text-brand-primary"
            aria-label="Abrir menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* backdrop mobile */}
      <div
        className={clsx(
          "fixed inset-0 z-50 bg-black/40 transition-opacity duration-200 md:hidden",
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={closeMobile}
      />

      {/* drawer mobile */}
      <div
        id="mobile-drawer"
        className={clsx(
          "fixed right-0 top-0 bottom-0 z-[60] w-72 bg-white shadow-xl md:hidden transform transition-transform duration-300 flex flex-col",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between h-14 px-4 border-b border-black/10">
          <h3 className="font-heading text-brand-primary text-lg">Menu</h3>
          <button
            onClick={closeMobile}
            className="text-brand-ink hover:text-brand-primary"
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-2">
          {ITEMS.map((it, idx) => {
            const hasChildren = !!it.children?.length;
            const expanded = openIdx === idx;

            return (
              <div key={idx} className="mb-1">
                {/* Linha do item pai (no mobile vira botão se tiver filhos) */}
                {hasChildren ? (
                  <button
                    type="button"
                    onClick={() => setOpenIdx(expanded ? null : idx)}
                    className="w-full flex items-center justify-between py-3 px-2 font-semibold text-left text-brand-ink hover:text-brand-primary border-b border-black/5"
                    aria-expanded={expanded}
                    aria-controls={`submenu-${idx}`}
                  >
                    <span>{it.label}</span>
                    <ChevronDown
                      size={18}
                      className={clsx(
                        "transition-transform",
                        expanded && "rotate-180"
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    href={it.href}
                    className="block py-3 px-2 font-semibold text-brand-ink hover:text-brand-primary border-b border-black/5"
                  >
                    {it.label}
                  </Link>
                )}

                {/* Submenu (mobile accordion) */}
                {hasChildren && (
                  <ul
                    id={`submenu-${idx}`}
                    className={clsx(
                      "overflow-hidden transition-[max-height,opacity] duration-300",
                      expanded ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    {/* Link para a página pai (opcional) */}
                    <li>
                      <Link
                        href={it.href}
                        className="block pl-4 pr-2 py-3 text-sm font-semibold text-brand-primary hover:underline"
                      >
                        Ver página “{it.label}”
                      </Link>
                    </li>

                    {it.children!.map((c, i) => (
                      <li key={i} className="border-t border-black/5">
                        <Link
                          href={c.href}
                          className="block pl-4 pr-2 py-3 text-sm text-black/70 hover:text-brand-primary"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-4 border-t border-black/10">
          <button
            onClick={() => {
              closeMobile();
              window.dispatchEvent(new CustomEvent("open-proposal"));
            }}
            className="w-full btn btn-primary"
          >
            Solicitar Proposta
          </button>
        </div>
      </div>
    </>
  );
}
