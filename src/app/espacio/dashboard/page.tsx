"use client";

import React from "react";
import {
  Users,
  Bot,
  MessageSquare,
  CheckCircle2,
  TrendingUp,
  Activity,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

// Datos de interacción por canal de los últimos 7 días
const interactionData = [
  { day: "Lun", whatsapp: 420, instagram: 240 },
  { day: "Mar", whatsapp: 560, instagram: 310 },
  { day: "Mié", whatsapp: 610, instagram: 390 },
  { day: "Jue", whatsapp: 780, instagram: 480 },
  { day: "Vie", whatsapp: 890, instagram: 560 },
  { day: "Sáb", whatsapp: 1050, instagram: 720 },
  { day: "Dom", whatsapp: 940, instagram: 650 },
];

const kpiCards = [
  {
    label: "Total Contactos",
    value: "12,450",
    detail: "+8.4% vs mes anterior",
    icon: Users,
    color: "#223F7C", // orbix-ts
  },
  {
    label: "Tasa de Respuesta IA",
    value: "94%",
    detail: "Promedio < 1.2s",
    icon: Bot,
    color: "#223F7C", // orbix-ts
  },
  {
    label: "Conversaciones Activas",
    value: "342",
    detail: "En tiempo real (WhatsApp/IG)",
    icon: MessageSquare,
    color: "#223F7C", // orbix-ts
  },
  {
    label: "Resolución en 1er contacto",
    value: "88%",
    detail: "Sin escalado humano",
    icon: CheckCircle2,
    color: "#223F7C", // orbix-ts
  },
];

// Tooltip estilizado
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#091231] text-white p-3 rounded-xl border border-white/10 shadow-xl text-xs space-y-1.5 font-sans">
        <p className="font-bold text-white/80 border-b border-white/10 pb-1">{label}</p>
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            WhatsApp:
          </span>
          <span className="font-mono font-bold text-white">{payload[0]?.value}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            Instagram:
          </span>
          <span className="font-mono font-bold text-white">{payload[1]?.value}</span>
        </div>
      </div>
    );
  }
  return null;
}

export default function WorkspaceDashboard() {
  return (
    <div className="space-y-6">
      {/* Header del Espacio */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[#3371AF]/10 text-orbix-ts border border-[#3371AF]/20">
              Workspace Layer
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Infraestructura Operativa Activa
            </span>
          </div>
          <h1 className="text-2xl font-bold text-orbix-navy">
            Dashboard del Espacio de Trabajo
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Monitorización centralizada de interacción omnicanal, agentes autónomos y audiencia.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-right">
            <div className="text-[11px] text-slate-400 uppercase font-semibold">
              Capacidad de Mensajería
            </div>
            <div className="text-sm font-bold text-orbix-navy flex items-center justify-end gap-1.5">
              <span>98.6% Disponible</span>
              <Activity className="w-3.5 h-3.5 text-orbix-ts" />
            </div>
          </div>
        </div>
      </div>

      {/* 4 Tarjetas de KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  {kpi.label}
                </span>
                <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-orbix-ts">
                  <Icon className="w-5 h-5 text-orbix-ts" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-orbix-navy tracking-tight">
                  {kpi.value}
                </div>
                <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-slate-500">
                  <TrendingUp className="w-3.5 h-3.5 text-orbix-ts" />
                  <span>{kpi.detail}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Gráfico Recharts de Interacciones por Canal */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-orbix-navy">
              Volumen de Interacciones por Canal (Últimos 7 días)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Desglose de mensajes atendidos entre WhatsApp Business API e Instagram Direct.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="text-slate-700">WhatsApp (API Verificada)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#3371AF]"></span>
              <span className="text-slate-700">Instagram Direct</span>
            </div>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={interactionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis
                dataKey="day"
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="whatsapp"
                name="WhatsApp"
                stroke="#10B981" // Verde para WhatsApp
                strokeWidth={3}
                dot={{ r: 4, fill: "#10B981", strokeWidth: 2, stroke: "#FFFFFF" }}
                activeDot={{ r: 6, fill: "#10B981" }}
              />
              <Line
                type="monotone"
                dataKey="instagram"
                name="Instagram"
                stroke="#3371AF" // Azul para Instagram
                strokeWidth={3}
                dot={{ r: 4, fill: "#3371AF", strokeWidth: 2, stroke: "#FFFFFF" }}
                activeDot={{ r: 6, fill: "#3371AF" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Fila Inferior: Métricas de Eficiencia Operativa */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-orbix-navy">Tope de Frecuencia Activo</h3>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-cyan-50 text-cyan-800">
              Protección Activa
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-3">
            Garantiza un máximo de 2 impactos comerciales al mes por contacto para no saturar la base.
          </p>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-[#29DDDA] h-2 rounded-full" style={{ width: "32%" }}></div>
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-medium">
            <span>Contactos alcanzados: 3,984</span>
            <span>Límite seguro: 12,450</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-orbix-navy">Consumo de Tokens IA</h3>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-100 text-slate-700">
              1 Token / interacción
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-3">
            Interacciones procesadas en modo autónomo por los agentes asignados a los canales.
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-orbix-navy">1,840</span>
            <span className="text-xs text-slate-400 font-semibold">Tokens este mes</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-orbix-navy">SLA de Canal</h3>
              <span className="text-xs font-bold text-emerald-600">99.98%</span>
            </div>
            <p className="text-xs text-slate-500">
              Webhooks sincronizados y latencia de entrega de respuestas en tiempo óptimo.
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
            <span>Cola de entrega: 0 msgs</span>
            <span className="text-orbix-ts font-bold flex items-center gap-1">
              Ver Webhooks <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
