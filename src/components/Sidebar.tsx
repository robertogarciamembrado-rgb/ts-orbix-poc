'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Wallet,
  Inbox,
  ClipboardList,
  BarChart2,
  BrainCircuit,
  Bot,
  Send,
  FileText,
  type LucideIcon,
} from 'lucide-react';

const accountItems = [
  { name: 'Dashboard',      href: '/cuenta/dashboard',    icon: LayoutDashboard },
  { name: 'Relaciones',     href: '/cuenta/relaciones',   icon: Users },
  { name: 'Ofertas',        href: '/cuenta/ofertas',      icon: CreditCard },
  { name: 'Encargos',      href: '/cuenta/encargos',    icon: ClipboardList },
  { name: 'Saldo',          href: '/cuenta/saldo',        icon: Wallet },
  { name: 'Resultados',     href: '/cuenta/resultados',   icon: BarChart2 },
  { name: 'Inteligencia',   href: '/cuenta/inteligencia', icon: BrainCircuit },
  { name: 'Think Tank',     href: '/cuenta/think-tank',   icon: FileText },
];




const workspaceItems = [
  { name: 'Dashboard',   href: '/espacio/dashboard',  icon: LayoutDashboard },
  { name: 'Contactos',   href: '/espacio/contactos',  icon: Users },
  { name: 'Canales',     href: '/espacio/canales',    icon: CreditCard },
  { name: 'Bandeja',     href: '/espacio/bandeja',    icon: Inbox },
  { name: 'Agentes IA',  href: '/espacio/agentes',    icon: Bot },
  { name: 'Marketing',   href: '/espacio/marketing', icon: Send },
];


import { X } from 'lucide-react';

interface SidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

function NavItem({
  name,
  href,
  icon: Icon,
  accentActive,
  onClick,
}: {
  name: string;
  href: string;
  icon: LucideIcon;
  accentActive: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-normal text-white transition-colors ${
        active ? `${accentActive} font-bold` : 'hover:bg-white/10'
      }`}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      {name}
    </Link>
  );
}

export default function Sidebar({ mobileOpen = false, onClose }: SidebarProps) {
  const sidebarContent = (
    <div className="flex flex-col h-full bg-orbix-navy" style={{ backgroundColor: '#091231' }}>
      {/* Logo y botón cerrar en móvil */}
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
        <Link href="/" onClick={onClose} className="flex items-center">
          <Image
            alt="TS Orbix Logo"
            className="object-contain brightness-0 invert"
            height={36}
            src="/cropped-cropped-cropped-ORBIXHA-scaled-1-e1786624753942.png"
            width={140}
            priority
          />
        </Link>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú de navegación"
            className="md:hidden p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Account layer */}
      <div className="px-3 py-4">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2 px-2" style={{ color: '#3371AF' }}>
          Capa de Cuenta
        </p>
        <nav className="space-y-0.5">
          {accountItems.map((item) => (
            <NavItem
              key={item.href}
              {...item}
              accentActive="bg-orbix-ts"
              onClick={onClose}
            />
          ))}
        </nav>
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-white/10" />

      {/* Workspace layer */}
      <div className="px-3 py-4 flex-1">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2 px-2" style={{ color: '#29DDDA' }}>
          Espacio de Trabajo
        </p>
        <nav className="space-y-0.5">
          {workspaceItems.map((item) => (
            <NavItem
              key={item.href}
              {...item}
              accentActive="bg-orbix-tagline"
              onClick={onClose}
            />
          ))}
        </nav>
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-white/10" />

      {/* Demo flows */}
      <div className="px-3 py-3">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2 px-2" style={{ color: 'rgba(255,255,255,0.25)' }}>
          Flujos Demo
        </p>
        <nav className="space-y-0.5">
          <Link
            href="/vigilante/radar"
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs text-white/50 hover:bg-white/10 transition-colors"
          >
            <span>⚡</span> AVIA Vigilante
          </Link>
          <Link
            href="/miembro/descubrir"
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs text-white/50 hover:bg-white/10 transition-colors"
          >
            <span>🧳</span> Portal Viajero
          </Link>
        </nav>
      </div>

      {/* Footer */}
      <div className="mt-auto px-5 py-3 border-t border-white/10 text-xs text-white/40">
        TS Orbix PoC v0.1
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar: oculto en pantallas pequeñas, visible en md+ */}
      <aside className="hidden md:flex flex-col w-60 min-h-screen bg-orbix-navy flex-shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (off-canvas) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop con blur */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Drawer panel */}
          <aside className="relative w-64 max-w-[85vw] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
