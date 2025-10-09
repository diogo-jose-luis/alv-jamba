"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import Image from "next/image";

type Props = {
  title: string;
  subtitle?: string;
  image: string;
  className?: string;
  objectPosition?: string; // "center top", "50% 10%", etc.
};

export default function PageHero({
  title,
  subtitle,
  image,
  className,
  objectPosition,
}: Props) {
  return (
    <section className={clsx("relative overflow-hidden", className)}>
      {/* Fundo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={image} // a tua prop/variável
          alt=""
          fill
          priority
          className="w-full h-full object-cover object-top"
          style={{ objectPosition: objectPosition ?? "center top" }}
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/30 via-transparent to-brand-secondary/20" />
      </div>

      {/* Conteúdo central dentro de um “glass box” */}
      <div className="container-xl h-[42vh] md:h-[48vh] flex items-center justify-center px-6">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0, y: 42 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 1.15,
                ease: [0.22, 1, 0.36, 1],
                when: "beforeChildren",
                staggerChildren: 0.12,
              },
            },
          }}
          // a caixinha (retângulo)
          className="inline-block max-w-3xl text-center
                     px-8 py-6 md:px-12 md:py-8
                     bg-black/20 backdrop-blur-[2px]
                     ring-1 ring-white/25 shadow-[0_1px_0_0_rgba(255,255,255,0.08)_inset]"
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 28 },
              show: { opacity: 1, y: 0, transition: { duration: 1.1 } },
            }}
            className="font-heading text-3xl md:text-5xl text-white font-bold leading-tight drop-shadow"
          >
            {title}
          </motion.h1>

          {subtitle ? (
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 1 } },
              }}
              className="mt-2 text-white/85"
            >
              {subtitle}
            </motion.p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
