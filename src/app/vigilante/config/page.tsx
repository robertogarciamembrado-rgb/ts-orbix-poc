// src/app/vigilante/config/page.tsx
export default function VigilanteConfig() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-white">Configuración</h1>
      <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
        Gestiona tus ejes activos, frecuencia de alertas y preferencias de notificación.
      </p>
      <div className="rounded-xl border p-10 text-center" style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "#0C1A3E" }}>
        <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.3)" }}>
          Módulo en construcción — disponible en v1.1
        </p>
      </div>
    </div>
  );
}
