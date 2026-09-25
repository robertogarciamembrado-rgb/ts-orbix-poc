"use client";
// src/components/ExperienceCard.tsx
import { useEffect, useState } from "react";
import {
  Clock,
  MapPin,
  Users,
  Star,
  ThumbsUp,
  ThumbsDown,
  Info,
  Share2,
  Bookmark,
  ShoppingCart,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

interface Tag {
  label: string;
  bg: string;      // tailwind or hex
  text?: string;   // optional text color override
}

interface ExperienceCardProps {
  imageUrl: string;
  imageAlt: string;
  tags: Tag[];
  title: string;
  description: string;
  meta: { duration: string; location: string; audience: string };
  aiInsight: string;
  review: { text: string; stars: number };
}

export default function ExperienceCard({
  imageUrl,
  imageAlt,
  tags,
  title,
  description,
  meta,
  aiInsight,
  review,
}: ExperienceCardProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);

  useEffect(() => {
    if (!isPurchaseDialogOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isPurchaseDialogOpen]);

  const handleSimulateBuy = () => {
    setIsPurchaseDialogOpen(true);
  };

  const confirmPurchase = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPurchaseDialogOpen(false);
      toast.success(
        'Compra de 150 EUR registrada en la web del proveedor. La confirmación ha sido enviada.'
      );
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">

      {/* ── IMAGE + TAGS ─────────────────────────────────────── */}
      <div className="relative w-full" style={{ paddingBottom: "56.25%" /* 16:9 */ }}>
        <img
          src={imageUrl}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Tag overlay */}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag.label}
              className="text-xs font-semibold px-2.5 py-1 rounded-full text-white"
              style={{ backgroundColor: tag.bg }}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────────── */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 leading-snug">{title}</h3>

        {/* Description */}
        <p className="text-sm text-slate-500 mt-1 leading-relaxed">{description}</p>

        {/* Meta row */}
        <div className="flex items-center gap-3 mt-3 text-xs text-slate-400 flex-wrap">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {meta.duration}
          </span>
          <span className="text-slate-200">·</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {meta.location}
          </span>
          <span className="text-slate-200">·</span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {meta.audience}
          </span>
        </div>

        {/* AI Insight block */}
        <div className="bg-slate-50 rounded-lg p-3 mt-4 text-sm text-slate-600 italic leading-relaxed">
          ✨ {aiInsight}
        </div>

        {/* Review */}
        <div className="flex items-center gap-1.5 mt-3">
          {Array.from({ length: review.stars }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          ))}
          {Array.from({ length: 5 - review.stars }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 text-slate-200" />
          ))}
          <span className="text-xs text-slate-500 ml-1 italic">“{review.text}”</span>
        </div>

        {/* Botón Destacado: Simular Compra (Demo) */}
        <button
          onClick={handleSimulateBuy}
          disabled={isProcessing}
          className="tour-b2c-pixel mt-4 w-full py-2.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:brightness-110 disabled:opacity-75 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#29DDDA", color: "#091231" }}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Redirigiendo y procesando...</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>Simular Compra (Demo)</span>
            </>
          )}
        </button>
      </div>

      {/* ── FOOTER ACTIONS ───────────────────────────────────── */}
      <div className="border-t border-slate-100 px-3 py-2.5 flex items-center justify-between text-slate-400">
        {[
          { icon: ThumbsUp,   label: "Útil" },
          { icon: ThumbsDown, label: "No interesa" },
          { icon: Info,       label: "Más info" },
          { icon: Share2,     label: "Compartir" },
          { icon: Bookmark,   label: "Guardar" },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            title={label}
            className="flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <Icon className="w-4 h-4" aria-hidden="true" />
          </button>
        ))}
      </div>

      {isPurchaseDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="purchase-dialog-title"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-slate-900 shadow-2xl">
            <h2 id="purchase-dialog-title" className="text-xl font-bold">Continuar con la compra</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Te redirigiremos de forma segura a la web del proveedor para finalizar tu reserva.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsPurchaseDialogOpen(false)}
                disabled={isProcessing}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmPurchase}
                disabled={isProcessing}
                className="rounded-lg bg-orbix-cyan px-4 py-2 text-sm font-bold text-orbix-navy hover:brightness-105 disabled:opacity-75"
              >
                {isProcessing ? "Procesando..." : "Continuar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
