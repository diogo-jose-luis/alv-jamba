// src/components/ClientsStrip.tsx
"use client";

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
  // duplicamos para criar loop perfeito
  const LOOP = [...CLIENTS, ...CLIENTS];

  return (
    <section className="relative">
      {/* BG base + pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-brand-primary" />
        <div
          className="absolute inset-0 bg-center bg-repeat"
          style={{ backgroundImage: "url('/background-clients.pn')" }}
        />
      </div>

      <div className="container-xl py-8 md:py-10">
        {/* marquee */}
        <div
          className="group overflow-hidden"
          style={{
            // fade nas bordas
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div
            className="flex items-center gap-12 md:gap-16 animate-logo-marquee
                       group-hover:[animation-play-state:paused]"
          >
            {LOOP.map((c, i) => (
              <a
                key={i}
                href={c.href ?? "#"}
                className="shrink-0 flex items-center justify-center opacity-80 hover:opacity-100 transition"
                aria-label={c.name}
                title={c.name}
              >
                <img
                  src={c.logo}
                  alt={c.name}
                  className="h-10 md:h-12 w-auto object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
