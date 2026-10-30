import { GoogleGenAI, Type } from "@google/genai";
import { PlanGenerationRequest, GenAIFullPlan, GenAIFullPlanSchema } from "./types";
import { buildSystemPrompt } from "./prompts";

const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export async function generateEventPlan(request: PlanGenerationRequest): Promise<GenAIFullPlan> {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not configured.");
  }

  const prompt = buildSystemPrompt(request);

  // Define structured JSON schema for Gemini 2.5 Flash
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      temperature: 0.3, // Low temperature for high structural fidelity and math stability
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          eventSummary: { type: Type.STRING },
          budgetBreakdown: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING },
                name: { type: Type.STRING },
                percentage: { type: Type.NUMBER },
                priority: { type: Type.STRING, enum: ["CRITICAL", "HIGH", "MEDIUM", "OPTIONAL"] },
                notes: { type: Type.STRING },
              },
              required: ["category", "name", "percentage", "priority", "notes"],
            },
          },
          milestones: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                phase: { type: Type.STRING, enum: ["PLANNING", "FINAL_PREP", "DAY_OF", "POST_EVENT"] },
                daysOffset: { type: Type.INTEGER },
                targetTime: { type: Type.STRING, nullable: true },
                description: { type: Type.STRING },
              },
              required: ["title", "phase", "daysOffset", "description"],
            },
          },
          vendors: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING },
                recommendedVendorRole: { type: Type.STRING },
                estimatedPercentBudget: { type: Type.NUMBER },
                inquiryTemplate: { type: Type.STRING },
                keyQuestionsToAsk: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ["category", "recommendedVendorRole", "estimatedPercentBudget", "inquiryTemplate", "keyQuestionsToAsk"],
            },
          },
          personalizedIdeas: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING, enum: ["THEME_CONCEPT", "PALETTE", "ACTIVITY", "COPYWRITING"] },
                title: { type: Type.STRING },
                content: { type: Type.STRING },
                tags: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ["type", "title", "content", "tags"],
            },
          },
          contingencyAdvice: { type: Type.STRING },
        },
        required: ["eventSummary", "budgetBreakdown", "milestones", "vendors", "personalizedIdeas", "contingencyAdvice"],
      },
    },
  });

  const rawJson = response.text?.trim() || "{}";
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawJson);
  } catch (err) {
    throw new Error(`Failed to parse GenAI output as JSON: ${err}`);
  }

  // Validate via Zod
  const validatedPlan = GenAIFullPlanSchema.parse(parsed);

  // DETERMINISTIC RECONCILIATION LAYER (30-year engineering guardrail):
  // Normalize percentage distribution to guarantee exact mathematical sum
  return reconcileBudgetArithmetic(validatedPlan);
}

/**
 * Normalizes item percentage allocations so the total equals exactly 100.00%
 * and distributes any residual cents to the primary category.
 */
function reconcileBudgetArithmetic(plan: GenAIFullPlan): GenAIFullPlan {
  const items = plan.budgetBreakdown;
  if (!items.length) return plan;

  const rawSum = items.reduce((acc, it) => acc + it.percentage, 0);
  if (Math.abs(rawSum - 100.0) < 0.001) return plan;

  // Re-scale percentages proportionally
  let runningPercent = 0;
  items.forEach((item, index) => {
    if (index === items.length - 1) {
      item.percentage = Number((100.0 - runningPercent).toFixed(2));
    } else {
      const normalized = Number(((item.percentage / rawSum) * 100).toFixed(2));
      item.percentage = normalized;
      runningPercent += normalized;
    }
  });

  return plan;
}

