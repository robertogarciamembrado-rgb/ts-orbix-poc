// use client
"use client";

import React, { useState } from "react";
import { Globe, Users, FileText } from "lucide-react";
import { formatTokens } from "@/lib/format";

interface Product {
  id: string;
  title: string;
  badge: string;
  description: string;
  price: number; // tokens
  Icon: React.ElementType;
}

const products: Product[] = [
  {
    id: "mission",
    title: "Misión Internacional",
    badge: "Evento",
    description: "Participación en la próxima misión comercial a Asia.",
    price: 2500,
    Icon: Globe,
  },
  {
    id: "panel",
    title: "Panel de Expertos",
    badge: "Consultoría",
    description: "Mesa redonda privada para auditar la estrategia de tu destino.",
    price: 1200,
    Icon: Users,
  },
  {
    id: "report",
    title: "Informe Sectorial a Medida",
    badge: "Inteligencia",
    description: "Análisis profundo de un mercado emisor específico.",
    price: 800,
    Icon: FileText,
  },
];

function ProductCard({ product }: { product: Product }) {
  const [sent, setSent] = useState(false);

  return (
    <div className="bg-white shadow-sm border border-slate-200 rounded-xl hover:shadow-md transition-all p-6 flex flex-col">
      {/* Icon */}
      <product.Icon className="w-8 h-8 text-orbix-navy" />
      {/* Badge */}
      <span className="mt-2 inline-block bg-orbix-cyan text-orbix-navy text-xs font-medium px-2 py-0.5 rounded">
        {product.badge}
      </span>
      {/* Title */}
      <h3 className="mt-2 text-lg font-bold text-slate-900">{product.title}</h3>
      {/* Description */}
      <p className="mt-2 text-sm text-slate-600 flex-1">{product.description}</p>
      {/* Beneficio Nodo */}
      <span className="mt-2 inline-block bg-orbix-cyan text-orbix-navy text-xs font-medium px-2 py-0.5 rounded">
        Beneficio Nodo: -15%
      </span>
      {/* Price */}
      <div className="mt-2 text-sm font-medium text-slate-800" suppressHydrationWarning>
        Precio: {formatTokens(product.price)} Tokens
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
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
