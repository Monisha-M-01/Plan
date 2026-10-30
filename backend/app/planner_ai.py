import json
import logging
from typing import Optional
from google import genai
from google.genai import types
from app.config import GEMINI_API_KEY
from app.schemas import (
    PlanGenerationRequest,
    GenAIFullPlan,
    BudgetItemGen,
    MilestoneGen,
    VendorGen,
    IdeaGen,
)

logger = logging.getLogger(__name__)

def get_client() -> Optional[genai.Client]:
    if not GEMINI_API_KEY:
        return None
    try:
        return genai.Client(api_key=GEMINI_API_KEY)
    except Exception as e:
        logger.warning(f"Could not initialize GenAI client: {e}")
        return None

def build_prompt(req: PlanGenerationRequest) -> str:
    domain_rules = {
        "WEDDING": "Wedding Standards: 45-50% Venue/Catering, 12-15% Photography/Video, 10% Music/DJ, 10% Floral/Decor, 8% Attire/Beauty, 7% Planner/Contingency. Enforce reverse-chronological milestones from D-240 days down to D-Day run sheet.",
        "BIRTHDAY": "Birthday Standards: 35-40% Venue/Activities, 35% Food/Cake/Drinks, 15% Decor/Favors, 10% Entertainment/Invites.",
        "COMMUNITY": "Community Event Standards: Mandatory permits (D-90), insurance, public safety, stage/AV, sanitation, waste management, volunteer logistics."
    }[req.eventType]

    return f"""You are a Master Event Producer with 30 years experience.
Create an exhaustive, mathematically coherent plan.

EVENT DETAILS:
- Title: {req.title}
- Category: {req.eventType}
- Date: {req.date}
- Location: {req.location}
- Total Budget: {req.currency} {req.totalBudget}
- Guests: {req.guestCount}
- Vibe/Theme: {req.vibeTheme}
- Special Notes: {req.specialRequests or 'None'}

DOMAIN RULES:
{domain_rules}

CONSTRAINTS:
1. sum(budgetBreakdown.percentage) MUST EQUAL 100.0%.
2. Milestones MUST be chronological with negative daysOffset leading to day 0.
3. Generate copy-paste ready inquiry emails for vendors.
"""

def generate_plan(req: PlanGenerationRequest) -> GenAIFullPlan:
    client = get_client()
    if client:
        # Try candidate models supported by current API tier
        candidate_models = ["gemini-3.8-flash", "gemini-flash-latest", "gemini-2.5-flash-lite"]
        prompt = build_prompt(req)
        for model_name in candidate_models:
            try:
                response = client.models.generate_content(
                    model=model_name,
                    contents=prompt,
                    config=types.GenerateContentConfig(
                        temperature=0.3,
                        response_mime_type="application/json",
                        response_schema=GenAIFullPlan,
                    ),
                )
                data = json.loads(response.text)
                plan = GenAIFullPlan.model_validate(data)
                return reconcile_budget_arithmetic(plan)
            except Exception as ex:
                logger.warning(f"Model {model_name} invocation failed: {ex}")
                continue

    # Deterministic domain fallback generator ensuring 100% availability and mathematically sound plans
    return generate_fallback_plan(req)

