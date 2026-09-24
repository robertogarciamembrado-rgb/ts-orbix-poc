"use client";

import React, { useState } from "react";
import {
  MessageCircle,
  Send,
  Globe,
  Settings,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Plus,
  Radio,
} from "lucide-react";
import { toast } from "sonner";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

interface ChannelIntegration {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  connected: boolean;
  associatedIdentity?: string;
  description: string;
  techDetails: string;
  activeAutomations: number;
}

const initialChannels: ChannelIntegration[] = [
  {
    id: "whatsapp",
    name: "WhatsApp Business API",
    category: "Mensajería Instantánea",
    icon: MessageCircle,
    connected: true,
    associatedIdentity: "+34 600 123 456",
    description: "Canal prioritario verificado para atención personalizada y recepción de leads.",
    techDetails: "Meta Cloud API v19.0 · Webhook SSL Activo",
    activeAutomations: 4,
  },
  {
    id: "instagram",
    name: "Instagram Direct",
    category: "Redes Sociales",
    icon: InstagramIcon,
    connected: true,
    associatedIdentity: "@turismo.destino.oficial",
    description: "Recepción de mensajes directos, menciones y respuestas a historias.",
    techDetails: "Meta Graph API · Filtro de palabras clave activo",
    activeAutomations: 2,
  },
  {
    id: "facebook",
    name: "Facebook Messenger",
    category: "Redes Sociales",
    icon: FacebookIcon,
    connected: false,
    description: "Interacción con usuarios que visitan la página institucional de Facebook.",
    techDetails: "Requiere autenticación de página y permisos de mensajería",
    activeAutomations: 0,
  },
  {
    id: "telegram",
    name: "Telegram",
    category: "Mensajería Encriptada",
    icon: Send,
    connected: true,
    associatedIdentity: "@TSOrbix_Destino_Bot",
    description: "Bot automatizado para boletines, alertas y atención a comunidades.",
    techDetails: "Telegram Bot API · Enrutador Webhook Seguro",
    activeAutomations: 3,
  },
  {
    id: "webchat",
    name: "Webchat",
    category: "Widget Web Embebido",
    icon: Globe,
    connected: true,
    associatedIdentity: "portal.destino.com (Burbuja Flotante)",
    description: "Widget interactivo con agente IA integrado para visitantes web.",
    techDetails: "Script CDN asíncrono · Tokens de sesión anónima",
    activeAutomations: 1,
  },
];

export default function WorkspaceCanales() {
  const [channels, setChannels] = useState<ChannelIntegration[]>(initialChannels);
  const [configuringChannel, setConfiguringChannel] = useState<ChannelIntegration | null>(null);

  const handleToggleConnection = (id: string) => {
    setChannels((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextState = !c.connected;
          if (nextState) {
            toast.success(`Canal ${c.name} conectado exitosamente.`);
          } else {
            toast.warning(`Canal ${c.name} desconectado.`);
          }
          return { ...c, connected: nextState };
        }
        return c;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[#3371AF]/10 text-orbix-ts border border-[#3371AF]/20">
              Workspace Layer
            </span>
            <span className="text-xs text-slate-500 font-medium">Orquestación de Canales de Entrada</span>
          </div>
          <h1 className="text-2xl font-bold text-orbix-navy">
            Conexión de Canales Omnicanal
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Centraliza los flujos de mensajería para que tus agentes IA respondan sin importar el medio de origen.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-700">Router Activo</span>
          </div>
          <button
            onClick={() => toast.info("Explorador de nuevos conectores de API.")}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-orbix-cyan text-orbix-navy rounded-xl hover:brightness-110 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            Añadir Conector
          </button>
        </div>
      </div>

      {/* Grid de Tarjetas de Integración (Marketplace style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {channels.map((ch) => {
          const Icon = ch.icon;
          return (
            <div
              key={ch.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between"
            >
              <div>
                {/* Cabecera de la Tarjeta */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-orbix-navy">
                    <Icon className="w-6 h-6 text-orbix-navy" />
                  </div>

                  {/* Estado: 'Conectado' en verde o 'Desconectado' en gris */}
                  {ch.connected ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Conectado
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-500 border border-slate-200">
                      <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                      Desconectado
                    </span>
                  )}
                </div>

                {/* Título y Categoría */}
                <span className="text-[11px] font-bold uppercase tracking-wider text-orbix-ts">
                  {ch.category}
                </span>
                <h3 className="text-lg font-bold text-orbix-navy mt-0.5">{ch.name}</h3>

                {/* Subtexto simulando identidad asociada si está conectado */}
                {ch.connected && ch.associatedIdentity ? (
                  <div className="mt-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200/80 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5">
                    <span className="text-slate-400">Asociado:</span>
                    <span className="font-mono text-orbix-navy">{ch.associatedIdentity}</span>
                  </div>
                ) : (
                  <div className="mt-2 text-xs text-slate-400 italic">
                    Sin identidad vinculada actualmente
                  </div>
                )}

                {/* Descripción */}
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {ch.description}
                </p>
              </div>

              {/* Pie de tarjeta con detalles técnicos y botón Configurar */}
              <div className="mt-6 pt-4 border-t border-slate-100 space-y-4">
                <div className="text-[11px] font-mono text-slate-400 truncate">
                  {ch.techDetails}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setConfiguringChannel(ch);
                      toast.info(`Configurando parámetros para ${ch.name}`);
                    }}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-500" />
                    Configurar
                  </button>

                  <button
                    onClick={() => handleToggleConnection(ch.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-colors ${
                      ch.connected
                        ? "bg-slate-50 text-slate-500 hover:bg-rose-50 hover:text-rose-600"
                        : "bg-orbix-cyan text-orbix-navy hover:brightness-105"
                    }`}
                  >
                    {ch.connected ? "Desconectar" : "Conectar"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal simulado de configuración */}
      {configuringChannel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-orbix-navy font-bold">
                  <configuringChannel.icon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-orbix-navy">
                  Configuración: {configuringChannel.name}
                </h3>
              </div>
              <button
                onClick={() => setConfiguringChannel(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Identificador / Clave de Acceso
                </label>
                <input
                  type="text"
                  readOnly
                  value={configuringChannel.associatedIdentity || "api_key_sandbox_9941"}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Agente IA Asignado
                </label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium">
                  <option>Agente de Recomendación Turística (Principal)</option>
                  <option>Agente de Soporte y Logística</option>
                  <option>Respuestas Automáticas Estáticas</option>
                </select>
              </div>

              <div className="p-3 bg-cyan-50 rounded-xl text-cyan-900 border border-cyan-100 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-700 flex-shrink-0 mt-0.5" />
                <span>
                  Los mensajes recibidos en este canal respetan el tope de frecuencia y quedan
                  inmutables para atribución de acuerdos.
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setConfiguringChannel(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  setConfiguringChannel(null);
                  toast.success(`Parámetros de ${configuringChannel.name} guardados.`);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-orbix-cyan text-orbix-navy hover:brightness-105"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
