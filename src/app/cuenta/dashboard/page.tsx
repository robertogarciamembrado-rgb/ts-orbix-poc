"use client";
import { useState } from "react";
import SalesAreaChart from "@/components/SalesAreaChart";
import { formatTokens } from "@/lib/format";
import { toast } from "sonner";
import {
  Star,
  Coins,
  Handshake,
  ShoppingBag,
  RefreshCw,
  AlertTriangle,
  Bell,
  CheckCircle,
  ChevronRight,
  TrendingUp,
  ArrowUpRight,
  Award,
  Sparkles,
} from "lucide-react";

// ─── Mock data ─────────────────────────────────────────────────────────────
const topOffers = [
  { id: 1, title: "Tour Gastronómico Madrid",   provider: "Propia",                 sales: 14, commission: 15, trend: +3 },
  { id: 2, title: "Estancia Premium – Hotel Madrid", provider: "Hotel Madrid",      sales: 6,  commission: 18, trend: +1 },
  { id: 3, title: "Informe Tendencias 2026",    provider: "Think Tank",             sales: 3,  commission: 12, trend: 0 },
];

type AlertStatus = "pending" | "reviewing" | "resolved";

interface AlertItem {
  id: number;
  type: "warning" | "info" | "success";
  title: string;
  body: string;
  cta: string;
  status: AlertStatus;
}

const initialAlerts: AlertItem[] = [
  {
    id: 1,
    type: "warning",
    title: "Comisión modificada",
    body: "Hotel Madrid ha modificado su comisión del 10% → 8%. Se requiere reaceptación para continuar distribuyendo.",
    cta: "Revisar",
    status: "pending",
  },
  {
    id: 2,
    type: "info",
    title: "Encargo pendiente",
    body: "Patronato de Turismo de Madrid espera tu prueba de publicación para 'Artículo Patrocinado'.",
    cta: "Subir prueba",
    status: "pending",
  },
  {
    id: 3,
    type: "success",
    title: "Acuerdo renovado",
    body: "Tu acuerdo marco con Think Tank ha sido renovado automáticamente por 12 meses.",
    cta: "Ver acuerdo",
    status: "resolved",
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────
function MetricCard({
  icon: Icon,
  label,
  value,
  sub,
  accent,
  badge,
  action,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  accent: string;
  badge?: { text: string; color: string; bg: string };
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div className="rounded-xl bg-white border shadow-sm p-5 flex flex-col gap-3" style={{ borderColor: "#ECF0F5" }}>
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: accent + "18" }}>
          <Icon className="w-5 h-5" style={{ color: accent }} />
        </div>
        {badge && (
          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: badge.bg, color: badge.color }}>
            {badge.text}
          </span>
        )}
        {action && (
          <button
            onClick={action.onClick}
            className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg transition-all hover:brightness-110"
            style={{ backgroundColor: "#29DDDA", color: "#091231" }}
          >
            <RefreshCw className="w-3 h-3" />
            {action.label}
          </button>
        )}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "#3371AF" }}>{label}</p>
        <p className="text-3xl font-bold leading-none" style={{ color: "#091231" }} suppressHydrationWarning>{value}</p>
        {sub && <p className="text-xs mt-1" style={{ color: "#3371AF", opacity: 0.7 }}>{sub}</p>}
      </div>
    </div>
  );
}

const alertStyles: Record<AlertItem["type"], { border: string; iconColor: string; bg: string }> = {
  warning: { border: "#F59E0B",  iconColor: "#F59E0B", bg: "#FFFBEB" },
  info:    { border: "#3371AF",  iconColor: "#3371AF", bg: "#EFF6FF" },
  success: { border: "#29DDDA",  iconColor: "#29DDDA", bg: "#F0FFFE" },
};

const alertIcons: Record<AlertItem["type"], React.ElementType> = {
  warning: AlertTriangle,
  info:    Bell,
  success: CheckCircle,
};

