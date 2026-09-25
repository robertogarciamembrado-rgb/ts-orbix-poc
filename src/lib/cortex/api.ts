/**
 * TS Orbix — Capa de Acceso tipo API (simulada)
 *
 * REGLA: Los componentes SOLO importan de este archivo, NUNCA de seed.ts.
 * Cada función es asíncrona y simula latencia de red con un pequeño delay.
 */

import {
  CURRENT_NODE_ID,
  type Nodo, type Arista, type Oferta, type Venta, type Lote,
  type Movimiento, type Contacto, type Miembro, type Encargo,
  type Publicacion, type Alerta,
  nodos, aristas, ofertas, distribuciones, ventas, lotes, movimientos,
  contactos, miembros, encargos, publicaciones, alertas,
  totalLlegadasNodo, generarChartVentas, chartSegmentos, chartInteracciones, llegadasAgregadas,
  pixelEstados,
  workspaceMetricas, roles,
} from './seed';
import { diasHasta, nombreMesAnio } from '@/lib/utils/time';

export type Periodo = 'mes' | 'trimestre';

export interface CortexContext {
  nodeId: string;
  periodo: Periodo;
}

let cortexContext: CortexContext = { nodeId: 'nodo-003', periodo: 'mes' };
const acceptedCommissions: Record<string, number> = { 'dist-005': 18 };
const finalizedDistributions = new Set<string>();

export function setCortexContext(context: CortexContext): void {
  cortexContext = context;
}

export function getCortexContext(): CortexContext {
  return cortexContext;
}

export function getPeriodoLabel(periodo = cortexContext.periodo): string {
  return periodo === 'trimestre' ? 'Último trimestre' : nombreMesAnio(new Date());
}

function ventasEnPeriodo(ventasNodo: Venta[], periodo = cortexContext.periodo): Venta[] {
  const days = periodo === 'trimestre' ? 90 : 30;
  const since = new Date();
  since.setDate(since.getDate() - days);
  return ventasNodo.filter(venta => venta.fecha >= since);
}

function llegadasEnPeriodo(nodeId: string, periodo = cortexContext.periodo): number {
  const base = totalLlegadasNodo(nodeId);
  return periodo === 'trimestre' ? base : Math.round(base / 3);
}

// ─── Delay helper ──────────────────────────────────────────────────────────

function delay(ms: number = 180): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── Tipos de respuesta ────────────────────────────────────────────────────

export interface SaldoResponse {
  disponible: number;
  enReserva: number;
  caducaEsteMes: number;
  diasParaCaducidad: number | null;
  lotes: Lote[];
}

export interface ResultadosResponse {
  periodo: string;
  llegadas: number;
  ventasFirmes: number;
  ventasAnuladas: number;
  publicacionesComprobadas: number;
  brutoCobrar: number;
  bonoPct: number;
  tokenEquivalente: number;
  creditosConsumidos: number;
  miembros: Miembro[];
}

export interface OfertasResponse {
  propias: Oferta[];
  catalogo: (Oferta & { provider: string })[];
}

export interface PixelMetricsResponse {
  estado: 'activo' | 'sin-senal' | 'pendiente';
  ultimaSenal: Date | null;
  llegadasHoy: number;
  ultimaVenta: Date | null;
  conversion: number;
}

export interface AnalyticsFunnelResponse {
  llegadas: number;
  ventasRegistradas: number;
  anuladas: number;
  firmes: number;
  liquidado: number;
}

export interface OfferInsightContext {
  offerId: string;
  offerTitle: string;
  interest: string;
  matchingContacts: number;
  estimatedMonthlySales: number;
  projectedMonthlyCommission: number;
  offeredCommission: number;
  habitualConversion: number;
}

export interface DashboardResponse {
  reputacion: number;
  tokensDisponibles: number;
  loteMasProximoCaducar: number;
  acuerdosActivos: number;
  acuerdosEnRevision: number;
  ventasAtribuidas: number;
  pctVsAnterior: number;
  periodo: string;
}

export interface TopOfertaItem {
  id: string;
  title: string;
  provider: string;
  sales: number;
  commission: number;
  trend: number;
}

