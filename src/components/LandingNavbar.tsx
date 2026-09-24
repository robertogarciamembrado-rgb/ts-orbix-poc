"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Globe, ArrowRight, ShieldCheck } from "lucide-react";

interface LandingNavbarProps {
  onOpenOrbixer?: () => void;
  onOpenPartner?: () => void;
}

export default function LandingNavbar({ onOpenOrbixer, onOpenPartner }: LandingNavbarProps) {
  const [lang, setLang] = useState<"ES" | "EN">("ES");
  // Tienda solo visible para logueados (por defecto false para la landing pública)
  const [isLoggedIn] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full bg-orbix-navy/90 backdrop-blur border-b border-white/10 transition-all"
      style={{ backgroundColor: "rgba(9, 18, 49, 0.95)" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo oficial horizontal arriba a la izquierda */}
        <Link href="/" className="flex items-center group">
          <Image
            alt="TS Orbix Logo"
            className="object-contain brightness-0 invert"
            height={50}
            src="/cropped-cropped-cropped-ORBIXHA-scaled-1-e1786624753942.png"
            width={180}
            priority
          />
        </Link>

        {/* Menú Central */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
          <a href="#ecosistema" className="hover:text-orbix-cyan transition-colors">
            Ecosistema
          </a>
          <a href="#orbixer" className="hover:text-orbix-cyan transition-colors">
            Orbixers
          </a>
          <a href="#partner" className="hover:text-orbix-cyan transition-colors">
            Partners
          </a>
          <a href="#thinktank" className="hover:text-orbix-cyan transition-colors">
            Think Tank
          </a>

          {/* Tienda: Oculta para no logueados */}
          {isLoggedIn && (
            <Link href="/tienda" className="hover:text-orbix-cyan transition-colors">
              Tienda
            </Link>
          )}
        </nav>

        {/* Lado Derecho: Idioma + Acciones */}
        <div className="flex items-center gap-4">
          {/* Selector de Idioma (ES / EN) */}
          <div className="flex items-center bg-white/10 rounded-lg p-0.5 border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => setLang("ES")}
              className={`px-2.5 py-1 rounded font-semibold transition-all ${
                lang === "ES"
                  ? "bg-orbix-cyan text-orbix-navy shadow-sm"
                  : "text-white/70 hover:text-white"
              }`}
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => setLang("EN")}
              className={`px-2.5 py-1 rounded font-semibold transition-all ${
                lang === "EN"
                  ? "bg-orbix-cyan text-orbix-navy shadow-sm"
                  : "text-white/70 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>

          {/* Enlace directo a la consola B2B (PoC) */}
          <Link
            href="/cuenta/dashboard"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white/90 bg-white/10 hover:bg-white/20 border border-white/15 rounded-lg transition-all"
          >
            <span>Consola B2B</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* CTA Registro Partner */}
          {onOpenPartner ? (
            <button
              type="button"
              onClick={onOpenPartner}
              className="px-4 py-2 text-xs sm:text-sm font-bold rounded-lg bg-orbix-cyan text-orbix-navy hover:brightness-110 shadow-lg shadow-[#29DDDA]/20 transition-all"
            >
              Acceso Partner
            </button>
          ) : (
            <Link
              href="/registro/partner"
              className="px-4 py-2 text-xs sm:text-sm font-bold rounded-lg bg-orbix-cyan text-orbix-navy hover:brightness-110 shadow-lg shadow-[#29DDDA]/20 transition-all"
            >
              Acceso Partner
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
