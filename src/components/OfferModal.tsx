// src/components/OfferModal.tsx
"use client";
import { useState } from 'react';
import { X } from 'lucide-react';

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OfferModal({ isOpen, onClose }: OfferModalProps) {
  const [commission, setCommission] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(9,18,49,0.7)' }}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-bold" style={{ color: '#091231' }}>Crear Oferta</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal de oferta"
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <form className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-1" style={{ color: '#091231' }}>
              Título de la Experiencia
            </label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
              style={{ borderColor: '#ECF0F5', '--tw-ring-color': '#29DDDA' } as React.CSSProperties}
              placeholder="Ej. Tour Gastronómico Madrid"
            />
          </div>

          {/* Territory */}
          <div>
            <label className="block text-sm font-semibold mb-1" style={{ color: '#091231' }}>
              Territorio
            </label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
              style={{ borderColor: '#ECF0F5' } as React.CSSProperties}
              placeholder="Ej. Madrid, España"
            />
          </div>

          {/* Commission — prominently styled */}
          <div className="rounded-xl p-4" style={{ backgroundColor: '#091231' }}>
            <label className="block text-sm font-bold mb-1" style={{ color: '#29DDDA' }}>
              Comisión Ofrecida (%)
            </label>
            <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Este porcentaje será visible para todos los distribuidores antes de aceptar.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="100"
                value={commission}
                onChange={(e) => setCommission(e.target.value)}
                className="w-24 rounded-lg px-3 py-2 text-2xl font-bold text-center focus:outline-none focus:ring-2"
                style={{ backgroundColor: '#ECF0F5', color: '#091231' }}
                placeholder="0"
              />
              <span className="text-white text-3xl font-bold">%</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{ backgroundColor: '#ECF0F5', color: '#091231' }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-sm font-bold transition-all hover:brightness-110"
              style={{ backgroundColor: '#29DDDA', color: '#091231' }}
            >
              Publicar Oferta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
