// src/app/cuenta/relaciones/page.tsx
"use client";
import Card from "@/components/Card";
import NodeCard from "@/components/NodeCard";
import AgreementTable from "@/components/AgreementTable";
import { useState, useEffect } from "react";
import { getGrafo } from "@/lib/cortex/api";
import type { GrafoResponse } from "@/lib/cortex/api";
import { formatFechaISO } from "@/lib/utils/time";
import { useDemoContext } from "@/components/DemoContext";
import { toast } from "sonner";

export default function AccountRelaciones() {
  const [activeTab, setActiveTab] = useState<"network" | "agreements">("network");
  const [grafo, setGrafo] = useState<GrafoResponse | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<string | null>(null);
  const { nodeId } = useDemoContext();

  useEffect(() => {
    getGrafo().then(setGrafo);
  }, []);

  if (!grafo)
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-slate-200 rounded w-1/2" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-slate-200 rounded-xl" />
          ))}
        </div>
      </div>
    );

  // Para AgreementTable: convertir aristas a formato legible
  const agreements = grafo.aristas.map((a) => {
    const nodoDestino = grafo.nodos.find((n) => n.id === a.nodoDestinoId);
    const tipoLabel =
      a.tipo === "marco"
        ? "Acuerdo Marco"
        : a.tipo === "distribucion"
        ? "Acuerdo de Distribución"
        : "Acuerdo de Publicación";
    return {
      node: nodoDestino?.nombre ?? a.nodoDestinoId,
      type: tipoLabel,
      status: a.estado,
      validFrom: formatFechaISO(a.fechaVigencia),
    };
  });

  return (
    <Card title="Cuenta – Relaciones">
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 ${activeTab === "network" ? "border-b-2 border-blue-600" : ""}`}
          onClick={() => setActiveTab("network")}
        >
          Directorio de la Red
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "agreements" ? "border-b-2 border-blue-600" : ""}`}
          onClick={() => setActiveTab("agreements")}
        >
          Mis Acuerdos
        </button>
      </div>
      {activeTab === "network" ? (
        <div className="space-y-6">
          <div className="overflow-hidden rounded-2xl bg-orbix-navy p-3 sm:p-6">
            <div className="mb-3 flex items-center justify-between">
              <div><p className="text-xs font-bold uppercase tracking-wider text-orbix-cyan">El Cortex</p><p className="text-sm text-white/60">Pulsa una arista para inspeccionar sus resultados.</p></div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">Centro: {grafo.nodos.find((node) => node.id === nodeId)?.nombre ?? 'Nodo actual'}</span>
            </div>
            <div className="overflow-x-auto">
              <svg viewBox="0 0 760 360" className="mx-auto min-w-[680px] max-w-full" role="img" aria-label="Grafo interactivo de relaciones">
                {grafo.aristas.map((edge, index) => {
                  const sourceIsCenter = edge.nodoOrigenId === nodeId;
                  const targetIsCenter = edge.nodoDestinoId === nodeId;
                  if (!sourceIsCenter && !targetIsCenter) return null;
                  const x = 130 + (index % 4) * 165;
                  const y = index % 2 === 0 ? 80 : 275;
                  const weight = grafo.pesos[edge.id] ?? 0;
                  const selected = selectedEdge === edge.id;
                  return <g key={edge.id} onClick={() => setSelectedEdge(edge.id)} className="cursor-pointer">
                    <line x1="380" y1="180" x2={x} y2={y} stroke={selected ? '#29DDDA' : '#3371AF'} strokeWidth={Math.max(2, Math.min(8, weight + 2))} opacity={selected ? 1 : 0.7} />
                    <circle cx={x} cy={y} r="34" fill={selected ? '#29DDDA' : '#223F7C'} stroke="#29DDDA" strokeWidth="2" />
                    <text x={x} y={y + 3} textAnchor="middle" fontSize="11" fill={selected ? '#091231' : '#fff'}>{grafo.nodos.find((node) => node.id === (sourceIsCenter ? edge.nodoDestinoId : edge.nodoOrigenId))?.nombre.slice(0, 14)}</text>
                    <text x={(380 + x) / 2} y={(180 + y) / 2} textAnchor="middle" fontSize="10" fill="#fff">{weight} ventas</text>
                  </g>;
                })}
                <circle cx="380" cy="180" r="48" fill="#29DDDA" stroke="#fff" strokeWidth="3" />
                <text x="380" y="176" textAnchor="middle" fontSize="12" fontWeight="700" fill="#091231">Nodo actual</text>
                <text x="380" y="192" textAnchor="middle" fontSize="10" fill="#091231">{grafo.nodos.find((node) => node.id === nodeId)?.nombre.slice(0, 18)}</text>
              </svg>
            </div>
            {selectedEdge && (() => {
              const edge = grafo.aristas.find((item) => item.id === selectedEdge);
              if (!edge) return null;
              const otherId = edge.nodoOrigenId === nodeId ? edge.nodoDestinoId : edge.nodoOrigenId;
              const other = grafo.nodos.find((node) => node.id === otherId);
              return <div className="mt-3 rounded-xl border border-cyan-300/30 bg-white/10 p-4 text-sm text-white"><strong>{other?.nombre}</strong> · {edge.tipo} · {edge.estado}<p className="mt-1 text-white/70">{grafo.pesos[edge.id] ?? 0} ventas firmes atribuidas en esta relación.</p></div>;
            })()}
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            {grafo.nodos.filter((node) => node.id !== nodeId).map((node) => (
              <div key={node.id} className="rounded-xl border bg-white p-5 shadow-sm" style={{ borderColor: '#ECF0F5' }}>
                <p className="text-xs font-bold uppercase tracking-wider text-orbix-ts">Recomendación activa</p>
                <h3 className="mt-2 font-bold text-orbix-navy">{node.nombre}</h3>
                <p className="mt-2 text-sm leading-5 text-slate-600">Por qué este nodo: audiencia complementaria y territorio compatible con tu red.</p>
                <button onClick={() => toast.success(`Acuerdo propuesto a ${node.nombre}`)} className="mt-4 w-full rounded-lg bg-orbix-cyan px-3 py-2 text-sm font-bold text-orbix-navy">Proponer acuerdo</button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <AgreementTable data={agreements} />
      )}
    </Card>
  );
}
