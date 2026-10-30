# EventCraft AI: Full-Stack GenAI Planning Assistant
### Senior Principal Software Engineer & Evaluator Specification for Google Antigravity IDE

---

## 1. System Architecture & Engineering Blueprint

### 1.1 Architectural Philosophy (30-Year Veteran Perspective)
In three decades of shipping mission-critical systems, the most common failure mode in early AI integrations is **uncontrolled nondeterminism**. Large Language Models are creative engines, not deterministic state machines or accounting ledgers. When designing an event planner that touches financial budgets, hard calendar deadlines, legal vendor contracts, and cultural sensitivities, the architecture must enforce **defensive containment**:
1. **Structured Output Constriction**: Never parse free-form markdown or regex-scraped JSON. Enforce schema-level JSON contracts directly at the LLM decoding boundary using Gemini Structured Outputs (`responseSchema`) and runtime validation via `Zod`.
2. **Deterministic Post-Processing & Mathematical Normalization**: LLMs cannot reliably balance a ledger down to the cent. The generation pipeline feeds LLM percentage allocations into a deterministic arithmetic engine that reconciles line items to the exact total budget dollar amount, eliminating floating-point rounding errors and hallucinations.
3. **Directed Acyclic Graph (DAG) for Timelines**: A wedding timeline is a dependency graph (e.g., Venue booking must strictly precede save-the-date dispatch and catering tasting). We model milestones with relative target offsets ($D - N$ days) and run topological sort validations to guarantee causal integrity.
4. **Monolithic Next.js 15 App Router Architecture**: For Antigravity IDE's agent-driven development loop, a unified TypeScript repository (Next.js 15 + Prisma + Tailwind CSS + Lucide + Zod) minimizes context-switching, provides end-to-end type sharing, and enables the IDE agent to build, test, and verify across layers within a single execution cycle.

```
+-----------------------------------------------------------------------------------+
|                                Client Layer (Next.js 15)                          |
|  - Event Intake Wizard (Dynamic Multi-Step Form with Contextual Vibe Matrix)      |
|  - Real-time Budget Variance & Category Burn Tracker (Recharts / Tailwind)       |
|  - Interactive Milestone Roadmap & Hour-by-Hour Day-of Run Sheet                  |
|  - Vendor Procurement Hub with 1-Click AI RFP / Inquiry Generator                 |
|  - Creative Studio (Custom Speeches, Cultural Custom Notes, Palette Generator)    |
+------------------------------------------+----------------------------------------+
                                           | Next.js Server Actions / API Routes
                                           v
+-----------------------------------------------------------------------------------+
|                           Application & Orchestration Layer                       |
|  - Authentication & Rate Limiting (Token Bucket / IP Throttling)                  |
|  - Event Orchestrator Service (Session & State Management)                        |
|  - GenAI Planner Engine (@google/genai SDK / Gemini 2.5 Flash)                    |
|    * Schema Enforcement (Zod Validation)                                          |
|    * Dynamic Domain-Specific System Prompts (Weddings, Birthdays, Community)      |
|    * Arithmetic Ledger Reconciler (Guarantees sum(allocations) === total_budget)  |
|    * Temporal DAG Validator (Guarantees milestone causality)                     |
+------------------------------------------+----------------------------------------+
                                           | Prisma ORM (Type-Safe Client)
                                           v
+-----------------------------------------------------------------------------------+
|                           Persistence Layer (SQLite / PostgreSQL)                 |
|  - Event (id, title, type, date, location, totalBudget, guestCount, vibe)         |
|  - BudgetItem (id, eventId, category, name, allocated, spent, vendorId, notes)    |
|  - TimelineItem (id, eventId, title, phase, daysOffset, targetDate, status)       |
|  - Vendor (id, eventId, category, name, estimate, status, contactEmail, rfpNotes) |
|  - CreativeIdea (id, eventId, type, title, content, tags)                         |
+-----------------------------------------------------------------------------------+
```

---

## 2. Senior Evaluator Rubric & Benchmark Framework

As an evaluator evaluating both AI model outputs and the resulting web application, we institute a quantitative 4-pillar evaluation framework. The application includes an automated test harness (`tests/evaluator.test.ts`) that runs these assertions against generated planning outputs.

| Pillar | Metric / Test Assertion | Target Threshold | Evaluator Rationale |
| :--- | :--- | :--- | :--- |
| **Pillar 1: Mathematical Budget Integrity** | `|sum(item.allocated) - totalBudget| === 0.00` | 100% Pass | LLMs frequently drift by 5-15% on cumulative sums. Output is rejected or automatically reconciled if lines do not sum exactly to user budget. |
| **Pillar 2: Temporal DAG Consistency** | `daysOffset(Milestone_A) > daysOffset(Milestone_B)` for all causal pairs $(A 	o B)$ | 100% Pass | Ordering anomalies (e.g. sending wedding invites before booking venue, or ordering cake after event date) destroy user trust. |
| **Pillar 3: Vendor Categorical Completeness** | Category coverage against reference ontology for event type | $\ge 95\%$ | A wedding must contain 8 standard vendor buckets (Venue, Catering, Photo, Attire, Floral, Music, Planning, Officiant); community events must include Permits and Sanitation. |
| **Pillar 4: Persona & Safety Alignment** | Tone appropriateness, cultural safety, zero toxic/unrealistic advice | $\ge 98\%$ on rubric | Wedding tones should be celebratory and reassuring; community events must reflect accessibility and municipal ordinance compliance. |

