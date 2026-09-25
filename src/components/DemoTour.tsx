"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Joyride, Step, EventData, STATUS, ACTIONS } from "react-joyride";
import { HelpCircle } from "lucide-react";

// Alias de compatibilidad para react-joyride
export type CallBackProps = EventData;

const TOUR_ROUTES: Record<string, Step[]> = {
  "/cuenta/dashboard": [
    {
      target: "body",
      placement: "center",
      title: "Bienvenido a la Capa de Cuenta",
      content:
    "Este es el identificador verificable del Nodo. Aquí la empresa gestiona su participación en la red, su membresía y sus reservas de saldo. Todo ocurre bajo un entorno B2B estricto.",
      skipBeacon: true,
    },
  ],
  "/cuenta/saldo": [
    {
      target: ".tour-saldo-reserva",
      placement: "bottom",
    title: "Modelo Prepago Verificable",
      content:
    "La red no custodia dinero entre empresas. El anunciante mantiene una reserva de créditos. Cada venta atribuida descuenta su comisión automáticamente de aquí, sin riesgo de impago.",
      skipBeacon: true,
    },
  ],
  "/miembro/descubrir": [
    {
      target: ".tour-b2c-pixel",
      placement: "top",
      title: "Atribución sin Declaración",
      content:
        "La red no gestiona la venta final. El clic no se cobra. Cuando el viajero compra en la web del proveedor, nuestro Píxel lo registra y la comisión se liquida sola. Nadie declara lo que paga.",
      skipBeacon: true,
    },
  ],
};

export default function DemoTour() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [run, setRun] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const currentSteps = TOUR_ROUTES[pathname];
    if (currentSteps && currentSteps.length > 0) {
      setSteps(currentSteps);
      const timer = setTimeout(() => {
        setRun(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setRun(false);
      setSteps([]);
    }
  }, [pathname, mounted]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, action } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status) || action === ACTIONS.CLOSE || action === ACTIONS.STOP) {
      setRun(false);
    }
  };

  const handleRestartTour = () => {
    const currentSteps = TOUR_ROUTES[pathname];
    if (currentSteps && currentSteps.length > 0) {
      setSteps(currentSteps);
      setRun(false);
      setTimeout(() => setRun(true), 150);
    }
  };

  if (!mounted) return null;

  const hasTourForCurrentRoute = Boolean(TOUR_ROUTES[pathname]);

  return (
    <>
      <Joyride
        run={run}
        steps={steps}
        continuous
        onEvent={handleJoyrideCallback}
        {...({ callback: handleJoyrideCallback } as any)}
        locale={{
          back: "Anterior",
          close: "Cerrar",
          last: "Entendido",
          next: "Siguiente",
          skip: "Saltar",
        }}
        options={{
          primaryColor: "#29DDDA",
          backgroundColor: "#091231",
          textColor: "#ffffff",
          arrowColor: "#091231",
          overlayColor: "rgba(9, 18, 49, 0.7)",
          zIndex: 10000,
          skipBeacon: true,
        }}
        styles={{
          tooltip: {
            borderRadius: "16px",
            padding: "20px 24px",
            backgroundColor: "#091231",
            color: "#ffffff",
            border: "1px solid rgba(41, 221, 218, 0.35)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
          },
          tooltipContainer: {
            textAlign: "left",
          },
          tooltipTitle: {
            fontSize: "17px",
            fontWeight: "800",
            color: "#29DDDA",
            marginBottom: "10px",
            lineHeight: "1.3",
          },
          tooltipContent: {
            fontSize: "13.5px",
            lineHeight: "1.6",
            color: "#f1f5f9",
          },
          buttonPrimary: {
            backgroundColor: "#29DDDA",
            color: "#091231",
            fontWeight: "800",
            borderRadius: "10px",
            padding: "9px 18px",
            fontSize: "12.5px",
            outline: "none",
            boxShadow: "0 4px 6px -1px rgba(41, 221, 218, 0.2)",
          },
          buttonBack: {
            color: "#94a3b8",
            marginRight: "12px",
            fontSize: "12.5px",
          },
          buttonSkip: {
            color: "#94a3b8",
            fontSize: "12px",
          },
          buttonClose: {
            color: "#94a3b8",
            padding: "10px",
          },
        }}
      />

      {/* Botón flotante para reiniciar la narrativa de negocio */}
      {hasTourForCurrentRoute && !run && (
        <button
          type="button"
          onClick={handleRestartTour}
          className="fixed bottom-5 left-5 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#091231] text-[#29DDDA] border border-[#29DDDA]/30 shadow-lg text-xs font-bold hover:bg-[#091231]/90 hover:scale-105 transition-all cursor-pointer"
          title="Ver explicación para la Junta Directiva"
          aria-label="Abrir Tour de Negocio"
        >
          <HelpCircle className="w-4 h-4 text-[#29DDDA]" />
          <span>Explicación de Negocio</span>
        </button>
      )}
    </>
  );
}
