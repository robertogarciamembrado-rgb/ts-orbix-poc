import { ArrowDown, CheckCircle2, CircleX, ReceiptText, UsersRound } from "lucide-react";
import type { CSSProperties } from "react";
import type { AnalyticsFunnelResponse } from "@/lib/cortex/api";

type AnalyticsFunnelProps = { data: AnalyticsFunnelResponse };

const styles = [
  { accent: "#3371AF", icon: UsersRound, note: "tráfico atribuido" },
  { accent: "#29DDDA", icon: ReceiptText, note: "firmes + anuladas" },
  { accent: "#F59E0B", icon: CircleX, note: "no se liquidan" },
  { accent: "#15803D", icon: CheckCircle2, note: "confirmadas" },
  { accent: "#091231", icon: CheckCircle2, note: "cierre del período" },
];

function rate(current: number, previous: number) {
  if (previous === 0) return "—";
  return ((current / previous) * 100).toFixed(1).replace(".", ",") + "%";
}

export default function AnalyticsFunnel({ data }: AnalyticsFunnelProps) {
  const steps = [
    { label: "Llegadas", value: data.llegadas },
    { label: "Ventas registradas", value: data.ventasRegistradas },
    { label: "Anuladas", value: data.anuladas },
    { label: "Firmes", value: data.firmes },
    { label: "Liquidado", value: data.liquidado },
  ];

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-2 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#3371AF]">Trazabilidad del período</p><h2 className="mt-1 text-xl font-bold text-[#091231]">Embudo de conversión</h2></div>
        <p className="text-xs text-slate-500">Firmes + anuladas = ventas registradas</p>
      </div>
      <div className="p-5 sm:p-6">
        <div className="space-y-2">
          {steps.map((step, index) => {
            const visual = styles[index];
            const Icon = visual.icon;
            const width = Math.max(34, (step.value / steps[0].value) * 100);
            const previous = index > 0 ? steps[index - 1].value : null;
            return (
              <div key={step.label}>
                {previous !== null && <div className="flex items-center gap-2 py-1.5 pl-4 text-xs font-semibold text-slate-500"><ArrowDown className="h-3.5 w-3.5 text-[#3371AF]" />{rate(step.value, previous)} pasaron de {steps[index - 1].label.toLowerCase()} a {step.label.toLowerCase()}</div>}
                <div
                  className="relative flex min-h-16 w-full items-center overflow-hidden rounded-xl px-4 transition-[width] duration-500 sm:w-[var(--funnel-width)]"
                  style={{ "--funnel-width": width + "%" } as CSSProperties}
                >
                  <div className="absolute inset-0 opacity-15" style={{ backgroundColor: visual.accent }} />
                  <div className="relative flex w-full items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm"><Icon className="h-4 w-4" style={{ color: visual.accent }} /></span>
                      <div className="min-w-0"><p className="truncate text-sm font-bold text-[#091231]">{step.label}</p><p className="text-xs text-slate-500">{visual.note}</p></div>
                    </div>
                    <span className="text-lg font-black tabular-nums text-[#091231]">{step.value.toLocaleString("es-ES")}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