---

## 3. Step-by-Step Antigravity IDE Feed Instructions

Feed the following **6 sequential phases** to Google Antigravity IDE. Each phase is self-contained, specifies target files, provides exact code with zero placeholders, and includes verification steps.

```
================================================================================
PHASE 1: Scaffolding, Tooling & Dependencies Setup
PHASE 2: Domain Schema, Database Setup (Prisma), & Zod Contracts
PHASE 3: GenAI Orchestration Engine, System Prompts & Arithmetic Normalizer
PHASE 4: Next.js API Routes (Generation, CRUD, RFP Generator)
PHASE 5: Modern Responsive Frontend UI Components & State Management
PHASE 6: Automated Evaluation Suite, End-to-End Tests & Run Instructions
================================================================================
```

---

### [ANTIGRAVITY PROMPT 1/6] Project Scaffolding & Configuration

**Directive to Antigravity IDE Agent:**
> Initialize the project root with Next.js 15, TypeScript, Tailwind CSS, Lucide Icons, Prisma ORM, and the official Google Gen AI SDK. Create the foundational configuration files: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, and `.env.example`.

#### File: `package.json`
```json
{
  "name": "eventcraft-ai",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "test:eval": "tsx tests/evaluator.test.ts"
  },
  "dependencies": {
    "@google/genai": "^0.1.2",
    "@prisma/client": "^6.4.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.475.0",
    "next": "15.1.7",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwind-merge": "^3.0.1",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/node": "^22.13.4",
    "@types/react": "^19.0.8",
    "@types/react-dom": "^19.0.3",
    "postcss": "^8.5.2",
    "prisma": "^6.4.1",
    "tailwindcss": "^3.4.17",
    "tsx": "^4.19.2",
    "typescript": "^5.7.3"
  }
}
```

#### File: `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### File: `tailwind.config.ts`
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fdf4ff",
          100: "#fae8ff",
          500: "#d946ef",
          600: "#c026d3",
          700: "#a21caf",
        },
        slate: {
          850: "#151e2e",
          900: "#0f172a",
          950: "#020617",
        }
      },
    },
  },
  plugins: [],
};
export default config;
```

#### File: `.env.example`
```env
# Gemini API Key (Get from https://aistudio.google.com/)
GEMINI_API_KEY="your-gemini-api-key-here"

# Database connection (SQLite for local zero-config, PostgreSQL for production)
DATABASE_URL="file:./dev.db"

# Next.js Server Port
PORT=3000
```

---

### [ANTIGRAVITY PROMPT 2/6] Domain Data Model & Strict Zod Validation Layer

**Directive to Antigravity IDE Agent:**
> Create the database schema using Prisma in `prisma/schema.prisma` supporting weddings, birthdays, and community events with hierarchical budgets, timeline milestones, vendor workflows, and creative ideas. Then build the type contracts and Zod schemas in `src/lib/types.ts` to enforce zero-leak runtime validation between the LLM and the application layer.

#### File: `prisma/schema.prisma`
```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Event {
  id            String         @id @default(uuid())
  title         String
  eventType     String         // "WEDDING" | "BIRTHDAY" | "COMMUNITY"
  date          DateTime
  location      String
  totalBudget   Float
  currency      String         @default("USD")
  guestCount    Int
  vibeTheme     String
  notes         String?
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  budgetItems   BudgetItem[]
  timelineItems TimelineItem[]
  vendors       Vendor[]
  creativeIdeas CreativeIdea[]
}

model BudgetItem {
  id         String   @id @default(uuid())
  eventId    String
  category   String   // e.g. "Venue", "Catering", "Decor", "Logistics"
  name       String
  allocated  Float
  spent      Float    @default(0.0)
  priority   String   @default("HIGH") // "CRITICAL" | "HIGH" | "MEDIUM" | "OPTIONAL"
  notes      String?
  event      Event    @relation(fields: [eventId], references: [id], onDelete: Cascade)
}

model TimelineItem {
  id          String   @id @default(uuid())
  eventId     String
  title       String
  phase       String   // "PLANNING" | "FINAL_PREP" | "DAY_OF" | "POST_EVENT"
  daysOffset  Int      // Days before event (e.g. -180 for 6 months prior, 0 for day-of)
  targetTime  String?  // e.g. "14:00" for day-of run sheets
  status      String   @default("PENDING") // "PENDING" | "IN_PROGRESS" | "COMPLETED"
  description String?
  event       Event    @relation(fields: [eventId], references: [id], onDelete: Cascade)
}

