"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Globe, ExternalLink } from "lucide-react";

export default function LandingFooter() {
  return (
    <footer className="w-full bg-orbix-navy border-t border-white/10 text-white/70 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Columna Marca */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-white text-2xl font-bold tracking-widest font-sans">
                TS
              </span>
              <span
                style={{ color: "#29DDDA" }}
                className="text-orbix-cyan text-2xl font-bold tracking-widest"
              >
                ORBIX
              </span>
            </div>
            <p className="text-sm text-white/60 max-w-md leading-relaxed">
              Infraestructura descentralizada de colaboración, economía circular y gobernanza
              tecnológica para el ecosistema global de Tourism & Society Think Tank.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
              <span className="w-2 h-2 rounded-full bg-[#29DDDA] animate-pulse"></span>
              Red Activa · Nodos Interconectados en Europa y América
            </div>
          </div>

          {/* Enlaces de Ecosistema */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Ecosistema
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/miembro/descubrir" className="hover:text-orbix-cyan transition-colors">
                  Portal del Viajero (B2C)
                </Link>
              </li>
              <li>
                <Link href="/cuenta/dashboard" className="hover:text-orbix-cyan transition-colors">
                  Consola de Nodo B2B
                </Link>
              </li>
              <li>
                <Link href="/vigilante/radar" className="hover:text-orbix-cyan transition-colors">
                  AVIA Vigilante
                </Link>
              </li>
              <li>
                <Link href="/cuenta/think-tank" className="hover:text-orbix-cyan transition-colors">
                  Servicios Think Tank
                </Link>
              </li>
            </ul>
          </div>

          {/* Think Tank Institucional */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Tourism & Society
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#thinktank"
                  className="hover:text-orbix-cyan transition-colors flex items-center gap-1.5"
                >
                  Sobre el Think Tank <ExternalLink className="w-3 h-3 text-white/40" />
                </a>
              </li>
              <li>
                <a href="#partner" className="hover:text-orbix-cyan transition-colors">
                  Programa de Partners
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-orbix-cyan transition-colors">
                  Contacto Institucional
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} TS Orbix · Todos los derechos reservados.</p>

          {/* Enlaces Legales requeridos exclusivamente en el Footer */}
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/legal/aviso-legal"
              className="hover:text-orbix-cyan transition-colors underline-offset-4 hover:underline"
            >
              Aviso Legal
            </Link>
            <Link
              href="/legal/privacidad"
              className="hover:text-orbix-cyan transition-colors underline-offset-4 hover:underline"
            >
              Política de Privacidad
            </Link>
            <Link
              href="/legal/cookies"
              className="hover:text-orbix-cyan transition-colors underline-offset-4 hover:underline"
            >
              Política de Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
