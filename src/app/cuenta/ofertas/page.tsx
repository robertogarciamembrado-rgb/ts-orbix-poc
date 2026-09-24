"use client";
import { useState } from 'react';
import Card from '@/components/Card';
import OfferModal from '@/components/OfferModal';
import { Plus, CheckCircle, Wifi } from 'lucide-react';

const myOffers = [
  {
    id: 1,
    title: 'Tour Gastronómico Madrid',
    territory: 'Madrid, España',
    commission: 15,
    status: 'Activa (Píxel OK)',
  },
];

const catalogOffers = [
  {
    id: 1,
    provider: 'Think Tank',
    title: 'Informe: Tendencias Turismo 2025',
    commission: 12,
    territory: 'Global',
  },
  {
    id: 2,
    provider: 'Hotel Madrid',
    title: 'Estancia Premium – Suite Ejecutiva',
    commission: 18,
    territory: 'Madrid, España',
  },
  {
    id: 3,
    provider: 'Blog de Viajes',
    title: 'Paquete Newsletter + Post Patrocinado',
    commission: 10,
    territory: 'España',
  },
];

export default function AccountOfertas() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <OfferModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* ── MIS OFERTAS PUBLICADAS ── */}
      <Card title="Mis Ofertas Publicadas">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm" style={{ color: '#3371AF' }}>
            Gestiona las experiencias que ofreces a la red de distribuidores.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all hover:brightness-110"
            style={{ backgroundColor: '#29DDDA', color: '#091231' }}
          >
            <Plus className="w-4 h-4" />
            Crear Oferta
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border" style={{ borderColor: '#ECF0F5' }}>
          <table className="min-w-full">
            <thead>
              <tr style={{ backgroundColor: '#091231' }}>
                {['Experiencia', 'Territorio', 'Comisión', 'Estado'].map((col) => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {myOffers.map((offer, idx) => (
                <tr key={offer.id} style={{ backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#ECF0F5' }}>
                  <td className="px-4 py-3 text-sm font-bold" style={{ color: '#091231' }}>{offer.title}</td>
                  <td className="px-4 py-3 text-sm" style={{ color: '#3371AF' }}>{offer.territory}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="font-bold text-base" style={{ color: '#091231' }}>{offer.commission}%</span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold"
                      style={{ backgroundColor: '#29DDDA', color: '#091231' }}
                    >
                      <Wifi className="w-3 h-3" />
                      {offer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── CATÁLOGO DE DISTRIBUCIÓN ── */}
      <Card title="Catálogo de Distribución">
        <p className="text-sm mb-4" style={{ color: '#3371AF' }}>
          Ofertas de la red disponibles para promocionar. La comisión es pública antes de aceptar.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {catalogOffers.map((offer) => (
            <div
              key={offer.id}
              className="rounded-xl border bg-white p-5 flex flex-col justify-between shadow-sm"
              style={{ borderColor: '#ECF0F5' }}
            >
              {/* Provider badge */}
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full mb-3 w-fit"
                style={{ backgroundColor: '#ECF0F5', color: '#223F7C' }}
              >
                {offer.provider}
              </span>

              {/* Title */}
              <h4 className="font-bold text-sm mb-2 leading-tight" style={{ color: '#091231' }}>
                {offer.title}
              </h4>

              {/* Territory */}
              <p className="text-xs mb-4" style={{ color: '#3371AF' }}>📍 {offer.territory}</p>

              {/* Commission — hero metric */}
              <div
                className="rounded-lg px-4 py-3 mb-4 text-center"
                style={{ backgroundColor: '#091231' }}
              >
                <p className="text-xs font-semibold mb-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Comisión para ti
                </p>
                <p className="text-3xl font-bold" style={{ color: '#29DDDA' }}>
                  {offer.commission}%
                </p>
              </div>

              {/* CTA */}
              <button
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all hover:brightness-110"
                style={{ backgroundColor: '#29DDDA', color: '#091231' }}
              >
                <CheckCircle className="w-4 h-4" />
                Aceptar Distribución
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
