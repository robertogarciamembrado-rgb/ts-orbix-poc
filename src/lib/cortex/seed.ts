/**
 * TS Orbix — Semilla de Datos (Single Source of Truth)
 *
 * Grafo coherente de entidades simuladas para la PoC.
 * REGLAS:
 * 1. Todas las fechas usan hace()/dentro(). Cero strings de fecha fijos.
 * 2. Las relaciones tienen integridad referencial:
 *    Venta → Llegada → Distribución → Oferta → Nodo
 * 3. Ningún componente importa este archivo directamente.
 *    Solo lib/cortex/api.ts lee de aquí.
 */

import { hace, dentro } from '@/lib/utils/time';

// ─── ID del nodo en sesión (usuario demo de la PoC) ────────────────────────
export const CURRENT_NODE_ID = 'nodo-001';

// ─── Tipos ─────────────────────────────────────────────────────────────────

export interface Rol {
  id: string;
  clave: string;
  nombre: string;
  descripcion: string;
}

export interface Nodo {
  id: string;
  nombre: string;
  rolId: string;
  reputacion: number;
  verificado: boolean;
}

export interface Arista {
  id: string;
  nodoOrigenId: string;
  nodoDestinoId: string;
  tipo: 'distribucion' | 'marco' | 'publicacion';
  estado: 'Activo' | 'Propuesto' | 'En revisión';
  fechaVigencia: Date;
}

export interface Oferta {
  id: string;
  nodoId: string;
  titulo: string;
  territorio: string;
  comision: number;
  estado: 'activa' | 'pausada';
  pixelOk: boolean;
  imageUrl?: string;
  imageAlt?: string;
  descripcion?: string;
  meta?: { duration: string; location: string; audience: string };
  aiInsight?: string;
  review?: { text: string; stars: number };
  tags?: { label: string; bg: string }[];
}

export interface Distribucion {
  id: string;
  ofertaId: string;
  nodoDistribuidorId: string;
  fechaAceptacion: Date;
}

export interface Llegada {
  id: string;
  distribucionId: string;
  contactoId: string;
  fecha: Date;
  canal: 'WhatsApp' | 'Instagram' | 'Telegram' | 'Webchat';
}

export type EstadoVenta = 'firme' | 'anulada';

export interface Venta {
  id: string;
  llegadaId: string;
  monto: number;
  estado: EstadoVenta;
  fecha: Date;
}

export interface Lote {
  id: string;
  origen: 'Saldo Base' | 'Compra' | 'Recompensa';
  cantidad: number;
  caducidad: Date;
}

export interface Movimiento {
  id: string;
  loteId?: string;
  delta: number;
  descripcion: string;
  fecha: Date;
}

export interface Contacto {
  id: string;
  nombre: string;
  canal: 'WhatsApp' | 'Instagram' | 'Telegram' | 'Webchat';
  tags: string[];
  ultimaInteraccion: Date;
  ltv: number;
  consentimiento: boolean;
}

export interface Miembro {
  id: string;
  contactoId: string;
  contribucion: string;
  recompensa: number;
  finCompensacion: Date;
}

export interface Encargo {
  id: string;
  tipo: 'recibido' | 'solicitado';
  contraparte: string;  // nombre del nodo que solicita o al que se solicita
  formato: string;
  tarifa: number;
  estado: string;
}

export interface Publicacion {
  id: string;
  titulo: string;
  badge: string;
  descripcion: string;
  precio: number;
  icono: 'globe' | 'users' | 'fileText';
}

export interface Alerta {
  id: number;
  tipo: 'warning' | 'info' | 'success';
  titulo: string;
  cuerpo: string;
  cta: string;
  estado: 'pending' | 'reviewing' | 'resolved';
}

// ─── ROLES ─────────────────────────────────────────────────────────────────

export const roles: Rol[] = [
  { id: 'rol-tt', clave: 'think_tank', nombre: 'Think Tank', descripcion: 'Tanque de pensamiento y gobernanza' },
  { id: 'rol-prov', clave: 'proveedor', nombre: 'Proveedor', descripcion: 'Proveedores de experiencias y servicios turísticos' },
  { id: 'rol-medio', clave: 'medio', nombre: 'Medio', descripcion: 'Medios de comunicación y distribuidores de contenido' },
  { id: 'rol-destino', clave: 'destino', nombre: 'Destino', descripcion: 'Ente gestor de destino turístico' },
];

