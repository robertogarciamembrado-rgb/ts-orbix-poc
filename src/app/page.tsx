"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";
import OrbixerWizard from "@/components/OrbixerWizard";
import PartnerWizard from "@/components/PartnerWizard";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Globe2,
  Users2,
  Building,
  TrendingUp,
  X,
  Compass,
  CheckCircle,
  ShoppingBag,
  Megaphone,
  Landmark,
} from "lucide-react";

export default function LandingPage() {
  const [modalType, setModalType] = useState<"orbixer" | "partner" | null>(null);

  const openOrbixer = () => setModalType("orbixer");
  const openPartner = () => setModalType("partner");
  const closeModal = () => setModalType(null);

  return (
    <div
      className="min-h-screen bg-orbix-navy text-white selection:bg-[#29DDDA] selection:text-[#091231] font-sans antialiased overflow-x-hidden"
      style={{ backgroundColor: "#091231", color: "#ffffff" }}
    >
      {/* 1. Sticky Navbar */}
      <LandingNavbar onOpenOrbixer={openOrbixer} onOpenPartner={openPartner} />

      {/* Modal interactivo de Registro */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-3xl my-8">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 md:-right-10 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
              aria-label="Cerrar modal de registro"
            >
              <X className="w-5 h-5" />
            </button>
            {modalType === "orbixer" ? (
              <OrbixerWizard onCancel={closeModal} />
            ) : (
              <PartnerWizard onCancel={closeModal} />
            )}
          </div>
        </div>
      )}

      {/* 2. Hero Section */}
      <section className="relative pt-20 pb-28 md:pt-28 md:pb-36 flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Glow de fondo decorativo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#29DDDA]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Badge superior */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-white/80 mb-8 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-orbix-cyan" />
          <span>Infraestructura Digital de Tourism &amp; Society Think Tank</span>
        </div>

        {/* LOGO CENTRAL MUY DESTACADO Y GRANDE */}
        <div className="mb-6 flex flex-col items-center justify-center group cursor-default">
          <Image
            alt="TS Orbix Hero"
            className="object-contain mx-auto brightness-0 invert drop-shadow-lg"
            height={400}
            src="/intro-orbixers.png"
            width={400}
            priority
          />
          <span className="mt-4 text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase text-white/60 font-semibold border-t border-white/15 pt-2 px-6">
            Ecosistema Descentralizado de Turismo y Sociedad
          </span>
        </div>

        {/* TEXTOS LATERALES/SUBTÍTULO (Ligeramente reducidos y elegantes) */}
        <p className="max-w-2xl text-base sm:text-lg text-white/70 font-normal leading-relaxed mb-12">
          La red que conecta a viajeros conscientes, destinos inteligentes y organizaciones
          líderes bajo una economía circular con gobernanza soberana.
        </p>

        {/* BOTONES DE LLAMADA A LA ACCIÓN (A la misma altura, con margen suficiente) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-xl">
          <button
            type="button"
            onClick={openPartner}
            className="w-full sm:w-auto min-w-[210px] h-14 px-8 rounded-xl bg-orbix-cyan text-orbix-navy font-bold text-base hover:brightness-110 shadow-lg shadow-[#29DDDA]/25 hover:shadow-[#29DDDA]/40 transition-all flex items-center justify-center gap-2"
          >
            <span>Unirse como Partner</span>
            <Building className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={openOrbixer}
            className="w-full sm:w-auto min-w-[210px] h-14 px-8 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-base border border-white/20 transition-all flex items-center justify-center gap-2"
          >
            <span>Ser un Orbixer</span>
            <Users2 className="w-4 h-4 text-orbix-cyan" />
          </button>
        </div>

        {/* Enlace sutil directo a la demostración */}
        <div className="mt-8 text-xs text-white/50 flex items-center gap-2">
          <span>¿Ya tienes una credencial de nodo?</span>
          <Link
            href="/cuenta/dashboard"
            className="text-orbix-cyan hover:underline font-semibold flex items-center gap-1"
          >
            Entrar a la Consola de Nodo <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      {/* 3. Propuesta de Valor */}
      <section className="bg-slate-50 py-24 text-slate-900 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3371AF] mb-3">Propuesta de valor</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Un ecosistema donde todos ganan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: ShoppingBag,
                title: "Vende más, paga solo por resultados",
                text:
                  "Publica tus ofertas con la comisión que decidas. Nuestro píxel registra las ventas y solo pagas cuando la red genera ingresos reales para ti. Cero coste por clic.",
              },
              {
                icon: Megaphone,
                title: "Monetiza tu comunidad sin fricción",
                text:
                  "Distribuye los productos de la red a tu audiencia. Promocionar no cuesta créditos. Gana comisiones por cada venta atribuida de forma automática e inmutable.",
              },
              {
                icon: Landmark,
                title: "Impacto y Confianza",
                text:
                  "Si no vendes online, contrata publicaciones pactadas respaldadas por el Think Tank. Amplifica tu mensaje estratégico en una red de nodos verificados.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-[#091231] transition-colors duration-300 group-hover:bg-[#29DDDA]/10 group-hover:text-[#091231]">
                  <Icon className="h-8 w-8" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
                <p className="text-sm leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Secciones de Contenido (Con abundante espacio py-24 y textos meticulosamente centrados) */}

      {/* SECCIÓN 1: El Ecosistema Descentralizado */}
      <section id="ecosistema" className="py-24 bg-white text-slate-800 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Texto Centrado Meticulosamente */}
            <div className="flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-wider text-orbix-ts mb-2">
                Arquitectura de Confianza
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-orbix-navy mb-6 leading-tight">
                El Ecosistema Descentralizado del Turismo
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                TS Orbix elimina la intermediación opaca y la dependencia de algoritmos extractivos.
                A través de nodos interconectados, destinos, empresas y viajeros colaboran de forma
                directa con acuerdos claros, trazabilidad inmutable y comisiones éticas.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-orbix-ts flex-shrink-0 mt-0.5">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Soberanía de Datos y Gobernanza
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Cada nodo gestiona su propia audiencia sin perder la propiedad de sus contactos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-orbix-ts flex-shrink-0 mt-0.5">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Economía Basada en Tokens de Utilidad
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Recompensas por valor aportado a la red, acceso a inteligencia y liquidaciones en tokens o fiat.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ilustración / Tarjeta Tecnológica Centrada */}
            <div className="flex justify-center">
              <div className="w-full max-w-lg bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                    <span className="w-3 h-3 rounded-full bg-cyan-400"></span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">orbix-protocol v1.2</span>
                </div>
                <div className="py-6 space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400">Nodo Activo</div>
                      <div className="text-sm font-bold text-orbix-navy">Patronato de Madrid</div>
                    </div>
                    <span className="px-2.5 py-1 text-[11px] font-semibold bg-cyan-50 text-cyan-800 rounded-full">
                      Validado
                    </span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400">Contrato Bilateral</div>
                      <div className="text-sm font-bold text-orbix-navy">Comisión Máxima: 10%</div>
                    </div>
                    <span className="px-2.5 py-1 text-[11px] font-semibold bg-slate-100 text-slate-700 rounded-full">
                      Inmutable
                    </span>
                  </div>
                  <div className="bg-orbix-navy p-4 rounded-xl text-white flex items-center justify-between">
                    <div>
                      <div className="text-xs text-white/50">Módulo AVIA Vigilante</div>
                      <div className="text-sm font-bold text-[#29DDDA]">Alertas Tempranas 24/7</div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#29DDDA] animate-ping"></span>
                  </div>
                </div>
                <div className="pt-2 text-center">
                  <Link
                    href="/cuenta/relaciones"
                    className="text-xs font-bold text-orbix-ts hover:underline inline-flex items-center gap-1"
                  >
                    Explorar el Directorio de Nodos <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: Para Orbixers (Viajeros y Miembros) */}
      <section id="orbixer" className="py-24 bg-orbix-grey text-slate-800 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Imagen/Preview a la izquierda */}
            <div className="order-2 lg:order-1 flex justify-center">
              <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80"
                    alt="Experiencia Gastronómica"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#091231]/80 backdrop-blur-md text-[#29DDDA] text-xs font-bold px-3 py-1 rounded-full">
                    Selección Think Tank
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-orbix-navy">
                    Ruta Secreta de Tapas Tradicionales
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Recomendada por IA según tus intereses de viaje cultural y gastronómico.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Beneficio Orbixer: -15%</span>
                  <Link
                    href="/miembro/descubrir"
                    className="px-4 py-1.5 bg-orbix-cyan text-orbix-navy text-xs font-bold rounded-lg hover:brightness-105"
                  >
                    Ver en Portal Viajero
                  </Link>
                </div>
              </div>
            </div>

            {/* Texto a la derecha */}
            <div className="order-1 lg:order-2 flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-wider text-orbix-ts mb-2">
                Para el Viajero y Ciudadano
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-orbix-navy mb-6 leading-tight">
                Descubre el mundo con una credencial soberana
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Como <strong>Orbixer</strong>, accedes a experiencias turísticas curadas,
                asesoramiento de agentes IA especializados sin saturación publicitaria y ventajas
                exclusivas que apoyan la economía real de cada destino.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-orbix-tagline" />
                  <span className="text-sm font-medium text-slate-700">
                    Sin venta ni comercialización de tus datos personales.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-orbix-tagline" />
                  <span className="text-sm font-medium text-slate-700">
                    Recomendaciones hiper-personalizadas respetando tu tope de frecuencia.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-orbix-tagline" />
                  <span className="text-sm font-medium text-slate-700">
                    Acceso preferente a eventos y misiones de Tourism &amp; Society.
                  </span>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={openOrbixer}
                  className="px-6 py-3.5 bg-orbix-navy text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-md inline-flex items-center gap-2"
                >
                  <span>Registrarme como Orbixer</span>
                  <ArrowRight className="w-4 h-4 text-orbix-cyan" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: Para Partners y Nodos */}
      <section id="partner" className="py-24 bg-orbix-navy text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-orbix-cyan mb-2 block">
              Red Corporativa B2B
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Impulsa tu organización dentro de TS Orbix
            </h2>
            <p className="text-white/70 text-base">
              Destinos turísticos, agencias, hoteles, tecnológicas y entidades del ecosistema:
              elige la modalidad que mejor se adapte al despliegue de tu nodo.
            </p>
          </div>

          {/* Grid de 3 Modalidades */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* START */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:border-white/20 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-white/60 tracking-wider">MODALIDAD</span>
                  <span className="text-xs font-bold bg-white/10 text-white px-2.5 py-0.5 rounded-full">
                    GRATIS
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white mb-2">ORBIX START</h3>
                <p className="text-sm text-white/70 leading-relaxed mb-6">
                  Empieza a formar parte del ecosistema TS Orbix. Accede a boletines y contenidos
                  exclusivos, descuentos y promociones, y disfruta de acceso preferente a eventos.
                </p>
              </div>
              <button
                type="button"
                onClick={openPartner}
                className="w-full py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-xl transition-all"
              >
                Comenzar Gratis
              </button>
            </div>

            {/* PRO */}
            <div className="bg-white/10 border-2 border-[#29DDDA] rounded-2xl p-8 flex flex-col justify-between relative shadow-2xl shadow-[#29DDDA]/10">
              <div className="absolute -top-3.5 right-6 bg-[#29DDDA] text-orbix-navy text-[11px] font-black uppercase px-3 py-1 rounded-full shadow">
                Recomendado
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-[#29DDDA] tracking-wider">MODALIDAD</span>
                  <span className="text-xs font-bold bg-[#29DDDA] text-orbix-navy px-2.5 py-0.5 rounded-full">
                    DE PAGO
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white mb-2">ORBIX PRO</h3>
                <p className="text-sm text-white/80 leading-relaxed mb-6">
                  Conecta, colabora y haz crecer tu negocio. Incluye todo lo de Orbix Start + acceso a
                  toda la red Orbix, posibilidad de solicitar y ofrecer productos y servicios a
                  usuarios finales y partners, Orbix Automation Hub y Argus Intelligence.
                </p>
              </div>
              <button
                type="button"
                onClick={openPartner}
                className="w-full py-3 bg-[#29DDDA] text-orbix-navy text-sm font-black rounded-xl hover:brightness-110 shadow-lg shadow-[#29DDDA]/30 transition-all"
              >
                Solicitar Acceso Pro
              </button>
            </div>

            {/* ELITE */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:border-white/20 transition-all opacity-85">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-white/60 tracking-wider">MODALIDAD</span>
                  <span className="text-xs font-bold bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full">
                    PRÓXIMAMENTE
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white mb-2">ORBIX ELITE</h3>
                <p className="text-sm text-white/70 leading-relaxed mb-6">
                  Lleva tu presencia en TS Orbix al siguiente nivel. Incluye los beneficios de Orbix
                  Pro + mayor posicionamiento y visibilidad dentro de TS Orbix y acceso a servicios
                  premium exclusivos.
                </p>
              </div>
              <button
                type="button"
                onClick={openPartner}
                className="w-full py-3 bg-white/5 text-white/50 text-sm font-semibold rounded-xl cursor-pointer hover:bg-white/10 transition-all"
              >
                Unirme a Lista de Espera
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: Think Tank & Inteligencia */}
      <section id="thinktank" className="py-24 bg-white text-slate-800 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-orbix-ts mb-2 block">
            Gobernanza y Conocimiento
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-orbix-navy mb-4">
            Tourism &amp; Society Think Tank
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 text-base mb-12">
            El tanque de pensamiento global que asesora, investiga y define los estándares éticos
            del turismo contemporáneo.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left">
              <Compass className="w-8 h-8 text-orbix-navy mb-3" />
              <h3 className="font-bold text-slate-900 text-base mb-1">Misiones Internacionales</h3>
              <p className="text-xs text-slate-500">
                Apertura de nuevos mercados y relaciones bilaterales con destinos líderes mundiales.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left">
              <Cpu className="w-8 h-8 text-orbix-navy mb-3" />
              <h3 className="font-bold text-slate-900 text-base mb-1">AVIA Vigilante</h3>
              <p className="text-xs text-slate-500">
                Radar estratégico e inteligencia competitiva en tiempo real para anticipar crisis y tendencias.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left">
              <Layers className="w-8 h-8 text-orbix-navy mb-3" />
              <h3 className="font-bold text-slate-900 text-base mb-1">Paneles de Expertos</h3>
              <p className="text-xs text-slate-500">
                Mesas de trabajo interdisciplinares con ministros, académicos y directivos globales.
              </p>
            </div>
          </div>
          <div className="mt-12">
            <Link
              href="/cuenta/think-tank"
              className="inline-flex items-center gap-2 text-sm font-bold text-orbix-ts hover:underline"
            >
              Ver catálogo completo de servicios Think Tank <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Footer con Enlaces Legales Exclusivos */}
      <LandingFooter />
    </div>
  );
}
