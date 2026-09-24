"use client";
import ExperienceCard from "@/components/ExperienceCard";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

const experiences = [
  {
    imageUrl: "https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=800&q=80",
    imageAlt: "Tour de tapas por Madrid",
    tags: [
      { label: "Gastronomía", bg: "#2563EB" },
      { label: "Conexión",    bg: "#16A34A" },
    ],
    title: "Tour de tapas por Madrid",
    description:
      "Recorre los bares más auténticos del centro histórico y descubre la cultura de las tapas junto a guías locales expertos.",
    meta: { duration: "3h", location: "Madrid", audience: "Amigos" },
    aiInsight:
      "Pensamos que podrás disfrutar de un ambiente agradable y acogedor, ideal para tu perfil de viajero social.",
    review: { text: "Una fiesta de sabores", stars: 5 },
    commissionBadge: "Comisión: 15%",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    imageAlt: "Senderismo en los Pirineos",
    tags: [
      { label: "Aventura",   bg: "#15803D" },
      { label: "Naturaleza", bg: "#EA580C" },
    ],
    title: "Senderismo en los Pirineos",
    description:
      "Una ruta de montaña espectacular con panorámicas únicas de los picos pirenaicos, perfecta para quienes buscan desconectar y superarse.",
    meta: { duration: "8h", location: "Pirineos", audience: "Exploradores" },
    aiInsight:
      "Basándonos en tus preferencias de actividad física y naturaleza, esta ruta encaja perfectamente con tu estilo de viaje.",
    review: { text: "Vistas inolvidables", stars: 5 },
    commissionBadge: "Comisión: 12%",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
    imageAlt: "Recorrido por el Gótico de Barcelona",
    tags: [
      { label: "Cultura",  bg: "#C026D3" },
      { label: "Historia", bg: "#7C3AED" },
    ],
    title: "Recorrido por el Gótico de Barcelona",
    description:
      "Un paseo por los callejones medievales de Barcelona, con visitas a iglesias, plazas y rincones secretos que la historia ha preservado.",
    meta: { duration: "4h", location: "Barcelona", audience: "Curiosos" },
    aiInsight:
      "Tu interés por la arquitectura y la historia hacen que este recorrido sea una elección casi perfecta para ti.",
    review: { text: "Mágico y revelador", stars: 5 },
    commissionBadge: "Comisión: 10%",
  },
];

export default function MiembroDescubrir() {
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
          <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{ backgroundColor: "#ECF0F5", color: "#3371AF" }}>
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
          {experiences.map((exp) => (
            <ExperienceCard key={exp.title} {...exp} />
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
