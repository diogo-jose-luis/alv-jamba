"use client";
import { Facebook, Linkedin, Instagram } from "lucide-react";

export default function TopBar() {
  return (
    <div className="hidden md:block bg-[#222222] text-white/80 text-sm">
      <div className="container-xl flex items-center justify-between h-10">
        <div className="flex items-center gap-4">
          <a href="#" aria-label="Facebook" className="hover:text-white"><Facebook size={16} /></a>
          <a href="#" aria-label="LinkedIn" className="hover:text-white"><Linkedin size={16} /></a>
          <a href="#" aria-label="Instagram" className="hover:text-white"><Instagram size={16} /></a>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white">FAQ’s</a>
          <a href="#" className="hover:text-white">Suporte</a>
          <a href="#" className="hover:text-white">PT / EN</a>
        </div>
      </div>
    </div>
  );
}
