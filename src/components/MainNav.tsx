"use client";

import { useState } from "react";
import clsx from "clsx";
import { useScrollDirection } from "./useScrollDirection";
import { Menu, X } from "lucide-react";

type Item = { label: string; href: string; children?: string[] };

const ITEMS: Item[] = [
  { label: "Início", href: "/" },
  { label: "Quem somos", href: "/quem-somos", children: ["História", "Equipe"] },
  { label: "O que fizemos", href: "/portfolio" },
  { label: "Recrutamento", href: "/recrutamento", children: ["Formação", "Processo de Seleção", "Candidatura Espontânea"] },
  { label: "Responsabilidade social", href: "/responsabilidade-social" },
  { label: "Advertência", href: "/advertencia", children: ["Dica para pessoas", "Dica para empresas"] },
  { label: "Contactos", href: "/contactos" },
];

export default function MainNav() {
  const pinned = useScrollDirection(140);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen((p) => !p);
  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <div
        className={clsx(
          "w-full transition-all",
          pinned && "fixed top-0 z-40 bg-white/95 backdrop-blur shadow"
        )}
      >
        <nav className="container-xl flex items-center justify-between h-14">
          {/* --- desktop menu --- */}
          <ul className="hidden md:flex items-stretch gap-2">
            {ITEMS.map((it, idx) => (
              <li key={idx} className="relative group">
                <a
                  href={it.href}
                  className={clsx(
                    "px-4 h-14 flex items-center text-sm font-semibold text-brand-ink hover:text-brand-primary relative",
                    it.label === "Início" &&
                      "after:absolute after:inset-x-0 after:top-0 after:h-[3px] after:bg-brand-primary"
                  )}
                >
                  {it.label}
                </a>

                {it.children?.length ? (
                  <ul
                    className="absolute left-0 top-full z-50 hidden group-hover:block min-w-[240px]
                               bg-brand-primary text-white border border-white/10 shadow-md"
                  >
                    <li className="h-[3px] bg-brand-primary" />
                    {it.children.map((c, i) => (
                      <li key={i} className="border-t border-white/15">
                        <a
                          href="#"
                          className="block px-4 py-3 text-sm hover:bg-brand-secondary hover:text-black"
                        >
                          {c}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>

          {/* --- CTA desktop --- */}
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

          {/* --- hamburger mobile --- */}
          <button
            onClick={toggleMobile}
            className="md:hidden text-brand-ink hover:text-brand-primary"
            aria-label="Abrir menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* --- Drawer mobile --- */}
      <div
        className={clsx(
          "fixed inset-0 z-50 bg-black/40 transition-opacity duration-200 md:hidden",
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={closeMobile}
      />

      <div
        className={clsx(
          "fixed right-0 top-0 bottom-0 z-[60] w-72 bg-white shadow-xl md:hidden transform transition-transform duration-300 flex flex-col",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-14 px-4 border-b border-black/10">
          <h3 className="font-heading text-brand-primary text-lg">Menu</h3>
          <button onClick={closeMobile} className="text-brand-ink hover:text-brand-primary">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-3">
          {ITEMS.map((it, idx) => (
            <div key={idx} className="mb-1">
              <a
                href={it.href}
                onClick={closeMobile}
                className="block py-3 font-semibold text-brand-ink hover:text-brand-primary border-b border-black/5"
              >
                {it.label}
              </a>

              {/* filhos como dropdown simples */}
              {it.children?.length && (
                <ul className="ml-3 mb-2">
                  {it.children.map((c, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        onClick={closeMobile}
                        className="block py-2 text-sm text-black/70 hover:text-brand-primary"
                      >
                        {c}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
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