export interface EspacioDashboardResponse {
  totalContactos: string;
  tasaRespuestaIA: string;
  conversacionesActivas: string;
  resolucionPrimerContacto: string;
  capacidadMensajeria: number;
  tokensIAConsumidos: number;
  slaCanal: number;
  contactosAlcanzados: number;
  limiteSeguro: number;
  ejecucionesBienvenida: number;
  ejecucionesRecuperacion: number;
  contactosExcluidosFrecuencia: number;
  interaccionesAgenteDia: number;
  conversacionesAtendidas: number;
  contactosNuevosPorCanal: { canal: string; total: number }[];
  topeFrecuenciaConsumido: number;
  topeFrecuencia: number;
}

export interface GrafoResponse {
  nodos: (Nodo & { rolNombre: string })[];
  aristas: Arista[];
  pesos: Record<string, number>;
}

export interface EncargosResponse {
  publicaciones: Encargo[];
  solicitados: Encargo[];
}

export interface DistribucionResponse {
  id: string;
  ofertaId: string;
  nodoDistribuidorId: string;
  fechaAceptacion: Date;
  oferta?: Oferta;
  distribuidor?: Nodo;
  comisionAceptada: number;
  llegadasHistoricas: number;
  ventasHistoricas: number;
  pendienteReaceptacion: boolean;
}

export interface ContactSegmentInsight {
  observation: string;
  proposal: string;
  reason: string;
  label: string;
}

export interface PresupuestoAgenteResponse {
  consumido: number;
  tope: number;
  detenido: boolean;
}

export interface NodoAsistidoResponse {
  id: string;
  nombre: string;
  ultimoInformeEnviado: Date;
  encargosPendientes: number;
}

export interface VigilanteSubscriptionResponse {
  activa: boolean;
  costeMensual: number;
  proximaRenovacion: Date | null;
}

export interface ConvocatoriaAlerta {
  id: string;
  titulo: string;
  plazo: Date;
  encaje: string;
}

export interface VentaResultado extends Venta {
  ofertaTitulo: string;
  comisionPactada: number;
  ventanaAnulacionHasta: Date;
  anulable: boolean;
}

export interface ComisionEfectivaResponse {
  declarada: number;
  efectiva: number;
  ventasFirmes: number;
}

let suscripcionVigilante: VigilanteSubscriptionResponse = { activa: false, costeMensual: 500, proximaRenovacion: null };
const movimientosSesion: Movimiento[] = [];

// ─── Funciones API ─────────────────────────────────────────────────────────

/** KPIs principales del dashboard del nodo. */
export async function getDashboard(): Promise<DashboardResponse> {
  await delay();

  const { nodeId, periodo } = getCortexContext();
  const nodo = nodos.find(n => n.id === nodeId)!;
  const acuerdos = aristas.filter(
    a => a.nodoOrigenId === nodeId || a.nodoDestinoId === nodeId
  );
  const activos = acuerdos.filter(a => a.estado === 'Activo').length;
  const enRevision = acuerdos.filter(a => a.estado === 'Propuesto' || a.estado === 'En revisión').length;

  // Ventas atribuidas para el nodo y periodo seleccionados.
  const distIds = distribuciones
    .filter(d => d.nodoDistribuidorId === nodeId)
    .map(d => d.id);
  const ventasNodo = ventasEnPeriodo(ventas.filter(v => distIds.includes(v.llegadaId)), periodo);
  const firmes = ventasNodo.filter(v => v.estado === 'firme').length;

  // Saldo disponible de tokens
  const ahora = new Date();
  const lotesVigentes = lotes.filter(l => l.caducidad > ahora);
  const saldoDisponible = lotesVigentes.reduce((s, l) => s + l.cantidad, 0);

  // Lote más próximo a caducar
  const lotesOrdenados = [...lotesVigentes].sort((a, b) => a.caducidad.getTime() - b.caducidad.getTime());
  const loteMasCercano = lotesOrdenados[0]?.cantidad ?? 0;

  return {
    reputacion: nodo.reputacion,
    tokensDisponibles: saldoDisponible,
    loteMasProximoCaducar: loteMasCercano,
    acuerdosActivos: activos,
    acuerdosEnRevision: enRevision,
    ventasAtribuidas: firmes,
    pctVsAnterior: 14,
    periodo: getPeriodoLabel(periodo),
  };
}

