'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ChevronRight, Layers, LayoutGrid } from 'lucide-react';

interface TopBarProps {
  onToggleMobileMenu?: () => void;
}

const routeTitles: Record<string, string> = {
  '/cuenta/dashboard': 'Dashboard Principal',
  '/cuenta/relaciones': 'Relaciones & Directorio',
  '/cuenta/ofertas': 'Catálogo de Ofertas',
  '/cuenta/encargos': 'Encargos & Publicaciones',
  '/cuenta/saldo': 'Saldo & Tokens',
  '/cuenta/resultados': 'Rendimiento & Liquidaciones',
  '/cuenta/inteligencia': 'Inteligencia & Tendencias',
  '/cuenta/think-tank': 'Servicios Think Tank',
  '/espacio/dashboard': 'Dashboard Operativo',
  '/espacio/contactos': 'Gestión de Contactos (CRM)',
  '/espacio/canales': 'Conexión de Canales',
  '/espacio/bandeja': 'Bandeja Omnicanal',
  '/espacio/agentes': 'Orquestación de Agentes IA',
  '/espacio/marketing': 'Marketing & Difusión',
};

export default function TopBar({ onToggleMobileMenu }: TopBarProps) {
  const pathname = usePathname();
  const isWorkspace = pathname?.startsWith('/espacio');
  const currentSection = pathname ? routeTitles[pathname] || pathname.split('/').pop() || 'Vista' : 'Vista';

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3 border-b bg-white/95 backdrop-blur-sm shadow-xs transition-all">
      {/* Lado izquierdo: Botón hamburguesa móvil + Breadcrumbs arquitectónicas */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Botón de Menú Hamburguesa Móvil */}
        <button
          type="button"
          onClick={onToggleMobileMenu}
          aria-label="Abrir menú de navegación"
          className="md:hidden p-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex-shrink-0"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb de Dominio Arquitectónico */}
        <nav aria-label="Miga de pan" className="flex items-center gap-2 text-xs sm:text-sm min-w-0 truncate">
          {/* Badge Arquitectónico Fijo */}
          {isWorkspace ? (
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shadow-xs flex-shrink-0"
              style={{ backgroundColor: '#29DDDA', color: '#091231' }}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Capa de Espacio (Workspace)</span>
            </span>
          ) : (
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shadow-xs flex-shrink-0 text-white"
              style={{ backgroundColor: '#091231' }}
            >
              <Layers className="w-3.5 h-3.5 text-[#29DDDA]" />
              <span>Capa de Cuenta (Network)</span>
            </span>
          )}

          <ChevronRight className="w-3.5 h-3.5 text-slate-300 flex-shrink-0 hidden sm:inline" />

          {/* Sección Activa */}
          <span className="font-bold text-slate-800 truncate hidden sm:inline">
            {currentSection}
          </span>
        </nav>
      </div>

      {/* Lado derecho: Estado del Nodo y Enlace Rápido */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-600 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Nodo Online</span>
        </div>

        <Link
          href="/"
          className="text-xs font-bold text-slate-500 hover:text-orbix-navy px-2.5 py-1 rounded-lg hover:bg-slate-100 transition-colors"
        >
          Portal Inicio
        </Link>
      </div>
    </header>
  );
}
