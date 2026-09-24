"use client";

import React, { useState } from "react";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Building2,
  Globe2,
  Layers,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Newspaper,
  Compass,
  Store,
  BrainCircuit,
  GraduationCap,
} from "lucide-react";
import { toast } from "sonner";

interface PartnerWizardProps {
  onComplete?: () => void;
  onCancel?: () => void;
}

// Únicos 5 tipos de actor B2B permitidos en el Modelo de Dominio v2.0
const actorTypes = [
  {
    id: "Medio",
    title: "Medio",
    desc: "Revistas, blogs turísticos, portales de contenidos y creadores de opinión.",
    icon: Newspaper,
  },
  {
    id: "Destino",
    title: "Destino",
    desc: "Patronatos, DMOs, administraciones públicas y entes de promoción territorial.",
    icon: Compass,
  },
  {
    id: "Proveedor",
    title: "Proveedor",
    desc: "Hoteles, receptivos, empresas de transporte, guías y operadores de actividades.",
    icon: Store,
  },
  {
    id: "Think Tank",
    title: "Think Tank",
    desc: "Centros de pensamiento, comités de expertos, observatorios y asesoría estratégica.",
    icon: BrainCircuit,
  },
  {
    id: "Académico",
    title: "Académico",
    desc: "Universidades, escuelas de negocios turísticos e institutos de investigación.",
    icon: GraduationCap,
  },
];

// Roles en el Ecosistema (campo rol - aristas en el grafo)
const ecosystemRoles = [
  {
    id: "Agregador",
    name: "Agregador",
    desc: "Consolida catálogos de ofertas y recursos para redistribución masiva.",
  },
  {
    id: "Proveedor de oferta",
    name: "Proveedor de oferta",
    desc: "Crea y publica productos, servicios o experiencias directas con stock propio.",
  },
  {
    id: "Distribuidor",
    name: "Distribuidor",
    desc: "Canaliza ofertas hacia su audiencia cautiva y captura comisiones verificadas.",
  },
  {
    id: "Productor editorial",
    name: "Productor editorial",
    desc: "Genera encargos de contenido, reportajes o material patrocinado para la red.",
  },
  {
    id: "Prescriptor",
    name: "Prescriptor",
    desc: "Recomienda y avala productos o destinos basados en su reputación técnica.",
  },
];

// Modalidades de Membresía / Calibración de Espacio
const membershipPlans = [
  {
    id: "acuerdo_marco",
    title: "Acuerdo Marco (Sin espacio)",
    badge: "Institucional",
    price: "0 €",
    desc: "Relación institucional en el grafo sin entorno operativo.",
    features: [
      "Presencia verificada en el grafo de nodos",
      "Firma de acuerdos bilaterales",
      "Sin cuota de mantenimiento",
    ],
  },
  {
    id: "pro",
    title: "Membresía PRO",
    badge: "Recomendado",
    price: "290 € /mes",
    desc: "Activa tu Espacio de Trabajo con límites estándar.",
    features: [
      "Espacio de Trabajo operativo completo",
      "Hasta 5 canales omnicanal conectados",
      "Agentes IA con límites estándar de tokens",
      "Gestión de CRM y Audiencia soberana",
    ],
  },
  {
    id: "elite",
    title: "Membresía ELITE",
    badge: "Capacidad Extendida",
    price: "790 € /mes",
    desc: "Activa tu Espacio de Trabajo con capacidad y alcance extendidos.",
    features: [
      "Todo lo de PRO con escalabilidad dedicada",
      "Canales y agentes IA ilimitados",
      "Acceso prioritario a radar AVIA Vigilante",
      "Soporte de ingeniería y webhooks dedicados",
    ],
  },
];

