// src/app/vigilante/noticias/page.tsx
export default function VigilanteNoticias() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-white">Noticias Relevantes</h1>
      <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
        Feed de noticias filtrado por tus ejes estratégicos activos.
      </p>
      <div className="rounded-xl border p-10 text-center" style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "#0C1A3E" }}>
        <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.3)" }}>
          Módulo en construcción — disponible en v1.1
        </p>
      </div>
    </div>
  );
}
