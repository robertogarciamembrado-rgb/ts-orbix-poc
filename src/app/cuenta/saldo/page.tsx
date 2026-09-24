// src/app/cuenta/saldo/page.tsx
"use client";
import { Coins, Lock, AlertTriangle, ShoppingCart, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { formatTokens } from '@/lib/format';

// ─── Mock data ───────────────────────────────────────────────────────────────
const summary = [
  {
    label: 'Saldo Disponible',
    value: '1,250',
    unit: 'Tokens',
    icon: Coins,
    accent: '#29DDDA',
  },
  {
    label: 'Saldo en Reserva',
    value: '450',
    unit: 'Tokens',
    icon: Lock,
    accent: '#3371AF',
  },
  {
    label: 'Caduca este mes',
    value: '100',
    unit: 'Tokens',
    icon: AlertTriangle,
    accent: '#F59E0B',
  },
];

const today = new Date();
function daysUntil(dateStr: string) {
  const d = new Date(dateStr);
  return Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

const lots = [
  { id: 'LOT-001', origin: 'Saldo Base',  qty: 750,  expiry: '2025-12-31' },
  { id: 'LOT-002', origin: 'Compra',      qty: 500,  expiry: '2027-05-15' },
  { id: 'LOT-003', origin: 'Recompensa',  qty: 100,  expiry: '2026-10-10' },
  { id: 'LOT-004', origin: 'Compra',      qty: 350,  expiry: '2027-03-01' },
];

const movements = [
  { id: 'TX-0041', delta: +500, description: 'Compra de Paquete Estándar',       date: '2026-09-10' },
  { id: 'TX-0042', delta: -15,  description: 'Reserva para Oferta Tour Madrid',   date: '2026-09-12' },
  { id: 'TX-0043', delta: +50,  description: 'Liberación por Venta Anulada',      date: '2026-09-14' },
  { id: 'TX-0044', delta: -30,  description: 'Reserva para Oferta Hotel Madrid',  date: '2026-09-18' },
  { id: 'TX-0045', delta: +200, description: 'Recompensa por Acuerdo Marco',      date: '2026-09-20' },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function AccountSaldo() {
  return (
    <div className="space-y-6">

      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#091231' }}>Saldo & Tokens</h1>
          <p className="text-sm mt-0.5" style={{ color: '#3371AF' }}>
            Economía Base · Los movimientos son inmutables y auditables.
          </p>
        </div>
        <button
          onClick={() => toast.success('Lote de 500 Créditos añadido. Evento inmutable registrado en el Ledger.')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all hover:brightness-110 shadow"
          style={{ backgroundColor: '#29DDDA', color: '#091231' }}
        >
          <ShoppingCart className="w-4 h-4" />
          Adquirir Paquete de Tokens
        </button>
      </div>

      {/* ── SUMMARY CARDS ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summary.map(({ label, value, unit, icon: Icon, accent }) => (
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
        <div className="overflow-x-auto">
          <table className="min-w-full">
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
              {lots.map((lot, idx) => {
                const days = daysUntil(lot.expiry);
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
                        {lot.origin}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-bold" style={{ color: '#091231' }} suppressHydrationWarning>
                      {formatTokens(lot.qty)} Tokens
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span style={{ color: expiring ? '#B45309' : '#3371AF' }} className="font-medium">
                        {lot.expiry}
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

      {/* ── MOVIMIENTOS INMUTABLES ─────────────────────────────────── */}
      <div className="rounded-xl bg-white border shadow-sm overflow-hidden" style={{ borderColor: '#ECF0F5' }}>
        <div className="px-5 py-4 border-b flex items-center gap-2" style={{ borderColor: '#ECF0F5' }}>
          <h2 className="font-bold text-base" style={{ color: '#091231' }}>Movimientos Inmutables</h2>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-semibold"
            style={{ backgroundColor: '#091231', color: '#29DDDA' }}
          >
            append-only
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
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
              {movements.map((tx, idx) => {
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
                      {tx.description}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className="flex items-center gap-1 font-bold w-fit"
                        style={{ color: positive ? '#059669' : '#DC2626' }}
                      >
                        <Icon className="w-4 h-4" />
                        {positive ? '+' : ''}{tx.delta} Tokens
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-400">{tx.date}</td>
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
