import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def create_deck(output_path):
    prs = Presentation()
    # Set 16:9 widescreen dimensions
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Color Palette
    BG_DARK = RGBColor(15, 23, 42)       # Slate 900
    BG_CARD = RGBColor(30, 41, 59)       # Slate 800
    TEXT_LIGHT = RGBColor(248, 250, 252) # Slate 50
    TEXT_MUTED = RGBColor(148, 163, 184) # Slate 400
    ACCENT_CYAN = RGBColor(56, 189, 248) # Sky 400
    ACCENT_GREEN = RGBColor(52, 211, 153)# Emerald 400
    ACCENT_ORANGE = RGBColor(251, 146, 60)# Amber 400
    BORDER_COLOR = RGBColor(51, 65, 85)  # Slate 700

    def add_bg(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = BG_DARK
        bg.line.fill.background()
        return bg

    def add_header(slide, tag, title, subtitle):
        add_bg(slide)

        # Tag
        tag_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.45), Inches(11), Inches(0.4))
        tf = tag_box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = tag.upper()
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = ACCENT_CYAN

        # Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.8), Inches(11.5), Inches(0.7))
        tf2 = title_box.text_frame
        tf2.word_wrap = True
        p2 = tf2.paragraphs[0]
        p2.text = title
        p2.font.size = Pt(26)
        p2.font.bold = True
        p2.font.color.rgb = TEXT_LIGHT

        # Subtitle
        sub_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.5), Inches(11.5), Inches(0.45))
        tf3 = sub_box.text_frame
        tf3.word_wrap = True
        p3 = tf3.paragraphs[0]
        p3.text = subtitle
        p3.font.size = Pt(13)
        p3.font.color.rgb = TEXT_MUTED

    def add_card(slide, left, top, width, height, title, items, badge="", badge_color=ACCENT_CYAN):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(left), Inches(top), Inches(width), Inches(height))
        card.fill.solid()
        card.fill.fore_color.rgb = BG_CARD
        card.line.color.rgb = BORDER_COLOR
        card.line.width = Pt(1.5)

        tx = slide.shapes.add_textbox(Inches(left + 0.25), Inches(top + 0.2), Inches(width - 0.5), Inches(height - 0.4))
        tf = tx.text_frame
        tf.word_wrap = True

        if badge:
            pb = tf.paragraphs[0]
            pb.text = badge.upper()
            pb.font.size = Pt(9.5)
            pb.font.bold = True
            pb.font.color.rgb = badge_color
            pb.space_after = Pt(4)
            pt = tf.add_paragraph()
        else:
            pt = tf.paragraphs[0]

        pt.text = title
        pt.font.size = Pt(17)
        pt.font.bold = True
        pt.font.color.rgb = TEXT_LIGHT
        pt.space_after = Pt(12)

        for item in items:
            pi = tf.add_paragraph()
            pi.text = "•  " + item
            pi.font.size = Pt(12)
            pi.font.color.rgb = TEXT_MUTED
            pi.space_after = Pt(7)

    # ----------------------------------------------------
    # SLIDE 1: Title Slide
    # ----------------------------------------------------
    s1 = prs.slides.add_slide(blank_layout)
    add_bg(s1)

    # Accent pill
    pill = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.6), Inches(3.2), Inches(0.42))
    pill.fill.solid()
    pill.fill.fore_color.rgb = BG_CARD
    pill.line.color.rgb = ACCENT_CYAN
    ptxt = s1.shapes.add_textbox(Inches(0.8), Inches(1.6), Inches(3.2), Inches(0.42))
    ptxt.text_frame.word_wrap = True
    pp = ptxt.text_frame.paragraphs[0]
    pp.text = "🚀 NEXT-GEN EDTECH PLATFORM"
    pp.font.size = Pt(11)
    pp.font.bold = True
    pp.font.color.rgb = ACCENT_CYAN
    pp.alignment = PP_ALIGN.CENTER

    # Hero Title
    tb = s1.shapes.add_textbox(Inches(0.8), Inches(2.2), Inches(11.5), Inches(1.8))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "Road2Code"
    p.font.size = Pt(56)
    p.font.bold = True
    p.font.color.rgb = TEXT_LIGHT

    p2 = tf.add_paragraph()
    p2.text = "Outcome-Driven Career Roadmap & Paid Mentorship Platform"
    p2.font.size = Pt(22)
    p2.font.color.rgb = ACCENT_CYAN
    p2.space_before = Pt(8)

    # Subtitle Description
    tb2 = s1.shapes.add_textbox(Inches(0.8), Inches(4.3), Inches(11), Inches(1.2))
    tf2 = tb2.text_frame
    tf2.word_wrap = True
    p3 = tf2.paragraphs[0]
    p3.text = "Bridging the gap between student learning and industry employment with hands-on sandboxes, 24/7 AI tutoring, verified code reviews, and guaranteed partner job interviews."
    p3.font.size = Pt(15)
    p3.font.color.rgb = TEXT_MUTED

    # Presenter info card
    card_info = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.8), Inches(11.7), Inches(0.9))
    card_info.fill.solid()
    card_info.fill.fore_color.rgb = BG_CARD
    card_info.line.color.rgb = BORDER_COLOR
    cit = s1.shapes.add_textbox(Inches(1.1), Inches(5.95), Inches(11), Inches(0.6))
    c_p = cit.text_frame.paragraphs[0]
    c_p.text = "Project By: Khushboo Ahuja  |  Tech Stack: React 19, Vite 8, React Router 7  |  Year: 2026"
    c_p.font.size = Pt(13)
    c_p.font.color.rgb = TEXT_LIGHT
    c_p.font.bold = True

    # ----------------------------------------------------
    # SLIDE 2: The Problem
    # ----------------------------------------------------
    s2 = prs.slides.add_slide(blank_layout)
    add_header(s2, "Industry Landscape", "The Problem: Why Traditional E-Learning Fails", "Over 90% of online course enrollments are abandoned before completion.")

    add_card(s2, 0.8, 2.2, 3.6, 4.6, "1. Passive Video Fatigue", [
        "Students get stuck in tutorial hell watching endless videos.",
        "Zero active coding enforcement leads to quick cognitive burnout.",
        "No real-world problem solving or build experience."
    ], "THE LEARNER TRAP", ACCENT_ORANGE)

    add_card(s2, 4.8, 2.2, 3.6, 4.6, "2. No Verified Proof of Work", [
        "Certificate of completion only proves a video was played.",
        "Recruiters reject generic, copy-pasted portfolio repositories.",
        "Lack of standardized code reviews and qualitative feedback."
    ], "CREDENTIAL INFLATION", ACCENT_ORANGE)

    add_card(s2, 8.8, 2.2, 3.6, 4.6, "3. Expensive & Broken Placements", [
        "Bootcamps charge ₹30,000 to ₹1,00,000, unaffordable for Tier-2/3.",
        "No direct interview scheduling or hiring partner pipelines.",
        "College placement cells (TPOs) lack real-time skill analytics."
    ], "THE CAREER VOID", ACCENT_ORANGE)

    # ----------------------------------------------------
    # SLIDE 3: The Solution
    # ----------------------------------------------------
    s3 = prs.slides.add_slide(blank_layout)
    add_header(s3, "Product Vision", "The Road2Code Solution: Outcome-Driven Acceleration", "A unified ecosystem designed around active building, continuous mentorship, and verified employment.")

    add_card(s3, 0.8, 2.2, 3.6, 4.6, "1. Learn by Doing", [
        "Structured 8-stop roadmaps across 12 distinct tech careers.",
        "In-browser HTML/CSS/JS Playground with instant preview.",
        "24/7 Contextual 'Roady' AI Tutor for on-demand debugging."
    ], "ACTIVE MASTERY", ACCENT_GREEN)

    add_card(s3, 4.8, 2.2, 3.6, 4.6, "2. Human Mentorship", [
        "Daily 7:00 PM IST live mentor doubt clearing sessions.",
        "GitHub repository and live URL project submission.",
        "Mentor grading (1-5 stars) and qualitative code reviews."
    ], "EXPERT GUIDANCE", ACCENT_GREEN)

    add_card(s3, 8.8, 2.2, 3.6, 4.6, "3. Career Launchpad", [
        "1-Click ATS Resume Builder populated with coursework.",
        "Public recruiter-ready Portfolio (/portfolio/:student).",
        "Direct partner job interviews with real countdown booking."
    ], "VERIFIABLE OUTCOMES", ACCENT_GREEN)

    # ----------------------------------------------------
    # SLIDE 4: Product Architecture & Flow
    # ----------------------------------------------------
    s4 = prs.slides.add_slide(blank_layout)
    add_header(s4, "User Journey", "End-to-End Student Progression Workflow", "A frictionless funnel from initial career discovery to verified hiring.")

    add_card(s4, 0.8, 2.2, 2.7, 4.6, "Phase 1: Discover", [
        "6-Question Career Quiz",
        "Curriculum Route Generator",
        "Visual Tech Prerequisites",
        "12 Specialization Tracks"
    ], "STEP 01", ACCENT_CYAN)

    add_card(s4, 3.8, 2.2, 2.7, 4.6, "Phase 2: Try & Buy", [
        "3-Day Free Demo (No card)",
        "Stops 1 & 2 full access",
        "Demo live session access",
        "₹499 one-time unlock (UPI/Card)"
    ], "STEP 02", ACCENT_CYAN)

    add_card(s4, 6.8, 2.2, 2.7, 4.6, "Phase 3: Build & Earn", [
        "Daily Streaks (🔥) & XP",
        "Cohort Leaderboard ranks",
        "GitHub project submissions",
        "Mentor 5-star code reviews"
    ], "STEP 03", ACCENT_CYAN)

    add_card(s4, 9.8, 2.2, 2.7, 4.6, "Phase 4: Place", [
        "Cryptographic A4 Certificate",
        "ATS 1-Click Resume Builder",
        "Public Proof Portfolio",
        "Partner Job Interviews"
    ], "STEP 04", ACCENT_GREEN)

    # ----------------------------------------------------
    # SLIDE 5: Key Platform Innovations
    # ----------------------------------------------------
    s5 = prs.slides.add_slide(blank_layout)
    add_header(s5, "Technological Features", "Core Platform Innovations & Interactive Tools", "Built with modern React 19 architecture without bloated third-party dependencies.")

    add_card(s5, 0.8, 2.2, 5.6, 2.2, "In-Browser Code Playground", [
        "Embedded live HTML/CSS render engine and JS console evaluator.",
        "Zero local setup required for beginners to experiment and verify code."
    ], "HANDS-ON TOOL")

    add_card(s5, 6.8, 2.2, 5.6, 2.2, "'Roady' 24/7 Contextual AI Tutor", [
        "Stop-aware AI assistant that explains concepts and provides interview tips.",
        "Interactive query chip triggers for syntax doubts and real-world architectures."
    ], "AI ASSISTANT")

    add_card(s5, 0.8, 4.65, 5.6, 2.2, "1-Click ATS Resume Builder", [
        "Auto-extracts completed tracks, certified skills, and verified projects.",
        "Produces clean 1-page standard ATS resumes with Print-to-PDF styles."
    ], "CAREER TOOL")

    add_card(s5, 6.8, 4.65, 5.6, 2.2, "Campus TPO Analytics Portal", [
        "B2B Institutional dashboard for college Training & Placement Officers.",
        "Real-time batch progress tracking, readiness metrics, and CSV export."
    ], "B2B INSTITUTIONAL")

    # ----------------------------------------------------
    # SLIDE 6: Business & Monetization Model
    # ----------------------------------------------------
    s6 = prs.slides.add_slide(blank_layout)
    add_header(s6, "Business Model", "Sustainable High-Margin Revenue Architecture", "Unit economics engineered for mass affordability and institutional scale.")

    add_card(s6, 0.8, 2.2, 3.6, 4.6, "B2C Course Revenue", [
        "₹499 One-Time per Course",
        "Accessible to Tier-2/3 students.",
        "3-Day demo drives high conversion.",
        "Full perks: Notes + Doubts + Jobs."
    ], "CORE B2C REVENUE", ACCENT_GREEN)

    add_card(s6, 4.8, 2.2, 3.6, 4.6, "Upsells & Monetization", [
        "₹299 1-on-1 Mentor Calls: 45-min private mock interviews & resume review.",
        "Corporate Recruiter Fees: Per-hire fee for pre-vetted top cohort talent."
    ], "HIGH-MARGIN UPSELLS", ACCENT_GREEN)

    add_card(s6, 8.8, 2.2, 3.6, 4.6, "B2B & Viral Loops", [
        "Campus TPO Subscriptions: Annual college batch licensing for tracking.",
        "Student Affiliate (Refer & Earn): ₹50 friend discount + ₹100 student reward."
    ], "B2B & ORGANIC GROWTH", ACCENT_GREEN)

    # ----------------------------------------------------
    # SLIDE 7: Technical Architecture
    # ----------------------------------------------------
    s7 = prs.slides.add_slide(blank_layout)
    add_header(s7, "Engineering Highlights", "Frontend Architecture & System Design", "Decoupled Service-Layer design ready for immediate backend integration.")

    add_card(s7, 0.8, 2.2, 3.6, 4.6, "Frontend & Build", [
        "React 19 Functional Architecture.",
        "Vite 8 bundle build in < 150ms.",
        "React Router 7 nested routing.",
        "Lucide React unified iconography."
    ], "MODERN TECH STACK")

    add_card(s7, 4.8, 2.2, 3.6, 4.6, "Service-Oriented Design", [
        "9 isolated service modules:",
        "enrollmentService, mentorService, jobService, certificateService,",
        "streakService, projectService, etc.",
        "Plug-and-play for Supabase/Firebase."
    ], "SERVICES ARCHITECTURE")

    add_card(s7, 8.8, 2.2, 3.6, 4.6, "Safety & Reliability", [
        "Centralized safeRead/safeWrite storage handlers against corrupt JSON.",
        "Timestamp-driven math immune to refresh/timer resets.",
        "Zero lint warnings (oxlint clean)."
    ], "SYSTEM INTEGRITY")

    # ----------------------------------------------------
    # SLIDE 8: Competitive Advantage
    # ----------------------------------------------------
    s8 = prs.slides.add_slide(blank_layout)
    add_header(s8, "Market Comparison", "How Road2Code Outperforms Alternatives", "Comparing Road2Code against traditional MOOCs and expensive offline bootcamps.")

    add_card(s8, 0.8, 2.2, 3.6, 4.6, "Traditional MOOCs", [
        "Price: ₹500 - ₹3,000",
        "Format: Passive recorded videos.",
        "Doubts: Abandoned Q&A forums.",
        "Completion Rate: < 10%.",
        "Jobs: No direct hiring guarantee."
    ], "UDEMY / COURSERA", ACCENT_ORANGE)

    add_card(s8, 4.8, 2.2, 3.6, 4.6, "Coding Bootcamps", [
        "Price: ₹30,000 - ₹1,00,000+",
        "Format: Cohort live lectures.",
        "Flexibility: Strict, rigid schedules.",
        "Accessibility: Elitist & unaffordable for typical college students."
    ], "EXPENSIVE BOOTCAMPS", ACCENT_ORANGE)

    add_card(s8, 8.8, 2.2, 3.6, 4.6, "Road2Code Advantage", [
        "Price: Only ₹499 per course.",
        "Format: Hands-on active learning.",
        "Doubts: Daily 7 PM live mentorship.",
        "Proof: Mentor-graded GitHub projects.",
        "Hiring: Pre-scheduled partner slots."
    ], "ROAD2CODE EDGE", ACCENT_GREEN)

    # ----------------------------------------------------
    # SLIDE 9: Future Roadmap & Growth
    # ----------------------------------------------------
    s9 = prs.slides.add_slide(blank_layout)
    add_header(s9, "Future Vision", "Future Milestones & Scalability Roadmap", "Expanding from browser demonstration into an industry-grade nationwide platform.")

    add_card(s9, 0.8, 2.2, 3.6, 4.6, "Phase 1: Cloud & Auth", [
        "Connect Supabase PostgreSQL backend.",
        "Integrate OAuth (Google & GitHub).",
        "Live Razorpay test/production mode.",
        "Cloud storage for project media."
    ], "BACKEND INTEGRATION")

    add_card(s9, 4.8, 2.2, 3.6, 4.6, "Phase 2: Live Collaboration", [
        "WebRTC powered peer coding rooms.",
        "Mentor live audio/video streaming.",
        "Automated GitHub action CI/CD test grading on student repositories."
    ], "REAL-TIME LEARNING")

    add_card(s9, 8.8, 2.2, 3.6, 4.6, "Phase 3: Corporate Tie-Ups", [
        "Scale B2B Campus TPO pilots across 50+ regional engineering colleges.",
        "Direct recruiter dashboard with verified candidate shortlisting."
    ], "INSTITUTIONAL EXPANSION")

    # ----------------------------------------------------
    # SLIDE 10: Conclusion & Q&A
    # ----------------------------------------------------
    s10 = prs.slides.add_slide(blank_layout)
    add_bg(s10)

    # Center box
    c_box = s10.shapes.add_textbox(Inches(1.5), Inches(1.8), Inches(10.3), Inches(4.0))
    c_tf = c_box.text_frame
    c_tf.word_wrap = True

    cp1 = c_tf.paragraphs[0]
    cp1.text = "Thank You!"
    cp1.font.size = Pt(48)
    cp1.font.bold = True
    cp1.font.color.rgb = TEXT_LIGHT
    cp1.alignment = PP_ALIGN.CENTER

    cp2 = c_tf.add_paragraph()
    cp2.text = "Road2Code — Empowering the Next Generation of Developers"
    cp2.font.size = Pt(20)
    cp2.font.color.rgb = ACCENT_CYAN
    cp2.alignment = PP_ALIGN.CENTER
    cp2.space_before = Pt(14)

    cp3 = c_tf.add_paragraph()
    cp3.text = "Interactive Roadmap  •  Active Sandbox  •  Mentor Code Reviews  •  Partner Placements"
    cp3.font.size = Pt(14)
    cp3.font.color.rgb = TEXT_MUTED
    cp3.alignment = PP_ALIGN.CENTER
    cp3.space_before = Pt(10)

    # Info footer
    foot_card = s10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(2.2), Inches(5.2), Inches(9.0), Inches(1.1))
    foot_card.fill.solid()
    foot_card.fill.fore_color.rgb = BG_CARD
    foot_card.line.color.rgb = BORDER_COLOR
    ftx = s10.shapes.add_textbox(Inches(2.4), Inches(5.35), Inches(8.6), Inches(0.8))
    fp = ftx.text_frame.paragraphs[0]
    fp.text = "GitHub: github.com/ahujakhushi2007-lgtm/Road2Code\nReady for Live Demonstration & Questions"
    fp.font.size = Pt(13)
    fp.font.color.rgb = TEXT_LIGHT
    fp.alignment = PP_ALIGN.CENTER

    prs.save(output_path)
    print(f"Presentation saved successfully to: {output_path}")

if __name__ == '__main__':
    create_deck('/Users/khushbooahuja/Downloads/road2code/Road2Code_Presentation.pptx')
