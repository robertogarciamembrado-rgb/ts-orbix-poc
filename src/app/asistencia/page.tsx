'use client';

import { useEffect, useState } from 'react';
import { HandHeart, MailCheck } from 'lucide-react';
import { getNodosAsistidos, type NodoAsistidoResponse } from '@/lib/cortex/api';
import { formatFechaISO } from '@/lib/utils/time';

export default function AsistenciaPage() {
  const [nodos, setNodos] = useState<NodoAsistidoResponse[]>([]);

  useEffect(() => {
    getNodosAsistidos().then(setNodos);
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-orbix-navy px-6 py-7 text-white sm:px-8">
        <div className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-orbix-cyan text-orbix-navy"><HandHeart className="h-6 w-6" /></span><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-orbix-cyan">Account Manager</p><h1 className="mt-1 text-2xl font-bold">Nodos asistidos</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">Seguimiento de entidades tuteladas que reciben informes y gestión de encargos sin acceso directo a la plataforma.</p></div></div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full">
          <thead className="bg-slate-50 text-left text-xs font-bold uppercase tracking-wider text-slate-500"><tr><th className="px-5 py-4">Nombre del nodo</th><th className="px-5 py-4">Último informe enviado</th><th className="px-5 py-4">Encargos pendientes</th></tr></thead>
          <tbody>
            {nodos.map((nodo) => <tr key={nodo.id} className="border-t border-slate-100"><td className="px-5 py-4 text-sm font-bold text-orbix-navy">{nodo.nombre}</td><td className="px-5 py-4"><span className="inline-flex items-center gap-2 text-sm text-slate-600"><MailCheck className="h-4 w-4 text-orbix-ts" />{formatFechaISO(nodo.ultimoInformeEnviado)}</span></td><td className="px-5 py-4"><span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">{nodo.encargosPendientes} pendientes</span></td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