// ─── NODOS ─────────────────────────────────────────────────────────────────

export const nodos: Nodo[] = [
  { id: 'nodo-001', nombre: 'Patronato de Madrid',          rolId: 'rol-destino', reputacion: 98, verificado: true },
  { id: 'nodo-002', nombre: 'Think Tank',                   rolId: 'rol-tt',      reputacion: 98, verificado: true },
  { id: 'nodo-003', nombre: 'Hotel Madrid',                 rolId: 'rol-prov',    reputacion: 85, verificado: true },
  { id: 'nodo-004', nombre: 'Blog de Viajes',               rolId: 'rol-medio',   reputacion: 90, verificado: true },
  { id: 'nodo-005', nombre: 'Asociación Hotelera España',   rolId: 'rol-prov',    reputacion: 88, verificado: true },
  { id: 'nodo-006', nombre: 'Revista Digital Turismo',      rolId: 'rol-medio',   reputacion: 82, verificado: true },
];

export const pixelEstados: Record<string, 'activo' | 'sin-senal' | 'pendiente'> = {
  'nodo-001': 'activo',
  'nodo-002': 'activo',
  'nodo-003': 'activo',
  'nodo-004': 'activo',
  'nodo-005': 'activo',
  'nodo-006': 'activo',
};

// ─── ARISTAS (relaciones bilaterales) ──────────────────────────────────────

export const aristas: Arista[] = [
  { id: 'ari-01', nodoOrigenId: 'nodo-001', nodoDestinoId: 'nodo-002', tipo: 'marco',        estado: 'Activo',      fechaVigencia: hace(8, 'meses') },
  { id: 'ari-02', nodoOrigenId: 'nodo-001', nodoDestinoId: 'nodo-003', tipo: 'distribucion',  estado: 'Activo',      fechaVigencia: hace(5, 'meses') },
  { id: 'ari-03', nodoOrigenId: 'nodo-001', nodoDestinoId: 'nodo-004', tipo: 'distribucion',  estado: 'Activo',      fechaVigencia: hace(6, 'meses') },
  { id: 'ari-04', nodoOrigenId: 'nodo-001', nodoDestinoId: 'nodo-005', tipo: 'marco',         estado: 'Propuesto',   fechaVigencia: hace(2, 'meses') },
  { id: 'ari-05', nodoOrigenId: 'nodo-001', nodoDestinoId: 'nodo-006', tipo: 'publicacion',   estado: 'Activo',      fechaVigencia: hace(3, 'meses') },
  { id: 'ari-06', nodoOrigenId: 'nodo-002', nodoDestinoId: 'nodo-003', tipo: 'distribucion',  estado: 'Activo',      fechaVigencia: hace(4, 'meses') },
  { id: 'ari-07', nodoOrigenId: 'nodo-003', nodoDestinoId: 'nodo-004', tipo: 'distribucion',  estado: 'En revisión', fechaVigencia: hace(1, 'meses') },
];

// ─── OFERTAS ───────────────────────────────────────────────────────────────

