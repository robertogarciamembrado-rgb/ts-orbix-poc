"use client";
import { useEffect, useState } from 'react';
import { getConvocatoriasVigilante, type ConvocatoriaAlerta } from '@/lib/cortex/api';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
} from "recharts";
import { AlertTriangle, BarChart2, Activity, Database, ExternalLink } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────
const radarData = [
  { axis: "Sostenibilidad", value: 82 },
  { axis: "Gobernanza",     value: 65 },
  { axis: "Tecnología",     value: 90 },
  { axis: "Mercado",        value: 74 },
  { axis: "Regulación",     value: 55 },
  { axis: "Innovación",     value: 78 },
];

const sectorData = [
  { sector: "Hoteles",   actividad: 87 },
  { sector: "Cruceros",  actividad: 54 },
  { sector: "Agencias",  actividad: 66 },
  { sector: "Aerolíneas",actividad: 43 },
  { sector: "Destinos",  actividad: 71 },
];

const newsCards = [
  {
    eje: "SOSTENIBILIDAD",
    ejeColor: "#29DDDA",
    title: "Estrategia y descarbonización en el sector hotelero español",
    summary: "Los grandes grupos hoteleros aceleran sus planes de descarbonización con objetivos net-zero 2040. Se identifican oportunidades de posicionamiento para nodos certificados.",
    impact: "Alto",
  },
  {
    eje: "GOBERNANZA",
    ejeColor: "#3371AF",
    title: "Nueva directiva UE sobre transparencia en distribución turística",
    summary: "La Comisión Europea propone regulación de comisiones mínimas para distribuidores digitales. Impacto directo en modelos como TS Orbix.",
    impact: "Crítico",
  },
  {
    eje: "TECNOLOGÍA",
    ejeColor: "#29DDDA",
    title: "IA generativa en personalización de experiencias turísticas",
    summary: "El uso de LLMs en recomendación personalizada supera el 60% en plataformas líderes. Los agentes conversacionales son el nuevo estándar.",
    impact: "Medio",
  },
  {
    eje: "MERCADO",
    ejeColor: "#3371AF",
    title: "Turismo doméstico Q4 2026: proyecciones y oportunidades",
    summary: "Las proyecciones apuntan a un crecimiento del 18% en turismo slow y gastronómico. Madrid y el norte peninsular lideran la demanda.",
    impact: "Alto",
  },
];

const impactColors: Record<string, { bg: string; text: string }> = {
  Crítico: { bg: "#FEF3C720", text: "#F59E0B" },
  Alto:    { bg: "#29DDDA18", text: "#29DDDA" },
  Medio:   { bg: "#3371AF20", text: "#3371AF" },
};

// ─── Custom Tooltip ────────────────────────────────────────────────────────
interface TooltipProps { active?: boolean; payload?: { value: number }[]; label?: string }
function DarkTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border shadow-lg px-3 py-2" style={{ backgroundColor: '#0C1A3E', borderColor: 'rgba(41,221,218,0.25)' }}>
      <p className="text-xs font-semibold mb-0.5" style={{ color: '#29DDDA' }}>{label}</p>
      <p className="text-sm font-bold text-white">{payload[0].value}</p>
    </div>
  );
}

