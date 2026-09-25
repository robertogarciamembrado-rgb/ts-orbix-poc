"use client";

import React, { useState, useEffect } from "react";
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
} from "recharts";
import { consumirPresupuestoAgente, getEspacioDashboard, getChartInteracciones, getPresupuestoAgente } from "@/lib/cortex/api";
import type { EspacioDashboardResponse, PresupuestoAgenteResponse } from "@/lib/cortex/api";
import { toast } from "sonner";

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
  const [metricas, setMetricas] = useState<EspacioDashboardResponse | null>(null);
  const [chartData, setChartData] = useState<{ day: string; whatsapp: number; instagram: number }[]>([]);
  const [presupuesto, setPresupuesto] = useState<PresupuestoAgenteResponse | null>(null);

  useEffect(() => {
    Promise.all([getEspacioDashboard(), getChartInteracciones(), getPresupuestoAgente()]).then(([m, c, p]) => {
      setMetricas(m);
      setChartData(c);
      setPresupuesto(p);
    });
  }, []);

  if (!metricas)
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-24 bg-slate-200 rounded-2xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => <div key={i} className="h-32 bg-slate-200 rounded-xl" />)}
        </div>
        <div className="h-80 bg-slate-200 rounded-2xl" />
      </div>
    );

  const kpiCards = [
    {
      label: "Total Contactos",
      value: metricas.totalContactos,
      detail: "+8.4% vs mes anterior",
      icon: Users,
    },
    {
      label: "Tasa de Respuesta IA",
      value: metricas.tasaRespuestaIA,
      detail: "Promedio < 1.2s",
      icon: Bot,
    },
    {
      label: "Conversaciones Activas",
      value: metricas.conversacionesActivas,
      detail: "En tiempo real (WhatsApp/IG)",
      icon: MessageSquare,
    },
    {
      label: "Resolución en 1er contacto",
      value: metricas.resolucionPrimerContacto,
      detail: "Sin escalado humano",
      icon: CheckCircle2,
    },
  ];

  const pctAlcanzados = Math.round((metricas.contactosAlcanzados / metricas.limiteSeguro) * 100);
  const pctFrecuencia = Math.round((metricas.topeFrecuenciaConsumido / metricas.topeFrecuencia) * 100);

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
              <span>{metricas.capacidadMensajeria}% Disponible</span>
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

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Operación agéntica</p>
                    <div className="mt-3 flex items-end justify-between"><div><p className="text-3xl font-black text-orbix-navy">{metricas.conversacionesAtendidas}</p><p className="text-sm text-slate-500">Conversaciones atendidas</p></div><div className="text-right"><p className="text-xl font-bold text-orbix-ts">{metricas.tasaRespuestaIA}</p><p className="text-xs text-slate-500">Tasa de respuesta del agente</p></div></div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Tope de frecuencia consumido</p><span className="text-sm font-bold text-orbix-navy">{pctFrecuencia}%</span></div>
                    <div className="mt-3 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-orbix-ts" style={{ width: `${pctFrecuencia}%` }} /></div>
                    <p className="mt-2 text-xs text-slate-500">{metricas.topeFrecuenciaConsumido.toLocaleString('es-ES')} de {metricas.topeFrecuencia.toLocaleString('es-ES')} contactos alcanzados</p>
                    <div className="mt-4 flex flex-wrap gap-2">{metricas.contactosNuevosPorCanal.map((canal) => <span key={canal.canal} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{canal.canal}: {canal.total} nuevos</span>)}</div>
                  </div>
                </div>

                {presupuesto && <div className={`rounded-xl border p-5 shadow-sm ${presupuesto.detenido ? 'border-rose-200 bg-rose-50' : 'border-violet-200 bg-violet-50'}`}>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div><p className="text-xs font-bold uppercase tracking-wider text-violet-700">Presupuesto agéntico</p><p className="mt-1 text-sm text-slate-700">{presupuesto.consumido} de {presupuesto.tope} créditos consumidos este mes.</p></div>
                    <button disabled={presupuesto.detenido} onClick={async () => { try { setPresupuesto(await consumirPresupuestoAgente()); } catch (error) { toast.error(error instanceof Error ? error.message : 'No se pudo ejecutar el agente.'); } }} className="rounded-lg bg-orbix-navy px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">{presupuesto.detenido ? 'Tope alcanzado' : 'Ejecutar agente (250 cr.)'}</button>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white"><div className="h-2 rounded-full bg-violet-500" style={{ width: `${Math.min(100, Math.round((presupuesto.consumido / presupuesto.tope) * 100))}%` }} /></div>
                </div>}
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
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                stroke="#10B981"
                strokeWidth={3}
                dot={{ r: 4, fill: "#10B981", strokeWidth: 2, stroke: "#FFFFFF" }}
                activeDot={{ r: 6, fill: "#10B981" }}
              />
              <Line
                type="monotone"
                dataKey="instagram"
                name="Instagram"
                stroke="#3371AF"
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
            <div
              className="bg-[#29DDDA] h-2 rounded-full"
              style={{ width: `${pctAlcanzados}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-medium">
            <span>Contactos alcanzados: {metricas.contactosAlcanzados.toLocaleString("es-ES")}</span>
            <span>Límite seguro: {metricas.limiteSeguro.toLocaleString("es-ES")}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-orbix-navy">Consumo de créditos IA</h3>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-100 text-slate-700">
              1 crédito / interacción
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-3">
            Interacciones procesadas en modo autónomo por los agentes asignados a los canales.
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-orbix-navy">
              {metricas.tokensIAConsumidos.toLocaleString("es-ES")}
            </span>
            <span className="text-xs text-slate-400 font-semibold">Créditos este mes</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-orbix-navy">SLA de Canal</h3>
              <span className="text-xs font-bold text-emerald-600">{metricas.slaCanal}%</span>
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
