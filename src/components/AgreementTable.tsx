// src/components/AgreementTable.tsx
import React from 'react';

type Agreement = {
  node: string;
  type: string;
  status: string;
  validFrom: string;
};

interface AgreementTableProps {
  data: Agreement[];
}

export default function AgreementTable({ data }: AgreementTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border" style={{ borderColor: '#ECF0F5' }}>
      <table className="min-w-full">
        <thead>
          <tr style={{ backgroundColor: '#091231' }}>
            {['Nodo Destino', 'Tipo de Acuerdo', 'Estado', 'Fecha de Vigencia'].map((col) => (
              <th key={col} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : ''} style={{ backgroundColor: idx % 2 !== 0 ? '#ECF0F5' : '' }}>
              <td className="px-4 py-3 text-sm font-medium" style={{ color: '#091231' }}>{row.node}</td>
              <td className="px-4 py-3 text-sm" style={{ color: '#3371AF' }}>{row.type}</td>
              <td className="px-4 py-3 text-sm">
                <span
                  className="px-2 py-1 rounded-full text-xs font-bold"
                  style={
                    row.status === 'Activo'
                      ? { backgroundColor: '#29DDDA', color: '#091231' }
                      : { backgroundColor: '#ECF0F5', color: '#223F7C' }
                  }
                >
                  {row.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">{row.validFrom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
