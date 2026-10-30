export interface PlanGenerationRequest {
  title: string;
  eventType: "WEDDING" | "BIRTHDAY" | "COMMUNITY";
  date: string;
  location: string;
  totalBudget: number;
  currency: string;
  guestCount: number;
  vibeTheme: string;
  specialRequests?: string;
}

export interface BudgetItem {
  id: string;
  category: string;
  name: string;
  allocated: number;
  spent: number;
  priority: string;
  notes?: string;
}

export interface Milestone {
  id: string;
  title: string;
  phase: string;
  daysOffset: number;
  targetTime?: string | null;
  status: string;
  description?: string;
}

export interface Vendor {
  id: string;
  category: string;
  name: string;
  estimatedCost: number;
  inquiryTemplate: string;
  questions: string[];
}

export interface CreativeIdea {
  id: string;
  type: string;
  title: string;
  content: string;
  tags?: string;
}

export interface EventDetail {
  id: string;
  title: string;
  eventType: string;
  date: string;
  location: string;
  totalBudget: number;
  currency: string;
  guestCount: number;
  vibeTheme: string;
  summary?: string;
  contingencyAdvice?: string;
  budgetItems: BudgetItem[];
  milestones: Milestone[];
  vendors: Vendor[];
  ideas: CreativeIdea[];
}

