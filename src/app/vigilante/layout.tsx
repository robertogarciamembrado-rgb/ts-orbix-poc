// src/app/vigilante/layout.tsx
import Link from 'next/link';
import { Radar, Newspaper, FileText, Bot, Settings } from 'lucide-react';

const tabs = [
  { label: 'Radar Estratégico', href: '/vigilante/radar',     icon: Radar },
  { label: 'Noticias Relevantes', href: '/vigilante/noticias', icon: Newspaper },
  { label: 'Informes',           href: '/vigilante/informes',  icon: FileText },
  { label: 'Asistente IA',       href: '/vigilante/asistente', icon: Bot },
  { label: 'Configuración',      href: '/vigilante/config',    icon: Settings },
];

export default function VigilanteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#091231', color: '#FFFFFF' }}>

      {/* ── TOP HEADER BAR ─────────────────────────────────────────── */}
      <header className="border-b" style={{ borderColor: 'rgba(41,221,218,0.15)', backgroundColor: '#060D1F' }}>
        <div className="max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-white font-bold text-sm tracking-widest">TS</span>
              <span className="font-bold text-sm tracking-widest" style={{ color: '#29DDDA' }}>ORBIX</span>
            </div>
            <span className="text-white/20 text-sm">|</span>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#29DDDA' }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#29DDDA' }}>
                AVIA Vigilante
              </span>
            </div>
          </div>
          <Link
            href="/cuenta/dashboard"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all hover:bg-white/5"
            style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }}
          >
            ← Volver a Cuenta
          </Link>
        </div>
      </header>

      {/* ── SECONDARY TAB NAV ──────────────────────────────────────── */}
      <nav className="border-b" style={{ borderColor: 'rgba(255,255,255,0.06)', backgroundColor: '#060D1F' }}>
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex gap-0.5 overflow-x-auto">
            {tabs.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1.5 px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors hover:text-white"
                style={{
                  borderColor: 'transparent',
                  color: 'rgba(255,255,255,0.45)',
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* ── PAGE CONTENT ───────────────────────────────────────────── */}
      <main className="flex-1 max-w-screen-xl mx-auto w-full px-6 py-6">
        {children}
      </main>
    </div>
  );
}
