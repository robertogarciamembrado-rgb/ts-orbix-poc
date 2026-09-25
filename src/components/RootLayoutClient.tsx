// src/components/RootLayoutClient.tsx
"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { Menu } from "lucide-react";
import { DemoContextProvider, useDemoContext } from '@/components/DemoContext';

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <DemoContextProvider>
      <AppShell>{children}</AppShell>
    </DemoContextProvider>
  );
}

function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { nodeId, periodo } = useDemoContext();

  const isStandalone =
    pathname === "/" ||
    pathname?.startsWith("/registro") ||
    pathname?.startsWith("/vigilante") ||
    pathname?.startsWith("/miembro");

  if (isStandalone) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen w-full relative" style={{ backgroundColor: "#ECF0F5" }}>
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar onToggleMobileMenu={() => setMobileOpen((prev) => !prev)} />
        <main className="flex-1 overflow-auto p-4 sm:p-6" style={{ backgroundColor: "#ECF0F5" }}>
          <div key={`${nodeId}-${periodo}`}>{children}</div>
        </main>
      </div>

      {/* Botón de Menú Hamburguesa Flotante para Móviles */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Abrir menú de navegación"
        className="fixed bottom-5 right-5 z-40 md:hidden p-3.5 rounded-full shadow-2xl border-2 border-white/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
        style={{ backgroundColor: "#091231", color: "#FFFFFF" }}
      >
        <Menu className="w-5 h-5 text-[#29DDDA]" />
      </button>
    </div>
  );
}
