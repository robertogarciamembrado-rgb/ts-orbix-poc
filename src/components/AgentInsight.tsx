"use client";

import { BrainCircuit, CheckCircle2, Eye, Lightbulb, ShieldQuestion } from "lucide-react";

export type AgentInsightProps = {
  observation: string;
  proposal: string;
  reason: string;
  actionLabel: string;
  onApprove: () => void;
  approved?: boolean;
};

export default function AgentInsight({
  observation,
  proposal,
  reason,
  actionLabel,
  onApprove,
  approved = false,
}: AgentInsightProps) {
  if (!reason?.trim()) {
    console.error("AgentInsight no se renderizó: falta la justificación de la propuesta.");
    return null;
  }

  const sections = [
    { label: "Qué observa", content: observation, icon: Eye, tone: "text-[#3371AF] bg-[#3371AF]/10" },
    { label: "Qué propone", content: proposal, icon: Lightbulb, tone: "text-[#091231] bg-[#29DDDA]/20" },
    { label: "Por qué", content: reason, icon: ShieldQuestion, tone: "text-emerald-800 bg-emerald-100" },
  ];

  return (
    <aside className="overflow-hidden rounded-2xl border border-[#29DDDA]/40 bg-white shadow-sm">
      <div className="flex items-center gap-3 bg-[#091231] px-5 py-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#29DDDA] text-[#091231]"><BrainCircuit className="h-5 w-5" /></span>
        <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#29DDDA]">Insight agéntico</p><h3 className="text-base font-bold text-white">Recomendación pendiente de tu aprobación</h3></div>
      </div>
      <div className="space-y-3 p-5">
        {sections.map(({ label, content, icon: Icon, tone }) => (
          <div key={label} className="flex gap-3 rounded-xl border border-slate-100 p-3">
            <span className={"flex h-8 w-8 shrink-0 items-center justify-center rounded-lg " + tone}><Icon className="h-4 w-4" /></span>
            <div><p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-1 text-sm leading-6 text-slate-700">{content}</p></div>
          </div>
        ))}
        <button
          type="button"
          onClick={onApprove}
          disabled={approved}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#29DDDA] px-4 py-3 text-sm font-bold text-[#091231] transition hover:brightness-105 disabled:cursor-default disabled:bg-emerald-100 disabled:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-[#3371AF] focus:ring-offset-2"
        >
          <CheckCircle2 className="h-4 w-4" />{approved ? "Distribución aprobada" : actionLabel}
        </button>
      </div>
    </aside>
  );
}
