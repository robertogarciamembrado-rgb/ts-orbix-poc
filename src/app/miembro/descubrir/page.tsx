"use client";
import { useState, useEffect } from "react";
import ExperienceCard from "@/components/ExperienceCard";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { getExperiencias } from "@/lib/cortex/api";
import type { Oferta } from "@/lib/cortex/seed";

export default function MiembroDescubrir() {
  const [experiencias, setExperiencias] = useState<Oferta[] | null>(null);

  useEffect(() => {
    getExperiencias().then(setExperiencias);
  }, []);

  if (!experiencias)
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#ECF0F5" }}>
        <header className="bg-white border-b border-slate-100 sticky top-0 z-20">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <div className="h-5 bg-slate-200 rounded w-16 animate-pulse" />
            <div className="h-5 bg-slate-200 rounded w-24 animate-pulse" />
          </div>
        </header>
        <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((i) => <div key={i} className="h-96 bg-slate-200 rounded-2xl" />)}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#ECF0F5" }}>

      {/* ── HEADER ──────────────────────────────────────────────── */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link
            href="/cuenta/dashboard"
            className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-slate-900 font-bold text-sm tracking-widest">TS</span>
            <span className="font-bold text-sm tracking-widest" style={{ color: "#29DDDA" }}>ORBIX</span>
            <span className="text-slate-200 text-sm">|</span>
            <span className="text-slate-500 text-xs font-medium">Portal del Viajero</span>
          </div>
          <div
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{ backgroundColor: "#ECF0F5", color: "#3371AF" }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Selección IA
          </div>
        </div>
      </header>

      {/* ── HERO TEXT ───────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 pt-10 pb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#3371AF" }}>
          Recomendado por tu Agente IA
        </p>
        <h1 className="text-3xl font-bold" style={{ color: "#091231" }}>
          Descubre experiencias seleccionadas para ti
        </h1>
        <p className="text-base text-slate-500 mt-2 max-w-lg mx-auto">
          Basadas en tus preferencias, historial y el contexto de tu viaje.
        </p>
      </div>

      {/* ── CARD GRID ───────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiencias.map((exp) => (
            <ExperienceCard
              key={exp.id}
              imageUrl={exp.imageUrl ?? ""}
              imageAlt={exp.imageAlt ?? exp.titulo}
              tags={exp.tags ?? []}
              title={exp.titulo}
              description={exp.descripcion ?? ""}
              meta={exp.meta ?? { duration: "", location: "", audience: "" }}
              aiInsight={exp.aiInsight ?? ""}
              review={exp.review ?? { text: "", stars: 5 }}
            />
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-400 mt-10">
          Las experiencias que ves fueron seleccionadas por un Agente IA configurado por el nodo distribuidor.
          {" "}Tu privacidad está protegida — nunca vemos tu nombre ni datos personales.
        </p>
      </div>
    </div>
  );
}
