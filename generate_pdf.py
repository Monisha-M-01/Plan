import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

def build_pdf(filename="EventCraft_AI_2_Minute_Video_Script.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Custom Color Palette
    PRIMARY = colors.HexColor("#C2561A")      # Burnt Orange
    ACCENT = colors.HexColor("#E87D35")       # Terracotta
    DARK = colors.HexColor("#2B2118")         # Warm Charcoal
    MUTED = colors.HexColor("#6B5B4E")        # Warm Grey
    LIGHT_BG = colors.HexColor("#FFF4EA")     # Soft Peach
    BORDER = colors.HexColor("#F3D3B8")       # Soft Tan
    WHITE = colors.HexColor("#FFFFFF")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=DARK,
        spaceAfter=4
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=PRIMARY,
        spaceAfter=12
    )

    h1_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=PRIMARY,
        spaceBefore=10,
        spaceAfter=6
    )

    h2_style = ParagraphStyle(
        'SubSectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=DARK,
        spaceBefore=6,
        spaceAfter=4
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=DARK
    )

    body_bold = ParagraphStyle(
        'BodyBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=12,
        textColor=DARK
    )

    table_header = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=WHITE
    )

    voice_style = ParagraphStyle(
        'VoiceStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=12,
        textColor=DARK
    )

    action_style = ParagraphStyle(
        'ActionStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=MUTED
    )

    story = []

    # Title Banner
    story.append(Paragraph("EventCraft AI — 2-Minute Video Presentation Script", title_style))
    story.append(Paragraph("Official Hackathon Video Demo Guide • Complete Simple & Technical Versions", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY, spaceBefore=0, spaceAfter=10))

    # Section: Pre-recording checklist & Live input values
    story.append(Paragraph("1. Pre-Recording Checklist & Live Test Values", h1_style))
    
    setup_data = [
        [
            Paragraph("Parameter", table_header),
            Paragraph("Value to Enter Live on Screen", table_header),
            Paragraph("Purpose & Verification", table_header)
        ],
        [
            Paragraph("Event Category", body_bold),
            Paragraph("Wedding", body_style),
            Paragraph("Triggers 48% venue/catering benchmark & D-240 timeline rules", body_style)
        ],
        [
            Paragraph("Event Title", body_bold),
            Paragraph("Golden Hour Terrace Reception", body_style),
            Paragraph("Real-time reactive header update in right blueprint preview", body_style)
        ],
        [
            Paragraph("Target Date", body_bold),
            Paragraph("2026-09-18 (Test error: yesterday first)", body_style),
            Paragraph("Proves past-date error validation, then computes days-to-go", body_style)
        ],
        [
            Paragraph("Location", body_bold),
            Paragraph("Napa Valley, CA", body_style),
            Paragraph("Demonstrates localized vendor and logistics generation", body_style)
        ],
        [
            Paragraph("Budget & Guests", body_bold),
            Paragraph("$35,000 | 120 Attendees", body_style),
            Paragraph("Calculates $292/guest intensity; verifies exact 100% budget sum", body_style)
        ],
        [
            Paragraph("Theme Directive", body_bold),
            Paragraph("Sun-drenched Tuscan picnic, peach linens", body_style),
            Paragraph("Generates custom palette (#C86D51, #F9A66C) and vendor RFPs", body_style)
        ],
    ]
    t_setup = Table(setup_data, colWidths=[1.3*inch, 2.7*inch, 3.4*inch])
    t_setup.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [WHITE, LIGHT_BG]),
    ]))
    story.append(t_setup)
    story.append(Spacer(1, 10))

    # Section: Version 1 - Simple Terms
    story.append(Paragraph("2. Version 1: Simple Terms Script (Conversational & Natural)", h1_style))
    story.append(Paragraph("Best for: General audiences, intuitive walkthrough, smooth pacing.", action_style))
    story.append(Spacer(1, 4))

    v1_data = [
        [
            Paragraph("Timecode", table_header),
            Paragraph("What to Do on Screen", table_header),
            Paragraph("Spoken Narration (What to Say)", table_header)
        ],
        [
            Paragraph("0:00 – 0:25<br/>(Intro)", body_bold),
            Paragraph("• Start at http://localhost:5173<br/>• Show full-width studio workspace<br/>• Point to FastAPI: Live badge", action_style),
            Paragraph('"Hi everyone! This is EventCraft AI—an intelligent event planner that helps anyone plan weddings, birthday parties, or community gatherings in seconds.<br/><br/>Instead of messy spreadsheets, we built an asymmetric studio: left side to configure details, and right side with instant live previews before you even click generate."', voice_style)
        ],
        [
            Paragraph("0:25 – 0:50<br/>(Edge Case & Live Input)", body_bold),
            Paragraph("• Select yesterday's date or 0 budget<br/>• Click Generate → show red warning<br/>• Type valid data live on screen<br/>• Point to reactive countdown & $292/guest", action_style),
            Paragraph('"First, notice error handling: picking a date in the past immediately gives a clear warning.<br/><br/>Now let\'s enter real details: a 120-guest wedding in Napa Valley with a $35,000 budget. Notice how the right panel computes the countdown and $292 per-guest cost live as I type."', voice_style)
        ],
        [
            Paragraph("0:50 – 1:25<br/>(AI Synthesis & Results)", body_bold),
            Paragraph("• Click Generate Event Plan<br/>• Highlight spinner & shimmer<br/>• Confetti triggers!<br/>• Click Budget, Timeline, Vendor, & Ideas tabs", action_style),
            Paragraph('"Now I click Generate. In seconds, Google Gemini builds our complete blueprint.<br/><br/>Under Budget, every dollar adds up exactly to our $35,000 budget with zero math errors. The Timeline maps milestones from months out down to party day. Under Vendors, it even wrote ready-to-send inquiry emails and questions."', voice_style)
        ],
        [
            Paragraph("1:25 – 1:50<br/>(Saved & Directory)", body_bold),
            Paragraph("• Click \'Saved Events\' in top nav<br/>• Click \'Open Plan\' on a card<br/>• Click \'Vendor Directory\'<br/>• Filter category & click Copy RFP", action_style),
            Paragraph('"Everything is saved automatically to our local database. In Saved Events, I can reopen any previous blueprint with one click.<br/><br/>We also built a Vendor Directory where you can browse vetted vendor standards and copy ready email inquiries instantly."', voice_style)
        ],
        [
            Paragraph("1:50 – 2:00<br/>(Outro)", body_bold),
            Paragraph("• Scroll to top view of the plan<br/>• Show polished pastel studio", action_style),
            Paragraph('"EventCraft AI turns hours of event stress into an automated, precision workflow. Thanks for watching!"', voice_style)
        ],
    ]
    t_v1 = Table(v1_data, colWidths=[1.1*inch, 2.7*inch, 3.6*inch])
    t_v1.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [WHITE, LIGHT_BG]),
    ]))
    story.append(t_v1)

    story.append(PageBreak())

    # Section: Version 2 - Technical Terms
    story.append(Paragraph("3. Version 2: Technical Terms Script (Engineering & Hackathon Judges)", h1_style))
    story.append(Paragraph("Best for: Engineering evaluations, demonstrating full-stack architecture & AI schemas.", action_style))
    story.append(Spacer(1, 4))

    v2_data = [
        [
            Paragraph("Timecode", table_header),
            Paragraph("What to Do on Screen", table_header),
            Paragraph("Technical Narration (What to Say)", table_header)
        ],
        [
            Paragraph("0:00 – 0:25<br/>(Architecture)", body_bold),
            Paragraph("• Display 12-col asymmetric grid<br/>• Point to FastAPI: Live status<br/>• Highlight WCAG AA contrast palette", action_style),
            Paragraph('"Hello judges. This is EventCraft AI—an intelligent event engineering suite.<br/><br/>Our architecture pairs a React 18 and Vite frontend utilizing Tailwind and Framer Motion with a Python FastAPI backend, SQLAlchemy ORM, and Google Gemini. We designed an asymmetric two-pane studio prioritizing WCAG AA contrast and zero layout shift."', voice_style)
        ],
        [
            Paragraph("0:25 – 0:50<br/>(Validation & State)", body_bold),
            Paragraph("• Input past date / $0 budget<br/>• Show accessible inline error alert<br/>• Enter valid Napa wedding specs<br/>• Highlight reactive blueprint math", action_style),
            Paragraph('"To ensure state integrity, client-side validation instantly flags non-positive budgets or dates in the past with ARIA alerts.<br/><br/>As valid parameters are typed, our client state dynamically computes countdown horizons, attendee intensity, and domain capital allocation benchmarks in real time prior to API submission."', voice_style)
        ],
        [
            Paragraph("0:50 – 1:25<br/>(GenAI & Reconciliation)", body_bold),
            Paragraph("• Click Generate Event Plan<br/>• Show loading shimmer state<br/>• Review Budget Ledger (100.0% sum)<br/>• Review Timeline (D-240 to D-Day)<br/>• Review Vendor RFPs & Ideas", action_style),
            Paragraph('"On submission, FastAPI prompts Google Gemini via structured Pydantic schemas. Gemini synthesizes a full JSON blueprint.<br/><br/>Our backend reconciliation algorithm mathematically enforces that all category percentages sum strictly to 100.0% with zero rounding drift. The response maps reverse-chronological milestones, customized vendor RFPs, and color palettes."', voice_style)
        ],
        [
            Paragraph("1:25 – 1:50<br/>(Persistence & Catalog)", body_bold),
            Paragraph("• Open \'Saved Events\' modal<br/>• Query GET /api/events<br/>• Open \'Vendor Directory\' modal<br/>• Copy inquiry template with feedback", action_style),
            Paragraph('"Generated blueprints persist to SQLite via SQLAlchemy. Clicking \'Saved Events\' executes a GET /api/events query to inspect, reload, or delete records.<br/><br/>We also built a Vendor Directory modal with standard percentage allocations and copyable inquiry templates with instant clipboard feedback."', voice_style)
        ],
        [
            Paragraph("1:50 – 2:00<br/>(Deployment & Outro)", body_bold),
            Paragraph("• Show clean production interface<br/>• Note Render & Vercel readiness", action_style),
            Paragraph('"Configured for deployment on Render with Uvicorn and Vercel with automatic CORS regex handling, EventCraft AI converts complex logistics into an automated, precision system. Thank you!"', voice_style)
        ],
    ]
    t_v2 = Table(v2_data, colWidths=[1.1*inch, 2.7*inch, 3.6*inch])
    t_v2.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [WHITE, LIGHT_BG]),
    ]))
    story.append(t_v2)
    story.append(Spacer(1, 10))

    # Section: Hackathon Evaluation Checklist
    story.append(Paragraph("4. Hackathon Submission Criteria Compliance Matrix", h1_style))
    checklist_data = [
        [
            Paragraph("Checklist Requirement", table_header),
            Paragraph("How It Is Demonstrated in This 2-Min Walkthrough", table_header)
        ],
        [
            Paragraph("Core features in logical order", body_bold),
            Paragraph("Configuration -> Live Blueprint Preview -> AI Generation -> Results Analysis -> Saved DB & Directory", body_style)
        ],
        [
            Paragraph("Data entered live, not pre-filled", body_bold),
            Paragraph("You type 'Golden Hour Terrace Reception', 'Napa Valley', '$35,000' live while recording.", body_style)
        ],
        [
            Paragraph("Success AND error/edge cases shown", body_bold),
            Paragraph("Demonstrated at 0:25 by picking a date in the past, triggering immediate validation warning.", body_style)
        ],
        [
            Paragraph("GenAI usage clearly pointed out", body_bold),
            Paragraph("FastAPI invoking Google Gemini with structured Pydantic schemas highlighted during generation.", body_style)
        ],
        [
            Paragraph("AI responses shown to be dynamic", body_bold),
            Paragraph("Demonstrated unique Napa wine pairing notes, D-240 vineyard contract milestones, and specific RFP text.", body_style)
        ],
        [
            Paragraph("Total video length under 4 minutes", body_bold),
            Paragraph("Timed precisely for 1 minute 50 seconds to 2 minutes total duration.", body_style)
        ],
    ]
    t_chk = Table(checklist_data, colWidths=[2.6*inch, 4.8*inch])
    t_chk.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [WHITE, LIGHT_BG]),
    ]))
    story.append(t_chk)

    doc.build(story)
    print(f"PDF successfully generated: {filename}")

if __name__ == "__main__":
    build_pdf()

