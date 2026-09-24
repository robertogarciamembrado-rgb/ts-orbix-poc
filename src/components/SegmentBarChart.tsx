"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const segmentData = [
  { segmento: "Gastronomía", valor: 85 },
  { segmento: "Cultura",     valor: 60 },
  { segmento: "Naturaleza",  valor: 45 },
  { segmento: "Bienestar",   valor: 30 },
];

const barColors = ["#29DDDA", "#223F7C", "#3371AF", "#223F7C"];

interface TooltipPayload {
  value: number;
}
interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-lg border shadow-sm bg-white px-4 py-2.5"
      style={{ borderColor: "#ECF0F5" }}
    >
      <p className="text-xs font-semibold mb-0.5" style={{ color: "#3371AF" }}>{label}</p>
      <p className="text-lg font-bold" style={{ color: "#091231" }}>
        {payload[0].value}
        <span className="text-xs font-normal ml-1" style={{ color: "#3371AF" }}>% crecimiento</span>
      </p>
    </div>
  );
}

export default function SegmentBarChart() {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={segmentData} margin={{ top: 8, right: 8, left: -24, bottom: 0 }} barCategoryGap="30%">
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#ECF0F5" />
        <XAxis
          dataKey="segmento"
          tick={{ fontSize: 11, fill: "#3371AF" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#3371AF" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#ECF0F5", opacity: 0.6 }} />
        <Bar dataKey="valor" radius={[6, 6, 0, 0]}>
          {segmentData.map((_, idx) => (
            <Cell key={idx} fill={barColors[idx % barColors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