export const ofertas: Oferta[] = [
  {
    id: 'ofe-001',
    nodoId: 'nodo-001',
    titulo: 'Tour Gastronómico Madrid',
    territorio: 'Madrid, España',
    comision: 15,
    estado: 'activa',
    pixelOk: true,
    imageUrl: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=800&q=80',
    imageAlt: 'Tour de tapas por Madrid',
    descripcion: 'Recorre los bares más auténticos del centro histórico y descubre la cultura de las tapas junto a guías locales expertos.',
    meta: { duration: '3h', location: 'Madrid', audience: 'Amigos' },
    aiInsight: 'Pensamos que podrás disfrutar de un ambiente agradable y acogedor, ideal para tu perfil de viajero social.',
    review: { text: 'Una fiesta de sabores', stars: 5 },
    tags: [{ label: 'Gastronomía', bg: '#2563EB' }, { label: 'Conexión', bg: '#16A34A' }],
  },
  {
    id: 'ofe-002',
    nodoId: 'nodo-003',
    titulo: 'Estancia Premium – Hotel Madrid',
    territorio: 'Madrid, España',
    comision: 18,
    estado: 'activa',
    pixelOk: true,
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    imageAlt: 'Senderismo en los Pirineos',
    descripcion: 'Una ruta de montaña espectacular con panorámicas únicas de los picos pirenaicos.',
    meta: { duration: '8h', location: 'Pirineos', audience: 'Exploradores' },
    aiInsight: 'Basándonos en tus preferencias de actividad física y naturaleza, esta ruta encaja perfectamente con tu estilo de viaje.',
    review: { text: 'Vistas inolvidables', stars: 5 },
    tags: [{ label: 'Aventura', bg: '#15803D' }, { label: 'Naturaleza', bg: '#EA580C' }],
  },
  {
    id: 'ofe-003',
    nodoId: 'nodo-002',
    titulo: 'Informe Tendencias 2026',
    territorio: 'Global',
    comision: 12,
    estado: 'activa',
    pixelOk: true,
    imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80',
    imageAlt: 'Recorrido por el Gótico de Barcelona',
    descripcion: 'Un paseo por los callejones medievales de Barcelona, con visitas a iglesias, plazas y rincones secretos.',
    meta: { duration: '4h', location: 'Barcelona', audience: 'Curiosos' },
    aiInsight: 'Tu interés por la arquitectura y la historia hacen que este recorrido sea una elección casi perfecta para ti.',
    review: { text: 'Mágico y revelador', stars: 5 },
    tags: [{ label: 'Cultura', bg: '#C026D3' }, { label: 'Historia', bg: '#7C3AED' }],
  },
  {
    id: 'ofe-004',
    nodoId: 'nodo-004',
    titulo: 'Paquete Newsletter + Post Patrocinado',
    territorio: 'España',
    comision: 10,
    estado: 'activa',
    pixelOk: true,
  },
];

// ─── DISTRIBUCIONES ────────────────────────────────────────────────────────

export const distribuciones: Distribucion[] = [
  { id: 'dist-001', ofertaId: 'ofe-001', nodoDistribuidorId: 'nodo-001', fechaAceptacion: hace(4, 'meses') },
  { id: 'dist-002', ofertaId: 'ofe-002', nodoDistribuidorId: 'nodo-001', fechaAceptacion: hace(3, 'meses') },
  { id: 'dist-003', ofertaId: 'ofe-003', nodoDistribuidorId: 'nodo-001', fechaAceptacion: hace(2, 'meses') },
  { id: 'dist-004', ofertaId: 'ofe-004', nodoDistribuidorId: 'nodo-001', fechaAceptacion: hace(2, 'meses') },
  { id: 'dist-005', ofertaId: 'ofe-001', nodoDistribuidorId: 'nodo-004', fechaAceptacion: hace(3, 'meses') },
  { id: 'dist-006', ofertaId: 'ofe-002', nodoDistribuidorId: 'nodo-004', fechaAceptacion: hace(1, 'meses') },
];

// ─── LLEGADAS (representación agregada + últimas N detalladas) ─────────────
// No materializamos 3842 objetos. Guardamos conteos por distribución.

export interface LlegadaAgregada {
  distribucionId: string;
  totalClics: number;
}

export const llegadasAgregadas: LlegadaAgregada[] = [
  { distribucionId: 'dist-001', totalClics: 1620 },
  { distribucionId: 'dist-002', totalClics: 890  },
  { distribucionId: 'dist-003', totalClics: 540  },
  { distribucionId: 'dist-004', totalClics: 320  },
  { distribucionId: 'dist-005', totalClics: 310  },
  { distribucionId: 'dist-006', totalClics: 162  },
];

/** Total de llegadas para el nodo actual */
export function totalLlegadasNodo(nodoId: string): number {
  const distIds = distribuciones
    .filter(d => d.nodoDistribuidorId === nodoId)
    .map(d => d.id);
  return llegadasAgregadas
    .filter(l => distIds.includes(l.distribucionId))
    .reduce((sum, l) => sum + l.totalClics, 0);
}

// ─── VENTAS ────────────────────────────────────────────────────────────────

