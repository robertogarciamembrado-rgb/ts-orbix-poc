"use client";
import { useState, useEffect } from "react";
import {
  MousePointerClick,
  ShoppingBag,
  XCircle,
  Coins,
  Banknote,
  TrendingUp,
  Users,
  Calendar,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { formatCurrencyEUR, formatTokens } from "@/lib/format";
import AnalyticsFunnel from "@/components/AnalyticsFunnel";
import { anularVenta, getAnalyticsFunnel, getResultados, getVentasResultados } from "@/lib/cortex/api";
import type { AnalyticsFunnelResponse, ResultadosResponse, VentaResultado } from "@/lib/cortex/api";
import { formatFechaISO } from "@/lib/utils/time";
import { useDemoContext } from '@/components/DemoContext';
import { toast } from 'sonner';

// ─── Page ──────────────────────────────────────────────────────────────────
export default function AccountResultados() {
  const { nodeId } = useDemoContext();
  const isProvider = nodeId === 'nodo-003';
  const [paymentMethod, setPaymentMethod] = useState<"fiat" | "credits" | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [resultados, setResultados] = useState<ResultadosResponse | null>(null);
  const [funnel, setFunnel] = useState<AnalyticsFunnelResponse | null>(null);
  const [ventas, setVentas] = useState<VentaResultado[]>([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState<string | null>(null);
  const [referenciaPedido, setReferenciaPedido] = useState('');
  const [motivoAnulacion, setMotivoAnulacion] = useState('');

  function cargarResultados() {
    Promise.all([getResultados(), getAnalyticsFunnel(), getVentasResultados()]).then(([resultadosData, funnelData, ventasData]) => {
      setResultados(resultadosData);
      setFunnel(funnelData);
      setVentas(ventasData);
    });
  }

  useEffect(() => {
    cargarResultados();
  }, []);

  async function handleAnular(ventaId: string) {
    try {
      await anularVenta(ventaId, referenciaPedido, motivoAnulacion);
      toast.success('Venta anulada y comisión liberada en el saldo.');
      setVentaSeleccionada(null);
      setReferenciaPedido('');
      setMotivoAnulacion('');
      cargarResultados();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'No se pudo anular la venta.');
    }
  }

  function handleConfirm() {
    if (paymentMethod) setSubmitted(true);
  }

  // ── Loading skeleton ───────────────────────────────────────────────────
  if (!resultados || !funnel) return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-slate-200 rounded w-1/3" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => <div key={i} className="h-32 bg-slate-200 rounded-xl" />)}
      </div>

      <div className="h-64 bg-slate-200 rounded-xl" />
      <div className="h-48 bg-slate-200 rounded-xl" />
    </div>
  );

  // ── Performance cards built from API response ─────────────────────────
  const performanceCards = [
    {
      label: "Llegadas Generadas",
      value: resultados.llegadas.toLocaleString("es-ES"),
      unit: "clics",
      sub: "No facturables · sólo trazabilidad",
      icon: MousePointerClick,
      accent: "#3371AF",
    },
    {
      label: "Ventas Atribuidas Firmes",
      value: String(resultados.ventasFirmes),
      unit: "ventas",
      sub: "Confirmadas y no anuladas",
      icon: ShoppingBag,
      accent: "#29DDDA",
    },
    {
      label: "Ventas Anuladas",
      value: String(resultados.ventasAnuladas),
      unit: "anulaciones",
      sub: "Créditos de reserva liberados",
      icon: XCircle,
      accent: "#F59E0B",
    },
  ];

  return (
    <div className="space-y-6">

      {/* ── PAGE HEADER ──────────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "#091231" }}>
          Resultados &amp; Liquidación
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "#3371AF" }}>
          Cierre de periodo · {resultados.periodo}
        </p>
      </div>

      {/* ── PERFORMANCE CARDS ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {performanceCards.map(({ label, value, unit, sub, icon: Icon, accent }) => (
          <div
            key={label}
            className="rounded-xl bg-white border shadow-sm p-5 flex items-start gap-4"
            style={{ borderColor: "#ECF0F5" }}
          >
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: accent + "20" }}
            >
              <Icon className="w-6 h-6" style={{ color: accent }} />
            </div>

            <div className="rounded-xl border border-violet-200 bg-violet-50 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-violet-700">Resumen narrado por el agente</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Este periodo registró <strong>{resultados.ventasFirmes} ventas firmes</strong> y generó <strong>{resultados.llegadas.toLocaleString('es-ES')} llegadas</strong> trazables.
                El resultado bruto alcanzó <strong>{formatCurrencyEUR(resultados.brutoCobrar)}</strong>, porque las conversiones confirmadas mantuvieron activas las comisiones pactadas.
                Se contabilizaron <strong>{resultados.ventasAnuladas} ventas anuladas</strong>; por eso la liquidación final separa el valor firme de las reservas liberadas.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: "#3371AF" }}>
                {label}
              </p>
              <p className="text-3xl font-bold leading-none" style={{ color: "#091231" }}>
                {value}
              </p>
              <p className="text-xs mt-0.5 font-medium" style={{ color: "#091231", opacity: 0.5 }}>
                {unit}
              </p>
              <p className="text-xs mt-1" style={{ color: "#3371AF" }}>{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── LIQUIDACIÓN MENSUAL ───────────────────────────────────────── */}
      <AnalyticsFunnel data={funnel} />

      <section className="overflow-hidden rounded-xl border bg-white shadow-sm" style={{ borderColor: '#ECF0F5' }}>
        <div className="border-b px-5 py-4" style={{ borderColor: '#ECF0F5' }}>
          <h2 className="font-bold text-orbix-navy">Ventas y ventana de anulación</h2>
          <p className="mt-1 text-xs text-slate-500">Las anulaciones liberan la comisión reservada únicamente durante los primeros 7 días.</p>
        </div>
        <div className="max-h-96 overflow-x-auto overflow-y-auto">
          <table className="min-w-[680px] w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3">Venta</th><th className="px-4 py-3">Oferta</th><th className="px-4 py-3">Estado</th><th className="px-4 py-3">Ventana</th><th className="px-4 py-3"></th></tr></thead>
            <tbody>{ventas.map((venta) => {
              const horas = Math.max(0, Math.ceil((venta.ventanaAnulacionHasta.getTime() - Date.now()) / 3600000));
              return <tr key={venta.id} className="border-t border-slate-100"><td className="px-4 py-3 font-mono text-xs text-slate-600">{venta.id}</td><td className="px-4 py-3 font-medium text-orbix-navy">{venta.ofertaTitulo}</td><td className="px-4 py-3"><span className={`rounded-full px-2 py-1 text-xs font-bold ${venta.estado === 'firme' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{venta.estado}</span></td><td className="px-4 py-3 text-xs text-slate-600">{venta.anulable ? `${horas} h restantes` : 'Cerrada'}</td><td className="px-4 py-3 text-right">{isProvider && venta.anulable && <button onClick={() => setVentaSeleccionada(venta.id)} className="rounded-lg border border-rose-200 px-2.5 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-50">Anular</button>}</td></tr>;
            })}</tbody>
          </table>
        </div>
      </section>

      {ventaSeleccionada && <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4"><div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"><h2 className="text-lg font-bold text-orbix-navy">Anular venta</h2><p className="mt-1 text-sm text-slate-500">La comisión reservada se liberará al confirmar.</p><input value={referenciaPedido} onChange={(event) => setReferenciaPedido(event.target.value)} placeholder="Referencia del pedido" className="mt-4 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" /><textarea value={motivoAnulacion} onChange={(event) => setMotivoAnulacion(event.target.value)} placeholder="Motivo de anulación" className="mt-3 min-h-24 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" /><div className="mt-4 flex justify-end gap-2"><button onClick={() => setVentaSeleccionada(null)} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600">Cancelar</button><button onClick={() => handleAnular(ventaSeleccionada)} className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-bold text-white">Confirmar anulación</button></div></div></div>}

      <div
        className="rounded-xl border shadow-sm overflow-hidden"
        style={{ borderColor: "#ECF0F5", backgroundColor: "#FFFFFF" }}
      >
        {/* Header */}
        <div
          className="px-5 py-4 flex items-center justify-between"
          style={{ backgroundColor: "#091231" }}
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" style={{ color: "#29DDDA" }} />
            <h2 className="font-bold text-white">Liquidación — {resultados.periodo}</h2>
          </div>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded"
            style={{ backgroundColor: "#29DDDA", color: "#091231" }}
          >
            Pendiente de Elección
          </span>
        </div>

        <div className="p-6 space-y-6">
          {/* Gross total */}
          <div className="flex items-end gap-3 border-b pb-5" style={{ borderColor: "#ECF0F5" }}>
            <div>
              <p className="text-sm font-medium mb-1" style={{ color: "#3371AF" }}>
                Total Bruto a Cobrar (tras retención TS Orbix)
              </p>
              <p className="text-4xl font-bold" style={{ color: "#091231" }} suppressHydrationWarning>
                {formatCurrencyEUR(resultados.brutoCobrar)}
              </p>
            </div>
          </div>

          {/* ── RADIO: Payment method ── */}
          {!submitted ? (
            <div className="space-y-3">
              <p className="text-sm font-bold" style={{ color: "#091231" }}>
                Selecciona cómo deseas cobrar este periodo:
              </p>

              {/* Option A — Fiat */}
              <label
                className="flex items-center gap-4 rounded-xl border p-4 cursor-pointer transition-all"
                style={{
                  borderColor: paymentMethod === "fiat" ? "#3371AF" : "#ECF0F5",
                  backgroundColor: paymentMethod === "fiat" ? "#3371AF10" : "#FFFFFF",
                }}
              >
                <input
                  type="radio"
                  name="payment"
                  value="fiat"
                  checked={paymentMethod === "fiat"}
                  onChange={() => setPaymentMethod("fiat")}
                  className="w-4 h-4 accent-orbix-ts"
                />
                <Banknote className="w-6 h-6 flex-shrink-0" style={{ color: "#3371AF" }} />
                <div>
                  <p className="font-bold text-sm" style={{ color: "#091231" }}>
                    Transferencia Bancaria (Fiat)
                  </p>
                  <p className="text-sm" style={{ color: "#3371AF" }} suppressHydrationWarning>
                    {formatCurrencyEUR(resultados.brutoCobrar)}
                  </p>
                </div>
              </label>

              {/* Option B — Créditos */}
              <label
                className="flex items-center gap-4 rounded-xl border p-4 cursor-pointer transition-all"
                style={{
                  borderColor: paymentMethod === "credits" ? "#29DDDA" : "#ECF0F5",
                  backgroundColor: paymentMethod === "credits" ? "#29DDDA15" : "#FFFFFF",
                }}
              >
                <input
                  type="radio"
                  name="payment"
                  value="credits"
                  checked={paymentMethod === "credits"}
                  onChange={() => setPaymentMethod("credits")}
                  className="w-4 h-4"
                />
                <Coins className="w-6 h-6 flex-shrink-0" style={{ color: "#29DDDA" }} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-sm" style={{ color: "#091231" }}>
                      Cobro en créditos con bonificación
                    </p>
                    <span
                      className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "#29DDDA", color: "#091231" }}
                    >
                      <Sparkles className="w-3 h-3" />
                      +{resultados.bonoPct}% Bonificación
                    </span>
                  </div>
                  <p className="text-sm font-bold mt-0.5" style={{ color: "#091231" }} suppressHydrationWarning>
                    {formatTokens(resultados.tokenEquivalente)} Créditos
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#3371AF" }}>
                    Incentiva la economía circular de la red
                  </p>
                </div>
              </label>

              {/* Confirm button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleConfirm}
                  disabled={!paymentMethod}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#29DDDA", color: "#091231" }}
                >
                  <CheckCircle className="w-4 h-4" />
                  Confirmar Método de Cobro
                </button>
              </div>
            </div>
          ) : (
            /* ── Confirmation state ── */
            <div
              className="flex items-center gap-3 rounded-xl p-4"
              style={{ backgroundColor: "#29DDDA20" }}
            >
              <CheckCircle className="w-6 h-6 flex-shrink-0" style={{ color: "#29DDDA" }} />
              <div>
                <p className="font-bold text-sm" style={{ color: "#091231" }} suppressHydrationWarning>
                  Método confirmado:{" "}
                  {paymentMethod === "fiat"
                    ? `Transferencia Bancaria — ${formatCurrencyEUR(resultados.brutoCobrar)}`
                    : `Cobro en créditos con bonificación — ${formatTokens(resultados.tokenEquivalente)} Créditos (+${resultados.bonoPct}%)`}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#3371AF" }}>
                  La liquidación se procesará automáticamente al cierre del periodo.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── NETWORK MEMBERS CONTRIBUTIONS ─────────────────────────── */}
      <div
        className="rounded-xl bg-white border shadow-sm overflow-hidden"
        style={{ borderColor: "#ECF0F5" }}
      >
        <div className="px-5 py-4 border-b flex items-center gap-2" style={{ borderColor: "#ECF0F5" }}>
          <Users className="w-5 h-5" style={{ color: "#29DDDA" }} />
          <h2 className="font-bold text-base" style={{ color: "#091231" }}>
            Miembros de Red Aportados
          </h2>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-semibold ml-auto"
            style={{ backgroundColor: "#ECF0F5", color: "#3371AF" }}
          >
            Compensación a 90 días
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr style={{ backgroundColor: "#091231" }}>
                {["ID Contacto", "Contribución", "Recompensa", "Fin Compensación"].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {resultados.miembros.map((m, idx) => (
                <tr key={m.id} style={{ backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#ECF0F5" }}>
                  <td className="px-4 py-3 text-xs font-mono" style={{ color: "#3371AF" }}>
                    {m.contactoId}
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: "#091231" }}>
                    {m.contribucion}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className="flex items-center gap-1 font-bold w-fit"
                      style={{ color: "#091231" }}
                    >
                      <Coins className="w-3.5 h-3.5" style={{ color: "#29DDDA" }} />
                      {m.recompensa} Créditos
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className="flex items-center gap-1.5" style={{ color: "#3371AF" }}>
                      <Calendar className="w-3.5 h-3.5" />
                      {formatFechaISO(m.finCompensacion)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