/** Alertas y tareas pendientes. */
export async function getAlertas(): Promise<Alerta[]> {
  await delay();
  return [...alertas];
}

/** Top ofertas distribuidas (por ventas en el periodo). */
export async function getTopOfertas(): Promise<TopOfertaItem[]> {
  await delay();

  const nodeId = getCortexContext().nodeId;
  const distIds = distribuciones
    .filter(d => d.nodoDistribuidorId === nodeId)
    .map(d => d.id);

  // Agrupar ventas firmes por distribución → oferta
  const ventasPorOferta = new Map<string, { sales: number; oferta: Oferta; dist: typeof distribuciones[0] }>();
  for (const v of ventas) {
    if (v.estado !== 'firme') continue;
    if (!distIds.includes(v.llegadaId)) continue;
    const dist = distribuciones.find(d => d.id === v.llegadaId);
    if (!dist) continue;
    const oferta = ofertas.find(o => o.id === dist.ofertaId);
    if (!oferta) continue;
    const key = oferta.id;
    const existing = ventasPorOferta.get(key);
    if (existing) {
      existing.sales++;
    } else {
      ventasPorOferta.set(key, { sales: 1, oferta, dist });
    }
  }

  // Ordenar por ventas desc
  const sorted = [...ventasPorOferta.values()]
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 3);

  return sorted.map(({ sales, oferta }, idx) => {
    const nodoProveedor = nodos.find(n => n.id === oferta.nodoId);
    const isOwn = oferta.nodoId === nodeId;
    return {
      id: oferta.id,
      title: oferta.titulo,
      provider: isOwn ? 'Propia' : (nodoProveedor?.nombre ?? 'Desconocido'),
      sales,
      commission: oferta.comision,
      trend: idx === 0 ? 3 : idx === 1 ? 1 : 0,
    };
  });
}

/** Saldo y tokens del nodo. */
export async function getSaldo(): Promise<SaldoResponse> {
  await delay();

  const ahora = new Date();
  const vigentes = lotes.filter(l => l.caducidad > ahora);
  const disponible = vigentes.reduce((s, l) => s + l.cantidad, 0) + movimientosSesion.reduce((s, movimiento) => s + movimiento.delta, 0);

  // Créditos reservados o consumidos que aún figuran en el ledger.
  const enReserva = Math.abs(
    [...movimientos, ...movimientosSesion].filter(m => m.delta < 0).reduce((s, m) => s + m.delta, 0)
  );

  // Caduca este mes (30 días)
  const caducaEsteMes = vigentes
    .filter(l => diasHasta(l.caducidad) <= 30)
    .reduce((s, l) => s + l.cantidad, 0);
  const diasParaCaducidad = vigentes.length
    ? Math.min(...vigentes.map(l => diasHasta(l.caducidad)))
    : null;

  return { disponible, enReserva, caducaEsteMes, diasParaCaducidad, lotes };
}

/** Lotes de créditos. */
export async function getLotes(): Promise<Lote[]> {
  await delay();
  return [...lotes];
}

/** Movimientos inmutables. */
export async function getMovimientos(): Promise<Movimiento[]> {
  await delay();
  return [...movimientos, ...movimientosSesion].sort((a, b) => b.fecha.getTime() - a.fecha.getTime());
}

export async function getSuscripcionVigilante(): Promise<VigilanteSubscriptionResponse> {
  await delay(80);
  return { ...suscripcionVigilante };
}

export async function activarSuscripcionVigilante(): Promise<VigilanteSubscriptionResponse> {
  await delay(120);
  if (!suscripcionVigilante.activa) {
    suscripcionVigilante = { activa: true, costeMensual: 500, proximaRenovacion: new Date(Date.now() + 30 * 86400000) };
    movimientosSesion.unshift({ id: `SUB-${Date.now()}`, delta: -500, descripcion: 'Suscripción mensual AVIA Vigilante', fecha: new Date() });
  }
  return { ...suscripcionVigilante };
}

