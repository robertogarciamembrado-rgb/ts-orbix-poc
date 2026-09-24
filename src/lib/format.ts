/**
 * Utilidades deterministas para formateo numérico y monetario en TS Orbix.
 * Evitan discrepancias de hidratación (hydration mismatch) entre Server Side Rendering (Node.js)
 * y Client Rendering (Navegadores con distintas configuraciones regionales e ICU).
 */

export function formatTokens(val: number | string): string {
  const num = typeof val === "string" ? parseFloat(val) : val;
  if (isNaN(num)) return "0";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function formatCurrencyEUR(amount: number): string {
  const parts = amount.toFixed(2).split(".");
  const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${intPart},${parts[1]} €`;
}
