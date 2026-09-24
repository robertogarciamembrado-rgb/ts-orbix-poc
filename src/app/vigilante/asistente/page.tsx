"use client";
import { useState } from "react";
import { Bot, Send, FileText, User } from "lucide-react";

// ─── Quick action chips ────────────────────────────────────────────────────
const quickActions = ["Resumen", "Interpretación", "Riesgos", "Debilidades"];

// ─── Mock conversation ─────────────────────────────────────────────────────
const initialMessages = [
  {
    from: "user" as const,
    text: "Analiza el borrador de agosto y dame un resumen ejecutivo.",
  },
  {
    from: "ai" as const,
    text: `Resumen del borrador — Agosto 2026:\n\nEl mercado turístico está experimentando una transformación acelerada impulsada por tres fuerzas convergentes: la digitalización de la distribución, la presión regulatoria europea en materia de transparencia y la creciente demanda de experiencias auténticas y sostenibles.\n\nLos datos del trimestre señalan un crecimiento del 14% en reservas digitales directas, mientras que las plataformas intermediarias ven reducida su cuota. Los nodos distribuidores mejor posicionados son aquellos con alto índice de reputación y diversificación de canales.\n\n⚠ Punto crítico identificado: La nueva directiva UE sobre comisiones digitales podría afectar a modelos de distribución tradicionales antes del Q2 2027.`,
  },
];

type Message = { from: "user" | "ai"; text: string };

// ─── Page ─────────────────────────────────────────────────────────────────
export default function VigilanteAsistente() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  function sendMessage(text: string) {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { from: "user", text },
      {
        from: "ai",
        text: `Procesando tu consulta sobre "${text.toLowerCase()}"...\n\nEsta es una respuesta simulada del Asistente AVIA. En producción, este módulo conectaría con el modelo de lenguaje entrenado sobre el corpus de informes estratégicos del sector turístico.`,
      },
    ]);
    setInput("");
  }

  return (
    <div className="flex flex-col h-[calc(100vh-160px)]">

      {/* ── CONTEXT HEADER ───────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-5 py-3 rounded-xl mb-4 border"
        style={{ backgroundColor: '#0C1A3E', borderColor: 'rgba(41,221,218,0.2)' }}>
        <FileText className="w-4 h-4 flex-shrink-0" style={{ color: '#29DDDA' }} />
        <div>
          <p className="text-xs text-white font-semibold">Conversando sobre:</p>
          <p className="text-xs" style={{ color: '#29DDDA' }}>Borrador agosto 2026 · 24 páginas</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#29DDDA' }} />
          <span className="text-xs font-semibold" style={{ color: '#29DDDA' }}>AVIA activo</span>
        </div>
      </div>

      {/* ── CHAT AREA ────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-2">
        {messages.map((msg, idx) => {
          const isAi = msg.from === "ai";
          return (
            <div key={idx} className={`flex gap-3 ${isAi ? "" : "flex-row-reverse"}`}>
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: isAi ? 'rgba(41,221,218,0.15)' : 'rgba(51,113,175,0.2)' }}>
                {isAi
                  ? <Bot className="w-4 h-4" style={{ color: '#29DDDA' }} />
                  : <User className="w-4 h-4" style={{ color: '#3371AF' }} />
                }
              </div>
              {/* Bubble */}
              <div className={`max-w-2xl rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${isAi ? "rounded-tl-none" : "rounded-tr-none"}`}
                style={isAi
                  ? { backgroundColor: '#0C1A3E', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(41,221,218,0.12)' }
                  : { backgroundColor: '#223F7C', color: '#FFFFFF' }
                }>
                {isAi && (
                  <p className="text-xs font-bold mb-1.5" style={{ color: '#29DDDA' }}>Asistente AVIA</p>
                )}
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── INPUT AREA ───────────────────────────────────────────── */}
      <div className="mt-4 rounded-xl border p-3"
        style={{ backgroundColor: '#0C1A3E', borderColor: 'rgba(255,255,255,0.08)' }}>
        {/* Quick action chips */}
        <div className="flex gap-2 mb-3 flex-wrap">
          {quickActions.map((action) => (
            <button
              key={action}
              onClick={() => sendMessage(action)}
              className="text-xs font-semibold px-3 py-1 rounded-full border transition-all hover:bg-white/10"
              style={{ borderColor: 'rgba(41,221,218,0.3)', color: '#29DDDA' }}
            >
              {action}
            </button>
          ))}
        </div>
        {/* Text input row */}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Pregunta al Asistente AVIA sobre el borrador…"
            className="flex-1 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1"
            style={{
              backgroundColor: 'rgba(255,255,255,0.06)',
              color: '#FFFFFF',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          />
          <button
            onClick={() => sendMessage(input)}
            className="px-4 py-2.5 rounded-lg font-bold text-sm transition-all hover:brightness-110 flex items-center gap-1.5"
            style={{ backgroundColor: '#29DDDA', color: '#091231' }}
          >
            <Send className="w-4 h-4" />
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
