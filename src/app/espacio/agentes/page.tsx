"use client";
import { useState, useEffect } from "react";
import {
  Bot,
  Power,
  Zap,
  MessageSquare,
  Gauge,
  SlidersHorizontal,
  Activity,
  Clock,
  Coins,
  ChevronDown,
  Circle,
} from "lucide-react";
import { getEspacioDashboard } from "@/lib/cortex/api";

// ─── Types ──────────────────────────────────────────────────────────────────
type Tone = "Formal" | "Entusiasta" | "Directo";

// ─── Sub-components ──────────────────────────────────────────────────────────

/** Animated toggle switch */
function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className="relative inline-flex w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{
        backgroundColor: enabled ? "#29DDDA" : "rgba(255,255,255,0.12)",
      }}
      aria-label={enabled ? "Desactivar agente de recomendación" : "Activar agente de recomendación"}
      aria-pressed={enabled}
    >
      <span
        className="inline-block w-5 h-5 rounded-full shadow transform transition-transform duration-300 mt-1"
        style={{
          backgroundColor: enabled ? "#091231" : "rgba(255,255,255,0.4)",
          transform: enabled ? "translateX(2.1rem)" : "translateX(0.25rem)",
        }}
      />
    </button>
  );
}

/** Horizontal slider with value display */
function LabeledSlider({
  label,
  min,
  max,
  value,
  unit,
  onChange,
  warn,
}: {
  label: string;
  min: number;
  max: number;
  value: number;
  unit: string;
  onChange: (v: number) => void;
  warn?: boolean;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.5)" }}>
          {label}
        </label>
        <span
          className="text-sm font-bold px-2 py-0.5 rounded"
          style={{
            backgroundColor: warn && value > 3 ? "#F59E0B20" : "#29DDDA20",
            color: warn && value > 3 ? "#F59E0B" : "#29DDDA",
          }}
        >
          {value} {unit}
        </span>
      </div>
      <div className="relative h-2 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
        <div
          className="absolute h-2 rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: warn && value > 3 ? "#F59E0B" : "#29DDDA" }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-2"
        />
      </div>
      {warn && value > 3 && (
        <p className="text-xs mt-1" style={{ color: "#F59E0B" }}>
          ⚠ Alta frecuencia puede saturar a tus contactos
        </p>
      )}
    </div>
  );
}

