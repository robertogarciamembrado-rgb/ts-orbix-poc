// use client
"use client";

import React, { useState } from "react";
import { Plus, Send, AlertCircle, ToggleRight, ToggleLeft, Mail, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export default function MarketingSpace() {
  const [activeTab, setActiveTab] = useState("difusion");

  // State for new campaign form
  const [campaign, setCampaign] = useState({
    name: "",
    channel: "WhatsApp",
    audience: "Contactos VIP",
  });

  // State for toggles in automation list
  const [automationStates, setAutomationStates] = useState<Record<string, boolean>>({
    bienvenida: true,
    recuperacion: false,
  });

  const handleToggle = (key: string, name: string) => {
    setAutomationStates((prev) => {
      const nextState = !prev[key];
      if (nextState) {
        toast.success(`Automatización '${name}' activada.`);
      } else {
        toast.info(`Automatización '${name}' pausada.`);
      }
      return { ...prev, [key]: nextState };
    });
  };

  const handleLaunchCampaign = () => {
    if (!campaign.name) {
      toast.error("Por favor asigna un nombre a la campaña.");
      return;
    }
    toast.success(`Campaña '${campaign.name}' encolada para envío en ${campaign.channel} (excluidos 145 contactos por tope de frecuencia).`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[#3371AF]/10 text-orbix-ts border border-[#3371AF]/20">
              Workspace Layer
            </span>
            <span className="text-xs text-slate-500 font-medium">Difusión &amp; Automatizaciones</span>
          </div>
          <h1 className="text-2xl font-bold text-orbix-navy">
            Marketing &amp; Community Outreach
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Comunica ofertas y contenidos respetando siempre el tope de frecuencia garantizado por la red.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto">
        <nav aria-label="Pestañas de Marketing" className="flex space-x-2 sm:space-x-4 mb-6 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab("difusion")}
            className={`px-4 py-2.5 rounded-t-xl font-bold text-sm transition-all ${
              activeTab === "difusion"
                ? "bg-white text-orbix-navy border-b-2 border-orbix-cyan shadow-xs"
                : "bg-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Difusión (Campañas)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("automatizaciones")}
            className={`px-4 py-2.5 rounded-t-xl font-bold text-sm transition-all ${
              activeTab === "automatizaciones"
                ? "bg-white text-orbix-navy border-b-2 border-orbix-cyan shadow-xs"
                : "bg-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Automatizaciones (Workflows)
          </button>
        </nav>

        {/* Content Panels */}
        {activeTab === "difusion" && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            {/* Nueva Campaña Card */}
            <div className="flex items-start space-x-4">
              <Plus className="w-6 h-6 text-orbix-cyan flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-orbix-navy mb-3">
                  Nueva Campaña Omnicanal
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Nombre */}
                  <div>
                    <label htmlFor="campaign-name" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Nombre de Campaña *
                    </label>
                    <input
                      id="campaign-name"
                      type="text"
                      value={campaign.name}
                      onChange={(e) => setCampaign({ ...campaign, name: e.target.value })}
                      placeholder="Ej. Promo Escapada Otoño"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orbix-cyan text-slate-800"
                    />
                  </div>
                  {/* Canal */}
                  <div>
                    <label htmlFor="campaign-channel" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Canal de Salida *
                    </label>
                    <select
                      id="campaign-channel"
                      value={campaign.channel}
                      onChange={(e) => setCampaign({ ...campaign, channel: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orbix-cyan text-slate-800 font-medium"
                    >
                      <option>WhatsApp</option>
                      <option>Email</option>
                      <option>Telegram</option>
                    </select>
                  </div>
                  {/* Audiencia */}
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label htmlFor="campaign-audience" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Segmento de Audiencia *
                    </label>
                    <select
                      id="campaign-audience"
                      value={campaign.audience}
                      onChange={(e) => setCampaign({ ...campaign, audience: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orbix-cyan text-slate-800 font-medium"
                    >
                      <option>Contactos VIP</option>
                      <option>Viajeros Aventura</option>
                      <option>Gastronomía Local</option>
                      <option>Enoturismo &amp; Tradición</option>
                    </select>
                  </div>
                </div>

                {/* Alerta de frecuencia */}
                <div className="mt-5 flex items-start bg-amber-50 border-l-4 border-amber-400 p-4 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mr-3 mt-0.5" />
                  <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                    <strong>Aviso de Protección de Red:</strong> 145 contactos de este segmento han alcanzado el tope de frecuencia mensual y serán excluidos del envío para evitar saturación.
                  </p>
                </div>

                {/* Botón envío */}
                <button
                  type="button"
                  onClick={handleLaunchCampaign}
                  className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-orbix-cyan text-orbix-navy font-bold rounded-xl hover:brightness-110 transition-all shadow-sm"
                >
                  <Send className="w-4 h-4" /> Lanzar Campaña
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "automatizaciones" && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-orbix-navy mb-4">
              Flujos de Trabajo Activos
            </h2>
            <ul className="space-y-4">
              {/* Bienvenida */}
              <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-slate-200 rounded-xl hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-orbix-navy flex-shrink-0">
                    <Mail className="w-5 h-5 text-orbix-navy" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Bienvenida a Nuevos Miembros</p>
                    <p className="text-xs text-slate-500">Canal: Email Transaccional</p>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">Ejecuciones este mes: 1,240</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle("bienvenida", "Bienvenida a Nuevos Miembros")}
                  aria-label={`Alternar estado de Bienvenida a Nuevos Miembros: actualmente ${automationStates.bienvenida ? 'Activo' : 'Pausado'}`}
                  className="flex items-center space-x-2 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-white self-start sm:self-center transition-all"
                >
                  {automationStates.bienvenida ? (
                    <>
                      <ToggleRight className="w-5 h-5 text-emerald-500" />
                      <span className="text-emerald-700">Activo</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="w-5 h-5 text-slate-400" />
                      <span className="text-slate-500">Pausado</span>
                    </>
                  )}
                </button>
              </li>

              {/* Recuperación */}
              <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-slate-200 rounded-xl hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-orbix-navy flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-orbix-navy" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Recuperación de Carrito Experiencia</p>
                    <p className="text-xs text-slate-500">Canal: WhatsApp API</p>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">Ejecuciones este mes: 487</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle("recuperacion", "Recuperación de Carrito Experiencia")}
                  aria-label={`Alternar estado de Recuperación de Carrito Experiencia: actualmente ${automationStates.recuperacion ? 'Activo' : 'Pausado'}`}
                  className="flex items-center space-x-2 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-white self-start sm:self-center transition-all"
                >
                  {automationStates.recuperacion ? (
                    <>
                      <ToggleRight className="w-5 h-5 text-emerald-500" />
                      <span className="text-emerald-700">Activo</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="w-5 h-5 text-slate-400" />
                      <span className="text-slate-500">Pausado</span>
                    </>
                  )}
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