export async function getConvocatoriasVigilante(): Promise<ConvocatoriaAlerta[]> {
  await delay(100);
  return [
    { id: 'conv-001', titulo: 'Ayuda a la digitalización de PYME turística', plazo: new Date(Date.now() + 12 * 86400000), encaje: 'Aplica a tu nodo por estar registrado como PYME turística y operar experiencias digitales.' },
    { id: 'conv-002', titulo: 'Convocatoria de promoción internacional 2026', plazo: new Date(Date.now() + 21 * 86400000), encaje: 'Encaja porque tu nodo comercializa experiencias turísticas para audiencias fuera de su territorio.' },
  ];
}

function ventasDelNodo(nodeId: string): Venta[] {
  const esProveedor = roles.find(role => role.id === nodos.find(nodo => nodo.id === nodeId)?.rolId)?.clave === 'proveedor';
  const distIds = distribuciones
    .filter(distribucion => esProveedor ? ofertas.find(oferta => oferta.id === distribucion.ofertaId)?.nodoId === nodeId : distribucion.nodoDistribuidorId === nodeId)
    .map(distribucion => distribucion.id);
  return ventas.filter(venta => distIds.includes(venta.llegadaId));
}

/** Ventas visibles para el nodo, con ventana operativa de anulación de siete días. */
export async function getVentasResultados(): Promise<VentaResultado[]> {
  await delay(100);
  return ventasEnPeriodo(ventasDelNodo(getCortexContext().nodeId)).map(venta => {
    const distribucion = distribuciones.find(item => item.id === venta.llegadaId);
    const oferta = ofertas.find(item => item.id === distribucion?.ofertaId);
    const ventanaAnulacionHasta = new Date(venta.fecha.getTime() + 7 * 86400000);
    return { ...venta, ofertaTitulo: oferta?.titulo ?? 'Oferta', comisionPactada: oferta?.comision ?? 0, ventanaAnulacionHasta, anulable: venta.estado === 'firme' && ventanaAnulacionHasta > new Date() };
  });
}

export async function anularVenta(ventaId: string, referenciaPedido: string, motivo: string): Promise<void> {
  await delay(120);
  if (!referenciaPedido.trim() || !motivo.trim()) throw new Error('Indica la referencia del pedido y el motivo de anulación.');
  const venta = ventas.find(item => item.id === ventaId);
  if (!venta) throw new Error('Venta no encontrada.');
  const limite = new Date(venta.fecha.getTime() + 7 * 86400000);
  if (venta.estado !== 'firme' || limite <= new Date()) throw new Error('La ventana de anulación ha finalizado.');
  venta.estado = 'anulada';
  const distribucion = distribuciones.find(item => item.id === venta.llegadaId);
  const oferta = ofertas.find(item => item.id === distribucion?.ofertaId);
  const liberacion = Math.max(1, Math.round(venta.monto * (oferta?.comision ?? 0) / 100));
  movimientosSesion.unshift({ id: `LIB-${Date.now()}`, delta: liberacion, descripcion: `Liberación por anulación ${referenciaPedido}: ${motivo}`, fecha: new Date() });
}

export async function getComisionEfectiva(): Promise<ComisionEfectivaResponse> {
  await delay(100);
  const nodeId = getCortexContext().nodeId;
  const ventasFirmes = ventasDelNodo(nodeId).filter(venta => venta.estado === 'firme');
  const ofertasNodo = ofertas.filter(oferta => oferta.nodoId === nodeId || distribuciones.some(distribucion => distribucion.nodoDistribuidorId === nodeId && distribucion.ofertaId === oferta.id));
  const declarada = ofertasNodo.length ? ofertasNodo.reduce((total, oferta) => total + oferta.comision, 0) / ofertasNodo.length : 0;
  const importeVendido = ventasFirmes.reduce((total, venta) => total + venta.monto, 0);
  const comisiones = ventasFirmes.reduce((total, venta) => {
    const distribucion = distribuciones.find(item => item.id === venta.llegadaId);
    return total + venta.monto * ((ofertas.find(item => item.id === distribucion?.ofertaId)?.comision ?? 0) / 100);
  }, 0);
  return { declarada: Number(declarada.toFixed(1)), efectiva: importeVendido ? Number(((comisiones / importeVendido) * 100).toFixed(1)) : 0, ventasFirmes: ventasFirmes.length };
}

