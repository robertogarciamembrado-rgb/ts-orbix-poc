// src/components/CRMTable.tsx
import React from 'react';

type Contact = {
  id: string;
  tags: string[];
  consent: boolean;
};

interface CRMTableProps {
  data: Contact[];
}

export default function CRMTable({ data }: CRMTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border" style={{ borderColor: '#ECF0F5' }}>
      <table className="min-w-full">
        <thead>
          <tr style={{ backgroundColor: '#091231' }}>
            {['ID de Contacto', 'Etiquetas', 'Consentimiento'].map((col) => (
              <th key={col} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((c, idx) => (
            <tr key={c.id} style={{ backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#ECF0F5' }}>
              <td className="px-4 py-3 text-sm font-mono font-medium" style={{ color: '#091231' }}>{c.id}</td>
              <td className="px-4 py-3 text-sm">
                <div className="flex flex-wrap gap-1">
                  {c.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: '#223F7C', color: '#FFFFFF' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3 text-sm">
                {c.consent ? (
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ backgroundColor: '#29DDDA', color: '#091231' }}
                  >
                    ✓ incorporacion_a_red
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: '#ECF0F5', color: '#3371AF' }}
                  >
                    pendiente
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