// ─── Metric card ──────────────────────────────────────────────────────────
function MetricCard({ icon: Icon, label, value, accent, sub }: {
  icon: React.ElementType; label: string; value: string | number; accent: string; sub?: string;
}) {
  return (
    <div className="rounded-xl p-5 border flex flex-col gap-2"
      style={{ backgroundColor: '#0C1A3E', borderColor: 'rgba(255,255,255,0.07)' }}>
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" style={{ color: accent }} />
        <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {label}
        </span>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
      {sub && <p className="text-xs" style={{ color: accent }}>{sub}</p>}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default function VigilanteRadar() {
  const [convocatorias, setConvocatorias] = useState<ConvocatoriaAlerta[]>([]);

  useEffect(() => {
    getConvocatoriasVigilante().then(setConvocatorias);
  }, []);

  return (
    <div className="space-y-6">

      {/* ── PAGE HEADER ──────────────────────────────────────────────── */}
      <div>
        <h1 className="text-xl font-bold text-white">Radar Estratégico</h1>
        <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Monitorización continua · Actualizado hace 14 min
        </p>
      </div>

      {/* ── METRIC CARDS ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={Database}    label="Informaciones relevantes" value="216"  accent="#29DDDA" />
        <MetricCard icon={Activity}    label="Ejes activos"              value="10"   accent="#3371AF" />
        <MetricCard icon={AlertTriangle} label="Alertas alto impacto"   value="2"    accent="#F59E0B" sub="Requieren revisión" />
        <MetricCard icon={BarChart2}   label="Score medio de impacto"   value="387"  accent="#29DDDA" />
      </div>

      <section className="rounded-xl border p-5" style={{ backgroundColor: '#0C1A3E', borderColor: 'rgba(41,221,218,0.22)' }}>
        <div className="mb-4 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-amber-400" /><h2 className="text-sm font-bold text-white">Convocatorias y ayudas detectadas</h2></div>
        <div className="grid gap-3 md:grid-cols-2">{convocatorias.map((convocatoria) => <article key={convocatoria.id} className="rounded-lg border p-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }}><h3 className="text-sm font-bold text-white">{convocatoria.titulo}</h3><p className="mt-2 text-xs text-amber-300">Plazo: {convocatoria.plazo.toLocaleDateString('es-ES')}</p><p className="mt-2 text-xs leading-relaxed text-white/60">{convocatoria.encaje}</p><button className="mt-3 text-xs font-bold text-[#29DDDA] hover:opacity-80">Marcar para seguimiento</button></article>)}</div>
      </section>

      {/* ── CHARTS ROW ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* RadarChart */}
        <div className="rounded-xl border p-5" style={{ backgroundColor: '#0C1A3E', borderColor: 'rgba(255,255,255,0.07)' }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Actividad por Ejes Estratégicos
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={radarData} margin={{ top: 0, right: 20, bottom: 0, left: 20 }}>
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis
                dataKey="axis"
                tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.5)' }}
              />
              <Radar
                name="Actividad"
                dataKey="value"
                stroke="#29DDDA"
                strokeWidth={2}
                fill="#29DDDA"
                fillOpacity={0.12}
                dot={{ fill: '#29DDDA', r: 3 }}
              />
              <Tooltip content={<DarkTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Horizontal BarChart */}
        <div className="rounded-xl border p-5" style={{ backgroundColor: '#0C1A3E', borderColor: 'rgba(255,255,255,0.07)' }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Actividad por Sectores
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={sectorData} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 16 }}>
              <XAxis type="number" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.35)' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="sector" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.5)' }} axisLine={false} tickLine={false} width={70} />
              <Tooltip content={<DarkTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
              <Bar dataKey="actividad" radius={[0, 6, 6, 0]}>
                {sectorData.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? '#29DDDA' : i % 2 === 0 ? '#3371AF' : '#223F7C'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── NEWS CARDS GRID ──────────────────────────────────────────── */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Noticias e Informaciones Detectadas
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {newsCards.map((card, idx) => {
            const imp = impactColors[card.impact];
            return (
              <div key={idx} className="rounded-xl border p-5 flex flex-col gap-3"
                style={{ backgroundColor: '#0C1A3E', borderColor: 'rgba(255,255,255,0.07)' }}>
                {/* Badges row */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: card.ejeColor + '22', color: card.ejeColor }}>
                    EJE: {card.eje}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: imp.bg, color: imp.text }}>
                    Impacto: {card.impact}
                  </span>
                </div>
                {/* Title */}
                <h4 className="font-bold text-sm text-white leading-snug">{card.title}</h4>
                {/* Summary */}
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{card.summary}</p>
                {/* CTA */}
                <button className="flex items-center gap-1.5 text-xs font-bold mt-auto w-fit transition-all hover:opacity-80"
                  style={{ color: '#29DDDA' }}>
                  Ver Análisis Completo
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
