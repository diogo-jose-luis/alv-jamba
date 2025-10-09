// src/components/ClientsStrip.tsx
"use client";

import Image from "next/image";

type Client = { name: string; logo: string; href?: string };

const CLIENTS: Client[] = [
  { name: "Retrodesign", logo: "/clients/client-1.png", href: "#" },
  { name: "Hosoren",     logo: "/clients/client-2.png", href: "#" },
  { name: "Bearbrand",   logo: "/clients/client-3.png", href: "#" },
  { name: "Gentlemen",   logo: "/clients/client-4.png", href: "#" },
  { name: "Authentic",   logo: "/clients/client-5.png", href: "#" },
  { name: "Premium",     logo: "/clients/client-1.png", href: "#" },
];

export default function ClientsStrip() {
  const LOOP = [...CLIENTS, ...CLIENTS];

  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-brand-primary" />
        <div
          className="absolute inset-0 bg-center bg-repeat"
          style={{ backgroundImage: "url('/background-cliens.png')" }} // <- fix .png
        />
      </div>

      <div className="container-xl py-8 md:py-10">
        <div
          className="group overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="flex items-center gap-12 md:gap-16 animate-logo-marquee group-hover:[animation-play-state:paused]">
            {LOOP.map((c, i) => (
              <a
                key={i}
                href={c.href ?? "#"}
                className="shrink-0 flex items-center justify-center opacity-80 hover:opacity-100 transition"
                aria-label={c.name}
                title={c.name}
              >
                <Image
                  src={c.logo}
                  alt={c.name}
                  width={160}
                  height={48}
                  className="h-10 md:h-12 w-auto object-contain"
                  sizes="(min-width: 768px) 160px, 120px"
                  priority={i < 4}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
