"use client";

import React, { useState, useEffect } from "react";
import { Globe, Users, FileText } from "lucide-react";
import { formatTokens } from "@/lib/format";
import { getPublicaciones } from "@/lib/cortex/api";
import type { Publicacion } from "@/lib/cortex/seed";

const iconMap: Record<Publicacion["icono"], React.ElementType> = {
  globe: Globe,
  users: Users,
  fileText: FileText,
};

function ProductCard({ product }: { product: Publicacion }) {
  const [sent, setSent] = useState(false);
  const Icon = iconMap[product.icono];

  return (
    <div className="bg-white shadow-sm border border-slate-200 rounded-xl hover:shadow-md transition-all p-6 flex flex-col">
      {/* Icon */}
      <Icon className="w-8 h-8 text-orbix-navy" />
      {/* Badge */}
      <span className="mt-2 inline-block bg-orbix-cyan text-orbix-navy text-xs font-medium px-2 py-0.5 rounded">
        {product.badge}
      </span>
      {/* Title */}
      <h3 className="mt-2 text-lg font-bold text-slate-900">{product.titulo}</h3>
      {/* Description */}
      <p className="mt-2 text-sm text-slate-600 flex-1">{product.descripcion}</p>
      {/* Beneficio Nodo */}
      <span className="mt-2 inline-block bg-orbix-cyan text-orbix-navy text-xs font-medium px-2 py-0.5 rounded">
        Beneficio Nodo: -15%
      </span>
      {/* Price */}
      <div className="mt-2 text-sm font-medium text-slate-800" suppressHydrationWarning>
              Precio: {formatTokens(product.precio)} Créditos
      </div>
      {/* Action Button */}
      <button
        onClick={() => setSent(true)}
        disabled={sent}
        className={`mt-4 px-4 py-2 text-sm font-bold rounded transition-colors ${
          sent
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-orbix-cyan text-orbix-navy hover:brightness-110"
        }`}
      >
        {sent ? "Solicitud Enviada" : "Solicitar Servicio"}
      </button>
    </div>
  );
}

export default function ThinkTankPage() {
  const [productos, setProductos] = useState<Publicacion[] | null>(null);

  useEffect(() => {
    getPublicaciones().then(setProductos);
  }, []);

  if (!productos)
    return (
      <div className="animate-pulse">
        <div className="bg-orbix-navy py-12 text-center">
          <div className="h-8 bg-white/10 rounded w-1/2 mx-auto mb-3" />
          <div className="h-5 bg-white/10 rounded w-1/3 mx-auto" />
        </div>
        <div className="max-w-7xl mx-auto py-12 px-4 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-slate-200 rounded-xl" />
          ))}
        </div>
      </div>
    );

  return (
    <section className="min-h-screen bg-orbix-grey">
      {/* Hero Header */}
      <div className="bg-orbix-navy text-white py-12 text-center">
        <h1 className="text-3xl font-bold">
          Servicios Exclusivos Tourism &amp; Society Think Tank
        </h1>
        <p className="mt-2 text-lg">
          Accede a inteligencia, eventos y asesoría con condiciones preferentes para miembros de la red
        </p>
      </div>

      {/* Catalog Grid */}
      <div className="max-w-7xl mx-auto py-12 px-4 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {productos.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