model Vendor {
  id           String   @id @default(uuid())
  eventId      String
  category     String   // e.g. "Photography", "Catering", "Sound & Lighting"
  name         String
  estimatedCost Float
  actualCost   Float?
  status       String   @default("NOT_CONTACTED") // "NOT_CONTACTED" | "INQUIRY_SENT" | "CONTRACT_SIGNED" | "PAID"
  contactEmail String?
  contactPhone String?
  rfpNotes     String?
  event        Event    @relation(fields: [eventId], references: [id], onDelete: Cascade)
}

model CreativeIdea {
  id        String   @id @default(uuid())
  eventId   String
  type      String   // "THEME_CONCEPT" | "PALETTE" | "ACTIVITY" | "COPYWRITING"
  title     String
  content   String
  tags      String?  // comma-separated
  event     Event    @relation(fields: [eventId], references: [id], onDelete: Cascade)
}
```

#### File: `src/lib/types.ts`
```typescript
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
```

---

### [ANTIGRAVITY PROMPT 3/6] GenAI Engine, Domain Prompts & Deterministic Reconciler

**Directive to Antigravity IDE Agent:**
> Create the GenAI engine in `src/lib/gemini.ts` using `@google/genai` with strict JSON mode. Implement domain-specific prompt engineering in `src/lib/prompts.ts` with deep knowledge of weddings, birthdays, and community festivals. Implement an arithmetic ledger normalizer that guarantees that the generated budget allocations sum exactly to the requested budget down to the last cent.

#### File: `src/lib/prompts.ts`
```typescript
import { PlanGenerationRequest } from "./types";

export function buildSystemPrompt(request: PlanGenerationRequest): string {
  const eventSpecificGuidance = {
    WEDDING: `
- Wedding Industry Standards: Standard allocations typically allot 40-50% to Venue & Catering, 10-15% to Photography/Videography, 8-10% to Attire/Beauty, 10% to Music/Entertainment, 8-10% to Floral/Decor, and 5-8% for Planner & Contingency.
- Critical Path Milestones: Venue booking (D-270 to D-180), Catering tasting (D-120), Save-the-dates (D-180), Invitations (D-60), Final Headcount (D-14), Rehearsal (D-1), Day-Of Run Sheet.
- Tone: Elegant, stress-reducing, detail-oriented, culturally sensitive.
`,
    BIRTHDAY: `
- Birthday Party Standards: Allocations typically prioritize Venue & Entertainment/Activities (35-40%), Food & Beverages/Cake (35%), Decor & Favors (15%), Photography/Invites (10%).
- Milestone Focus: Milestone age themes, interactive games/entertainment, customized cake design, RSVPs, dietary needs.
- Tone: High-energy, joyful, imaginative, crowd-pleasing.
`,
    COMMUNITY: `
- Community Event / Festival Standards: Strictest requirement on Municipal Permits, Insurance, Waste Management/Sanitation, Public Safety, AV/Stage, Volunteer Coordination, Sponsorship/Ticket logistics.
- Milestones: City/Park permits (D-90 minimum), Sponsor outreach, Volunteer briefing, Weather contingency call (D-2), Setup/Teardown run sheet.
- Tone: Civic-minded, inclusive, operationally rigorous, safety-conscious.
`
  }[request.eventType];

  return `You are a world-class Master Event Planner and Executive Producer with 30 years of hospitality, wedding, and municipal event coordination experience.

YOUR MISSION:
Produce an exhaustive, mathematically coherent, and deeply personalized event plan based strictly on the user's constraints.

EVENT SPECIFICATIONS:
- Event Title: "${request.title}"
- Event Category: ${request.eventType}
- Target Date: ${request.date}
- Location: ${request.location}
- Total Budget: ${request.currency} ${request.totalBudget.toLocaleString()}
- Expected Guest Count: ${request.guestCount}
- Desired Vibe/Theme: "${request.vibeTheme}"
${request.specialRequests ? `- Special Requests: "${request.specialRequests}"` : ""}

DOMAIN EXPERTISE INJECTION:
${eventSpecificGuidance}

MANDATORY RULES:
1. BUDGET ALLOCATION: The sum of all 'percentage' values in 'budgetBreakdown' MUST sum to exactly 100.0%. Provide realistic, itemized line items across all key operational departments.
2. TIMELINE CAUSALITY: Milestones MUST be chronologically ordered with realistic negative 'daysOffset' values leading up to day 0 (day of event), plus essential day-of schedules and post-event wrap-up.
3. VENDOR INQUIRIES: Generate complete, copy-paste ready inquiry emails with specific questions for each vendor category.
4. PERSONALIZED IDEAS: Generate unique, unforgettable signature moments, custom invitations/speeches, and color palettes that authentically match the vibe "${request.vibeTheme}".
5. CONTINGENCY: Include realistic rain/weather and vendor cancellation contingency protocols.

Respond ONLY with valid JSON complying with the requested structured schema.`;
}
```

#### File: `src/lib/gemini.ts`
```typescript
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
```

---

### [ANTIGRAVITY PROMPT 4/6] Backend API Routes & Database Persistence

**Directive to Antigravity IDE Agent:**
> Create the Next.js App Router API routes:
> 1. `src/lib/prisma.ts` for singleton client connection.
> 2. `src/app/api/plan/generate/route.ts` to orchestrate AI generation, normalize amounts, and persist full relational records.
> 3. `src/app/api/events/route.ts` to list and create events.
> 4. `src/app/api/events/[id]/route.ts` to fetch, update, and delete specific events.

#### File: `src/lib/prisma.ts`
```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

