import { z } from "zod";

export const EventTypeEnum = z.enum(["WEDDING", "BIRTHDAY", "COMMUNITY"]);
export type EventType = z.infer<typeof EventTypeEnum>;

export const PlanGenerationRequestSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  eventType: EventTypeEnum,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  location: z.string().min(2, "Location is required"),
  totalBudget: z.number().positive("Budget must be greater than zero"),
  currency: z.string().default("USD"),
  guestCount: z.number().int().positive("Guest count must be at least 1"),
  vibeTheme: z.string().min(2, "Theme/Vibe description is required"),
  specialRequests: z.string().optional(),
});
export type PlanGenerationRequest = z.infer<typeof PlanGenerationRequestSchema>;

// Strict schema for LLM generation
export const GenAIBudgetItemSchema = z.object({
  category: z.string(),
  name: z.string(),
  percentage: z.number().min(0).max(100),
  priority: z.enum(["CRITICAL", "HIGH", "MEDIUM", "OPTIONAL"]),
  notes: z.string(),
});

export const GenAITimelineItemSchema = z.object({
  title: z.string(),
  phase: z.enum(["PLANNING", "FINAL_PREP", "DAY_OF", "POST_EVENT"]),
  daysOffset: z.number().describe("Days relative to event. Negative for days prior, 0 for day of."),
  targetTime: z.string().nullable().optional(),
  description: z.string(),
});

export const GenAIVendorSchema = z.object({
  category: z.string(),
  recommendedVendorRole: z.string(),
  estimatedPercentBudget: z.number().min(0).max(100),
  inquiryTemplate: z.string().describe("Pre-drafted professional inquiry message for this vendor"),
  keyQuestionsToAsk: z.array(z.string()),
});

export const GenAICreativeIdeaSchema = z.object({
  type: z.enum(["THEME_CONCEPT", "PALETTE", "ACTIVITY", "COPYWRITING"]),
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
});

export const GenAIFullPlanSchema = z.object({
  eventSummary: z.string(),
  budgetBreakdown: z.array(GenAIBudgetItemSchema),
  milestones: z.array(GenAITimelineItemSchema),
  vendors: z.array(GenAIVendorSchema),
  personalizedIdeas: z.array(GenAICreativeIdeaSchema),
  contingencyAdvice: z.string(),
});
export type GenAIFullPlan = z.infer<typeof GenAIFullPlanSchema>;