export const ventas: Venta[] = [
  // === Tour Gastronómico Madrid (dist-001): 14 ventas firmes ===
  { id: 'vta-001', llegadaId: 'dist-001', monto: 65,  estado: 'firme',  fecha: hace(22, 'dias') },
  { id: 'vta-002', llegadaId: 'dist-001', monto: 65,  estado: 'firme',  fecha: hace(20, 'dias') },
  { id: 'vta-003', llegadaId: 'dist-001', monto: 75,  estado: 'firme',  fecha: hace(18, 'dias') },
  { id: 'vta-004', llegadaId: 'dist-001', monto: 55,  estado: 'firme',  fecha: hace(16, 'dias') },
  { id: 'vta-005', llegadaId: 'dist-001', monto: 65,  estado: 'firme',  fecha: hace(14, 'dias') },
  { id: 'vta-006', llegadaId: 'dist-001', monto: 70,  estado: 'firme',  fecha: hace(12, 'dias') },
  { id: 'vta-007', llegadaId: 'dist-001', monto: 60,  estado: 'firme',  fecha: hace(11, 'dias') },
  { id: 'vta-008', llegadaId: 'dist-001', monto: 65,  estado: 'firme',  fecha: hace(9, 'dias') },
  { id: 'vta-009', llegadaId: 'dist-001', monto: 80,  estado: 'firme',  fecha: hace(8, 'dias') },
  { id: 'vta-010', llegadaId: 'dist-001', monto: 65,  estado: 'firme',  fecha: hace(7, 'dias') },
  { id: 'vta-011', llegadaId: 'dist-001', monto: 55,  estado: 'firme',  fecha: hace(5, 'dias') },
  { id: 'vta-012', llegadaId: 'dist-001', monto: 70,  estado: 'firme',  fecha: hace(4, 'dias') },
  { id: 'vta-013', llegadaId: 'dist-001', monto: 65,  estado: 'firme',  fecha: hace(2, 'dias') },
  { id: 'vta-014', llegadaId: 'dist-001', monto: 60,  estado: 'firme',  fecha: hace(1, 'dias') },

  // === Estancia Premium Hotel Madrid (dist-002): 6 ventas firmes ===
  { id: 'vta-015', llegadaId: 'dist-002', monto: 180, estado: 'firme',  fecha: hace(19, 'dias') },
  { id: 'vta-016', llegadaId: 'dist-002', monto: 210, estado: 'firme',  fecha: hace(15, 'dias') },
  { id: 'vta-017', llegadaId: 'dist-002', monto: 195, estado: 'firme',  fecha: hace(10, 'dias') },
  { id: 'vta-018', llegadaId: 'dist-002', monto: 220, estado: 'firme',  fecha: hace(6, 'dias') },
  { id: 'vta-019', llegadaId: 'dist-002', monto: 190, estado: 'firme',  fecha: hace(3, 'dias') },
  { id: 'vta-020', llegadaId: 'dist-002', monto: 200, estado: 'firme',  fecha: hace(1, 'dias') },

  // === Informe Tendencias 2026 (dist-003): 3 ventas firmes ===
  { id: 'vta-021', llegadaId: 'dist-003', monto: 85,  estado: 'firme',  fecha: hace(17, 'dias') },
  { id: 'vta-022', llegadaId: 'dist-003', monto: 85,  estado: 'firme',  fecha: hace(8, 'dias') },
  { id: 'vta-023', llegadaId: 'dist-003', monto: 85,  estado: 'firme',  fecha: hace(2, 'dias') },

  // === Anuladas ===
  { id: 'vta-024', llegadaId: 'dist-001', monto: 65,  estado: 'anulada', fecha: hace(13, 'dias') },
  { id: 'vta-025', llegadaId: 'dist-002', monto: 190, estado: 'anulada', fecha: hace(6, 'dias') },
];

// ─── LOTES DE TOKENS ───────────────────────────────────────────────────────

export const lotes: Lote[] = [
  { id: 'LOT-001', origen: 'Saldo Base',  cantidad: 750,  caducidad: hace(9, 'meses') },   // ya caducado → 0 saldo
  { id: 'LOT-002', origen: 'Compra',      cantidad: 500,  caducidad: dentro(8, 'meses') },
  { id: 'LOT-003', origen: 'Recompensa',  cantidad: 100,  caducidad: dentro(15, 'dias') },  // caduca pronto
  { id: 'LOT-004', origen: 'Compra',      cantidad: 350,  caducidad: dentro(5, 'meses') },
];

// ─── MOVIMIENTOS ───────────────────────────────────────────────────────────