/** Resultados y liquidación del periodo. */
export async function getResultados(): Promise<ResultadosResponse> {
  await delay();

  const { nodeId, periodo } = getCortexContext();
  const ventasNodo = ventasEnPeriodo(ventasDelNodo(nodeId), periodo);
  const firmes = ventasNodo.filter(v => v.estado === 'firme');
  const anuladas = ventasNodo.filter(v => v.estado === 'anulada');
  const llegadas = llegadasEnPeriodo(nodeId, periodo);

  // Bruto = suma de comisiones sobre montos de ventas firmes
  const brutoCobrar = firmes.reduce((s, v) => {
    const dist = distribuciones.find(d => d.id === v.llegadaId);
    const oferta = dist ? ofertas.find(o => o.id === dist.ofertaId) : undefined;
    const comision = oferta?.comision ?? 0;
    return s + Math.round(v.monto * (comision / 100));
  }, 0);

  const bonoPct = 10;
  const tokenEquivalente = Math.round(brutoCobrar * (1 + bonoPct / 100));
  const creditosConsumidos = Math.abs(
    movimientos.filter(movimiento => movimiento.delta < 0).reduce((total, movimiento) => total + movimiento.delta, 0)
  );

  return {
    periodo: getPeriodoLabel(periodo),
    llegadas,
    ventasFirmes: firmes.length,
    ventasAnuladas: anuladas.length,
    publicacionesComprobadas: publicaciones.length,
    brutoCobrar,
    bonoPct,
    tokenEquivalente,
    creditosConsumidos,
    miembros: [...miembros],
  };
}

/** Perfil activo para adaptar la navegación y las acciones disponibles. */
export async function getPerfilesDemo(): Promise<(Nodo & { rolNombre: string })[]> {
  await delay(60);
  return nodos.filter(nodo => nodo.id === 'nodo-003' || nodo.id === 'nodo-004').map(nodo => ({
    ...nodo,
    rolNombre: roles.find(role => role.id === nodo.rolId)?.nombre ?? 'Sin rol',
  }));
}

export async function getNodoActivo(): Promise<Nodo & { rolNombre: string }> {
  await delay(60);
  const nodo = nodos.find(item => item.id === cortexContext.nodeId);
  if (!nodo) throw new Error('Nodo no encontrado');
  return { ...nodo, rolNombre: roles.find(role => role.id === nodo.rolId)?.nombre ?? 'Sin rol' };
}

/** Ofertas propias y catálogo de distribución. */
export async function getOfertas(): Promise<OfertasResponse> {
  await delay();

  const nodeId = getCortexContext().nodeId;
  const propias = ofertas.filter(o => o.nodoId === nodeId);
  const catalogo = ofertas
    .filter(o => o.nodoId !== nodeId)
    .map(o => {
      const nodo = nodos.find(n => n.id === o.nodoId);
      return { ...o, provider: nodo?.nombre ?? 'Desconocido' };
    });

  return { propias, catalogo };
}

/** Estado operativo del píxel y métricas de atribución del nodo. */
export async function getPixelMetrics(): Promise<PixelMetricsResponse> {
  await delay(120);

  const nodeId = getCortexContext().nodeId;
  const distIds = distribuciones
    .filter(d => d.nodoDistribuidorId === nodeId)
    .map(d => d.id);
  const ventasNodo = ventas.filter(v => distIds.includes(v.llegadaId));
  const llegadas = totalLlegadasNodo(nodeId);
  const ventasRegistradas = ventasNodo.length;
  const ultimaVenta = ventasNodo.reduce<Date | null>(
    (latest, venta) => !latest || venta.fecha > latest ? venta.fecha : latest,
    null
  );

  return {
    estado: pixelEstados[nodeId] ?? 'pendiente',
    ultimaSenal: new Date(Date.now() - 1000 * 60 * 18),
    llegadasHoy: Math.max(1, Math.round(llegadas / 30)),
    ultimaVenta,
    conversion: llegadas === 0 ? 0 : Number(((ventasRegistradas / llegadas) * 100).toFixed(2)),
  };
}

