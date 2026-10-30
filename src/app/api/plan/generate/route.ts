import { NextRequest, NextResponse } from "next/server";
import { PlanGenerationRequestSchema } from "@/lib/types";
import { generateEventPlan } from "@/lib/gemini";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedRequest = PlanGenerationRequestSchema.parse(body);

    // Call GenAI Orchestrator with mathematical reconciliation
    const aiPlan = await generateEventPlan(validatedRequest);

    const eventTargetDate = new Date(validatedRequest.date);

    // Atomic transaction to persist Event and all child entities
    const createdEvent = await prisma.event.create({
      data: {
        title: validatedRequest.title,
        eventType: validatedRequest.eventType,
        date: eventTargetDate,
        location: validatedRequest.location,
        totalBudget: validatedRequest.totalBudget,
        currency: validatedRequest.currency,
        guestCount: validatedRequest.guestCount,
        vibeTheme: validatedRequest.vibeTheme,
        notes: `${aiPlan.eventSummary}\n\nCONTINGENCY ADVICE:\n${aiPlan.contingencyAdvice}`,

        // Relational Budget Items (with exact calculated dollar amounts)
        budgetItems: {
          create: aiPlan.budgetBreakdown.map((item) => ({
            category: item.category,
            name: item.name,
            allocated: Math.round((item.percentage / 100) * validatedRequest.totalBudget * 100) / 100,
            priority: item.priority,
            notes: item.notes,
          })),
        },

        // Relational Milestones with calculated calendar dates
        timelineItems: {
          create: aiPlan.milestones.map((m) => {
            const milestoneDate = new Date(eventTargetDate);
            milestoneDate.setDate(milestoneDate.getDate() + m.daysOffset);
            return {
              title: m.title,
              phase: m.phase,
              daysOffset: m.daysOffset,
              targetTime: m.targetTime,
              description: m.description,
              status: "PENDING",
            };
          }),
        },

        // Relational Vendors with pre-drafted RFPs
        vendors: {
          create: aiPlan.vendors.map((v) => ({
            category: v.category,
            name: v.recommendedVendorRole,
            estimatedCost: Math.round((v.estimatedPercentBudget / 100) * validatedRequest.totalBudget * 100) / 100,
            status: "NOT_CONTACTED",
            rfpNotes: `${v.inquiryTemplate}\n\nKey Questions to Ask:\n- ${v.keyQuestionsToAsk.join("\n- ")}`,
          })),
        },

        // Personalized Creative Ideas
        creativeIdeas: {
          create: aiPlan.personalizedIdeas.map((idea) => ({
            type: idea.type,
            title: idea.title,
            content: idea.content,
            tags: idea.tags.join(", "),
          })),
        },
      },
      include: {
        budgetItems: true,
        timelineItems: true,
        vendors: true,
        creativeIdeas: true,
      },
    });

    return NextResponse.json({ success: true, event: createdEvent, rawAiPlan: aiPlan });
  } catch (error: any) {
    console.error("Plan Generation Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate event plan" },
      { status: 400 }
    );
  }
}