export const movimientos: Movimiento[] = [
  { id: 'TX-0041', loteId: 'LOT-002', delta: +500, descripcion: 'Compra de Paquete Estándar',      fecha: hace(15, 'dias') },
  { id: 'TX-0042', loteId: undefined,  delta: -15,  descripcion: 'Reserva para Oferta Tour Madrid',  fecha: hace(13, 'dias') },
  { id: 'TX-0043', loteId: undefined,  delta: +50,  descripcion: 'Liberación por Venta Anulada',     fecha: hace(11, 'dias') },
  { id: 'TX-0044', loteId: undefined,  delta: -30,  descripcion: 'Reserva para Oferta Hotel Madrid', fecha: hace(7, 'dias') },
  { id: 'TX-0045', loteId: undefined,  delta: +200, descripcion: 'Recompensa por Acuerdo Marco',     fecha: hace(5, 'dias') },
];

// ─── CONTACTOS ─────────────────────────────────────────────────────────────

export const contactos: Contacto[] = [
  {
    id: 'wa_+34612345678', nombre: 'Laura González',
    canal: 'WhatsApp', tags: ['VIP', 'Gastronomía'],
    ultimaInteraccion: hace(2, 'horas'), ltv: 450, consentimiento: true,
  },
  {
    id: 'ig_viajero_madrid', nombre: 'Carlos Mendoza',
    canal: 'Instagram', tags: ['Aventura', 'Senderismo'],
    ultimaInteraccion: hace(18, 'horas'), ltv: 1200, consentimiento: true,
  },
  {
    id: 'wa_+34698765432', nombre: 'Beatriz Santos',
    canal: 'WhatsApp', tags: ['Familia', 'Sol y Playa'],
    ultimaInteraccion: hace(3, 'dias'), ltv: 890, consentimiento: false,
  },
  {
    id: 'tg_elena_rot', nombre: 'Elena Rotger',
    canal: 'Telegram', tags: ['Negocios/MICE'],
    ultimaInteraccion: hace(0, 'horas'), ltv: 1650, consentimiento: true,
  },
  {
    id: 'wa_+34655443322', nombre: 'Javier Vidal',
    canal: 'WhatsApp', tags: ['Bienestar', 'Rural'],
    ultimaInteraccion: hace(5, 'dias'), ltv: 320, consentimiento: true,
  },
  {
    id: 'web_sess_8941', nombre: 'Visitante Web #8941',
    canal: 'Webchat', tags: ['Nuevo Prospecto'],
    ultimaInteraccion: hace(4, 'horas'), ltv: 0, consentimiento: false,
  },
];

// ─── MIEMBROS DE RED ───────────────────────────────────────────────────────

export const miembros: Miembro[] = [
  {
    id: 'mb-001', contactoId: 'wa_+34612345678',
    contribucion: 'Venta confirmada – Tour Madrid',
    recompensa: 25, finCompensacion: dentro(87, 'dias'),
  },
  {
    id: 'mb-002', contactoId: 'ig_viajero_madrid',
    contribucion: 'Referido a Hotel Madrid',
    recompensa: 15, finCompensacion: dentro(85, 'dias'),
  },
  {
    id: 'mb-003', contactoId: 'wa_+34698765432',
    contribucion: 'Venta confirmada – Paquete VIP',
    recompensa: 40, finCompensacion: dentro(88, 'dias'),
  },
];

// ─── ENCARGOS ──────────────────────────────────────────────────────────────

export const encargos: Encargo[] = [
  {
    id: 'ENC-001', tipo: 'recibido',
    contraparte: 'Patronato de Turismo de Madrid',
    formato: 'Artículo Patrocinado', tarifa: 150,
    estado: 'Pendiente de Prueba',
  },
  {
    id: 'ENC-002', tipo: 'recibido',
    contraparte: 'Asociación Hotelera España',
    formato: 'Reseña de Destino', tarifa: 80,
    estado: 'Comprobada (Pendiente de Liquidación)',
  },
  {
    id: 'SOL-001', tipo: 'solicitado',
    contraparte: 'Blog de Viajes Sur',
    formato: 'Artículo Patrocinado', tarifa: 120,
    estado: 'En revisión',
  },
  {
    id: 'SOL-002', tipo: 'solicitado',
    contraparte: 'Revista Digital Turismo',
    formato: 'Newsletter Destacado', tarifa: 90,
    estado: 'Aceptado',
  },
];