export default function PartnerWizard({ onComplete, onCancel }: PartnerWizardProps) {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State alineado al Modelo de Dominio v2.0 (cuenta, nodo, roles, ámbito, membresía)
  const [formData, setFormData] = useState({
    // Paso 1: Tipo de Actor (Invariante)
    tipo_actor: "Destino",
    // Paso 2: Roles (aristas múltiples)
    roles: ["Distribuidor", "Prescriptor"] as string[],
    // Paso 3: Ámbito Geográfico y Datos de Organización
    ambito_geografico: "Nacional",
    orgName: "",
    cifNif: "",
    contactName: "",
    email: "",
    // Paso 4: Membresía y Calibración
    membresia: "pro",
    consentimiento_red: true,
  });

  const toggleRole = (roleId: string) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.includes(roleId)
        ? prev.roles.filter((r) => r !== roleId)
        : [...prev.roles, roleId],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.roles.length === 0) {
      toast.error("Debes seleccionar al menos un rol en el ecosistema.");
      return;
    }
    if (!formData.orgName || !formData.email) {
      toast.error("Por favor completa el nombre de la organización y el email corporativo.");
      return;
    }

    setIsSubmitted(true);
    // TAREA 3: Toast exacto requerido
    toast.success(
      "Identificador inmutable de Nodo generado. Roles asignados y Membresía en aprovisionamiento."
    );

    if (onComplete) {
      setTimeout(onComplete, 2400);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl p-8 max-w-xl mx-auto text-center border border-slate-200 shadow-xl">
        <div className="w-16 h-16 bg-[#29DDDA]/20 text-orbix-navy rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10 text-orbix-navy" />
        </div>
        <h3 className="text-2xl font-bold text-orbix-navy mb-2">¡Nodo Aprovisionado!</h3>
        <p className="text-slate-600 text-sm mb-6">
          La entidad <strong className="text-orbix-navy">{formData.orgName}</strong> ha sido
          incorporada al grafo de nodos con la modalidad{" "}
          <span className="font-bold text-orbix-ts uppercase">
            {formData.membresia.replace("_", " ")}
          </span>.
        </p>

        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-left text-xs space-y-2 mb-6 text-slate-700 font-mono">
          <div suppressHydrationWarning><span className="font-sans font-semibold text-slate-500">ID Inmutable Nodo:</span> node_{Math.random().toString(36).substring(2, 10)}</div>
          <div><span className="font-sans font-semibold text-slate-500">Tipo de Actor:</span> {formData.tipo_actor}</div>
          <div><span className="font-sans font-semibold text-slate-500">Roles Asignados:</span> {formData.roles.join(", ")}</div>
          <div><span className="font-sans font-semibold text-slate-500">Ámbito Geográfico:</span> {formData.ambito_geografico}</div>
          <div><span className="font-sans font-semibold text-slate-500">Hash Grafo:</span> 0x8f2a...c419</div>
        </div>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full py-3 bg-orbix-cyan text-orbix-navy font-bold rounded-xl hover:brightness-105 transition-all shadow-md"
          >
            Entrar a la Consola de Nodo (/cuenta/dashboard)
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden max-w-3xl mx-auto w-full">
      {/* Header Wizard */}
      <div className="bg-orbix-navy text-white px-6 py-5 flex items-center justify-between border-b border-white/10">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-orbix-cyan font-semibold">
            Modelo de Dominio v2.0 · Nodos &amp; Membresías
          </span>
          <h2 className="text-lg font-bold">Alta de Nodo Partner (B2B)</h2>
        </div>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === i
                  ? "bg-orbix-cyan text-orbix-navy"
                  : step > i
                  ? "bg-white/20 text-white"
                  : "bg-white/10 text-white/40"
              }`}
            >
              {step > i ? <Check className="w-3.5 h-3.5" /> : i}
            </div>
          ))}
        </div>
      </div>

      {/* Contenido de Pasos */}
      <div className="p-6 sm:p-8">
        {/* PASO 1: Tipo de Actor - Invariante (Medio, Destino, Proveedor, Think Tank, Académico) */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-bold text-orbix-navy">
                Paso 1: Tipo de Actor (Invariante de Dominio)
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Selecciona la naturaleza jurídica y funcional primaria de tu organización en la red.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {actorTypes.map((item) => {
                const Icon = item.icon;
                const isSelected = formData.tipo_actor === item.id;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setFormData({ ...formData, tipo_actor: item.id })}
                    className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? "border-[#29DDDA] bg-cyan-50/40 shadow-sm ring-2 ring-[#29DDDA]/20"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-orbix-navy">
                        <Icon className="w-5 h-5 text-orbix-navy" />
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? "bg-[#29DDDA] border-[#29DDDA] text-[#091231]"
                            : "border-slate-300"
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-orbix-navy">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* PASO 2: Roles en el Ecosistema (Agregador, Proveedor de oferta, Distribuidor, Productor editorial, Prescriptor) */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-bold text-orbix-navy">
                Paso 2: Roles en el Ecosistema (Aristas)
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Un nodo puede desempeñar múltiples roles simultáneamente dentro del grafo colaborativo.
              </p>
            </div>

            <div className="space-y-2.5">
              {ecosystemRoles.map((role) => {
                const checked = formData.roles.includes(role.id);
                return (
                  <button
                    type="button"
                    key={role.id}
                    onClick={() => toggleRole(role.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-start justify-between ${
                      checked
                        ? "border-[#223F7C] bg-slate-50 shadow-sm"
                        : "border-slate-200 bg-white hover:bg-slate-50/60"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 flex-shrink-0 ${
                          checked
                            ? "bg-[#29DDDA] border-[#29DDDA] text-orbix-navy"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-orbix-navy">{role.name}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{role.desc}</p>
                      </div>
                    </div>
                    {checked && (
                      <span className="text-[11px] font-bold text-orbix-ts px-2 py-0.5 rounded bg-blue-50 border border-blue-100 flex-shrink-0">
                        Rol Activo
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* PASO 3: Ámbito Geográfico y Datos de la Entidad (Local, Provincial, Nacional, Internacional) */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-bold text-orbix-navy">
                Paso 3: Ámbito Geográfico &amp; Datos de la Entidad
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Alimenta el campo estructurado <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs text-orbix-ts">ambito_geografico</code> (jsonb).
              </p>
            </div>

            {/* Selector de Ámbito */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Ámbito Geográfico Operativo *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {["Local", "Provincial", "Nacional", "Internacional"].map((ambito) => {
                  const isSelected = formData.ambito_geografico === ambito;
                  return (
                    <button
                      type="button"
                      key={ambito}
                      onClick={() => setFormData({ ...formData, ambito_geografico: ambito })}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                        isSelected
                          ? "bg-orbix-navy text-white border-orbix-navy shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {ambito}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Datos de la Organización */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Nombre de la Organización / Nodo *
                </label>
                <input
                  type="text"
                  placeholder="Ej. Patronato de Turismo / Agencia Sol"
                  value={formData.orgName}
                  onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-xl px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-orbix-cyan"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  CIF / NIF / Tax ID
                </label>
                <input
                  type="text"
                  placeholder="Ej. Q-2800000-A"
                  value={formData.cifNif}
                  onChange={(e) => setFormData({ ...formData, cifNif: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-xl px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-orbix-cyan"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Persona de Contacto
                </label>
                <input
                  type="text"
                  placeholder="Nombre y cargo del responsable"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-xl px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-orbix-cyan"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Email Corporativo *
                </label>
                <input
                  type="email"
                  placeholder="nodo@organizacion.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-xl px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-orbix-cyan"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* PASO 4: Membresía y Espacio (Acuerdo Marco, Membresía PRO, Membresía ELITE) */}
        {step === 4 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-bold text-orbix-navy">
                Paso 4: Membresía y Calibración del Espacio
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Define el nivel de aprovisionamiento operativo para el nodo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {membershipPlans.map((plan) => {
                const isSelected = formData.membresia === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setFormData({ ...formData, membresia: plan.id })}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? "border-[#29DDDA] bg-slate-50/80 shadow-md ring-2 ring-[#29DDDA]/20"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-orbix-ts">
                          {plan.badge}
                        </span>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? "bg-[#29DDDA] border-[#29DDDA] text-orbix-navy"
                              : "border-slate-300"
                          }`}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                      </div>

                      <h4 className="text-base font-bold text-orbix-navy mb-1">{plan.title}</h4>
                      <div className="text-xs font-semibold text-slate-400 mb-2">{plan.price}</div>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">{plan.desc}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-200 space-y-1.5 text-[11px] text-slate-500">
                      {plan.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-[#29DDDA] flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Aviso de Gobernanza */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2.5 text-xs text-slate-600">
              <ShieldCheck className="w-4 h-4 text-orbix-ts flex-shrink-0 mt-0.5" />
              <span>
                El registro generará un identificador inmutable de nodo en el ledger de gobernanza
                de TS Orbix y creará las aristas correspondientes en el grafo de relaciones.
              </span>
            </div>
          </div>
        )}

        {/* Navegación del Wizard */}
        <div className="mt-8 pt-5 border-t border-slate-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-orbix-navy flex items-center gap-1 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Anterior
            </button>
          ) : (
            <div>
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="text-xs text-slate-400 hover:text-slate-600 underline"
                >
                  Cancelar
                </button>
              )}
            </div>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => {
                if (step === 2 && formData.roles.length === 0) {
                  toast.error("Selecciona al menos un rol en el ecosistema.");
                  return;
                }
                if (step === 3 && (!formData.orgName || !formData.email)) {
                  toast.error("Completa el nombre de la entidad y el email.");
                  return;
                }
                setStep(step + 1);
              }}
              className="px-6 py-2.5 bg-orbix-navy text-white text-sm font-bold rounded-xl hover:bg-slate-800 flex items-center gap-1.5 transition-all shadow-md"
            >
              Siguiente <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-3 bg-orbix-cyan text-orbix-navy text-sm font-bold rounded-xl hover:brightness-110 flex items-center gap-2 transition-all shadow-lg shadow-[#29DDDA]/30 cursor-pointer"
            >
              Confirmar e Integrar Nodo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
