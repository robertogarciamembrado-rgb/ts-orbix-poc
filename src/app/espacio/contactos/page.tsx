"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  UserCheck,
  Tag,
  Download,
  Plus,
  MessageCircle,
  ExternalLink,
  ChevronDown,
  Clock,
  Sparkles,
  Phone,
} from "lucide-react";
import { toast } from "sonner";

interface ContactItem {
  id: string;
  name: string;
  channel: "WhatsApp" | "Instagram" | "Telegram" | "Webchat";
  tags: string[];
  lastInteraction: string;
  ltv: string;
  consent: boolean;
}

const initialContacts: ContactItem[] = [
  {
    id: "wa_+34612345678",
    name: "Laura González",
    channel: "WhatsApp",
    tags: ["VIP", "Gastronomía"],
    lastInteraction: "Hace 2 horas",
    ltv: "450 EUR",
    consent: true,
  },
  {
    id: "ig_viajero_madrid",
    name: "Carlos Mendoza",
    channel: "Instagram",
    tags: ["Aventura", "Senderismo"],
    lastInteraction: "Ayer 18:30",
    ltv: "1,200 EUR",
    consent: true,
  },
  {
    id: "wa_+34698765432",
    name: "Beatriz Santos",
    channel: "WhatsApp",
    tags: ["Familia", "Sol y Playa"],
    lastInteraction: "Hace 3 días",
    ltv: "890 EUR",
    consent: false,
  },
  {
    id: "tg_elena_rot",
    name: "Elena Rotger",
    channel: "Telegram",
    tags: ["Negocios/MICE"],
    lastInteraction: "Hace 15 min",
    ltv: "1,650 EUR",
    consent: true,
  },
  {
    id: "wa_+34655443322",
    name: "Javier Vidal",
    channel: "WhatsApp",
    tags: ["Bienestar", "Rural"],
    lastInteraction: "Hace 5 días",
    ltv: "320 EUR",
    consent: true,
  },
  {
    id: "web_sess_8941",
    name: "Visitante Web #8941",
    channel: "Webchat",
    tags: ["Nuevo Prospecto"],
    lastInteraction: "Hace 4 horas",
    ltv: "0 EUR",
    consent: false,
  },
];