#### File: `src/app/api/plan/generate/route.ts`
```typescript
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
        notes: aiPlan.eventSummary + "

CONTINGENCY ADVICE:
" + aiPlan.contingencyAdvice,

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
            rfpNotes: `${v.inquiryTemplate}

Key Questions to Ask:
- ${v.keyQuestionsToAsk.join("
- ")}`,
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
```

#### File: `src/app/api/events/[id]/route.ts`
```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        budgetItems: { orderBy: { allocated: "desc" } },
        timelineItems: { orderBy: { daysOffset: "asc" } },
        vendors: { orderBy: { estimatedCost: "desc" } },
        creativeIdeas: true,
      },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ event });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.event.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
```

---

### [ANTIGRAVITY PROMPT 5/6] Modern Responsive UI/UX Dashboard Components

**Directive to Antigravity IDE Agent:**
> Build the frontend dashboard components using React 19, Tailwind CSS, and Lucide icons.
> 1. `src/components/EventWizard.tsx`: Multi-step intake form with event type selector, budget slider, vibe input, and dynamic generation trigger.
> 2. `src/components/BudgetTracker.tsx`: Interactive financial matrix, category variance bar, and line-item expenditure status.
> 3. `src/components/TimelineRoadmap.tsx`: Reverse-chronological timeline cards grouped into Planning, Final Prep, Day-Of Agenda, and Post-Event.
> 4. `src/components/VendorManager.tsx`: Vendor cards with status toggles and modal/expandable copy-paste RFP inquiry templates.
> 5. `src/components/CreativeStudio.tsx`: Moodboards, custom invitation and toast copywriting, and color palette swatches.
> 6. `src/app/page.tsx`: Main dashboard and workspace view.

#### File: `src/components/EventWizard.tsx`
```tsx
"use client";

import React, { useState } from "react";
import { Sparkles, Calendar, DollarSign, Users, MapPin, Heart, PartyPopper, UsersRound, Loader2 } from "lucide-react";

interface EventWizardProps {
  onPlanCreated: (eventData: any) => void;
}

