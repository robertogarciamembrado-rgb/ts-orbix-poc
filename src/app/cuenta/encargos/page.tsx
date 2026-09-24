"use client";
import { useState } from "react";
import {
  ClipboardList,
  FileText,
  Coins,
  Clock,
  CheckCircle,
  Upload,
  Link as LinkIcon,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────
type TaskStatus = "Pendiente de Prueba" | "Comprobada (Pendiente de Liquidación)";

interface Task {
  id: string;
  requester: string;
  format: string;
  fee: number;
  status: TaskStatus;
}

// ─── Mock data ────────────────────────────────────────────────────────────────
const initialTasks: Task[] = [
  {
    id: "ENC-001",
    requester: "Patronato de Turismo de Madrid",
    format: "Artículo Patrocinado",
    fee: 150,
    status: "Pendiente de Prueba",
  },
  {
    id: "ENC-002",
    requester: "Asociación Hotelera España",
    format: "Reseña de Destino",
    fee: 80,
    status: "Comprobada (Pendiente de Liquidación)",
  },
];

const requestedTasks = [
  {
    id: "SOL-001",
    target: "Blog de Viajes Sur",
    format: "Artículo Patrocinado",
    fee: 120,
    status: "En revisión",
  },
  {
    id: "SOL-002",
    target: "Revista Digital Turismo",
    format: "Newsletter Destacado",
    fee: 90,
    status: "Aceptado",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const isComprobada = status.startsWith("Comprobada");
  const isAceptado = status === "Aceptado";
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold"
      style={
        isComprobada || isAceptado
          ? { backgroundColor: "#29DDDA", color: "#091231" }
          : { backgroundColor: "#ECF0F5", color: "#3371AF" }
      }
    >
      {isComprobada || isAceptado ? (
        <CheckCircle className="w-3 h-3" />
      ) : (
        <Clock className="w-3 h-3" />
      )}
      {status}
    </span>
  );
}

function TaskCard({
  task,
  onSubmitProof,
}: {
  task: Task;
  onSubmitProof: (id: string, url: string) => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitProof(task.id, url);
    setShowForm(false);
  };

  const isPending = task.status === "Pendiente de Prueba";

  return (
    <div
      className="rounded-xl bg-white border shadow-sm overflow-hidden"
      style={{ borderColor: "#ECF0F5" }}
    >
      {/* Card header stripe */}
      <div className="h-1" style={{ backgroundColor: isPending ? "#3371AF" : "#29DDDA" }} />

      <div className="p-5">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <p className="text-xs font-semibold mb-0.5" style={{ color: "#3371AF" }}>
              {task.id}
            </p>
            <h4 className="font-bold text-base" style={{ color: "#091231" }}>
              {task.requester}
            </h4>
          </div>
          <StatusBadge status={task.status} />
        </div>

        {/* Details row */}
        <div className="flex flex-wrap gap-4 mb-5">
          <div className="flex items-center gap-1.5">
            <FileText className="w-4 h-4" style={{ color: "#3371AF" }} />
            <span className="text-sm" style={{ color: "#091231" }}>
              {task.format}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Coins className="w-4 h-4" style={{ color: "#29DDDA" }} />
            <span className="text-sm font-bold" style={{ color: "#091231" }}>
              {task.fee} Tokens
            </span>
          </div>
        </div>

        {/* Action zone */}
        {isPending && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all hover:brightness-110"
            style={{ backgroundColor: "#29DDDA", color: "#091231" }}
          >
            <Upload className="w-4 h-4" />
            Subir Prueba de Publicación
          </button>
        )}

        {/* Proof form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="rounded-lg p-4 space-y-3"
            style={{ backgroundColor: "#ECF0F5" }}
          >
            <p className="text-sm font-semibold" style={{ color: "#091231" }}>
              Prueba de Publicación
            </p>

            {/* URL input */}
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "#3371AF" }}>
                URL de la Publicación
              </label>
              <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2" style={{ borderColor: "#ECF0F5" }}>
                <LinkIcon className="w-4 h-4 flex-shrink-0" style={{ color: "#3371AF" }} />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://ejemplo.com/articulo-publicado"
                  className="flex-1 text-sm focus:outline-none bg-transparent"
                  style={{ color: "#091231" }}
                />
              </div>
            </div>

            {/* File upload (visual only) */}
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "#3371AF" }}>
                o Subir Acuse de Entrega
              </label>
              <label
                className="flex items-center justify-center gap-2 border-2 border-dashed rounded-lg py-3 cursor-pointer text-sm font-medium transition-colors hover:bg-white"
                style={{ borderColor: "#3371AF", color: "#3371AF" }}
              >
                <Upload className="w-4 h-4" />
                Seleccionar archivo (PDF / PNG)
                <input type="file" className="hidden" accept=".pdf,.png,.jpg" />
              </label>
            </div>

            {/* Form actions */}
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                style={{ backgroundColor: "#FFFFFF", color: "#091231", border: "1px solid #ECF0F5" }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-bold transition-all hover:brightness-110"
                style={{ backgroundColor: "#29DDDA", color: "#091231" }}
              >
                <ChevronRight className="w-4 h-4" />
                Confirmar Envío
              </button>
            </div>
          </form>
        )}

        {/* Comprobada confirmation */}
        {!isPending && (
          <div
            className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium"
            style={{ backgroundColor: "#29DDDA" + "20", color: "#091231" }}
          >
            <CheckCircle className="w-4 h-4" style={{ color: "#29DDDA" }} />
            Prueba validada — en cola de liquidación automática.
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AccountEncargos() {
  const [activeTab, setActiveTab] = useState<"publicaciones" | "solicitados">("publicaciones");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  function handleSubmitProof(id: string, _url: string) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "Comprobada (Pendiente de Liquidación)" } : t
      )
    );
    toast.success('Prueba criptográfica vinculada al encargo. Estado actualizado a Comprobada.');
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "#091231" }}>Encargos</h1>
        <p className="text-sm mt-0.5" style={{ color: "#3371AF" }}>
          Modalidad Publicación · Gestiona los encargos editoriales de la red.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b" style={{ borderColor: "#ECF0F5" }}>
        {[
          { id: "publicaciones", label: "Publicaciones a Realizar", icon: ClipboardList },
          { id: "solicitados",   label: "Encargos Solicitados",     icon: FileText },
        ].map(({ id, label, icon: Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id as typeof activeTab)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-colors -mb-px border-b-2"
              style={{
                borderColor: active ? "#29DDDA" : "transparent",
                color: active ? "#091231" : "#3371AF",
              }}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          );
        })}
      </div>

      {/* ── PUBLICACIONES A REALIZAR ── */}
      {activeTab === "publicaciones" && (
        <div className="space-y-4">
          <p className="text-sm" style={{ color: "#3371AF" }}>
            La red te ha encargado las siguientes publicaciones. Sube la prueba para liberar el pago.
          </p>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onSubmitProof={handleSubmitProof} />
          ))}
        </div>
      )}

      {/* ── ENCARGOS SOLICITADOS ── */}
      {activeTab === "solicitados" && (
        <div className="space-y-4">
          <p className="text-sm" style={{ color: "#3371AF" }}>
            Encargos que has enviado a otros nodos de la red para que publiquen tu contenido.
          </p>
          <div className="rounded-xl bg-white border shadow-sm overflow-hidden" style={{ borderColor: "#ECF0F5" }}>
            <table className="min-w-full">
              <thead>
                <tr style={{ backgroundColor: "#091231" }}>
                  {["ID", "Destinatario", "Formato", "Tarifa", "Estado"].map((col) => (
                    <th
                      key={col}
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {requestedTasks.map((t, idx) => (
                  <tr key={t.id} style={{ backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#ECF0F5" }}>
                    <td className="px-4 py-3 text-xs font-mono" style={{ color: "#3371AF" }}>{t.id}</td>
                    <td className="px-4 py-3 text-sm font-medium" style={{ color: "#091231" }}>{t.target}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: "#3371AF" }}>{t.format}</td>
                    <td className="px-4 py-3 text-sm font-bold" style={{ color: "#091231" }}>
                      {t.fee} Tokens
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <StatusBadge status={t.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
