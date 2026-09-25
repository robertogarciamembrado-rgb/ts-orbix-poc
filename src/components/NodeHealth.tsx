'use client';

import Link from 'next/link';
import { AlertTriangle, CheckCircle2, ExternalLink } from 'lucide-react';
import type { NodeHealthAlert } from '@/lib/cortex/api';

interface NodeHealthProps {
  alerts: NodeHealthAlert[];
}

const severityStyles: Record<NodeHealthAlert['severity'], string> = {
  1: 'border-rose-200 bg-rose-50 text-rose-900',
  2: 'border-orange-200 bg-orange-50 text-orange-900',
  3: 'border-amber-200 bg-amber-50 text-amber-900',
  4: 'border-slate-200 bg-slate-50 text-slate-800',
};

export default function NodeHealth({ alerts }: NodeHealthProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-orbix-ts">Diagnóstico preventivo</p>
          <h2 className="mt-1 text-lg font-bold text-orbix-navy">Salud del nodo</h2>
        </div>
        {alerts.length === 0 ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800"><CheckCircle2 className="h-3.5 w-3.5" />Todo correcto</span>
        ) : <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800">{alerts.length} tarea{alerts.length === 1 ? '' : 's'}</span>}
      </div>
      {alerts.length > 0 && (
        <div className="mt-4 space-y-3">
          {alerts.map((alert) => (
            <div key={`${alert.severity}-${alert.title}`} className={`flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between ${severityStyles[alert.severity]}`}>
              <div className="flex gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                <div><p className="text-sm font-bold">{alert.title}</p><p className="mt-1 text-sm opacity-80">{alert.detail}</p></div>
              </div>
              <Link href={alert.href} className="inline-flex shrink-0 items-center justify-center gap-1 rounded-lg bg-white/80 px-3 py-2 text-xs font-bold shadow-sm hover:bg-white">{alert.action}<ExternalLink className="h-3.5 w-3.5" /></Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
