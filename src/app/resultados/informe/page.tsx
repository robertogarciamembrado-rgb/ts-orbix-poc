'use client';

import { useEffect, useState } from 'react';
import { Download, Mail, Send, Sparkles } from 'lucide-react';
import { getResultados, type ResultadosResponse } from '@/lib/cortex/api';
import { formatCurrencyEUR } from '@/lib/format';

export default function InformeMensualPage() {
  const [resultados, setResultados] = useState<ResultadosResponse | null>(null);

  useEffect(() => {
    getResultados().then(setResultados);
  }, []);

  if (!resultados) {
    return <div className="h-96 animate-pulse rounded-2xl bg-slate-200" />;
  }

  const resumen = `Este ${resultados.periodo.toLowerCase()}, la red convirtió ${resultados.ventasFirmes} ventas atribuidas y generó ${formatCurrencyEUR(resultados.brutoCobrar)} para tu nodo.`;
  const metricas = [
    ['Ventas atribuidas', String(resultados.ventasFirmes)],
    ['Publicaciones comprobadas', String(resultados.publicacionesComprobadas)],
    ['Miembros aportados', String(resultados.miembros.length)],
    ['Créditos consumidos', String(resultados.creditosConsumidos)],
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between print:hidden">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orbix-ts">Nivel asistido · informe por correo</p>
          <h1 className="mt-1 text-2xl font-bold text-orbix-navy">Informe de resultado mensual</h1>
          <p className="mt-1 text-sm text-slate-500">Previsualización del correo que recibe un nodo tutelado.</p>
        </div>
        <button onClick={() => window.print()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-orbix-navy px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-800">
          <Download className="h-4 w-4 text-orbix-cyan" /> Descargar / imprimir PDF
        </button>
      </div>

      <article className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-xl shadow-slate-900/5 print:shadow-none">
        <div className="flex items-center justify-between bg-orbix-navy px-7 py-5 text-white">
          <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-orbix-cyan text-orbix-navy"><Mail className="h-5 w-5" /></span><div><p className="font-bold">TS Orbix</p><p className="text-xs text-white/60">Informe de valor de la red</p></div></div>
          <span className="text-xs font-semibold text-orbix-cyan">{resultados.periodo}</span>
        </div>
        <div className="p-7 sm:p-10">
          <p className="text-sm text-slate-500">Hola,</p>
          <h2 className="mt-3 max-w-2xl text-2xl font-bold leading-tight text-orbix-navy sm:text-3xl">{resumen}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">Este resumen se entrega directamente por correo para que puedas seguir el impacto de tu participación sin tener que entrar en la plataforma.</p>
          <div className="my-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-4">
            {metricas.map(([label, value]) => <div key={label} className="bg-white p-4"><p className="text-2xl font-bold text-orbix-navy">{value}</p><p className="mt-1 text-xs font-medium text-slate-500">{label}</p></div>)}
          </div>
          <div className="rounded-2xl border-l-4 border-orbix-cyan bg-cyan-50 p-5"><div className="flex gap-3"><Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-orbix-ts" /><div><p className="font-bold text-orbix-navy">Valor acreditado</p><p className="mt-1 text-sm text-slate-600">Las ventas atribuidas equivalen a <strong>{formatCurrencyEUR(resultados.brutoCobrar)}</strong> pendientes de liquidación. Las publicaciones y miembros se han comprobado en la red.</p></div></div></div>
          <div className="mt-8 flex items-center gap-2 text-sm text-slate-500"><Send className="h-4 w-4 text-orbix-ts" /> Enviado por tu Account Manager de TS Orbix</div>
        </div>
      </article>
    </div>
  );
}
