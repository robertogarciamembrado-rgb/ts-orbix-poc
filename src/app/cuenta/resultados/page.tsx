"use client";
import { useState } from "react";
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

// ─── Mock data ─────────────────────────────────────────────────────────────
const period = "Septiembre 2026";
const grossAmount = 1450;
const bonusPct = 10;
const tokenEquivalent = Math.round(grossAmount * (1 + bonusPct / 100));

const performanceCards = [
  {
    label: "Llegadas Generadas",
    value: "3,842",
    unit: "clics",
    sub: "No facturables · sólo trazabilidad",
    icon: MousePointerClick,
    accent: "#3371AF",
  },
  {
    label: "Ventas Atribuidas Firmes",
    value: "23",
    unit: "ventas",
    sub: "Confirmadas y no anuladas",
    icon: ShoppingBag,
    accent: "#29DDDA",
  },
  {
    label: "Ventas Anuladas",
    value: "2",
    unit: "anulaciones",
    sub: "Tokens de reserva liberados",
    icon: XCircle,
    accent: "#F59E0B",
  },
];

const networkMembers = [
  {
    id: "wa_+34123456789",
    contribution: "Venta confirmada – Tour Madrid",
    reward: 25,
    compensationEnd: "2026-12-21",
  },
  {
    id: "wa_+34987654321",
    contribution: "Referido a Hotel Madrid",
    reward: 15,
    compensationEnd: "2026-12-19",
  },
  {
    id: "wa_+34654321098",
    contribution: "Venta confirmada – Paquete VIP",
    reward: 40,
    compensationEnd: "2026-12-22",
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────
export default function AccountResultados() {
  const [paymentMethod, setPaymentMethod] = useState<"fiat" | "tokens" | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleConfirm() {
    if (paymentMethod) setSubmitted(true);
  }

  return (
    <div className="space-y-6">

      {/* ── PAGE HEADER ──────────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "#091231" }}>
          Resultados & Liquidación
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "#3371AF" }}>
          Cierre de periodo · {period}
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
            <h2 className="font-bold text-white">Liquidación — {period}</h2>
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
                {formatCurrencyEUR(grossAmount)}
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
                    {formatCurrencyEUR(grossAmount)}
                  </p>
                </div>
              </label>

              {/* Option B — Tokens */}
              <label
                className="flex items-center gap-4 rounded-xl border p-4 cursor-pointer transition-all"
                style={{
                  borderColor: paymentMethod === "tokens" ? "#29DDDA" : "#ECF0F5",
                  backgroundColor: paymentMethod === "tokens" ? "#29DDDA15" : "#FFFFFF",
                }}
              >
                <input
                  type="radio"
                  name="payment"
                  value="tokens"
                  checked={paymentMethod === "tokens"}
                  onChange={() => setPaymentMethod("tokens")}
                  className="w-4 h-4"
                />
                <Coins className="w-6 h-6 flex-shrink-0" style={{ color: "#29DDDA" }} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-sm" style={{ color: "#091231" }}>
                      Cobro en Tokens
                    </p>
                    <span
                      className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "#29DDDA", color: "#091231" }}
                    >
                      <Sparkles className="w-3 h-3" />
                      +{bonusPct}% Bonificación
                    </span>
                  </div>
                  <p className="text-sm font-bold mt-0.5" style={{ color: "#091231" }} suppressHydrationWarning>
                    {formatTokens(tokenEquivalent)} Tokens
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
                    ? `Transferencia Bancaria — ${formatCurrencyEUR(grossAmount)}`
                    : `Cobro en Tokens — ${formatTokens(tokenEquivalent)} Tokens (+${bonusPct}%)`}
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
              {networkMembers.map((m, idx) => (
                <tr key={m.id} style={{ backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#ECF0F5" }}>
                  <td className="px-4 py-3 text-xs font-mono" style={{ color: "#3371AF" }}>
                    {m.id}
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: "#091231" }}>
                    {m.contribution}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className="flex items-center gap-1 font-bold w-fit"
                      style={{ color: "#091231" }}
                    >
                      <Coins className="w-3.5 h-3.5" style={{ color: "#29DDDA" }} />
                      {m.reward} Tokens
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className="flex items-center gap-1.5" style={{ color: "#3371AF" }}>
                      <Calendar className="w-3.5 h-3.5" />
                      {m.compensationEnd}
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
