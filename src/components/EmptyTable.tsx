// src/components/EmptyTable.tsx
import React from 'react';

export default function EmptyTable({ columns }: { columns: string[] }) {
  return (
    <table className="min-w-full border border-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((col) => (
            <th key={col} className="px-4 py-2 text-left text-sm font-medium text-gray-500">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={columns.length} className="p-4 text-center text-gray-400">
            No data available.
          </td>
        </tr>
      </tbody>
    </table>
  );
}