// ─── PUBLICACIONES (Catálogo Think Tank) ───────────────────────────────────

export const publicaciones: Publicacion[] = [
  {
    id: 'pub-001', titulo: 'Misión Internacional', badge: 'Evento',
    descripcion: 'Participación en la próxima misión comercial a Asia.',
    precio: 2500, icono: 'globe',
  },
  {
    id: 'pub-002', titulo: 'Panel de Expertos', badge: 'Consultoría',
    descripcion: 'Mesa redonda privada para auditar la estrategia de tu destino.',
    precio: 1200, icono: 'users',
  },
  {
    id: 'pub-003', titulo: 'Informe Sectorial a Medida', badge: 'Inteligencia',
    descripcion: 'Análisis profundo de un mercado emisor específico.',
    precio: 800, icono: 'fileText',
  },
];

// ─── ALERTAS ───────────────────────────────────────────────────────────────

export const alertas: Alerta[] = [
  {
    id: 1, tipo: 'warning',
    titulo: 'Comisión modificada',
    cuerpo: 'Hotel Madrid ha modificado su comisión del 10% → 8%. Se requiere reaceptación para continuar distribuyendo.',
    cta: 'Revisar', estado: 'pending',
  },
  {
    id: 2, tipo: 'info',
    titulo: 'Encargo pendiente',
    cuerpo: 'Patronato de Turismo de Madrid espera tu prueba de publicación para \'Artículo Patrocinado\'.',
    cta: 'Subir prueba', estado: 'pending',
  },
  {
    id: 3, tipo: 'success',
    titulo: 'Acuerdo renovado',
    cuerpo: 'Tu acuerdo marco con Think Tank ha sido renovado automáticamente por 12 meses.',
    cta: 'Ver acuerdo', estado: 'resolved',
  },
];

// ─── DATOS DE CHARTS (generados relativamente) ────────────────────────────

/** Evolución de ventas atribuidas — últimos 6 meses */
export function generarChartVentas(): { mes: string; ventas: number }[] {
  const meses = ['es-ES'];
  const data: { mes: string; ventas: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = hace(i, 'meses');
    const label = d.toLocaleDateString('es-ES', { month: 'short' }).replace('.', '');
    const capitalizado = label.charAt(0).toUpperCase() + label.slice(1);
    // Simular crecimiento progresivo
    const base = [18, 24, 31, 29, 38, 45];
    data.push({ mes: capitalizado, ventas: base[5 - i] });
  }
  return data;
}

/** Crecimiento de demanda por segmento */
export const chartSegmentos = [
  { segmento: 'Gastronomía', valor: 85 },
  { segmento: 'Cultura',     valor: 60 },
  { segmento: 'Naturaleza',  valor: 45 },
  { segmento: 'Bienestar',   valor: 30 },
];

/** Interacciones por canal — últimos 7 días */
export const chartInteracciones = [
  { day: 'Lun', whatsapp: 420,  instagram: 240 },
  { day: 'Mar', whatsapp: 560,  instagram: 310 },
  { day: 'Mié', whatsapp: 610,  instagram: 390 },
  { day: 'Jue', whatsapp: 780,  instagram: 480 },
  { day: 'Vie', whatsapp: 890,  instagram: 560 },
  { day: 'Sáb', whatsapp: 1050, instagram: 720 },
  { day: 'Dom', whatsapp: 940,  instagram: 650 },
];

// ─── MÉTRICAS DERIVADAS DEL WORKSPACE ──────────────────────────────────────

export const workspaceMetricas = {
  totalContactos: contactos.length,           // Para la PoC, la lista visible
  totalContactosRed: 12_450,                  // Total teórico en la red completa
  tasaRespuestaIA: 94,
  conversacionesActivas: 342,
  resolucionPrimerContacto: 88,
  capacidadMensajeria: 98.6,
  tokensIAConsumidos: 1_840,
  slaCanal: 99.98,
  contactosAlcanzados: 3_984,
  ejecucionesBienvenida: 1_240,
  ejecucionesRecuperacion: 487,
  contactosExcluidosFrecuencia: 145,
  interaccionesAgenteDia: 47,
};
