"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { mes: "Abr", ventas: 18 },
  { mes: "May", ventas: 24 },
  { mes: "Jun", ventas: 31 },
  { mes: "Jul", ventas: 29 },
  { mes: "Ago", ventas: 38 },
  { mes: "Sep", ventas: 45 },
];

interface TooltipPayload { value: number }
interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border shadow-sm bg-white px-4 py-2.5" style={{ borderColor: "#ECF0F5" }}>
      <p className="text-xs font-semibold mb-0.5" style={{ color: "#3371AF" }}>{label}</p>
      <p className="text-lg font-bold" style={{ color: "#091231" }}>
        {payload[0].value}{" "}
        <span className="text-xs font-normal" style={{ color: "#3371AF" }}>ventas</span>
      </p>
    </div>
  );
}

export default function SalesAreaChart() {
  return (
    <ResponsiveContainer width="100%" height={190}>
      <AreaChart data={salesData} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
        <defs>
          <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#29DDDA" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#29DDDA" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#ECF0F5" />
        <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#3371AF" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "#3371AF" }} axisLine={false} tickLine={false} />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ stroke: "#29DDDA", strokeWidth: 1, strokeDasharray: "4 4" }}
        />
        <Area
          type="monotone"
          dataKey="ventas"
          stroke="#29DDDA"
          strokeWidth={2.5}
          fill="url(#salesGrad)"
          dot={{ r: 4, fill: "#29DDDA", strokeWidth: 2, stroke: "#FFFFFF" }}
          activeDot={{ r: 6, fill: "#29DDDA", stroke: "#091231", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