/** Tone selector pills */
function ToneSelector({
  value,
  onChange,
}: {
  value: Tone;
  onChange: (t: Tone) => void;
}) {
  const tones: { id: Tone; emoji: string; desc: string }[] = [
    { id: "Formal",     emoji: "🎩", desc: "Profesional y neutro" },
    { id: "Entusiasta", emoji: "🚀", desc: "Energético y cercano" },
    { id: "Directo",    emoji: "⚡", desc: "Conciso y al punto" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {tones.map(({ id, emoji, desc }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          aria-label={`Seleccionar tono ${id}`}
          className="flex flex-col items-center gap-1 rounded-lg p-3 border transition-all text-left"
          style={{
            borderColor: value === id ? "#29DDDA" : "rgba(255,255,255,0.08)",
            backgroundColor: value === id ? "#29DDDA12" : "rgba(255,255,255,0.03)",
          }}
        >
          <span className="text-lg">{emoji}</span>
          <span className="text-xs font-bold" style={{ color: value === id ? "#29DDDA" : "rgba(255,255,255,0.5)" }}>
            {id}
          </span>
          <span className="text-xs text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
            {desc}
          </span>
        </button>
      ))}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function EspacioAgentes() {
  const [agentEnabled, setAgentEnabled] = useState(false);
  const [maxFreq, setMaxFreq] = useState(2);
  const [tone, setTone] = useState<Tone>("Entusiasta");
  const [saved, setSaved] = useState(false);
  const [interaccionesDia, setInteraccionesDia] = useState(47);

  useEffect(() => {
    getEspacioDashboard().then((m) => setInteraccionesDia(m.interaccionesAgenteDia));
  }, []);

  const estCost = maxFreq; // 1 crédito por interacción × frecuencia

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="space-y-6">

      {/* ── PAGE HEADER ──────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#091231" }}>
            Orquestación de Agentes IA
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "#3371AF" }}>
            Espacio de Trabajo · Configura la IA que interactúa con tu audiencia.
          </p>
        </div>
        {/* Active agents counter */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-semibold"
          style={{
            borderColor: agentEnabled ? "#3371AF40" : "#ECF0F5",
            backgroundColor: agentEnabled ? "#3371AF10" : "#FFFFFF",
            color: agentEnabled ? "#3371AF" : "#091231",
          }}
        >
          <Activity className="w-4 h-4" />
          {agentEnabled ? "1 agente activo" : "0 agentes activos"}
        </div>
      </div>

      {/* ── AGENT CARD ───────────────────────────────────────────────── */}
      <div
        className="rounded-2xl border overflow-hidden shadow-lg"
        style={{ borderColor: agentEnabled ? "#3371AF50" : "rgba(9,18,49,0.15)" }}
      >
        {/* Card top bar — status strip */}
        <div
          className="h-1 transition-all duration-500"
          style={{ backgroundColor: agentEnabled ? "#29DDDA" : "rgba(255,255,255,0.08)" }}
        />

        {/* Dark header */}
        <div className="px-6 py-5" style={{ backgroundColor: "#091231" }}>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              {/* Agent avatar */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  backgroundColor: agentEnabled ? "#29DDDA20" : "rgba(255,255,255,0.06)",
                  border: agentEnabled ? "1px solid #29DDDA50" : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <Bot className="w-7 h-7" style={{ color: agentEnabled ? "#29DDDA" : "rgba(255,255,255,0.25)" }} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h2 className="font-bold text-white text-lg">
                    Agente de Recomendación Turística
                  </h2>
                  {/* Live dot */}
                  <span className="relative flex h-2 w-2">
                    {agentEnabled && (
                      <span
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                        style={{ backgroundColor: "#29DDDA" }}
                      />
                    )}
                    <span
                      className="relative inline-flex rounded-full h-2 w-2"
                      style={{ backgroundColor: agentEnabled ? "#29DDDA" : "rgba(255,255,255,0.2)" }}
                    />
                  </span>
                </div>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Canal WhatsApp · Motor: TSTT-Recommender v2.1
                </p>
              </div>
            </div>

            {/* Toggle zone */}
            <div className="flex flex-col items-end gap-1.5">
              <Toggle enabled={agentEnabled} onChange={setAgentEnabled} />
              <span
                className="text-xs font-semibold"
                style={{ color: agentEnabled ? "#29DDDA" : "rgba(255,255,255,0.3)" }}
              >
                {agentEnabled ? "ACTIVO" : "INACTIVO"}
              </span>
            </div>
          </div>

          {/* Quick stats row */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: MessageSquare, label: "Interacciones hoy",    val: agentEnabled ? String(interaccionesDia) : "—" },
        { icon: Coins,         label: "Créditos consumidos",    val: agentEnabled ? `${interaccionesDia} C` : "—" },
              { icon: Clock,         label: "Última interacción",   val: agentEnabled ? "hace 8 min" : "—" },
            ].map(({ icon: Icon, label, val }) => (
              <div
                key={label}
                className="rounded-xl px-4 py-3"
                style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.3)" }} />
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{label}</span>
                </div>
                <p className="text-lg font-bold text-white">{val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CONFIG PANEL ─────────────────────────────────────────── */}
        <div className="px-6 py-5 space-y-6" style={{ backgroundColor: "#0C1A3E" }}>
          <div className="flex items-center gap-2 mb-1">
            <SlidersHorizontal className="w-4 h-4" style={{ color: "#3371AF" }} />
            <h3 className="text-sm font-bold text-white">Configuración de Reglas Invariantes</h3>
          </div>

          {/* Frequency slider */}
          <div
            className="rounded-xl p-4 border"
            style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.03)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Gauge className="w-4 h-4" style={{ color: "#3371AF" }} />
              <span className="text-xs font-bold text-white">Tope de Frecuencia</span>
              <span
                className="ml-auto text-xs px-1.5 py-0.5 rounded font-semibold"
                style={{ backgroundColor: "#3371AF20", color: "#3371AF" }}
              >
                Invariante
              </span>
            </div>
            <LabeledSlider
              label="Máx. recomendaciones / contacto / mes"
              min={1}
              max={6}
              value={maxFreq}
              unit="/ mes"
              onChange={setMaxFreq}
              warn
            />
            <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.3)" }}>
              Protege la experiencia de tu audiencia. El sistema bloquea automáticamente superado el límite.
            </p>
          </div>

          {/* Tone selector */}
          <div
            className="rounded-xl p-4 border"
            style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.03)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4" style={{ color: "#3371AF" }} />
              <span className="text-xs font-bold text-white">Tono de la IA</span>
            </div>
            <ToneSelector value={tone} onChange={setTone} />
          </div>

          {/* Cost badge + save button */}
          <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
            {/* Dynamic cost badge */}
            <div
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 border"
              style={{ borderColor: "#29DDDA30", backgroundColor: "#29DDDA08" }}
            >
              <Zap className="w-4 h-4" style={{ color: "#29DDDA" }} />
              <div>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Consumo estimado</p>
                <p className="text-sm font-bold" style={{ color: "#29DDDA" }}>
                    {estCost} Crédito{estCost !== 1 ? "s" : ""} por interacción
                </p>
              </div>
            </div>

            {/* Save button */}
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:brightness-110"
              style={{ backgroundColor: saved ? "#29DDDA" : "#223F7C", color: saved ? "#091231" : "#FFFFFF" }}
            >
              {saved ? (
                <>✓ Guardado</>
              ) : (
                <>
                  <SlidersHorizontal className="w-4 h-4" />
                  Guardar Configuración
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── FUTURE AGENTS PLACEHOLDER ─────────────────────────────── */}
      <div
        className="rounded-2xl border border-dashed p-6 flex flex-col items-center gap-2 text-center"
        style={{ borderColor: "rgba(9,18,49,0.15)", backgroundColor: "#FFFFFF" }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: "#ECF0F5" }}
        >
          <Bot className="w-6 h-6" style={{ color: "#3371AF" }} />
        </div>
        <p className="font-bold text-sm" style={{ color: "#091231" }}>Añadir Nuevo Agente</p>
        <p className="text-xs max-w-xs" style={{ color: "#3371AF" }}>
          Próximamente: Agente de Soporte, Agente de Seguimiento Post-Venta y Agente de Captación.
        </p>
        <button
          className="mt-2 px-4 py-1.5 rounded-lg text-xs font-bold border transition-all hover:bg-gray-50"
          style={{ borderColor: "#3371AF", color: "#3371AF" }}
        >
          Ver catálogo de agentes →
        </button>
      </div>
    </div>
  );
}