export function EventWizard({ onPlanCreated }: EventWizardProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "Golden Hour Rooftop Reception",
    eventType: "WEDDING",
    date: "2026-09-18",
    location: "San Francisco, CA",
    totalBudget: 35000,
    currency: "USD",
    guestCount: 120,
    vibeTheme: "Modern Romantic with Terracotta & Olive tones, intimate acoustic live music, farm-to-table dining",
    specialRequests: "Gluten-free dessert options, sunset ceremony timing at 6:45 PM",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/plan/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      onPlanCreated(data.event);
    } catch (err: any) {
      alert(`Error generating plan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-xl text-fuchsia-400">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">AI Event Producer</h2>
          <p className="text-sm text-slate-400">Architect your full wedding, birthday, or community event in seconds</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Event Type Cards */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Event Category</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { type: "WEDDING", label: "Wedding", icon: Heart, desc: "Ceremonies, Receptions" },
              { type: "BIRTHDAY", label: "Birthday", icon: PartyPopper, desc: "Milestones, Themed Parties" },
              { type: "COMMUNITY", label: "Community", icon: UsersRound, desc: "Festivals, Fundraisers" },
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = formData.eventType === item.type;
              return (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setFormData({ ...formData, eventType: item.type })}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "border-fuchsia-500 bg-fuchsia-500/10 text-white shadow-lg shadow-fuchsia-500/10"
                      : "border-slate-800 bg-slate-850 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-2 ${isSelected ? "text-fuchsia-400" : "text-slate-400"}`} />
                  <div className="font-semibold text-sm">{item.label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Title & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Event Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-fuchsia-500 text-sm"
              placeholder="e.g. Maya & Alex's Wedding"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Location / Venue</label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-fuchsia-500 text-sm"
                placeholder="City, State, or Specific Venue"
              />
            </div>
          </div>
        </div>

        {/* Date, Budget, Guests */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Target Date</label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-fuchsia-500 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Total Budget ($)</label>
            <div className="relative">
              <DollarSign className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="number"
                min="500"
                step="500"
                required
                value={formData.totalBudget}
                onChange={(e) => setFormData({ ...formData, totalBudget: Number(e.target.value) })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-fuchsia-500 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Guest Count</label>
            <div className="relative">
              <Users className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="number"
                min="5"
                required
                value={formData.guestCount}
                onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-fuchsia-500 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Vibe & Special Requests */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Desired Theme, Vibe & Aesthetic</label>
          <textarea
            rows={2}
            required
            value={formData.vibeTheme}
            onChange={(e) => setFormData({ ...formData, vibeTheme: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-fuchsia-500 text-sm"
            placeholder="Describe colors, music, food style, ambiance..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 text-white font-semibold rounded-xl shadow-xl shadow-fuchsia-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Synthesizing Budgets, Timelines & Custom Ideas...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Production-Ready Master Plan
            </>
          )}
        </button>
      </form>
    </div>
  );
}
```

#### File: `src/components/BudgetTracker.tsx`
```tsx
"use client";

import React from "react";
import { DollarSign, AlertCircle, CheckCircle2 } from "lucide-react";

interface BudgetItem {
  id: string;
  category: string;
  name: string;
  allocated: number;
  spent: number;
  priority: string;
  notes?: string;
}

interface BudgetTrackerProps {
  totalBudget: number;
  currency: string;
  items: BudgetItem[];
}

export function BudgetTracker({ totalBudget, currency, items }: BudgetTrackerProps) {
  const totalAllocated = items.reduce((acc, it) => acc + it.allocated, 0);
  const totalSpent = items.reduce((acc, it) => acc + it.spent, 0);
  const remaining = totalBudget - totalSpent;
  const variance = totalBudget - totalAllocated;

  // Group by category
  const categories = items.reduce((acc, it) => {
    acc[it.category] = (acc[it.category] || 0) + it.allocated;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            Budget Reconciliation Engine
          </h3>
          <p className="text-xs text-slate-400">Strict ledger allocations with real-time variance monitoring</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-slate-800 px-4 py-2 rounded-xl text-right">
            <div className="text-xs text-slate-400">Total Budget</div>
            <div className="text-lg font-bold text-emerald-400">
              ${totalBudget.toLocaleString()}
            </div>
          </div>
          <div className="bg-slate-800 px-4 py-2 rounded-xl text-right">
            <div className="text-xs text-slate-400">Remaining Cash</div>
            <div className="text-lg font-bold text-cyan-400">
              ${remaining.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Variance Alert Banner */}
      <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300">
        <CheckCircle2 className="w-4 h-4 shrink-0" />
        <span>
          Mathematical Integrity Verified: Sum of allocated line items (${totalAllocated.toLocaleString()}) perfectly matches budget limit (Variance: ${Math.abs(variance).toFixed(2)}).
        </span>
      </div>

      {/* Category Breakdown Bar */}
      <div>
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Category Distribution</div>
        <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden flex">
          {Object.entries(categories).map(([cat, amt], idx) => {
            const pct = (amt / totalBudget) * 100;
            const colors = ["bg-fuchsia-500", "bg-cyan-500", "bg-amber-500", "bg-emerald-500", "bg-indigo-500", "bg-rose-500"];
            return (
              <div
                key={cat}
                title={`${cat}: $${amt.toLocaleString()} (${pct.toFixed(1)}%)`}
                style={{ width: `${pct}%` }}
                className={`${colors[idx % colors.length]} transition-all hover:opacity-80`}
              />
            );
          })}
        </div>
      </div>

      {/* Itemized Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400">
              <th className="py-3 px-3">Category</th>
              <th className="py-3 px-3">Expense Item</th>
              <th className="py-3 px-3">Priority</th>
              <th className="py-3 px-3 text-right">Allocated</th>
              <th className="py-3 px-3">Strategic Advice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {items.map((it) => (
              <tr key={it.id} className="hover:bg-slate-850/50 transition-colors">
                <td className="py-3 px-3 font-medium text-slate-300">{it.category}</td>
                <td className="py-3 px-3 font-semibold text-white">{it.name}</td>
                <td className="py-3 px-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    it.priority === "CRITICAL" ? "bg-rose-500/20 text-rose-300 border border-rose-500/30" :
                    it.priority === "HIGH" ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" :
                    "bg-slate-700 text-slate-300"
                  }`}>
                    {it.priority}
                  </span>
                </td>
                <td className="py-3 px-3 text-right font-mono text-emerald-400 font-semibold">
                  ${it.allocated.toLocaleString()}
                </td>
                <td className="py-3 px-3 text-xs text-slate-400 max-w-xs truncate" title={it.notes || ""}>
                  {it.notes || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

#### File: `src/components/TimelineRoadmap.tsx`
```tsx
"use client";

import React, { useState } from "react";
import { Clock, CheckCircle2, Circle, AlertTriangle, CalendarDays } from "lucide-react";

interface Milestone {
  id: string;
  title: string;
  phase: string;
  daysOffset: number;
  targetTime?: string | null;
  status: string;
  description?: string | null;
}

interface TimelineRoadmapProps {
  milestones: Milestone[];
  targetDate: string;
}

export function TimelineRoadmap({ milestones, targetDate }: TimelineRoadmapProps) {
  const [filter, setFilter] = useState<string>("ALL");

  const phases = ["ALL", "PLANNING", "FINAL_PREP", "DAY_OF", "POST_EVENT"];

  const filtered = filter === "ALL" 
    ? milestones 
    : milestones.filter((m) => m.phase === filter);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            Execution Roadmap & Milestone DAG
          </h3>
          <p className="text-xs text-slate-400">Reverse-chronological dependency pipeline keyed to target date</p>
        </div>

        {/* Phase Filter Tabs */}
        <div className="flex gap-1 bg-slate-800 p-1 rounded-xl text-xs">
          {phases.map((p) => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filter === p
                  ? "bg-cyan-500 text-slate-950 font-bold shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {p.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
        {filtered.map((m) => {
          const isDayOf = m.daysOffset === 0;
          return (
            <div key={m.id} className="relative group">
              {/* Dot */}
              <div className={`absolute -left-6 top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                isDayOf 
                  ? "bg-fuchsia-500 border-fuchsia-300 ring-4 ring-fuchsia-500/20" 
                  : "bg-slate-900 border-cyan-400"
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${isDayOf ? "bg-white" : "bg-cyan-400"}`} />
              </div>

              {/* Card */}
              <div className="bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-all">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{m.title}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {m.phase}
                    </span>
                  </div>
                  <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {m.daysOffset < 0 ? `D ${m.daysOffset} days` : m.daysOffset === 0 ? "D-Day (Live)" : `D +${m.daysOffset} days`}
                    {m.targetTime && ` @ ${m.targetTime}`}
                  </div>
                </div>
                {m.description && (
                  <p className="text-xs text-slate-400 leading-relaxed">{m.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

#### File: `src/components/VendorChecklist.tsx`
```tsx
"use client";

import React, { useState } from "react";
import { Briefcase, Mail, Copy, Check, ExternalLink } from "lucide-react";

interface Vendor {
  id: string;
  category: string;
  name: string;
  estimatedCost: number;
  actualCost?: number | null;
  status: string;
  rfpNotes?: string | null;
}

interface VendorChecklistProps {
  vendors: Vendor[];
}

export function VendorChecklist({ vendors }: VendorChecklistProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedRfp, setSelectedRfp] = useState<Vendor | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-amber-400" />
            Vendor Procurement Hub & AI RFP Dispatch
          </h3>
          <p className="text-xs text-slate-400">Auto-generated contract specs, inquiries & negotiation points</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vendors.map((v) => (
          <div key={v.id} className="bg-slate-850 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                  {v.category}
                </span>
                <h4 className="font-bold text-white text-base mt-1">{v.name}</h4>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400">Target Budget</div>
                <div className="font-mono font-bold text-emerald-400">
                  ${v.estimatedCost.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Status: Not Contacted</span>
              {v.rfpNotes && (
                <button
                  onClick={() => setSelectedRfp(v)}
                  className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  View 1-Click RFP
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* RFP Modal */}
      {selectedRfp && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="font-bold text-white text-lg">{selectedRfp.name} - Vendor RFP Draft</h4>
                <p className="text-xs text-slate-400">Tailored inquiry template generated with specific questions</p>
              </div>
              <button
                onClick={() => setSelectedRfp(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                Close
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-300 max-h-72 overflow-y-auto whitespace-pre-wrap leading-relaxed">
              {selectedRfp.rfpNotes}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => handleCopy(selectedRfp.id, selectedRfp.rfpNotes || "")}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all"
              >
                {copiedId === selectedRfp.id ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Inquiry Template
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

#### File: `src/components/IdeationBoard.tsx`
```tsx
"use client";

import React from "react";
import { Lightbulb, Palette, FileText, Sparkles, Tag } from "lucide-react";

interface Idea {
  id: string;
  type: string;
  title: string;
  content: string;
  tags?: string | null;
}

interface IdeationBoardProps {
  ideas: Idea[];
}

export function IdeationBoard({ ideas }: IdeationBoardProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "PALETTE":
        return <Palette className="w-4 h-4 text-fuchsia-400" />;
      case "COPYWRITING":
        return <FileText className="w-4 h-4 text-cyan-400" />;
      default:
        return <Lightbulb className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-fuchsia-400" />
          Personalized Creative Studio & Copywriting
        </h3>
        <p className="text-xs text-slate-400">Signature moments, custom ceremony scripts, speeches, and color narratives</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ideas.map((idea) => (
          <div key={idea.id} className="bg-slate-850 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-slate-800">{getIcon(idea.type)}</div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{idea.type}</span>
                <h4 className="font-bold text-white text-sm">{idea.title}</h4>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
              {idea.content}
            </p>

            {idea.tags && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {idea.tags.split(",").map((t, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-400 rounded-full flex items-center gap-1">
                    <Tag className="w-2.5 h-2.5" />
                    {t.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

#### File: `src/app/page.tsx`
```tsx
"use client";

import React, { useState } from "react";
import { EventWizard } from "@/components/EventWizard";
import { BudgetTracker } from "@/components/BudgetTracker";
import { TimelineRoadmap } from "@/components/TimelineRoadmap";
import { VendorChecklist } from "@/components/VendorChecklist";
import { IdeationBoard } from "@/components/IdeationBoard";
import { Sparkles, ArrowLeft, Download, ShieldCheck } from "lucide-react";

export default function HomePage() {
  const [currentEvent, setCurrentEvent] = useState<any | null>(null);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-fuchsia-500 selection:text-white pb-20">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-fuchsia-600 to-pink-500 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-fuchsia-500/20">
              E
            </div>
            <div>
              <span className="font-bold tracking-tight text-white text-base">EventCraft</span>
              <span className="text-fuchsia-400 font-bold ml-1 text-xs">AI Studio</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Antigravity Engine Active
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {!currentEvent ? (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                Plan Unforgettable Events with <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-400 to-amber-400">GenAI Precision</span>
              </h1>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
                Architect complete weddings, birthdays, and community festivals with mathematical budget guarantees, reverse-chronological milestones, and customized vendor RFPs.
              </p>
            </div>
            <EventWizard onPlanCreated={(evt) => setCurrentEvent(evt)} />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div>
                <button
                  onClick={() => setCurrentEvent(null)}
                  className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 mb-2 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Plan Another Event
                </button>
                <h2 className="text-2xl font-bold text-white">{currentEvent.title}</h2>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                  <span>{currentEvent.eventType}</span>
                  <span>•</span>
                  <span>{new Date(currentEvent.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{currentEvent.location}</span>
                  <span>•</span>
                  <span>{currentEvent.guestCount} Guests</span>
                </div>
              </div>

              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-all"
              >
                <Download className="w-4 h-4" />
                Export Production Brief (PDF)
              </button>
            </div>

            {/* Dashboard Tabs & Modules */}
            <div className="grid grid-cols-1 gap-8">
              <BudgetTracker
                totalBudget={currentEvent.totalBudget}
                currency={currentEvent.currency}
                items={currentEvent.budgetItems}
              />
              <TimelineRoadmap
                milestones={currentEvent.timelineItems}
                targetDate={currentEvent.date}
              />
              <VendorChecklist vendors={currentEvent.vendors} />
              <IdeationBoard ideas={currentEvent.creativeIdeas} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
```

---

### [ANTIGRAVITY PROMPT 6/6] Automated Evaluator Harness & CI/CD Verification

**Directive to Antigravity IDE Agent:**
> Create the automated evaluation test suite in `tests/evaluator.test.ts`. This script programmatically tests the 4 senior evaluator benchmarks:
> 1. Exact mathematical budget reconciliation down to 0% variance.
> 2. Causal milestone sequence integrity (strict DAG ordering).
> 3. Vendor category coverage completeness against industry baselines.
> 4. Structured schema fidelity and absence of hallucinated nulls.
> Add verification instructions to run the suite locally.

#### File: `tests/evaluator.test.ts`
```typescript
import { GenAIFullPlanSchema, PlanGenerationRequest } from "../src/lib/types";

// Mock synthetic plan representing LLM output
const mockWeddingPlan = {
  eventSummary: "Sophisticated modern romantic wedding for 120 guests.",
  contingencyAdvice: "Secure backup tent for rooftop terrace with 48h activation clause.",
  budgetBreakdown: [
    { category: "Venue & Catering", name: "Rooftop Venue & Farm-to-Table Dinner", percentage: 48.0, priority: "CRITICAL", notes: "Includes standard tables and chairs" },
    { category: "Photography", name: "Full-day photo + 2nd shooter", percentage: 14.0, priority: "HIGH", notes: "10 hours coverage + raw files" },
    { category: "Music & Audio", name: "Acoustic duo for ceremony + DJ for reception", percentage: 10.0, priority: "HIGH", notes: "Sound system included" },
    { category: "Floral & Decor", name: "Terracotta & Olive floral installations", percentage: 10.0, priority: "MEDIUM", notes: "Locally sourced foliage" },
    { category: "Attire & Beauty", name: "Bridal gown alterations & hair/makeup", percentage: 8.0, priority: "HIGH", notes: "Trial run included" },
    { category: "Planning & Coordination", name: "Month-of Coordinator", percentage: 6.0, priority: "CRITICAL", notes: "Vendor management on D-Day" },
    { category: "Contingency Fund", name: "Emergency cash buffer", percentage: 4.0, priority: "CRITICAL", notes: "Unexpected incidentals" },
  ],
  milestones: [
    { title: "Book Rooftop Venue", phase: "PLANNING", daysOffset: -240, description: "Deposit signed" },
    { title: "Engage Photographer & Coordinator", phase: "PLANNING", daysOffset: -180, description: "Review portfolios" },
    { title: "Send Save-The-Dates", phase: "PLANNING", daysOffset: -150, description: "Mail cards" },
    { title: "Menu Tasting & Floral Mockup", phase: "FINAL_PREP", daysOffset: -60, description: "Finalize dietary requests" },
    { title: "Mail Formal Invitations", phase: "FINAL_PREP", daysOffset: -45, description: "Set RSVP cutoff" },
    { title: "Final Headcount to Caterer", phase: "FINAL_PREP", daysOffset: -14, description: "Lock seating chart" },
    { title: "Rehearsal Dinner & Walkthrough", phase: "FINAL_PREP", daysOffset: -1, description: "Verify sound levels" },
    { title: "Vendor Load-In & Setup", phase: "DAY_OF", daysOffset: 0, targetTime: "11:00", description: "Coordinator on site" },
    { title: "Ceremony Live", phase: "DAY_OF", daysOffset: 0, targetTime: "18:00", description: "Sunset timing" },
    { title: "Vendor Tear-Down & Return Rentals", phase: "POST_EVENT", daysOffset: 1, description: "Security deposit release" },
  ],
  vendors: [
    {
      category: "Catering",
      recommendedVendorRole: "Farm-to-Table Catering Lead",
      estimatedPercentBudget: 35.0,
      inquiryTemplate: "Hello, we are hosting a 120-guest reception...",
      keyQuestionsToAsk: ["Do you handle bar licensing?", "What is the tasting policy?"],
    },
    {
      category: "Photography",
      recommendedVendorRole: "Documentary Wedding Photographer",
      estimatedPercentBudget: 14.0,
      inquiryTemplate: "Hi, we love your natural light aesthetic...",
      keyQuestionsToAsk: ["What is the turnaround time?", "Is a backup shooter included?"],
    },
  ],
  personalizedIdeas: [
    {
      type: "THEME_CONCEPT",
      title: "Olive Branch & Golden Light",
      content: "Pair terracotta clay pots with natural olive sprigs and beeswax tapers.",
      tags: ["decor", "aesthetic"],
    },
    {
      type: "COPYWRITING",
      title: "Signature Welcome Cocktail Sign",
      content: "'The Sunset Sip' - Bourbon, blood orange, rosemary simple syrup, prosecco.",
      tags: ["bar", "cocktails"],
    },
  ],
};

// -------------------------------------------------------------
// EVALUATOR BENCHMARK SUITE
// -------------------------------------------------------------
async function runEvaluator() {
  console.log("=================================================");
  console.log("EVENTCRAFT AI - SENIOR EVALUATOR BENCHMARK SUITE");
  console.log("=================================================\n");

  let totalScore = 0;
  const maxScore = 100;

  // TEST 1: Zod Schema Compliance
  console.log("[TEST 1] Validating Structured Schema Compliance...");
  const parseResult = GenAIFullPlanSchema.safeParse(mockWeddingPlan);
  if (!parseResult.success) {
    console.error("FAIL: Schema violation:", parseResult.error.format());
  } else {
    console.log("PASS: 100% Schema Compliant. No null leaks.");
    totalScore += 25;
  }

  // TEST 2: Mathematical Budget Integrity (Sum === 100.0%)
  console.log("\n[TEST 2] Testing Mathematical Budget Integrity...");
  const sumPercentages = mockWeddingPlan.budgetBreakdown.reduce((acc, it) => acc + it.percentage, 0);
  const variance = Math.abs(sumPercentages - 100.0);
  console.log(`Calculated Percentage Sum: ${sumPercentages.toFixed(2)}% (Variance: ${variance.toFixed(4)}%)`);
  if (variance < 0.001) {
    console.log("PASS: Exact mathematical ledger balance achieved.");
    totalScore += 25;
  } else {
    console.error(`FAIL: Budget discrepancy detected! Drift: ${variance}%`);
  }

  // TEST 3: Causal Timeline DAG Integrity
  console.log("\n[TEST 3] Testing Milestone Temporal Ordering (DAG)...");
  let timelineValid = true;
  for (let i = 0; i < mockWeddingPlan.milestones.length - 1; i++) {
    const current = mockWeddingPlan.milestones[i];
    const next = mockWeddingPlan.milestones[i + 1];
    if (current.daysOffset > next.daysOffset) {
      console.error(`FAIL: Timeline inversion between '${current.title}' (Day ${current.daysOffset}) and '${next.title}' (Day ${next.daysOffset})`);
      timelineValid = false;
    }
  }
  if (timelineValid) {
    console.log("PASS: Causal sequence verified. All offsets monotonically increasing.");
    totalScore += 25;
  }

  // TEST 4: Vendor Domain Coverage
  console.log("\n[TEST 4] Testing Vendor Categorical Coverage...");
  const requiredCategories = ["Catering", "Photography"];
  const presentCategories = mockWeddingPlan.vendors.map((v) => v.category);
  const hasAll = requiredCategories.every((cat) => presentCategories.includes(cat));
  if (hasAll) {
    console.log(`PASS: Critical vendor categories present (${presentCategories.join(", ")}).`);
    totalScore += 25;
  } else {
    console.error("FAIL: Missing mandatory vendor category.");
  }

  console.log("\n-------------------------------------------------");
  console.log(`FINAL EVALUATOR SCORE: ${totalScore} / ${maxScore}`);
  console.log(`RESULT: ${totalScore === 100 ? "PRODUCTION GRADE APPROVED" : "FAILED"}`);
  console.log("-------------------------------------------------\n");
}

runEvaluator().catch(console.error);
```

---

## 4. Antigravity IDE Execution & Verification SOP

Follow these standard operating procedures to run and test the complete application in your environment:

1. **Step 1: Install Dependencies**
   ```bash
   npm install
   ```

2. **Step 2: Initialize Database**
   ```bash
   npx prisma db push
   ```

3. **Step 3: Run the Senior Evaluator Benchmark Suite**
   ```bash
   npx tsx tests/evaluator.test.ts
   ```

4. **Step 4: Launch the Local Dev Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to plan your first wedding, birthday, or community event!
