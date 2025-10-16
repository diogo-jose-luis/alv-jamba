// src/app/fonts.ts
import localFont from "next/font/local";

export const dupletSans = localFont({
  src: [
    { path: "../../public/fonts/duplet/Duplet-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/duplet/Duplet-Italic.otf", weight: "400", style: "italic" },
    { path: "../../public/fonts/duplet/Duplet-Semibold.otf", weight: "600", style: "normal" },
    { path: "../../public/fonts/duplet/Duplet-SemiboldItalic.otf", weight: "600", style: "italic" },
    { path: "../../public/fonts/duplet/Duplet-Bold.otf", weight: "700", style: "normal" },
    { path: "../../public/fonts/duplet/Duplet-BoldItalic.otf", weight: "700", style: "italic" },
    { path: "../../public/fonts/duplet/Duplet-Extrabold.otf", weight: "800", style: "normal" },
    { path: "../../public/fonts/duplet/Duplet-ExtraboldItalic.otf", weight: "800", style: "italic" },
  
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Roboto", "Helvetica Neue", "Arial"],
});

export const dupletHeading = localFont({
  src: [
    { path: "../../public/fonts/duplet/Duplet-Bold.otf", weight: "700", style: "normal" },
    { path: "../../public/fonts/duplet/Duplet-Extrabold.otf", weight: "800", style: "normal" },
  ],
  variable: "--font-heading",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Roboto", "Helvetica Neue", "Arial"],
});