/** Embudo de conversión del período; las ventas se agrupan desde el origen simulado. */
export async function getAnalyticsFunnel(): Promise<AnalyticsFunnelResponse> {
  await delay(120);

  const distIds = distribuciones
    .filter(d => d.nodoDistribuidorId === CURRENT_NODE_ID)
    .map(d => d.id);
  const ventasNodo = ventas.filter(v => distIds.includes(v.llegadaId));
  const firmes = ventasNodo.filter(v => v.estado === 'firme').length;
  const anuladas = ventasNodo.filter(v => v.estado === 'anulada').length;

  return {
    llegadas: totalLlegadasNodo(CURRENT_NODE_ID),
    ventasRegistradas: firmes + anuladas,
    anuladas,
    firmes,
    liquidado: firmes,
  };
}

/** Contexto cuantificado para que un agente sugiera —sin ejecutar— una distribución. */
export async function getOfferInsightContext(offerId: string): Promise<OfferInsightContext> {
  await delay(100);

  const offer = ofertas.find(item => item.id === offerId);
  if (!offer) throw new Error('Oferta no encontrada');

  const interest = offer.tags?.[0]?.label ?? 'viaje';
  const matchingContacts = contactos.filter(
    contact => contact.consentimiento && contact.tags.some(tag => tag.toLocaleLowerCase('es-ES') === interest.toLocaleLowerCase('es-ES'))
  ).length;
  const distIds = distribuciones
    .filter(distribution => distribution.nodoDistribuidorId === CURRENT_NODE_ID)
    .map(distribution => distribution.id);
  const nodeSales = ventas.filter(sale => distIds.includes(sale.llegadaId));
  const habitualConversion = totalLlegadasNodo(CURRENT_NODE_ID) === 0
    ? 0
    : nodeSales.length / totalLlegadasNodo(CURRENT_NODE_ID);
  const offerDistributionIds = distribuciones
    .filter(distribution => distribution.ofertaId === offerId)
    .map(distribution => distribution.id);
  const offerSales = ventas.filter(sale => offerDistributionIds.includes(sale.llegadaId));
  const averageSale = offerSales.length === 0
    ? 100
    : offerSales.reduce((sum, sale) => sum + sale.monto, 0) / offerSales.length;
  const estimatedMonthlySales = Math.max(1, Math.round(matchingContacts * 100 * habitualConversion));

  return {
    offerId,
    offerTitle: offer.titulo,
    interest,
    matchingContacts,
    estimatedMonthlySales,
    projectedMonthlyCommission: Math.round(estimatedMonthlySales * averageSale * (offer.comision / 100)),
    offeredCommission: offer.comision,
    habitualConversion: Number((habitualConversion * 100).toFixed(2)),
  };
}

/** Distribuciones activas del nodo seleccionado. */
export async function getDistribuciones() {
  await delay();
  const nodeId = getCortexContext().nodeId;
  return distribuciones.filter(d => d.nodoDistribuidorId === nodeId && !finalizedDistributions.has(d.id)).map<DistribucionResponse>(d => {
    const oferta = ofertas.find(o => o.id === d.ofertaId);
    const distribuidor = nodos.find(n => n.id === d.nodoDistribuidorId);
    const comisionAceptada = acceptedCommissions[d.id] ?? (oferta?.comision ?? 0);
    const llegadasHistoricas = llegadasAgregadas.find(item => item.distribucionId === d.id)?.totalClics ?? 0;
    const ventasHistoricas = ventas.filter(venta => venta.llegadaId === d.id).length;
    return {
      ...d,
      oferta,
      distribuidor,
      comisionAceptada,
      llegadasHistoricas,
      ventasHistoricas,
      pendienteReaceptacion: (oferta?.comision ?? 0) < comisionAceptada,
    };
  });
}

export async function reaceptarDistribucion(distribucionId: string): Promise<void> {
  await delay(100);
  const distribucion = distribuciones.find(item => item.id === distribucionId);
  if (!distribucion) throw new Error('Distribución no encontrada.');
  const oferta = ofertas.find(item => item.id === distribucion.ofertaId);
  if (!oferta) throw new Error('Oferta no encontrada.');
  acceptedCommissions[distribucionId] = oferta.comision;
}

export async function finalizarDistribucion(distribucionId: string): Promise<void> {
  await delay(100);
  if (!distribuciones.some(item => item.id === distribucionId)) {
    throw new Error('Distribución no encontrada.');
  }
  finalizedDistributions.add(distribucionId);
}

