'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { setCortexContext, type Periodo, type CortexContext } from '@/lib/cortex/api';

interface DemoContextValue extends CortexContext {
  setNodeId: (nodeId: string) => void;
  setPeriodo: (periodo: Periodo) => void;
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoContextProvider({ children }: { children: ReactNode }) {
  const [nodeId, updateNodeId] = useState('nodo-003');
  const [periodo, updatePeriodo] = useState<Periodo>('mes');

  const setNodeId = (nextNodeId: string) => {
    setCortexContext({ nodeId: nextNodeId, periodo });
    updateNodeId(nextNodeId);
  };

  const setPeriodo = (nextPeriodo: Periodo) => {
    setCortexContext({ nodeId, periodo: nextPeriodo });
    updatePeriodo(nextPeriodo);
  };

  return (
    <DemoContext.Provider value={{ nodeId, periodo, setNodeId, setPeriodo }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemoContext() {
  const context = useContext(DemoContext);
  if (!context) throw new Error('useDemoContext debe usarse dentro de DemoContextProvider');
  return context;
}
