"use client";
// src/components/NodeCard.tsx
import React from 'react';
import { BadgeCheck } from 'lucide-react';
import { toast } from 'sonner';

interface NodeCardProps {
  name: string;
  type: string;
  reputation: number;
}

export default function NodeCard({ name, type, reputation }: NodeCardProps) {
  return (
    <div className="rounded-xl border bg-white shadow-sm p-5 flex flex-col justify-between" style={{ borderColor: '#ECF0F5' }}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <BadgeCheck className="w-5 h-5" style={{ color: '#29DDDA' }} />
        <h4 className="font-bold text-base" style={{ color: '#091231' }}>{name}</h4>
      </div>

      {/* Type badge */}
      <span
        className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-3 capitalize w-fit"
        style={{ backgroundColor: '#ECF0F5', color: '#223F7C' }}
      >
        {type.replace('_', ' ')}
      </span>

      {/* Reputation */}
      <div className="mb-4">
        <p className="text-xs font-semibold mb-1" style={{ color: '#3371AF' }}>Reputación</p>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="h-2 rounded-full"
            style={{ width: `${reputation}%`, backgroundColor: '#29DDDA' }}
          />
        </div>
        <p className="text-right text-xs mt-1 font-bold" style={{ color: '#091231' }}>{reputation}/100</p>
      </div>

      {/* CTA */}
      <button
        onClick={() => toast.success('Acuerdo Propuesto. Hash de transacción generado exitosamente.')}
        className="w-full py-2 rounded-lg text-sm font-bold transition-all hover:brightness-110"
        style={{ backgroundColor: '#29DDDA', color: '#091231' }}
      >
        Proponer Acuerdo
      </button>
    </div>
  );
}