/** Base de datos de contactos del nodo. */
export async function getContactos(): Promise<Contacto[]> {
  await delay();
  return [...contactos];
}

export async function getContactSegmentInsight(): Promise<ContactSegmentInsight> {
  await delay(100);
  return {
    observation: '187 contactos comparten patrón de compra en experiencias de naturaleza.',
    proposal: 'Guardar segmento como etiqueta',
    reason: 'El patrón combina compras de experiencias de naturaleza con interacción reciente y consentimiento activo.',
    label: 'Naturaleza - Alta Intención',
  };
}

export async function saveContactSegmentLabel(label: string): Promise<{ label: string }> {
  await delay(100);
  if (!label.trim()) throw new Error('La etiqueta del segmento no puede estar vacía.');
  return { label: label.trim() };
}

export interface NodeHealthAlert {
  severity: 1 | 2 | 3 | 4;
  title: string;
  detail: string;
  href: string;
  action: string;
}

export function evaluateNodeHealth(input: {
  pixelEstado: PixelMetricsResponse['estado'];
  distribucionesPendientes: number;
  saldoDisponible: number;
  diasParaCaducidad: number | null;
  reputacion: number;
  agenteActivo: boolean;
}): NodeHealthAlert[] {
  const alerts: NodeHealthAlert[] = [];
  if (input.pixelEstado === 'sin-senal') {
    alerts.push({ severity: 1, title: 'Píxel sin señal', detail: 'No se están recibiendo eventos de atribución.', href: '/espacio/canales', action: 'Revisar canales' });
  }
  if (input.distribucionesPendientes > 0) {
    alerts.push({ severity: 2, title: 'Distribuciones pendientes de reaceptación', detail: `${input.distribucionesPendientes} distribución(es) están bloqueadas por un cambio de comisión.`, href: '/cuenta/ofertas', action: 'Revisar condiciones' });
  }
  if (input.saldoDisponible === 0 || (input.diasParaCaducidad !== null && input.diasParaCaducidad < 30)) {
    alerts.push({ severity: 3, title: input.saldoDisponible === 0 ? 'Saldo agotado' : 'Créditos próximos a caducar', detail: input.saldoDisponible === 0 ? 'El nodo no tiene créditos disponibles.' : `Un lote caduca en ${input.diasParaCaducidad} días.`, href: '/cuenta/saldo', action: 'Revisar saldo' });
  }
  if (input.reputacion < 80 || !input.agenteActivo) {
    alerts.push({ severity: 4, title: input.reputacion < 80 ? 'Reputación por debajo de la media' : 'Agente inactivo', detail: input.reputacion < 80 ? 'La reputación requiere una revisión de acuerdos.' : 'El agente no está procesando nuevas recomendaciones.', href: input.reputacion < 80 ? '/cuenta/relaciones' : '/espacio/agentes', action: 'Abrir diagnóstico' });
  }
  return alerts.sort((a, b) => a.severity - b.severity);
}

/** Grafo completo de nodos y aristas para la sección de relaciones. */
export async function getGrafo(): Promise<GrafoResponse> {
  await delay();

  const nodosConRol = nodos.map(n => {
    const rol = roles.find(r => r.id === n.rolId);
    return { ...n, rolNombre: rol?.clave ?? 'desconocido' };
  });

  const pesos: Record<string, number> = {};
  for (const arista of aristas) {
    const distribucionesRelacionadas = distribuciones.filter((distribucion) => {
      const oferta = ofertas.find((item) => item.id === distribucion.ofertaId);
      return (
        (distribucion.nodoDistribuidorId === arista.nodoOrigenId && oferta?.nodoId === arista.nodoDestinoId) ||
        (distribucion.nodoDistribuidorId === arista.nodoDestinoId && oferta?.nodoId === arista.nodoOrigenId)
      );
    });
    const ids = distribucionesRelacionadas.map((item) => item.id);
    pesos[arista.id] = ventas.filter((venta) => ids.includes(venta.llegadaId) && venta.estado === 'firme').length;
  }

  return { nodos: nodosConRol, aristas: [...aristas], pesos };
}

/** Encargos recibidos y solicitados. */
export async function getEncargos(): Promise<EncargosResponse> {
  await delay();
  return {
    publicaciones: encargos.filter(e => e.tipo === 'recibido'),
    solicitados: encargos.filter(e => e.tipo === 'solicitado'),
  };
}

