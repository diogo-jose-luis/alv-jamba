"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, UserRound, ArrowRight } from "lucide-react";

export type Post = {
  title: string;
  date: string;
  author?: string;
  excerpt: string;
  image: string;
  href?: string;
};

export const POSTS: Post[] = [
  {
    title: "Novas Técnicas de Segurança",
    date: "2 Jul, 2023",
    author: "ALVJAMBA",
    excerpt:
      "Boas práticas e tecnologias que elevam a eficácia operacional no terreno.",
    image: "/news/news-1.png",
    href: "/blog/novas-tecnicas",
  },
  {
    title: "Operação Portuária: Controlo & SOC",
    date: "2 Jul, 2023",
    author: "Operações",
    excerpt:
      "Integração entre controlo de acesso, CCTV e resposta coordenada .",
    image: "/news/news-2.png",
    href: "/blog/porto-soc",
  },
  {
    title: "Resposta Imediata e Dissuasão",
    date: "2 Jul, 2023",
    author: "QRF",
    excerpt:
      "Como a presença certa no momento certo reduz incidentes críticos.",
    image: "/news/news-3.png",
    href: "/blog/qrf-dissuasaov",
  },
];

function PostCard({
  title,
  date,
  author,
  excerpt,
  image,
  href = "#",
  priority = false,
}: Post & { priority?: boolean }) {
  return (
    <article className="group">
      {/* imagem */}
      <div className="overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={960}
          height={640}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          priority={priority}
        />
      </div>

      {/* meta */}
      <div className="flex items-center gap-6 text-sm text-black/70 mt-4">
        <div className="flex items-center gap-2">
          <CalendarDays size={16} className="text-brand-secondary" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <UserRound size={16} className="text-brand-secondary" />
          <span>By: {author ?? "Admin"}</span>
        </div>
      </div>

      {/* título + excerto */}
      <h3 className="mt-3 font-heading text-xl font-extrabold text-brand-ink group-hover:text-brand-primary transition-colors">
        <Link href={href} className="block">
          {title.toUpperCase()}
        </Link>
      </h3>

      <p className="mt-2 text-black/70 leading-relaxed line-clamp-3">{excerpt}</p>

      {/* ler mais */}
      <Link
        href={href}
        className="mt-3 inline-flex items-center gap-2 font-semibold text-brand-primary hover:text-brand-ink"
      >
        Ler mais <ArrowRight size={16} />
      </Link>
    </article>
  );
}

type Props = {
  posts?: Post[];
  itemsToShow?: number; // ex: 3 no Home
  showHeader?: boolean; // false na página /artigos
  title?: string;
  subtitle?: string;
  className?: string;
};

export default function NewsSection({
  posts = POSTS,
  itemsToShow,
  showHeader = true,
  title = "ARTIGOS E UTILIDADE PÚBLICA",
  subtitle = "Atualizações, operações e insights da ALVJAMBA.",
  className = "",
}: Props) {
  const visiblePosts =
    typeof itemsToShow === "number" ? posts.slice(0, itemsToShow) : posts;

  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="container-xl">
        {/* título */}
        {showHeader && (
          <div className="text-center mb-10 md:mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand-ink">
              {title}
            </h2>
            <p className="mt-3 text-black/70">{subtitle}</p>
          </div>
        )}

        {/* grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visiblePosts.map((p, i) => (
            <PostCard key={p.href ?? `${p.title}-${i}`} {...p} priority={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
