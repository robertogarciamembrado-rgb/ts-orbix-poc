import { NextResponse } from "next/server";
import type { OfferInsightContext } from "@/lib/cortex/api";

type InsightRequest = { context?: OfferInsightContext };
type InsightResponse = { observation: string; proposal: string; reason: string; source: "fallback" | "model" };

function fallback(context: OfferInsightContext): InsightResponse {
  return {
    observation: context.matchingContacts + " contactos con consentimiento comparten interés en " + context.interest + ".",
    proposal: "Aceptar la distribución de " + context.offerTitle + ".",
    reason: "Con tu tasa habitual de " + context.habitualConversion.toLocaleString("es-ES") + "% estimo " + context.estimatedMonthlySales + " ventas al mes: unos " + context.projectedMonthlyCommission.toLocaleString("es-ES") + " € al " + context.offeredCommission + "%.",
    source: "fallback",
  };
}

function isValidContext(value: unknown): value is OfferInsightContext {
  if (!value || typeof value !== "object") return false;
  const context = value as Record<string, unknown>;
  return typeof context.offerId === "string"
    && typeof context.offerTitle === "string"
    && typeof context.interest === "string"
    && typeof context.matchingContacts === "number"
    && typeof context.estimatedMonthlySales === "number"
    && typeof context.projectedMonthlyCommission === "number"
    && typeof context.offeredCommission === "number"
    && typeof context.habitualConversion === "number";
}

export async function POST(request: Request) {
  let payload: InsightRequest;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "El contexto debe ser JSON válido." }, { status: 400 });
  }

  if (!isValidContext(payload.context)) {
    return NextResponse.json({ error: "Falta un contexto de insight válido." }, { status: 400 });
  }

  const context = payload.context;
  const offlineResponse = fallback(context);
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return NextResponse.json(offlineResponse);

  try {
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + apiKey },
      body: JSON.stringify({
        model: process.env.OPENAI_INSIGHT_MODEL ?? "gpt-4o-mini",
        temperature: 0.2,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "Devuelve JSON con observation, proposal y reason. Nunca ejecutes acciones ni inventes cifras." },
          { role: "user", content: "Redacta una recomendación breve en español con este contexto verificado: " + JSON.stringify(context) },
        ],
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!completion.ok) return NextResponse.json(offlineResponse);

    const result = await completion.json() as { choices?: Array<{ message?: { content?: string } }> };
    const content = result.choices?.[0]?.message?.content;
    if (!content) return NextResponse.json(offlineResponse);
    const generated = JSON.parse(content) as Partial<InsightResponse>;
    if (!generated.reason?.trim() || !generated.observation?.trim() || !generated.proposal?.trim()) {
      return NextResponse.json(offlineResponse);
    }
    return NextResponse.json({ ...generated, source: "model" });
  } catch {
    return NextResponse.json(offlineResponse);
  }
}
