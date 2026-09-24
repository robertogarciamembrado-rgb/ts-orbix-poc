// src/components/Card.tsx
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

export default function Card({ title, children }: CardProps) {
  return (
    <div className="rounded-xl border bg-white shadow-sm p-5" style={{ borderColor: '#ECF0F5' }}>
      <h3 className="text-lg font-bold mb-3" style={{ color: '#091231' }}>{title}</h3>
      <div>{children}</div>
    </div>
  );
}