export default function WorkspaceContacts() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedContactMenu, setSelectedContactMenu] = useState<string | null>(null);
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  // Filtrado reactivo por ID, Nombre o Etiqueta
  const filteredContacts = initialContacts.filter((c) => {
    const matchesSearch =
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesFilter = activeFilter ? c.tags.includes(activeFilter) : true;
    return matchesSearch && matchesFilter;
  });

  const toggleActionMenu = (id: string) => {
    setSelectedContactMenu((prev) => (prev === id ? null : id));
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
            <span className="text-xs text-slate-500 font-medium">Audiencia Propia Soberana</span>
          </div>
          <h1 className="text-2xl font-bold text-orbix-navy">
            Gestión de Contactos &amp; CRM
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Base de datos soberana de tu nodo con trazabilidad de consentimiento y valor acumulado.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toast.success("Exportando base de datos de contactos en formato CSV...")}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            Exportar CSV
          </button>
          <button
            onClick={() => toast.info("Formulario de alta manual de contacto.")}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-orbix-cyan text-orbix-navy rounded-xl hover:brightness-110 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            Nuevo Contacto
          </button>
        </div>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Buscador ('Buscar por ID o etiqueta') */}
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por ID o etiqueta..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#29DDDA] text-slate-800 placeholder-slate-400 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Botón de Filtros Avanzados */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {activeFilter && (
            <span className="text-xs bg-[#223F7C] text-white px-2.5 py-1 rounded-full flex items-center gap-1 font-medium">
              Filtro: {activeFilter}
              <button onClick={() => setActiveFilter(null)} className="ml-1 hover:text-[#29DDDA]">
                ✕
              </button>
            </span>
          )}
          <button
            onClick={() => setShowFiltersModal(!showFiltersModal)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
              showFiltersModal
                ? "bg-orbix-navy text-white border-orbix-navy"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Filter className="w-3.5 h-3.5 text-orbix-ts" />
            <span>Filtros Avanzados</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Sub-panel desplegable de filtros rápidos */}
      {showFiltersModal && (
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-slate-600 mr-2">Filtrar por etiqueta:</span>
          {["VIP", "Gastronomía", "Aventura", "Familia", "Negocios/MICE", "Rural"].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setActiveFilter(activeFilter === tag ? null : tag);
                setShowFiltersModal(false);
              }}
              className={`px-3 py-1 rounded-full font-semibold border transition-all ${
                activeFilter === tag
                  ? "bg-orbix-cyan text-orbix-navy border-orbix-cyan"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Tabla Enriquecida */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead style={{ backgroundColor: "#091231" }}>
              <tr>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-white">
                  Contacto / ID
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-white">
                  Canal
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-white">
                  Etiquetas
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-white">
                  Última Interacción
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-white">
                  Valor de Vida (LTV)
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-white">
                  Consentimiento
                </th>
                <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-white">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-slate-400 text-xs">
                    No se encontraron contactos que coincidan con la búsqueda.
                  </td>
                </tr>
              ) : (
                filteredContacts.map((contact, idx) => (
                  <tr
                    key={contact.id}
                    className="hover:bg-slate-50/80 transition-colors"
                    style={{ backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#F8FAFC" }}
                  >
                    {/* ID y Nombre */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="font-bold text-orbix-navy">{contact.name}</div>
                      <div className="text-xs font-mono text-slate-400 mt-0.5">{contact.id}</div>
                    </td>

                    {/* Canal */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700">
                        <MessageCircle className="w-3.5 h-3.5 text-orbix-ts" />
                        {contact.channel}
                      </span>
                    </td>

                    {/* Etiquetas */}
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1.5 max-w-xs">
                        {contact.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full text-xs font-semibold"
                            style={{ backgroundColor: "#223F7C", color: "#FFFFFF" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Última Interacción */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{contact.lastInteraction}</span>
                      </div>
                    </td>

                    {/* Valor de Vida (LTV) */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="font-bold text-orbix-navy">{contact.ltv}</span>
                    </td>

                    {/* Consentimiento */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      {contact.consent ? (
                        <span
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold"
                          style={{ backgroundColor: "#29DDDA", color: "#091231" }}
                        >
                          ✓ incorporacion_a_red
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-500">
                          pendiente
                        </span>
                      )}
                    </td>

                    {/* Botón de Acción con Menú */}
                    <td className="px-5 py-4 whitespace-nowrap text-right relative">
                      <button
                        onClick={() => toggleActionMenu(contact.id)}
                        className="p-1.5 text-slate-400 hover:text-orbix-navy hover:bg-slate-200/60 rounded-lg transition-all"
                        title="Opciones de Contacto"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {/* Dropdown contextual */}
                      {selectedContactMenu === contact.id && (
                        <div className="absolute right-6 top-10 w-44 bg-white border border-slate-200 rounded-xl shadow-xl z-20 py-1.5 text-left text-xs font-medium animate-fadeIn">
                          <button
                            onClick={() => {
                              setSelectedContactMenu(null);
                              toast.info(`Abriendo expediente de ${contact.name}`);
                            }}
                            className="w-full px-3.5 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                          >
                            <UserCheck className="w-3.5 h-3.5 text-orbix-ts" />
                            Ver Perfil Completo
                          </button>
                          <button
                            onClick={() => {
                              setSelectedContactMenu(null);
                              toast.success(`Etiqueta añadida al contacto ${contact.name}`);
                            }}
                            className="w-full px-3.5 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                          >
                            <Tag className="w-3.5 h-3.5 text-orbix-ts" />
                            Añadir Etiqueta
                          </button>
                          <div className="my-1 border-t border-slate-100" />
                          <button
                            onClick={() => {
                              setSelectedContactMenu(null);
                              toast.info(`Iniciando chat con ${contact.id}`);
                            }}
                            className="w-full px-3.5 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                            Iniciar Conversación
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer de Paginación */}
        <div className="px-5 py-4 border-t border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>
            Mostrando <strong>{filteredContacts.length}</strong> de{" "}
            <strong>12,450</strong> contactos verificados en la red
          </span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded bg-white border border-slate-200 text-slate-400 cursor-not-allowed">
              Anterior
            </button>
            <span className="font-bold text-slate-700 px-2">1</span>
            <button className="px-3 py-1 rounded bg-white border border-slate-200 text-slate-700 hover:bg-slate-100">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
