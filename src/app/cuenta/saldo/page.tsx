// src/app/cuenta/saldo/page.tsx
"use client";
import { useState, useEffect } from 'react';
import { Coins, Lock, AlertTriangle, ShoppingCart, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { formatTokens } from '@/lib/format';
import { getSaldo, getMovimientos } from '@/lib/cortex/api';
import type { Movimiento } from '@/lib/cortex/seed';
import type { SaldoResponse } from '@/lib/cortex/api';
import { formatFechaISO, diasHasta } from '@/lib/utils/time';

// ─── Component ───────────────────────────────────────────────────────────────
export default function AccountSaldo() {
  const [saldo, setSaldo] = useState<SaldoResponse | null>(null);
  const [movimientos, setMovimientos] = useState<Movimiento[] | null>(null);

  useEffect(() => {
    Promise.all([getSaldo(), getMovimientos()]).then(([s, m]) => {
      setSaldo(s);
      setMovimientos(m);
    });
  }, []);

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (!saldo || !movimientos) return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-slate-200 rounded w-1/3" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => <div key={i} className="h-32 bg-slate-200 rounded-xl" />)}
      </div>
      <div className="h-48 bg-slate-200 rounded-xl" />
      <div className="h-48 bg-slate-200 rounded-xl" />
    </div>
  );

  // ── Summary cards derived from API response ───────────────────────────────
  const summaryCards = saldo ? [
    { label: 'Saldo Disponible', value: formatTokens(saldo.disponible), unit: 'Créditos', icon: Coins, accent: '#29DDDA' },
    { label: 'Saldo en Reserva', value: formatTokens(saldo.enReserva), unit: 'Créditos', icon: Lock, accent: '#3371AF' },
    { label: 'Caduca este mes', value: formatTokens(saldo.caducaEsteMes), unit: 'Créditos', icon: AlertTriangle, accent: '#F59E0B' },
  ] : [];

  return (
    <div className="space-y-6">

      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
      <h1 className="text-2xl font-bold" style={{ color: '#091231' }}>Saldo &amp; Créditos</h1>
          <p className="text-sm mt-0.5" style={{ color: '#3371AF' }}>
        Economía Base · Los movimientos son verificables y auditables.
          </p>
        </div>
        <button
            onClick={() => toast.success('Lote de 500 Créditos añadido. Evento verificable registrado en el Ledger.')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all hover:brightness-110 shadow"
          style={{ backgroundColor: '#29DDDA', color: '#091231' }}
        >
          <ShoppingCart className="w-4 h-4" />
            Adquirir Paquete de Créditos
        </button>
      </div>

      {/* ── SUMMARY CARDS ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summaryCards.map(({ label, value, unit, icon: Icon, accent }) => (
          <div
            key={label}
            className={`rounded-xl bg-white border p-5 shadow-sm flex items-start gap-4 ${
              label === 'Saldo en Reserva' ? 'tour-saldo-reserva' : ''
            }`}
            style={{ borderColor: '#ECF0F5' }}
          >
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: accent + '20' }}
            >
              <Icon className="w-6 h-6" style={{ color: accent }} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#3371AF' }}>
                {label}
              </p>
              <p className="text-3xl font-bold leading-none" style={{ color: '#091231' }}>{value}</p>
              <p className="text-xs mt-0.5" style={{ color: '#091231', opacity: 0.5 }}>{unit}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── LOTES DE CRÉDITOS ──────────────────────────────────────── */}
      <div className="rounded-xl bg-white border shadow-sm overflow-hidden" style={{ borderColor: '#ECF0F5' }}>
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#ECF0F5' }}>
          <h2 className="font-bold text-base" style={{ color: '#091231' }}>Lotes de Créditos</h2>
          <span className="text-xs" style={{ color: '#3371AF' }}>Los lotes caducan a los 12 meses de su emisión</span>
        </div>
        <div className="w-full max-w-full overflow-x-auto">
          <table className="min-w-[640px] w-full">
            <thead>
              <tr style={{ backgroundColor: '#091231' }}>
                {['ID Lote', 'Origen', 'Cantidad Restante', 'Fecha de Caducidad'].map((col) => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {saldo.lotes.map((lot, idx) => {
                const days = diasHasta(lot.caducidad);
                const expiring = days <= 30;
                return (
                  <tr
                    key={lot.id}
                    style={{
                      backgroundColor: expiring
                        ? '#FEF9C3'
                        : idx % 2 === 0
                        ? '#FFFFFF'
                        : '#ECF0F5',
                    }}
                  >
                    <td className="px-4 py-3 text-sm font-mono font-medium" style={{ color: '#091231' }}>
                      {lot.id}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: '#ECF0F5', color: '#223F7C' }}
                      >
                        {lot.origen}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-bold" style={{ color: '#091231' }} suppressHydrationWarning>
                    {formatTokens(lot.cantidad)} Créditos
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span style={{ color: expiring ? '#B45309' : '#3371AF' }} className="font-medium">
                        {formatFechaISO(lot.caducidad)}
                      </span>
                      {expiring && (
                        <span
                          className="ml-2 text-xs font-bold px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: '#FEF3C7', color: '#B45309' }}
                        >
                          ⚠ {days}d
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── MOVIMIENTOS VERIFICABLES ───────────────────────────────── */}
      <div className="rounded-xl bg-white border shadow-sm overflow-hidden" style={{ borderColor: '#ECF0F5' }}>
        <div className="px-5 py-4 border-b flex items-center gap-2" style={{ borderColor: '#ECF0F5' }}>
          <h2 className="font-bold text-base" style={{ color: '#091231' }}>Movimientos Verificables</h2>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-semibold"
            style={{ backgroundColor: '#091231', color: '#29DDDA' }}
          >
            append-only
          </span>
        </div>
        <div className="w-full max-w-full overflow-x-auto">
          <table className="min-w-[640px] w-full">
            <thead>
              <tr style={{ backgroundColor: '#091231' }}>
                {['TX ID', 'Descripción', 'Movimiento', 'Fecha'].map((col) => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {movimientos.map((tx, idx) => {
                const positive = tx.delta > 0;
                const Icon = positive ? TrendingUp : tx.delta < 0 ? TrendingDown : RefreshCw;
                return (
                  <tr
                    key={tx.id}
                    style={{ backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#ECF0F5' }}
                  >
                    <td className="px-4 py-3 text-xs font-mono" style={{ color: '#3371AF' }}>
                      {tx.id}
                    </td>
                    <td className="px-4 py-3 text-sm" style={{ color: '#091231' }}>
                      {tx.descripcion}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className="flex items-center gap-1 font-bold w-fit"
                        style={{ color: positive ? '#059669' : '#DC2626' }}
                      >
                        <Icon className="w-4 h-4" />
                        {positive ? '+' : ''}{tx.delta} Créditos
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-400" suppressHydrationWarning>{formatFechaISO(tx.fecha)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
