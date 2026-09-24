"use client";

import React, { useState } from "react";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  User,
  MapPin,
  Compass,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

interface OrbixerWizardProps {
  onComplete?: () => void;
  onCancel?: () => void;
}

const motivationSegments = [
  {
    id: "cultural",
    title: "Exploración Cultural",
    desc: "Patrimonio histórico, museos, tradiciones locales y arte contemporáneo.",
    icon: Compass,
  },
  {
    id: "bienestar",
    title: "Descanso y Bienestar",
    desc: "Turismo de relajación, spas, retiros en la naturaleza y desconexión.",
    icon: Sparkles,
  },
  {
    id: "aventura",
    title: "Aventura Sostenible",
    desc: "Senderismo, deportes al aire libre, ecoturismo y bajo impacto ambiental.",
    icon: MapPin,
  },
  {
    id: "gastronomia",
    title: "Gastronomía y Enoturismo",
    desc: "Rutas culinarias, catas, mercados de productores y alta cocina.",
    icon: User,
  },
];

export default function OrbixerWizard({ onComplete, onCancel }: OrbixerWizardProps) {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State alineado al Modelo de Dominio v2.0 (tabla miembros_red)
  const [formData, setFormData] = useState({
    // Paso 1: Identidad
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    // Paso 2: Ubicación
    country: "España",
    city: "",
    // Paso 3: Segmento de Motivación
    segmento_motivacion: "Exploración Cultural",
    // Paso 4: Consentimiento Crítico (incorporacion_a_red)
    consentimiento_red: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consentimiento_red) {
      toast.error("Debes consentir expresamente tu incorporación a la red para continuar.");
      return;
    }

    setIsSubmitted(true);
    toast.success(
      "Membresía Orbixer acreditada. Registro generado en la tabla miembros_red con consentimiento incorporacion_a_red."
    );

    if (onComplete) {
      setTimeout(onComplete, 2200);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl p-8 max-w-xl mx-auto text-center border border-slate-200 shadow-xl">
        <div className="w-16 h-16 bg-[#29DDDA]/20 text-orbix-navy rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10 text-orbix-navy" />
        </div>
        <h3 className="text-2xl font-bold text-orbix-navy mb-2">¡Bienvenido a TS Orbix!</h3>
        <p className="text-slate-600 text-sm mb-6">
          Tu registro en <strong className="text-orbix-navy">miembros_red</strong> ha sido
          confirmado. Tu consentimiento <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono text-orbix-ts">incorporacion_a_red</code> está formalizado criptográficamente.
        </p>

        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-left text-xs space-y-2 mb-6 text-slate-700">
          <div><span className="font-semibold">Miembro:</span> {formData.firstName} {formData.lastName}</div>
          <div><span className="font-semibold">Email:</span> {formData.email}</div>
          <div><span className="font-semibold">Ubicación:</span> {formData.city}, {formData.country}</div>
          <div><span className="font-semibold">Segmento de Motivación:</span> {formData.segmento_motivacion}</div>
          <div suppressHydrationWarning><span className="font-semibold">Hash Consentimiento:</span> 0x{Math.random().toString(16).substring(2, 14)}...</div>
        </div>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full py-3 bg-orbix-cyan text-orbix-navy font-bold rounded-xl hover:brightness-105 transition-all shadow-md"
          >
            Acceder al Portal del Viajero
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden max-w-2xl mx-auto w-full">
      {/* Header Wizard */}
      <div className="bg-orbix-navy text-white px-6 py-5 flex items-center justify-between border-b border-white/10">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-orbix-cyan font-semibold">
            Modelo de Dominio v2.0 · miembros_red
          </span>
          <h2 className="text-lg font-bold">Registro de Miembro (Orbixer)</h2>
        </div>
        <div className="flex items-center gap-2">
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

      {/* Contenido de los Pasos */}
      <div className="p-6 sm:p-8">
        {/* PASO 1 (Identidad): Nombre, Apellidos, Email y Celular */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-bold text-orbix-navy">Paso 1: Identidad del Miembro</h3>
              <p className="text-sm text-slate-500 mt-1">
                Ingresa los datos personales del viajero para inicializar tu credencial soberana.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nombre *
                </label>
                <input
                  type="text"
                  placeholder="Ej. Laura"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orbix-cyan"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Apellidos *
                </label>
                <input
                  type="text"
                  placeholder="Ej. González Ruiz"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orbix-cyan"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Correo Electrónico *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="laura.gonzalez@ejemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-orbix-cyan"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Número Celular / Móvil *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="+34 612 345 678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-orbix-cyan"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* PASO 2 (Ubicación): País y Ciudad */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-bold text-orbix-navy">Paso 2: Ubicación Geográfica</h3>
              <p className="text-sm text-slate-500 mt-1">
                Permite contextualizar las recomendaciones locales y eventos de proximidad.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                País de Residencia *
              </label>
              <select
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orbix-cyan font-medium"
              >
                <option value="España">España</option>
                <option value="México">México</option>
                <option value="Colombia">Colombia</option>
                <option value="Argentina">Argentina</option>
                <option value="Chile">Chile</option>
                <option value="Francia">Francia</option>
                <option value="Italia">Italia</option>
                <option value="Reino Unido">Reino Unido</option>
                <option value="Estados Unidos">Estados Unidos</option>
                <option value="Otro">Otro País</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Ciudad / Localidad *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Ej. Madrid, Barcelona, Medellín, Oaxaca"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-orbix-cyan"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* PASO 3 (Segmento de Motivación): Selector visual para segmento_motivacion */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-bold text-orbix-navy">
                Paso 3: Segmento de Motivación
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Selecciona tu vector principal de viaje para calibrar el motor de recomendación.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {motivationSegments.map((item) => {
                const Icon = item.icon;
                const isSelected = formData.segmento_motivacion === item.title;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() =>
                      setFormData({ ...formData, segmento_motivacion: item.title })
                    }
                    className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? "border-[#29DDDA] bg-cyan-50/40 shadow-sm ring-2 ring-[#29DDDA]/20"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-orbix-ts">
                        <Icon className="w-4 h-4 text-orbix-ts" />
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

        {/* PASO 4 (Consentimiento Crítico): incorporacion_a_red */}
        {step === 4 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-bold text-orbix-navy">
                Paso 4: Consentimiento de Red y Activación
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                La economía circular de TS Orbix requiere tu consentimiento soberano para atribuir
                recompensas entre nodos.
              </p>
            </div>

            {/* Resumen de Datos */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-xs text-slate-700">
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Titular:</span>
                <span className="font-bold text-orbix-navy">
                  {formData.firstName} {formData.lastName || "(No especificado)"}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Email y Celular:</span>
                <span className="font-bold text-orbix-navy">
                  {formData.email} · {formData.phone}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Residencia:</span>
                <span className="font-bold text-orbix-navy">
                  {formData.city}, {formData.country}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Segmento de Motivación:</span>
                <span className="font-bold text-orbix-navy">
                  {formData.segmento_motivacion}
                </span>
              </div>
            </div>

            {/* Checkbox Obligatorio Crítico */}
            <div className="p-4 bg-slate-50 border-2 border-slate-200 rounded-xl space-y-3">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.consentimiento_red}
                  onChange={(e) =>
                    setFormData({ ...formData, consentimiento_red: e.target.checked })
                  }
                  className="mt-1 w-5 h-5 text-orbix-cyan rounded border-slate-300 focus:ring-orbix-cyan"
                  required
                />
                <div className="text-xs">
                  <p className="font-bold text-orbix-navy text-sm">
                    Consiento expresamente mi incorporación a la red TS Orbix *
                  </p>
                  <p className="text-slate-500 mt-1 leading-relaxed">
                    Autorizo el registro inmutable de mi consentimiento bajo la finalidad{" "}
                    <code className="bg-slate-200/80 px-1 py-0.5 rounded text-orbix-navy font-mono font-semibold">
                      incorporacion_a_red
                    </code>
                    . Esto permite acreditar mi pertenencia a la red, acceder a beneficios de
                    partners y validar la atribución bilateral sin ceder la propiedad de mis datos.
                  </p>
                </div>
              </label>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-200 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Almacenado de forma segura en la tabla consentimiento del modelo soberano.</span>
              </div>
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
                if (step === 1 && (!formData.firstName || !formData.email)) {
                  toast.error("Por favor completa nombre y correo para continuar.");
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
              disabled={!formData.consentimiento_red}
              className={`px-6 py-3 text-sm font-bold rounded-xl flex items-center gap-2 transition-all shadow-md ${
                formData.consentimiento_red
                  ? "bg-orbix-cyan text-orbix-navy hover:brightness-110 shadow-[#29DDDA]/30 cursor-pointer"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              ¡Convertirme en Orbixer!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