// ─── Page ──────────────────────────────────────────────────────────────────
export default function CuentaDashboard() {
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);
  const [tokens, setTokens] = useState(1250);

  function handleAlertAction(id: number) {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: a.status === "pending" ? "reviewing" : "resolved" } : a))
    );
  }

  function handleQuickReaccept(id: number) {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "resolved" } : a))
    );
    toast.success("Comisión reaceptada mediante Insight IA. Oferta de Hotel Madrid activa sin interrupción.");
  }

  return (
    <div className="space-y-6">

      {/* ── HEADER ──────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#091231" }}>Dashboard</h1>
          <p className="text-sm mt-0.5" style={{ color: "#3371AF" }}>
            Bienvenido de vuelta · Septiembre 2026
          </p>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold"
          style={{ backgroundColor: "#091231", color: "#29DDDA" }}
        >
          <Award className="w-4 h-4" />
          Nodo verificado TS Orbix
        </div>
      </div>

      {/* ── METRIC CARDS ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={Star}
          label="Reputación en la Red"
          value="98/100"
          sub="Actualizado hoy"
          accent="#29DDDA"
          badge={{ text: "Excelente", color: "#065F46", bg: "#D1FAE5" }}
        />
        <MetricCard
          icon={Coins}
          label="Tokens Disponibles"
          value={formatTokens(tokens)}
          sub="Lote más próximo a caducar: 100 T"
          accent="#3371AF"
          action={{ label: "Recargar", onClick: () => setTokens((t) => t + 500) }}
        />
        <MetricCard
          icon={Handshake}
          label="Acuerdos Activos"
          value="7"
          sub="2 acuerdos en revisión"
          accent="#223F7C"
        />
        <MetricCard
          icon={ShoppingBag}
          label="Ventas Atribuidas"
          value="23"
          sub="Este mes · +14% vs anterior"
          accent="#29DDDA"
          badge={{ text: "+14%", color: "#065F46", bg: "#D1FAE5" }}
        />
      </div>

      {/* ── BIPARTITE PANEL ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ── LEFT: Alerts & Tasks ── */}
        <div className="rounded-xl bg-white border shadow-sm overflow-hidden" style={{ borderColor: "#ECF0F5" }}>
          {/* Header */}
          <div className="px-5 py-4 border-b flex items-center gap-2" style={{ borderColor: "#ECF0F5" }}>
            <Bell className="w-4 h-4" style={{ color: "#29DDDA" }} />
            <h2 className="font-bold text-base" style={{ color: "#091231" }}>Alertas y Tareas</h2>
            <span
              className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "#29DDDA", color: "#091231" }}
            >
              {alerts.filter((a) => a.status === "pending").length} pendientes
            </span>
          </div>

          {/* Alert list */}
          <ul className="divide-y" style={{ borderColor: "#ECF0F5" }}>
            {alerts.map((alert) => {
              const style = alertStyles[alert.type];
              const Icon = alertIcons[alert.type];
              const isDone = alert.status === "resolved";
              return (
                <li
                  key={alert.id}
                  className="px-5 py-4 flex gap-3 transition-opacity"
                  style={{ opacity: isDone ? 0.5 : 1 }}
                >
                  {/* Icon */}
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: style.bg }}
                  >
                    <Icon className="w-4 h-4" style={{ color: style.iconColor }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: "#091231" }}>
                      {alert.title}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: "#3371AF" }}>
                      {alert.body}
                    </p>
                    {/* Left-accent bar */}
                    <div
                      className="w-full h-px mt-2 mb-2 rounded"
                      style={{ backgroundColor: style.border + "40" }}
                    />
                    {/* Action button */}
                    {!isDone ? (
                      <div>
                        <button
                          onClick={() => handleAlertAction(alert.id)}
                          className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-lg transition-all hover:brightness-110"
                          style={{
                            backgroundColor: alert.status === "reviewing" ? "#ECF0F5" : "#091231",
                            color: alert.status === "reviewing" ? "#3371AF" : "#FFFFFF",
                          }}
                        >
                          {alert.status === "reviewing" ? "Revisando…" : alert.cta}
                          {alert.status === "pending" && <ChevronRight className="w-3 h-3" />}
                        </button>

                        {/* Bloque IA Agéntica para Comisión modificada */}
                        {alert.id === 1 && (
                          <div className="mt-3 p-3 bg-orbix-cyan/10 border-l-2 border-[#29DDDA] rounded-r-lg">
                            <div className="flex items-start gap-2">
                              <Sparkles className="w-4 h-4 text-orbix-navy flex-shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <p className="text-xs text-slate-700 leading-relaxed">
                                  <strong className="text-orbix-navy font-bold">Insight IA:</strong> La conversión de esta oferta es del 14% (muy por encima de la media). Sugiero reaceptar para no perder tracción.
                                </p>
                                <button
                                  type="button"
                                  onClick={() => handleQuickReaccept(alert.id)}
                                  className="mt-2 text-xs font-bold text-orbix-navy hover:text-[#091231] border border-orbix-navy/20 hover:border-orbix-navy/40 px-2.5 py-1 rounded-md transition-all inline-flex items-center gap-1 bg-transparent hover:bg-white/60 cursor-pointer"
                                >
                                  <span>Reaceptar rápida</span>
                                  <ChevronRight className="w-3 h-3 text-[#29DDDA]" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs font-semibold" style={{ color: "#29DDDA" }}>
                        ✓ Resuelto
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── RIGHT: Top Offers ── */}
        <div className="rounded-xl bg-white border shadow-sm overflow-hidden" style={{ borderColor: "#ECF0F5" }}>
          {/* Header */}
          <div className="px-5 py-4 border-b flex items-center gap-2" style={{ borderColor: "#ECF0F5" }}>
            <TrendingUp className="w-4 h-4" style={{ color: "#29DDDA" }} />
            <h2 className="font-bold text-base" style={{ color: "#091231" }}>Top Ofertas Distribuidas</h2>
            <span className="ml-auto text-xs" style={{ color: "#3371AF" }}>Septiembre 2026</span>
          </div>

          {/* Evolución de Ventas — Recharts AreaChart */}
          <div className="px-5 pt-4 pb-2">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
              <p className="text-xs font-semibold uppercase tracking-wide pt-1" style={{ color: "#3371AF" }}>
                Evolución de Ventas Atribuidas · ABR-SEP 2026
              </p>
              {/* Badge/Bloque flotante Agente de Análisis */}
              <div className="bg-[#29DDDA]/10 border border-[#29DDDA]/30 rounded-xl p-2.5 max-w-sm flex items-start gap-2 shadow-xs">
                <Sparkles className="w-4 h-4 text-orbix-navy flex-shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed text-slate-700">
                  <span className="font-bold text-orbix-navy">Agente de Análisis:</span> El Tour Gastronómico es tu producto estrella este mes. ¿Deseas que el Agente de Marketing prepare una difusión automatizada para el próximo fin de semana?
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toast.success("Difusión automatizada programada con el Agente de Marketing para el próximo fin de semana.")}
                      className="px-2.5 py-1 rounded bg-[#29DDDA] text-orbix-navy font-bold text-[11px] hover:brightness-105 transition-all shadow-xs cursor-pointer"
                    >
                      Aprobar difusión
                    </button>
                    <button
                      type="button"
                      onClick={() => toast.info("Sugerencia de difusión archivada.")}
                      className="text-[11px] text-slate-500 hover:text-slate-800 font-medium px-1.5 py-1 cursor-pointer"
                    >
                      Descartar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <SalesAreaChart />
          </div>
          <div className="border-t mx-5 mb-1" style={{ borderColor: "#ECF0F5" }} />

          {/* Offers list */}
          <ul className="divide-y" style={{ borderColor: "#ECF0F5" }}>
            {topOffers.map((offer, idx) => {
              const maxSales = topOffers[0].sales;
              const barPct = Math.round((offer.sales / maxSales) * 100);
              return (
                <li key={offer.id} className="px-5 py-4">
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      {/* Rank badge */}
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{
                          backgroundColor: idx === 0 ? "#29DDDA" : "#ECF0F5",
                          color: idx === 0 ? "#091231" : "#3371AF",
                        }}
                      >
                        {idx + 1}
                      </span>
                      <div>
                        <p className="text-sm font-bold leading-tight" style={{ color: "#091231" }}>
                          {offer.title}
                        </p>
                        <p className="text-xs" style={{ color: "#3371AF" }}>{offer.provider}</p>
                      </div>
                    </div>
                    {/* Stats */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold" style={{ color: "#091231" }}>{offer.sales} ventas</p>
                      <p className="text-xs" style={{ color: "#3371AF" }}>Com. {offer.commission}%</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: "#ECF0F5" }}>
                    <div
                      className="h-1.5 rounded-full transition-all"
                      style={{
                        width: `${barPct}%`,
                        backgroundColor: idx === 0 ? "#29DDDA" : "#223F7C",
                      }}
                    />
                  </div>

                  {/* Trend */}
                  {offer.trend !== 0 && (
                    <div className="flex items-center gap-1 mt-1.5">
                      <ArrowUpRight className="w-3 h-3" style={{ color: "#059669" }} />
                      <span className="text-xs font-semibold" style={{ color: "#059669" }}>
                        +{offer.trend} vs semana anterior
                      </span>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Footer link */}
          <div className="px-5 py-3 border-t" style={{ borderColor: "#ECF0F5" }}>
            <a
              href="/cuenta/resultados"
              className="text-xs font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity"
              style={{ color: "#3371AF" }}
            >
              Ver informe completo de resultados
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
