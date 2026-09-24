// src/app/cuenta/relaciones/page.tsx
"use client";
import Card from '@/components/Card';
import NodeCard from '@/components/NodeCard';
import AgreementTable from '@/components/AgreementTable';
import { useState } from 'react';

const mockNodes = [
  { id: 1, name: 'Think Tank', type: 'think_tank', reputation: 98 },
  { id: 2, name: 'Hotel Madrid', type: 'proveedor', reputation: 85 },
  { id: 3, name: 'Blog de Viajes', type: 'medio', reputation: 90 },
];

const mockAgreements = [
  { node: 'Think Tank', type: 'Acuerdo de Distribución', status: 'Activo', validFrom: '2024-01-15' },
  { node: 'Asociación XYZ', type: 'Acuerdo Marco', status: 'Propuesto', validFrom: '2024-03-01' },
];

export default function AccountRelaciones() {
  const [activeTab, setActiveTab] = useState<'network' | 'agreements'>('network');

  return (
    <Card title="Cuenta – Relaciones">
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 ${activeTab === 'network' ? 'border-b-2 border-blue-600' : ''}`}
          onClick={() => setActiveTab('network')}
        >
          Directorio de la Red
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'agreements' ? 'border-b-2 border-blue-600' : ''}`}
          onClick={() => setActiveTab('agreements')}
        >
          Mis Acuerdos
        </button>
      </div>
      {activeTab === 'network' ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          {mockNodes.map((node) => (
            <NodeCard key={node.id} name={node.name} type={node.type} reputation={node.reputation} />
          ))}
        </div>
      ) : (
        <AgreementTable data={mockAgreements} />
      )}
    </Card>
  );
}
