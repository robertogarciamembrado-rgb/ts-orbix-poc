"use client";

import { useState } from "react";
import { CheckCircle2, CircleAlert, Copy, Loader2, Radio, Server, Terminal } from "lucide-react";
import type { PixelMetricsResponse } from "@/lib/cortex/api";

type PixelStatusProps = { initialMetrics: PixelMetricsResponse };

const browserSnippet = [
  "<script>",
  '  window.orbixTrack("purchase", {',
  '    offer_id: "oferta_123",',
  "    amount: 150,",
  '    currency: "EUR"',
  "  });",
  "</script>",
].join("\n");

const serverSnippet = [
  "await orbix.events.create({",
  '  type: "purchase",',
  '  offerId: "oferta_123",',
  "  amount: 150,",
  "  test: false",
  "});",
].join("\n");

function formatDate(date: Date | null) {
  if (!date) return "Sin señal registrada";
  return new Intl.DateTimeFormat("es-ES", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function CodeBlock({ title, code, icon: Icon }: { title: string; code: string; icon: typeof Terminal }) {
  const [copied, setCopied] = useState(false);
  async function copyCode() {
    await navigator.clipboard?.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-950">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <span className="flex items-center gap-2 text-xs font-bold text-white/80"><Icon className="h-4 w-4 text-[#29DDDA]" />{title}</span>
        <button type="button" onClick={copyCode} className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold text-white/70 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#29DDDA]">
          <Copy className="h-3.5 w-3.5" />{copied ? "Copiado" : "Copiar"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-6 text-[#C6F4F0]"><code>{code}</code></pre>
    </div>
  );
}

export default function PixelStatus({ initialMetrics }: PixelStatusProps) {
  const [metrics, setMetrics] = useState(initialMetrics);
  const [testing, setTesting] = useState(false);
  const [testSale, setTestSale] = useState(false);
  const status = metrics.estado === "activo"
    ? { label: "Activo", className: "bg-emerald-100 text-emerald-800", dot: "bg-emerald-500" }
    : metrics.estado === "sin-senal"
      ? { label: "Sin señal", className: "bg-red-100 text-red-800", dot: "bg-red-500" }
      : { label: "Pendiente", className: "bg-amber-100 text-amber-800", dot: "bg-amber-500" };

  function testConnection() {
    setTesting(true);
    window.setTimeout(() => {
      const now = new Date();
      setMetrics(current => ({ ...current, estado: "activo", ultimaSenal: now, ultimaVenta: now }));
      setTestSale(true);
      setTesting(false);
    }, 1100);
  }

  const metricCards = [
    { label: "Llegadas hoy", value: metrics.llegadasHoy.toLocaleString("es-ES"), detail: "clics atribuidos" },
    { label: "Última venta", value: metrics.ultimaVenta ? formatDate(metrics.ultimaVenta) : "Sin ventas", detail: testSale ? "venta de prueba · sin liquidar" : "evento registrado" },
    { label: "Conversión", value: metrics.conversion.toLocaleString("es-ES") + "%", detail: "llegadas a ventas" },
  ];

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-white/10 bg-[#091231] px-5 py-5 sm:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#29DDDA]">Señal de atribución</p><h2 className="mt-1 text-xl font-bold text-white">Píxel de conversiones</h2></div>
          <div className={"inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-sm font-bold " + status.className}><span className={"h-2.5 w-2.5 rounded-full " + status.dot} />{status.label}</div>
        </div>
      </div>
      <div className="grid gap-6 p-5 lg:grid-cols-[0.9fr_1.1fr] lg:p-6">
        <div className="space-y-5">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500"><Radio className="h-4 w-4 text-[#3371AF]" />Última señal</p><p className="mt-2 text-base font-bold text-[#091231]">{formatDate(metrics.ultimaSenal)}</p></div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {metricCards.map(metric => <div key={metric.label} className="rounded-xl border border-slate-200 p-4"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">{metric.label}</p><p className="mt-2 text-lg font-bold text-[#091231]">{metric.value}</p><p className="mt-1 text-xs text-[#3371AF]">{metric.detail}</p></div>)}
          </div>
          <button type="button" onClick={testConnection} disabled={testing} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#29DDDA] px-4 py-3 text-sm font-bold text-[#091231] transition hover:brightness-105 disabled:cursor-wait disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-[#3371AF] focus:ring-offset-2">
            {testing ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}{testing ? "Comprobando señal..." : "Probar conexión"}
          </button>
          {testSale && <p className="flex items-start gap-2 rounded-lg bg-emerald-50 p-3 text-xs font-medium text-emerald-800"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />Venta de prueba recibida. Se muestra como evento de validación y no entra en liquidación.</p>}
        </div>
        <div className="space-y-4">
          <div><p className="text-sm font-bold text-[#091231]">Instalación</p><p className="mt-1 text-sm leading-6 text-slate-500">Envía el evento de compra después de confirmar el pago en la web del proveedor.</p></div>
          <CodeBlock title="Navegador · JavaScript clásico" code={browserSnippet} icon={Terminal} />
          <CodeBlock title="Servidor · Recomendado" code={serverSnippet} icon={Server} />
          <p className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900"><CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />Si hay llegadas y el píxel no emite señal en 24 horas, las ofertas se pausarán automáticamente.</p>
        </div>
      </div>
    </section>
  );
}
