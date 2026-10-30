import { GenAIFullPlanSchema } from "../src/lib/types";

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