def generate_fallback_plan(req: PlanGenerationRequest) -> GenAIFullPlan:
    """High-fidelity expert event planner fallback synthesis engine."""
    if req.eventType == "WEDDING":
        budget = [
            BudgetItemGen(category="Venue & Catering", name="Reception Estate & Farm-to-Table Dining", percentage=48.0, priority="CRITICAL", notes="Includes terrace rental, 3-course plated harvest dinner, and sparkling bar service."),
            BudgetItemGen(category="Photography & Video", name="Fine Art Photography & Documentary Video", percentage=14.0, priority="HIGH", notes="Full-day 8-hour coverage, second shooter, drone footage, and color-graded digital gallery."),
            BudgetItemGen(category="Florals & Styling", name="Tuscan Floral Installations & Terracotta Decor", percentage=10.0, priority="MEDIUM", notes="Peach garden roses, olive foliage, terracotta table urns, and atmospheric festoon lighting."),
            BudgetItemGen(category="Music & Audio", name="Acoustic Guitar Ceremony & Evening DJ", percentage=10.0, priority="HIGH", notes="Live acoustic strings for ceremony/cocktails and sound engineer + DJ for dancing."),
            BudgetItemGen(category="Attire & Beauty", name="Bridal Styling, Hair & Makeup", percentage=8.0, priority="MEDIUM", notes="Hair & makeup trials and day-of on-site styling suite for wedding party."),
            BudgetItemGen(category="Contingency Reserve", name="Weather & Overrun Protection", percentage=10.0, priority="CRITICAL", notes="Dedicated reserve for weather contingencies and overtime staffing buffer."),
        ]
        milestones = [
            MilestoneGen(title="Lock Estate Venue & Secure Date", phase="PLANNING", daysOffset=-180, targetTime="10:00 AM", description="Sign contract with Napa Valley estate terrace, submit initial 25% deposit, and review sound ordinance permits."),
            MilestoneGen(title="Tasting & Menu Finalization", phase="PLANNING", daysOffset=-120, targetTime="01:00 PM", description="Conduct seasonal food and wine tasting with the executive chef; lock in vegetarian/dietary options."),
            MilestoneGen(title="Lock Photographer & Entertainment", phase="PLANNING", daysOffset=-90, targetTime="03:00 PM", description="Contract photographer for 8-hour timeline and brief acoustic guitarist on ceremonial repertoire."),
            MilestoneGen(title="Dispatch Official Invitations", phase="PLANNING", daysOffset=-60, targetTime="09:00 AM", description="Send invitation suite with RSVP cards, dietary queries, and accommodations card."),
            MilestoneGen(title="Final Walkthrough with Key Vendors", phase="FINAL_PREP", daysOffset=-30, targetTime="11:00 AM", description="On-site venue walkthrough with florist, caterer, and stage sound engineer to map power and load-in path."),
            MilestoneGen(title="Final Headcount & Table Chart Delivery", phase="FINAL_PREP", daysOffset=-7, targetTime="05:00 PM", description="Submit final guaranteed guest count to caterer and deliver printed seating charts and escort cards."),
            MilestoneGen(title="Guest Arrival & Welcome Spritz", phase="DAY_OF", daysOffset=0, targetTime="04:30 PM", description="Guests arrive at terrace; welcome with sparkling peach spritz and acoustic Spanish guitar preludes."),
            MilestoneGen(title="Ceremony & Vows Exchange", phase="DAY_OF", daysOffset=0, targetTime="05:15 PM", description="Golden hour ceremony begins against the vineyard backdrop."),
            MilestoneGen(title="Dinner Reception & Golden Hour Speeches", phase="DAY_OF", daysOffset=0, targetTime="06:45 PM", description="Plated seasonal dinner served; toasts given during sunset."),
            MilestoneGen(title="First Dance & Evening Party", phase="DAY_OF", daysOffset=0, targetTime="08:15 PM", description="DJ takes over; dance floor opens with ambient festoon lighting."),
            MilestoneGen(title="Vendor Load-Out & Deposit Reconciliation", phase="POST_EVENT", daysOffset=1, targetTime="11:00 AM", description="Oversee estate cleanup inspection and sign off on security deposit release."),
        ]
        vendors = [
            VendorGen(
                category="Catering & Hospitality",
                recommendedVendorRole="Artisan Farm-to-Table Caterer",
                estimatedPercentBudget=48.0,
                inquiryTemplate=f"Hello, We are organizing '{req.title}' on {req.date} in {req.location} for {req.guestCount} guests. We love your seasonal approach and would like to review sample multi-course menus and bar packages that align with a {req.vibeTheme} vibe. Please let us know your date availability and booking procedure. Warm regards.",
                keyQuestionsToAsk=["Is table service and glassware included in per-plate estimates?", "What is your staff-to-guest ratio for seated dinner?", "Do you provide complimentary food tastings prior to contract signing?"]
            ),
            VendorGen(
                category="Photography & Media",
                recommendedVendorRole="Editorial Fine Art Photographer",
                estimatedPercentBudget=14.0,
                inquiryTemplate=f"Dear Studio Team, We are planning our event '{req.title}' on {req.date} in {req.location}. We are looking for an 8-hour documentary photography package covering preparations through sunset dancing. Could you share your portfolio and pricing for this date? Best wishes.",
                keyQuestionsToAsk=["How many high-resolution edited images are delivered in the final gallery?", "What is your turnaround timeframe for sneak-peek photos?", "Do you carry comprehensive commercial liability insurance?"]
            ),
            VendorGen(
                category="Florals & Production",
                recommendedVendorRole="Botanical Designer & Lighting Specialist",
                estimatedPercentBudget=10.0,
                inquiryTemplate=f"Hi there, We are seeking a florist and atmospheric designer for our event on {req.date} in {req.location}. Our vision centers around {req.vibeTheme}. We would love to discuss centerpiece concepts and warm festoon lighting installations. Thank you!",
                keyQuestionsToAsk=["Can floral arrangements be repurposed from ceremony to dining tables?", "Do you handle breakdown and strike at the end of the night?", "Can we preview terracotta vessel and candle samples?"]
            ),
            VendorGen(
                category="Music & Sound",
                recommendedVendorRole="Acoustic Duo & Live Event DJ",
                estimatedPercentBudget=10.0,
                inquiryTemplate=f"Hello, We are hosting '{req.title}' on {req.date} and need musical talent for ceremony acoustics transitioning into an evening dance set. Please let us know if you are open for bookings on this date. Thanks!",
                keyQuestionsToAsk=["Do you provide wireless lapel microphones for the ceremony?", "Can you learn customized song requests for key moments?", "What backup equipment do you bring on-site?"]
            )
        ]
        ideas = [
            IdeaGen(type="PALETTE", title="Warm Terra & Peach Blossom", content="Terracotta #D97443, Soft Peach #F9A66C, Olive Leaf #606C38, Warm Cream #FFF4EA, and Deep Espresso Charcoal #2B2118.", tags=["terracotta", "peach", "earthy"]),
            IdeaGen(type="THEME_CONCEPT", title="Sun-Drenched Tuscan Vineyard Terrace", content="Communal warm wooden tables dressed with raw natural linen runners, aged terracotta planters overflowing with citrus sprigs and fragrant rosemary, illuminated by amber cafe string lights as twilight falls.", tags=["tuscan", "vineyard", "al-fresco"]),
            IdeaGen(type="COPYWRITING", title="Welcome Signage & Menu Poetry", content="'Welcome to our table under the golden sky. Here is to lingering conversations, local wine, and memories that outlast the sunset.'", tags=["signage", "menu", "copy"]),
            IdeaGen(type="ACTIVITY", title="Signature Peach Spritz & Polaroid Guestbook", content="Guests are greeted with fresh white-peach sparkling spritzes with rosemary sprigs, then snapshot a vintage Polaroid to pin into an heirloom linen guestbook.", tags=["cocktails", "polaroid", "interactive"]),
        ]
        summary = f"A sunlit Tuscan-inspired celebration designed for {req.guestCount} guests in {req.location}. Balancing pastoral charm with refined culinary excellence and seamless timeline execution."
        contingency = "Ensure an on-site marquee or covered verandah plan B is on hold with the venue 14 days in advance to mitigate unseasonable heat or sudden rainfall."
    elif req.eventType == "BIRTHDAY":
        budget = [
            BudgetItemGen(category="Venue & Experiences", name="Private Terrace Lounge & Interactive Games", percentage=40.0, priority="CRITICAL", notes="Venue hire with sound system and dedicated cocktail lounge area."),
            BudgetItemGen(category="Dining & Beverages", name="Curated Tapas, Custom Cake & Craft Cocktails", percentage=35.0, priority="HIGH", notes="Passed hors d'oeuvres, custom birthday cake, and signature drinks bar."),
            BudgetItemGen(category="Atmosphere & Decor", name="Statement Lighting, Photo Vignette & Favors", percentage=15.0, priority="MEDIUM", notes="Custom neon signage, floral arrangements, and personalized guest favors."),
            BudgetItemGen(category="Music & Memories", name="DJ & Roaming Photographer", percentage=10.0, priority="HIGH", notes="4-hour DJ set and photographer capturing candids and group portraits."),
        ]
        milestones = [
            MilestoneGen(title="Lock Venue & Book Date", phase="PLANNING", daysOffset=-45, targetTime="11:00 AM", description="Sign contract with venue and pay security deposit."),
            MilestoneGen(title="Send Digital Invites & Track RSVPs", phase="PLANNING", daysOffset=-30, targetTime="12:00 PM", description="Send invitations with themed dress code instructions and RSVP link."),
            MilestoneGen(title="Design Cake & Finalize Cocktail Menu", phase="FINAL_PREP", daysOffset=-14, targetTime="02:00 PM", description="Order bespoke celebratory cake and select signature cocktails."),
            MilestoneGen(title="Guest Arrivals & Cocktail Reception", phase="DAY_OF", daysOffset=0, targetTime="07:00 PM", description="Welcome drinks and passed canapes as guests arrive."),
            MilestoneGen(title="Toast & Cake Cutting", phase="DAY_OF", daysOffset=0, targetTime="09:00 PM", description="Champagne toast and candle-lighting celebration."),
            MilestoneGen(title="Post-Event Wrap-up", phase="POST_EVENT", daysOffset=1, targetTime="12:00 PM", description="Collect photos and send thank-you notes to attendees."),
        ]
        vendors = [
            VendorGen(category="Dining", recommendedVendorRole="Gourmet Canapes & Bar Catering", estimatedPercentBudget=35.0, inquiryTemplate=f"Hi, We are hosting a celebration '{req.title}' on {req.date} for {req.guestCount} guests. We'd love your tapas and cocktail package details.", keyQuestionsToAsk=["Can you accommodate vegan and gluten-free dietary requests?", "Do you provide barware and bartenders?"]),
            VendorGen(category="Entertainment", recommendedVendorRole="Open-Format Event DJ", estimatedPercentBudget=10.0, inquiryTemplate=f"Hello, Looking for a DJ for '{req.title}' on {req.date}. Please share availability.", keyQuestionsToAsk=["Do you provide wireless mics for toasts?", "Can we supply a custom playlist?"]),
        ]
        ideas = [
            IdeaGen(type="PALETTE", title="Sunset Amber & Rose Gold", content="Pastel Orange #F9A66C, Burnt Amber #C2561A, Rose Gold #E29578, and Warm Cream #FFF4EA.", tags=["amber", "rose-gold"]),
            IdeaGen(type="THEME_CONCEPT", title="Golden Hour Cocktail Soirée", content="Chic lounge seating, warm uplighting, and continuous upbeat lounge music with passed gourmet bites.", tags=["cocktails", "chic"]),
        ]
        summary = f"A celebratory milestone soirée for {req.guestCount} guests in {req.location} blending gourmet bites, creative cocktails, and lively entertainment."
        contingency = "Keep an indoor lounge reserved in case of sudden weather shifts."
    else:  # COMMUNITY
        budget = [
            BudgetItemGen(category="Stage & Audio-Visual", name="Stage, PA Sound System & Lighting Rig", percentage=35.0, priority="CRITICAL", notes="Main stage, microphone array, line-array speakers, and engineer."),
            BudgetItemGen(category="Permits & Safety", name="Municipal Permits, Security & Insurance", percentage=25.0, priority="CRITICAL", notes="City special event permits, EMT station, security guards, and event liability policy."),
            BudgetItemGen(category="Facilities & Sanitation", name="Portable Restrooms, Trash & Recycling", percentage=20.0, priority="HIGH", notes="Accessible sanitation units, waste stations, and post-event cleanup crew."),
            BudgetItemGen(category="Hospitality & Signage", name="Wayfinding Signs, Shade Canopies & Volunteer Hub", percentage=20.0, priority="MEDIUM", notes="Printed directional banners, shade tents, volunteer water and snacks."),
        ]
        milestones = [
            MilestoneGen(title="Submit City Event Permit Application", phase="PLANNING", daysOffset=-90, targetTime="09:00 AM", description="File permit and traffic management plan with municipal authorities."),
            MilestoneGen(title="Procure Staging & Sound Contracts", phase="PLANNING", daysOffset=-60, targetTime="01:00 PM", description="Finalize contract with AV production supplier."),
            MilestoneGen(title="Volunteer Briefing & Site Walk", phase="FINAL_PREP", daysOffset=-7, targetTime="10:00 AM", description="Run volunteer leads through safety protocols and load-in schedules."),
            MilestoneGen(title="Site Open & Gates Unlocked", phase="DAY_OF", daysOffset=0, targetTime="09:00 AM", description="Open gathering to the public; initiate audio checks and volunteer posts."),
            MilestoneGen(title="Site Strike & Waste Audit", phase="POST_EVENT", daysOffset=1, targetTime="08:00 AM", description="Complete ground teardown and return venue in pristine state."),
        ]
        vendors = [
            VendorGen(category="Production", recommendedVendorRole="Outdoor Stage & AV Production House", estimatedPercentBudget=35.0, inquiryTemplate=f"Hello, We are organizing a community gathering '{req.title}' on {req.date} for {req.guestCount} attendees. Please provide a quote for outdoor staging and sound.", keyQuestionsToAsk=["Are generators and fuel included?", "Is a dedicated sound technician on-site all day?"]),
            VendorGen(category="Safety", recommendedVendorRole="Licensed Event Security & First Aid", estimatedPercentBudget=25.0, inquiryTemplate=f"Dear Team, Requesting staffing for public event on {req.date} in {req.location}.", keyQuestionsToAsk=["Are staff certified in crowd management?", "What is the liability insurance limit?"]),
        ]
        ideas = [
            IdeaGen(type="PALETTE", title="Civic Warmth", content="Pastel Orange #F9A66C, Warm Terracotta #E87D35, Deep Forest Green #2A5C3F, and Crisp Linen #FFFFFF.", tags=["civic", "community"]),
            IdeaGen(type="THEME_CONCEPT", title="Open Square Civic Festival", content="Accessible gathering with shaded communal seating, local music, and inclusive community experiences.", tags=["inclusive", "outdoor"]),
        ]
        summary = f"A well-structured community gathering for {req.guestCount} attendees in {req.location} with strong focus on safety, accessibility, and high community engagement."
        contingency = "Arrange emergency weather tents and coordinate with local authorities for contingency parking."

    plan = GenAIFullPlan(
        eventSummary=summary,
        budgetBreakdown=budget,
        milestones=milestones,
        vendors=vendors,
        personalizedIdeas=ideas,
        contingencyAdvice=contingency
    )
    return reconcile_budget_arithmetic(plan)

def reconcile_budget_arithmetic(plan: GenAIFullPlan) -> GenAIFullPlan:
    items = plan.budgetBreakdown
    if not items:
        return plan
    raw_sum = sum(i.percentage for i in items)
    if abs(raw_sum - 100.0) < 0.001:
        return plan
    
    running = 0.0
    for idx, item in enumerate(items):
        if idx == len(items) - 1:
            item.percentage = round(100.0 - running, 2)
        else:
            norm = round((item.percentage / raw_sum) * 100.0, 2)
            item.percentage = norm
            running += norm
    return plan
