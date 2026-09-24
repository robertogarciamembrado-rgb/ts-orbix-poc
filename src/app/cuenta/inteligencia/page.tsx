"use client";
import { useState } from "react";
import Link from "next/link";
import SegmentBarChart from "@/components/SegmentBarChart";
import {
  Lock,
  Unlock,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  FileSearch,
  ShieldAlert,
  Zap,
} from "lucide-react";


// ─── AVIA locked cards data ────────────────────────────────────────────────
const aviaCards = [
  {
    id: "licitaciones",
    icon: FileSearch,
    title: "Nuevas Licitaciones y Ayudas",
    lockedSub: "3 nuevas oportunidades detectadas esta semana",
    unlockedContent: [
      "📄 Licitación FEDER — Digitalización Turismo Rural (€120k)",
      "📄 Ayuda ICEX — Promoción Internacional 2026 (€45k)",
      "📄 Convocatoria autonómica — Fondo de Competitividad (€30k)",
    ],
  },
  {
    id: "reputacion",
    icon: ShieldAlert,
    title: "Análisis de Reputación Competitiva",
    lockedSub: "2 competidores con actividad inusual detectados",
    unlockedContent: [
      "⚠ Competidor A subió comisiones al 22% — posible presión de mercado",
      "📈 Competidor B lanzó oferta bundle con Think Tank regional",
      "✅ Tu reputación en la red: 98/100 — posición líder mantenida",
    ],
  },
  {
    id: "tendencias",
    icon: TrendingUp,
    title: "Tendencias Anticipadas del Sector",
    lockedSub: "Informe predictivo Q4 2026 disponible",
    unlockedContent: [
      "🔮 Auge del turismo slow — crecimiento estimado +18% Q4",
      "🔮 Caída del turismo de masas en zonas costeras (-7%)",
      "🔮 Demanda creciente de experiencias gastronómicas premium (+31%)",
    ],
  },
  {
    id: "alertas",
    icon: AlertTriangle,
    title: "Alertas de Riesgo de Red",
    lockedSub: "1 alerta crítica activa en tu red de distribución",
    unlockedContent: [
      "🚨 Nodo 'Blog de Viajes Sur' — 0 ventas en 45 días · riesgo de inactividad",
      "⚡ Acuerdo Marco con Asociación XYZ caduca en 12 días",
      "✅ Píxel de seguimiento: todos los nodos activos reportando correctamente",
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────
export default function AccountInteligencia() {
  const [unlocked, setUnlocked] = useState(false);
  const [unlocking, setUnlocking] = useState(false);

  function handleUnlock() {
    setUnlocking(true);
    setTimeout(() => {
      setUnlocked(true);
      setUnlocking(false);
    }, 900);
  }

  return (
    <div className="space-y-6">

      {/* ── PAGE HEADER ─────────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "#091231" }}>
          Inteligencia y Tendencias
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "#3371AF" }}>
          Información estratégica para crecer en la red TS Orbix.
        </p>
      </div>

      {/* ── FREE PANEL: TSTT REPORT ──────────────────────────────────── */}
      <div
        className="rounded-xl bg-white border shadow-sm overflow-hidden"
        style={{ borderColor: "#ECF0F5" }}
      >
        {/* Card header */}
        <div className="px-5 py-4 border-b flex items-center gap-2" style={{ borderColor: "#ECF0F5" }}>
          <Zap className="w-5 h-5" style={{ color: "#29DDDA" }} />
          <div>
            <h2 className="font-bold text-base" style={{ color: "#091231" }}>
              Resumen del Informe TS Orbix
            </h2>
            <p className="text-xs" style={{ color: "#3371AF" }}>
              Powered by TSTT · Actualización mensual · Acceso gratuito
            </p>
          </div>
          <span
            className="ml-auto text-xs px-2 py-0.5 rounded-full font-semibold"
            style={{ backgroundColor: "#29DDDA", color: "#091231" }}
          >
            Gratuito
          </span>
        </div>

        <div className="p-5 space-y-5">
          {/* Summary text */}
          <p className="text-sm leading-relaxed" style={{ color: "#3371AF" }}>
            El sector turístico registró un crecimiento del{" "}
            <strong style={{ color: "#091231" }}>+14% interanual</strong> en reservas online durante
            el tercer trimestre de 2026. Los segmentos de mayor crecimiento son turismo gastronómico
            (+31%) y experiencias culturales (+22%). La digitalización de nodos distribuidores sigue
            siendo el factor diferenciador clave.
          </p>


          {/* Bar chart — Recharts SegmentBarChart */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#3371AF" }}>
              Crecimiento de Demanda por Segmento · 2026
            </p>
            <SegmentBarChart />
          </div>

          {/* Free insight pills */}
          <div className="flex flex-wrap gap-2">
            {[
              "Turismo gastronómico +31%",
              "Experiencias culturales +22%",
              "Turismo slow en alza",
              "Digitalización = ventaja clave",
            ].map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ backgroundColor: "#ECF0F5", color: "#223F7C" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── PREMIUM PANEL: AVIA VIGILANTE ────────────────────────────── */}
      <div
        className="rounded-xl border shadow-sm overflow-hidden"
        style={{ borderColor: "#091231" }}
      >
        {/* Dark header */}
        <div className="px-5 py-4" style={{ backgroundColor: "#091231" }}>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#29DDDA20" }}
              >
                <ShieldAlert className="w-5 h-5" style={{ color: "#29DDDA" }} />
              </div>
              <div>
                <h2 className="font-bold text-white">AVIA Vigilante — Alertas Tempranas</h2>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Inteligencia competitiva · Monitorización continua de la red
                </p>
              </div>
            </div>
            {!unlocked && (
              <Link
                href="/vigilante/radar"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all hover:brightness-110"
                style={{ backgroundColor: "#29DDDA", color: "#091231" }}
              >
                <Unlock className="w-4 h-4" />
                Desbloquear con 500 Tokens/mes
              </Link>
            )}
            {unlocked && (
              <span
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
                style={{ backgroundColor: "#29DDDA", color: "#091231" }}
              >
                <Unlock className="w-3.5 h-3.5" />
                Módulo Activo
              </span>
            )}
          </div>
        </div>

        {/* AVIA cards grid */}
        <div
          className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
          style={{ backgroundColor: "#0C1A3E" }}
        >
          {aviaCards.map(({ id, icon: Icon, title, lockedSub, unlockedContent }) => (
            <div
              key={id}
              className="rounded-xl border p-4 transition-all"
              style={{
                borderColor: unlocked ? "#29DDDA40" : "rgba(255,255,255,0.08)",
                backgroundColor: unlocked ? "rgba(41,221,218,0.06)" : "rgba(255,255,255,0.04)",
              }}
            >
              {/* Card header */}
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: unlocked ? "#29DDDA20" : "rgba(255,255,255,0.08)" }}
                >
                  {unlocked ? (
                    <Icon className="w-4 h-4" style={{ color: "#29DDDA" }} />
                  ) : (
                    <Lock className="w-4 h-4" style={{ color: "rgba(255,255,255,0.3)" }} />
                  )}
                </div>
                <div>
                  <h4
                    className="font-bold text-sm"
                    style={{ color: unlocked ? "#FFFFFF" : "rgba(255,255,255,0.4)" }}
                  >
                    {title}
                  </h4>
                  {!unlocked && (
                    <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.25)" }}>
                      {lockedSub}
                    </p>
                  )}
                </div>
              </div>

              {/* Locked state: blurred placeholder */}
              {!unlocked && (
                <div
                  className="space-y-2 rounded-lg p-3"
                  style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                >
                  {[80, 65, 90].map((w, i) => (
                    <div
                      key={i}
                      className="h-3 rounded"
                      style={{
                        width: `${w}%`,
                        backgroundColor: "rgba(255,255,255,0.08)",
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Unlocked state: real content */}
              {unlocked && (
                <ul className="space-y-2">
                  {unlockedContent.map((line, i) => (
                    <li key={i} className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                      {line}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Upsell footer */}
        {!unlocked && (
          <div
            className="px-5 py-3 flex items-center justify-between flex-wrap gap-2"
            style={{ backgroundColor: "#091231", borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              500 Tokens/mes · Cancela cuando quieras · Sin permanencia
            </p>
            <Link
              href="/vigilante/radar"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all hover:brightness-110"
              style={{ backgroundColor: "#29DDDA", color: "#091231" }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Activar AVIA Vigilante
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