/** Catálogo de servicios Think Tank. */
export async function getPublicaciones(): Promise<Publicacion[]> {
  await delay();
  return [...publicaciones];
}

/** Experiencias para el portal del viajero (miembro/descubrir). */
export async function getExperiencias(): Promise<Oferta[]> {
  await delay();
  // Devolver ofertas que tengan datos de experiencia (imagen, meta, etc.)
  return ofertas.filter(o => o.imageUrl && o.meta);
}

/** Chart: Evolución de ventas por mes (últimos 6 meses). */
export async function getChartVentas(): Promise<{ mes: string; ventas: number }[]> {
  await delay(100);
  return generarChartVentas();
}

/** Chart: Crecimiento de demanda por segmento. */
export async function getChartSegmentos(): Promise<{ segmento: string; valor: number }[]> {
  await delay(100);
  return [...chartSegmentos];
}

/** Chart: Interacciones por canal (últimos 7 días). */
export async function getChartInteracciones(): Promise<{ day: string; whatsapp: number; instagram: number }[]> {
  await delay(100);
  return [...chartInteracciones];
}

/** Dashboard del Espacio de Trabajo. */
/** Nodos tutelados que reciben informes sin acceder directamente al portal. */
export async function getNodosAsistidos(): Promise<NodoAsistidoResponse[]> {
  await delay(100);
  return [
    { id: 'nodo-001', nombre: 'Patronato de Madrid', ultimoInformeEnviado: new Date(Date.now() - 2 * 86400000), encargosPendientes: 2 },
    { id: 'nodo-005', nombre: 'Asociación Hotelera España', ultimoInformeEnviado: new Date(Date.now() - 9 * 86400000), encargosPendientes: 1 },
  ];
}

export async function getEspacioDashboard(): Promise<EspacioDashboardResponse> {
  await delay();
  const m = workspaceMetricas;
  return {
    totalContactos: m.totalContactosRed.toLocaleString('es-ES'),
    tasaRespuestaIA: `${m.tasaRespuestaIA}%`,
    conversacionesActivas: m.conversacionesActivas.toLocaleString('es-ES'),
    resolucionPrimerContacto: `${m.resolucionPrimerContacto}%`,
    capacidadMensajeria: m.capacidadMensajeria,
    tokensIAConsumidos: m.tokensIAConsumidos,
    slaCanal: m.slaCanal,
    contactosAlcanzados: m.contactosAlcanzados,
    limiteSeguro: m.totalContactosRed,
    ejecucionesBienvenida: m.ejecucionesBienvenida,
    ejecucionesRecuperacion: m.ejecucionesRecuperacion,
    contactosExcluidosFrecuencia: m.contactosExcluidosFrecuencia,
    interaccionesAgenteDia: m.interaccionesAgenteDia,
    conversacionesAtendidas: m.interaccionesAgenteDia * 8,
    contactosNuevosPorCanal: [
      { canal: 'WhatsApp', total: 34 },
      { canal: 'Instagram', total: 18 },
      { canal: 'Telegram', total: 7 },
    ],
    topeFrecuenciaConsumido: m.contactosAlcanzados,
    topeFrecuencia: m.totalContactosRed,
  };
}

let presupuestoAgente: PresupuestoAgenteResponse = { consumido: 1840, tope: 2500, detenido: false };

export async function getPresupuestoAgente(): Promise<PresupuestoAgenteResponse> {
  await delay(80);
  return { ...presupuestoAgente, detenido: presupuestoAgente.consumido >= presupuestoAgente.tope };
}

export async function consumirPresupuestoAgente(coste = 250): Promise<PresupuestoAgenteResponse> {
  await delay(100);
  if (presupuestoAgente.consumido + coste > presupuestoAgente.tope) {
    presupuestoAgente = { ...presupuestoAgente, detenido: true };
    throw new Error('Tope alcanzado: el agente no puede seguir gastando ni sugiriendo.');
  }
  presupuestoAgente = { ...presupuestoAgente, consumido: presupuestoAgente.consumido + coste };
  return { ...presupuestoAgente, detenido: presupuestoAgente.consumido >= presupuestoAgente.tope };
}
