"use client";
import { FileText, Clock, ChevronRight, CheckCircle, Archive } from "lucide-react";
import { hace, formatFechaISO, nombreMesAnio } from "@/lib/utils/time";

// ─── Data ─────────────────────────────────────────────────────────────────
const drafts = [
  {
    id: "draft-001",
    title: "Borrador " + nombreMesAnio(hace(1, 'meses')),
    description: "Análisis estratégico del sector turístico. Pendiente de revisión final antes de publicación.",
    date: formatFechaISO(hace(28, 'dias')),
    pages: 24,
    status: "Pendiente de revisión",
  },
  {
    id: "draft-002",
    title: "Borrador " + nombreMesAnio(new Date()),
    description: "Análisis Q3 2026: Sostenibilidad y tecnología como ejes de transformación en destinos turísticos.",
    date: formatFechaISO(hace(5, 'dias')),
    pages: 31,
    status: "En edición",
  },
];

const published = [
  { id: "rep-001", title: "Informe " + nombreMesAnio(hace(2, 'meses')),  date: formatFechaISO(hace(2, 'meses')), pages: 28, downloads: 47 },
  { id: "rep-002", title: "Informe " + nombreMesAnio(hace(3, 'meses')),  date: formatFechaISO(hace(3, 'meses')), pages: 22, downloads: 63 },
  { id: "rep-003", title: "Informe " + nombreMesAnio(hace(4, 'meses')),  date: formatFechaISO(hace(4, 'meses')), pages: 19, downloads: 38 },
  { id: "rep-004", title: "Informe " + nombreMesAnio(hace(5, 'meses')),  date: formatFechaISO(hace(5, 'meses')), pages: 25, downloads: 51 },
];

// ─── Sub-components ────────────────────────────────────────────────────────
function DraftCard({ draft }: { draft: typeof drafts[0] }) {
  return (
    <div className="rounded-xl border p-5 flex gap-4"
      style={{ backgroundColor: '#0C1A3E', borderColor: 'rgba(255,255,255,0.07)' }}>
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: 'rgba(41,221,218,0.1)', border: '1px solid rgba(41,221,218,0.2)' }}>
        <FileText className="w-6 h-6" style={{ color: '#29DDDA' }} />
      </div>
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h4 className="font-bold text-sm text-white mb-0.5">{draft.title}</h4>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{draft.description}</p>
          </div>
          <button
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg flex-shrink-0 transition-all hover:brightness-110"
            style={{ backgroundColor: '#29DDDA', color: '#091231' }}
          >
            Auditar borrador
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        {/* Meta */}
        <div className="flex items-center gap-3 mt-3 flex-wrap">
          <span className="flex items-center gap-1 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            <Clock className="w-3 h-3" />{draft.date}
          </span>
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{draft.pages} págs.</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded"
            style={{ backgroundColor: '#F59E0B20', color: '#F59E0B' }}>
            {draft.status}
          </span>
        </div>
      </div>
    </div>
  );
}

function PublishedRow({ rep }: { rep: typeof published[0] }) {
  return (
    <div className="flex items-center gap-4 px-5 py-3 border-b last:border-0"
      style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: 'rgba(51,113,175,0.2)' }}>
        <Archive className="w-4 h-4" style={{ color: '#3371AF' }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white">{rep.title}</p>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{rep.date} · {rep.pages} págs.</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{rep.downloads} descargas</span>
        <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#29DDDA' }}>
          <CheckCircle className="w-3.5 h-3.5" /> Publicado
        </span>
        <button className="text-xs font-semibold px-2 py-1 rounded border transition-all hover:bg-white/5"
          style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }}>
          Descargar
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default function VigilanteInformes() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Informes Estratégicos</h1>
        <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Borradores en proceso y archivo histórico de informes publicados.
        </p>
      </div>

      {/* ── DRAFTS ────────────────────────────────────────────────── */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Borradores Pendientes de Revisión
        </p>
        <div className="space-y-3">
          {drafts.map((d) => <DraftCard key={d.id} draft={d} />)}
        </div>
      </section>

      {/* ── PUBLISHED ─────────────────────────────────────────────── */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Histórico de Informes Publicados
        </p>
        <div className="rounded-xl border overflow-hidden"
          style={{ backgroundColor: '#0C1A3E', borderColor: 'rgba(255,255,255,0.07)' }}>
          {published.map((r) => <PublishedRow key={r.id} rep={r} />)}
        </div>
      </section>
    </div>
  );
}
