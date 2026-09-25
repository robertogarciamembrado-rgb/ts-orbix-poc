/**
 * Utilidades de tiempo relativo para TS Orbix PoC.
 *
 * Regla estricta: NUNCA usar fechas fijas como strings ("2026-09-22").
 * Todas las fechas se generan con hace() o dentro() para que el PoC
 * se mantenga coherente sin importar cuándo se ejecute.
 */

type Unidad = 'horas' | 'dias' | 'meses';

/** Devuelve una Date restando `n` unidades desde ahora. */
export function hace(n: number, unidad: Unidad): Date {
  const d = new Date();
  switch (unidad) {
    case 'horas':
      d.setHours(d.getHours() - n);
      break;
    case 'dias':
      d.setDate(d.getDate() - n);
      break;
    case 'meses':
      d.setMonth(d.getMonth() - n);
      break;
  }
  return d;
}

/** Devuelve una Date sumando `n` unidades desde ahora. */
export function dentro(n: number, unidad: Unidad): Date {
  const d = new Date();
  switch (unidad) {
    case 'horas':
      d.setHours(d.getHours() + n);
      break;
    case 'dias':
      d.setDate(d.getDate() + n);
      break;
    case 'meses':
      d.setMonth(d.getMonth() + n);
      break;
  }
  return d;
}

/** Formato corto legible: "22 sep 2026" */
export function formatFechaCorta(date: Date): string {
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/** Formato ISO sin hora: "2026-09-22" */
export function formatFechaISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Formato humano relativo: "Hace 2 horas", "Hace 3 días", "Hace 15 min" */
export function formatTiempoRelativo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / (1000 * 60));
  const diffH = Math.floor(diffMs / (1000 * 60 * 60));
  const diffD = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMin < 1) return 'Ahora mismo';
  if (diffMin < 60) return `Hace ${diffMin} min`;
  if (diffH < 24) return `Hace ${diffH} hora${diffH !== 1 ? 's' : ''}`;
  if (diffD < 30) return `Hace ${diffD} día${diffD !== 1 ? 's' : ''}`;
  return formatFechaCorta(date);
}

/** Nombre corto del mes: "Abr", "May", etc. */
export function nombreMesCorto(date: Date): string {
  return date.toLocaleDateString('es-ES', { month: 'short' }).replace('.', '');
}

/** Nombre del mes completo con año: "Septiembre 2026" */
export function nombreMesAnio(date: Date): string {
  const mes = date.toLocaleDateString('es-ES', { month: 'long' });
  const capitalizado = mes.charAt(0).toUpperCase() + mes.slice(1);
  return `${capitalizado} ${date.getFullYear()}`;
}

/** Días que faltan hasta una fecha futura (negativo si ya pasó). */
export function diasHasta(date: Date): number {
  const now = new Date();
  return Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}
