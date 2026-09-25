"use client";
import { useState, useEffect } from 'react';
import Card from '@/components/Card';
import AgentInsight from '@/components/AgentInsight';
import OfferModal from '@/components/OfferModal';
import PixelStatus from '@/components/PixelStatus';
import { Plus, CheckCircle, Wifi, X } from 'lucide-react';
import { finalizarDistribucion, getOfferInsightContext, getOfertas, getPixelMetrics, getDistribuciones, reaceptarDistribucion } from '@/lib/cortex/api';
import type { OfferInsightContext, OfertasResponse, PixelMetricsResponse } from '@/lib/cortex/api';
import { useDemoContext } from '@/components/DemoContext';

type GeneratedInsight = {
  observation: string;
  proposal: string;
  reason: string;
  source: 'fallback' | 'model';
};

export default function AccountOfertas() {
  const { nodeId } = useDemoContext();
  const isProvider = nodeId === 'nodo-003';
  const [modalOpen, setModalOpen] = useState(false);
  const [ofertas, setOfertas] = useState<OfertasResponse | null>(null);
  const [pixelMetrics, setPixelMetrics] = useState<PixelMetricsResponse | null>(null);
  const [distribuciones, setDistribuciones] = useState<Awaited<ReturnType<typeof getDistribuciones>>>([]);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [insight, setInsight] = useState<GeneratedInsight | null>(null);
  const [loadingInsightFor, setLoadingInsightFor] = useState<string | null>(null);
  const [approvedOfferId, setApprovedOfferId] = useState<string | null>(null);
  const [commission, setCommission] = useState(15);
  const [selectedDistribution, setSelectedDistribution] = useState<Awaited<ReturnType<typeof getDistribuciones>>[number] | null>(null);

  useEffect(() => {
    Promise.all([getOfertas(), getPixelMetrics(), getDistribuciones()]).then(([ofertasData, pixelData, distribucionesData]) => {
      setOfertas(ofertasData);
      setPixelMetrics(pixelData);
      setDistribuciones(distribucionesData);
    });
  }, []);

  async function requestInsight(offerId: string) {
    setLoadingInsightFor(offerId);
    setActiveOfferId(offerId);
    setInsight(null);
    try {
      const context: OfferInsightContext = await getOfferInsightContext(offerId);
      const response = await fetch('/api/insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context }),
      });
      if (!response.ok) throw new Error('No se pudo generar el insight');
      setInsight(await response.json() as GeneratedInsight);
    } catch {
      setActiveOfferId(null);
    } finally {
      setLoadingInsightFor(null);
    }
  }

  if (!ofertas || !pixelMetrics) return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-slate-200 rounded w-1/3" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => <div key={i} className="h-32 bg-slate-200 rounded-xl" />)}
      </div>
    </div>
  );

  if (!isProvider) {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orbix-ts">Medio distribuidor</p>
          <h1 className="mt-1 text-2xl font-bold text-orbix-navy">Distribuciones activas</h1>
          <p className="mt-1 text-sm text-slate-500">Experiencias de la red disponibles para tu audiencia.</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full">
            <thead className="bg-orbix-navy text-left text-xs uppercase tracking-wider text-white">
              <tr><th className="px-5 py-3">Oferta</th><th className="px-5 py-3">Proveedor</th><th className="px-5 py-3">Comisión</th><th className="px-5 py-3">Estado</th></tr>
            </thead>
            <tbody>
              {distribuciones.map((distribucion) => (
                <tr key={distribucion.id} onClick={() => setSelectedDistribution(distribucion)} className={`cursor-pointer border-t border-slate-100 ${distribucion.pendienteReaceptacion ? 'bg-amber-50 opacity-75' : 'hover:bg-slate-50'}`}>
                  <td className="px-5 py-4 text-sm font-semibold text-orbix-navy">{distribucion.oferta?.titulo ?? 'Oferta no disponible'}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{distribucion.oferta ? ofertas.catalogo.find((oferta) => oferta.id === distribucion.ofertaId)?.provider ?? 'Red TS Orbix' : 'Red TS Orbix'}</td>
                  <td className="px-5 py-4 text-sm font-bold text-orbix-navy">{distribucion.comisionAceptada}% → {distribucion.oferta?.comision ?? 0}%</td>
                  <td className="px-5 py-4"><span className={`rounded-full px-2 py-1 text-xs font-bold ${distribucion.pendienteReaceptacion ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>{distribucion.pendienteReaceptacion ? 'Pendiente de reaceptación' : 'Activa'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedDistribution && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-4 sm:items-center">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div><p className="text-xs font-bold uppercase tracking-wider text-orbix-ts">Detalle de distribución</p><h2 className="mt-1 text-xl font-bold text-orbix-navy">{selectedDistribution.oferta?.titulo}</h2></div>
                <button type="button" onClick={() => setSelectedDistribution(null)} aria-label="Cerrar detalle"><X className="h-5 w-5 text-slate-400" /></button>
              </div>
              <dl className="mt-5 grid grid-cols-2 gap-4 text-sm"><div><dt className="text-slate-500">Comisión aceptada</dt><dd className="font-bold text-orbix-navy">{selectedDistribution.comisionAceptada}%</dd></div><div><dt className="text-slate-500">Comisión actual</dt><dd className="font-bold text-orbix-navy">{selectedDistribution.oferta?.comision ?? 0}%</dd></div><div><dt className="text-slate-500">Vigente desde</dt><dd className="font-medium text-slate-700">{selectedDistribution.fechaAceptacion.toLocaleDateString('es-ES')}</dd></div><div><dt className="text-slate-500">Histórico</dt><dd className="font-medium text-slate-700">{selectedDistribution.llegadasHistoricas.toLocaleString('es-ES')} llegadas · {selectedDistribution.ventasHistoricas} ventas</dd></div></dl>
              {selectedDistribution.pendienteReaceptacion ? (
                <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4"><p className="text-sm font-semibold text-amber-900">El proveedor redujo la comisión. La distribución está bloqueada del canal activo.</p><div className="mt-4 flex flex-wrap justify-end gap-2"><button type="button" onClick={async () => { await finalizarDistribucion(selectedDistribution.id); setDistribuciones((items) => items.filter((item) => item.id !== selectedDistribution.id)); setSelectedDistribution(null); }} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700">Rechazar y finalizar</button><button type="button" onClick={async () => { await reaceptarDistribucion(selectedDistribution.id); const updated = await getDistribuciones(); setDistribuciones(updated); setSelectedDistribution(updated.find((item) => item.id === selectedDistribution.id) ?? null); }} className="rounded-lg bg-orbix-cyan px-3 py-2 text-sm font-bold text-orbix-navy">Reaceptar nuevas condiciones</button></div></div>
              ) : <p className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-800">La distribución está activa y sus condiciones están sincronizadas.</p>}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <OfferModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <PixelStatus initialMetrics={pixelMetrics} />

      <Card title="Simulador de comisión">
        <div className="grid gap-5 md:grid-cols-[1fr_280px] md:items-center">
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="commission-slider" className="text-sm font-semibold text-orbix-navy">
                Comisión propuesta
              </label>
              <span className="text-2xl font-black text-orbix-navy">{commission}%</span>
            </div>
            <input
              id="commission-slider"
              type="range"
              min="5"
              max="25"
              value={commission}
              onChange={(event) => setCommission(Number(event.target.value))}
              className="mt-4 w-full accent-orbix-ts"
            />
            <div className="mt-2 flex justify-between text-xs text-slate-400"><span>5%</span><span>25%</span></div>
          </div>
          <div className="rounded-xl bg-cyan-50 p-4">
            <p className="text-sm leading-6 text-slate-700">
              Al <strong>{commission}%</strong> te distribuirían <strong>{Math.max(1, Math.round((commission - 8) * 0.7))} nodos más</strong>;
              al 18%, 9. La media de tu categoría es <strong>14%</strong>.
            </p>
          </div>
        </div>
      </Card>

      {/* ── MIS OFERTAS PUBLICADAS ── */}
      <Card title="Mis Ofertas Publicadas">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm" style={{ color: '#3371AF' }}>
            Gestiona las experiencias que ofreces a la red de distribuidores.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all hover:brightness-110"
            style={{ backgroundColor: '#29DDDA', color: '#091231' }}
          >
            <Plus className="w-4 h-4" />
            Crear Oferta
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border" style={{ borderColor: '#ECF0F5' }}>
          <table className="min-w-full">
            <thead>
              <tr style={{ backgroundColor: '#091231' }}>
                {['Experiencia', 'Territorio', 'Comisión', 'Estado'].map((col) => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ofertas.propias.map((o, idx) => (
                <tr key={o.id} style={{ backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#ECF0F5' }}>
                  <td className="px-4 py-3 text-sm font-bold" style={{ color: '#091231' }}>{o.titulo}</td>
                  <td className="px-4 py-3 text-sm" style={{ color: '#3371AF' }}>{o.territorio}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="font-bold text-base" style={{ color: '#091231' }}>{o.comision}%</span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold"
                      style={{ backgroundColor: '#29DDDA', color: '#091231' }}
                    >
                      <Wifi className="w-3 h-3" />
                      {o.estado === 'activa' && o.pixelOk ? 'Activa (Píxel OK)' : o.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── CATÁLOGO DE DISTRIBUCIÓN ── */}
      <Card title="Catálogo de Distribución">
        <p className="text-sm mb-4" style={{ color: '#3371AF' }}>
          Ofertas de la red disponibles para promocionar. La comisión es pública antes de aceptar.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ofertas.catalogo.map((o) => (
            <div
              key={o.id}
              className="rounded-xl border bg-white p-5 flex flex-col justify-between shadow-sm"
              style={{ borderColor: '#ECF0F5' }}
            >
              {/* Provider badge */}
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full mb-3 w-fit"
                style={{ backgroundColor: '#ECF0F5', color: '#223F7C' }}
              >
                {o.provider}
              </span>

              {/* Title */}
              <h4 className="font-bold text-sm mb-2 leading-tight" style={{ color: '#091231' }}>
                {o.titulo}
              </h4>

              {/* Territory */}
              <p className="text-xs mb-4" style={{ color: '#3371AF' }}>📍 {o.territorio}</p>

              {/* Commission — hero metric */}
              <div
                className="rounded-lg px-4 py-3 mb-4 text-center"
                style={{ backgroundColor: '#091231' }}
              >
                <p className="text-xs font-semibold mb-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Comisión para ti
                </p>
                <p className="text-3xl font-bold" style={{ color: '#29DDDA' }}>
                  {o.comision}%
                </p>
              </div>

              {/* CTA */}
              {activeOfferId === o.id && insight && (
                <div className="mb-4">
                  <AgentInsight
                    observation={insight.observation}
                    proposal={insight.proposal}
                    reason={insight.reason}
                    actionLabel="Aprobar distribución"
                    approved={approvedOfferId === o.id}
                    onApprove={() => setApprovedOfferId(o.id)}
                  />
                </div>
              )}
              <button
                type="button"
                onClick={() => requestInsight(o.id)}
                disabled={loadingInsightFor === o.id || approvedOfferId === o.id}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
                style={{ backgroundColor: '#29DDDA', color: '#091231' }}
              >
                <CheckCircle className="w-4 h-4" />
                {approvedOfferId === o.id
                  ? 'Distribución aprobada'
                  : loadingInsightFor === o.id
                    ? 'Analizando datos...'
                    : 'Ver recomendación'}
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
