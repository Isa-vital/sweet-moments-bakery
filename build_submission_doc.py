from pathlib import Path

from docx import Document
from docx.enum.table import WD_CELL_VERTICAL_ALIGNMENT, WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor


ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT / "submission" / "Sweet_Moments_Tasks_6_to_10_Submission_Draft.docx"
LIVE_URL = "https://isa-vital.github.io/sweet-moments-bakery/"

CHOCOLATE = "4A3028"
ROSE = "A63F5C"
GOLD = "B18A50"
CREAM = "F8EFE7"
PALE = "FFF9F4"
MUTED = "6E5B54"
PLACEHOLDER = "FFF2CC"


def shade(cell, fill):
    tc_pr = cell._tc.get_or_add_tcPr()
    shd = tc_pr.find(qn("w:shd"))
    if shd is None:
        shd = OxmlElement("w:shd")
        tc_pr.append(shd)
    shd.set(qn("w:fill"), fill)


def set_cell_text(cell, text, bold=False, color=None, size=9):
    cell.text = ""
    paragraph = cell.paragraphs[0]
    run = paragraph.add_run(str(text))
    run.bold = bold
    run.font.name = "Aptos"
    run.font.size = Pt(size)
    if color:
        run.font.color.rgb = RGBColor.from_string(color)
    cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
    return paragraph


def repeat_header(row):
    tr_pr = row._tr.get_or_add_trPr()
    tbl_header = OxmlElement("w:tblHeader")
    tbl_header.set(qn("w:val"), "true")
    tr_pr.append(tbl_header)


def add_table(document, headers, rows, widths=None, font_size=8.5):
    table = document.add_table(rows=1, cols=len(headers))
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.style = "Table Grid"
    repeat_header(table.rows[0])
    for index, header in enumerate(headers):
        shade(table.rows[0].cells[index], CHOCOLATE)
        set_cell_text(table.rows[0].cells[index], header, bold=True, color="FFFFFF", size=font_size)
        if widths:
            table.rows[0].cells[index].width = Inches(widths[index])
    for row_values in rows:
        cells = table.add_row().cells
        for index, value in enumerate(row_values):
            is_placeholder = str(value).startswith("[") and str(value).endswith("]")
            if is_placeholder:
                shade(cells[index], PLACEHOLDER)
            set_cell_text(cells[index], value, color=MUTED, size=font_size)
            if widths:
                cells[index].width = Inches(widths[index])
    document.add_paragraph()
    return table


def add_hyperlink(paragraph, text, url, color=ROSE, underline=True):
    part = paragraph.part
    relationship_id = part.relate_to(
        url,
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
        is_external=True,
    )
    hyperlink = OxmlElement("w:hyperlink")
    hyperlink.set(qn("r:id"), relationship_id)
    new_run = OxmlElement("w:r")
    run_properties = OxmlElement("w:rPr")
    run_color = OxmlElement("w:color")
    run_color.set(qn("w:val"), color)
    run_properties.append(run_color)
    if underline:
        underline_element = OxmlElement("w:u")
        underline_element.set(qn("w:val"), "single")
        run_properties.append(underline_element)
    new_run.append(run_properties)
    text_element = OxmlElement("w:t")
    text_element.text = text
    new_run.append(text_element)
    hyperlink.append(new_run)
    paragraph._p.append(hyperlink)
    return hyperlink


def add_page_number(paragraph):
    paragraph.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    paragraph.add_run("Page ")
    run = paragraph.add_run()
    fld_char_begin = OxmlElement("w:fldChar")
    fld_char_begin.set(qn("w:fldCharType"), "begin")
    instr_text = OxmlElement("w:instrText")
    instr_text.set(qn("xml:space"), "preserve")
    instr_text.text = "PAGE"
    fld_char_end = OxmlElement("w:fldChar")
    fld_char_end.set(qn("w:fldCharType"), "end")
    run._r.extend([fld_char_begin, instr_text, fld_char_end])


def add_label(document, text):
    paragraph = document.add_paragraph()
    paragraph.paragraph_format.space_after = Pt(5)
    run = paragraph.add_run(text.upper())
    run.bold = True
    run.font.name = "Aptos"
    run.font.size = Pt(8)
    run.font.color.rgb = RGBColor.from_string(ROSE)
    return paragraph


def add_note(document, text, placeholder=False):
    table = document.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell = table.cell(0, 0)
    shade(cell, PLACEHOLDER if placeholder else CREAM)
    paragraph = set_cell_text(cell, text, color=CHOCOLATE, size=9)
    paragraph.paragraph_format.space_after = Pt(0)
    document.add_paragraph()
    return table


def add_bullets(document, items):
    for item in items:
        paragraph = document.add_paragraph(style="List Bullet")
        paragraph.add_run(item)


def add_numbered(document, items):
    for item in items:
        paragraph = document.add_paragraph(style="List Number")
        paragraph.add_run(item)


def add_caption(document, text):
    paragraph = document.add_paragraph()
    paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER
    paragraph.paragraph_format.space_after = Pt(10)
    run = paragraph.add_run(text)
    run.italic = True
    run.font.size = Pt(8)
    run.font.color.rgb = RGBColor.from_string(MUTED)


def add_placeholder_paragraph(document, text):
    paragraph = document.add_paragraph()
    run = paragraph.add_run(f"[{text}]")
    run.bold = True
    run.font.highlight_color = 7
    run.font.color.rgb = RGBColor.from_string(CHOCOLATE)
    return paragraph


def configure_document(document):
    section = document.sections[0]
    section.top_margin = Inches(0.7)
    section.bottom_margin = Inches(0.7)
    section.left_margin = Inches(0.75)
    section.right_margin = Inches(0.75)

    normal = document.styles["Normal"]
    normal.font.name = "Aptos"
    normal.font.size = Pt(10.5)
    normal.font.color.rgb = RGBColor.from_string(MUTED)
    normal.paragraph_format.space_after = Pt(7)
    normal.paragraph_format.line_spacing = 1.12

    for name, size, color in [
        ("Title", 34, CHOCOLATE),
        ("Heading 1", 24, CHOCOLATE),
        ("Heading 2", 17, ROSE),
        ("Heading 3", 12, CHOCOLATE),
    ]:
        style = document.styles[name]
        style.font.name = "Georgia"
        style.font.size = Pt(size)
        style.font.color.rgb = RGBColor.from_string(color)
        style.font.bold = True
        style.paragraph_format.space_before = Pt(12)
        style.paragraph_format.space_after = Pt(7)

    for section in document.sections:
        footer = section.footer
        line = footer.paragraphs[0]
        line.text = "SWEET MOMENTS BAKERY  •  BUC3106 CAPSTONE PROJECT  •  "
        line.style = document.styles["Normal"]
        for run in line.runs:
            run.font.size = Pt(8)
            run.font.color.rgb = RGBColor.from_string(MUTED)
        add_page_number(line)

    document.core_properties.title = "Sweet Moments Bakery — Tasks 6 to 10"
    document.core_properties.subject = "BUC3106 E-Commerce Capstone Project"
    document.core_properties.author = "Sweet Moments Bakery student group"


def build_document():
    document = Document()
    configure_document(document)

    # Cover
    document.add_paragraph("SM", style="Title").alignment = WD_ALIGN_PARAGRAPH.CENTER
    title = document.add_paragraph("Sweet Moments Bakery", style="Title")
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    subtitle = document.add_paragraph("BUC3106 E-Commerce Capstone Project\nTasks 6–10 Submission Draft")
    subtitle.alignment = WD_ALIGN_PARAGRAPH.CENTER
    subtitle.runs[0].bold = True
    subtitle.runs[0].font.color.rgb = RGBColor.from_string(ROSE)
    subtitle.runs[0].font.size = Pt(15)
    document.add_paragraph()
    live = document.add_paragraph()
    live.alignment = WD_ALIGN_PARAGRAPH.CENTER
    live.add_run("Live website\n").bold = True
    add_hyperlink(live, LIVE_URL, LIVE_URL)
    document.add_paragraph()
    add_table(
        document,
        ["Portfolio detail", "Information to complete"],
        [
            ("Group number/name", "[GROUP TO COMPLETE]"),
            ("Members and student numbers", "[GROUP TO COMPLETE]"),
            ("Member roles", "[GROUP TO COMPLETE]"),
            ("Lecturer", "[GROUP TO COMPLETE]"),
            ("Submission date", "[GROUP TO COMPLETE]"),
        ],
        widths=[2.1, 4.6],
        font_size=9,
    )
    add_note(
        document,
        "This is a student project for BUC3106 at Makerere University Business School (MUBS). Payments are not active and the website does not create real orders or collect customer payment information.",
    )
    add_note(
        document,
        "DRAFT STATUS: Yellow items require genuine group information, real-person testing, survey data, security screenshots or member signatures before submission.",
        placeholder=True,
    )
    document.add_page_break()

    # Contents
    document.add_heading("Portfolio contents", level=1)
    add_numbered(
        document,
        [
            "Task 6 — The Website",
            "Task 7 — Payments on the Website",
            "Task 8 — Rules and Trust",
            "Task 9 — Security Basics",
            "Task 10 — Pitch and Portfolio Records",
            "Appendix — Website explanation and final evidence checklist",
        ],
    )
    add_note(document, "Tasks 1–5 are held in the group's existing E-Commerce.docx and should be merged ahead of this section for the final portfolio.")

    # Task 6
    document.add_heading("Task 6 — The Website", level=1)
    add_label(document, "Topic 7 • 20 group marks")
    paragraph = document.add_paragraph()
    paragraph.add_run("Live address: ").bold = True
    add_hyperlink(paragraph, LIVE_URL, LIVE_URL)
    paragraph = document.add_paragraph()
    paragraph.add_run("Proposed purchased domain: ").bold = True
    paragraph.add_run("sweetmomentsbakery.co.ug")
    document.add_paragraph(
        "The proposed domain is easy to remember, contains the business name and uses Uganda's .co.ug identity. Availability and ownership have not been claimed; they would be checked before purchase."
    )

    document.add_heading("Website implementation", level=2)
    add_bullets(
        document,
        [
            "Five required pages: Home, Products, About Us, How to Pay & Order, and Policies.",
            "Ten bakery products with prices in Uganda shillings and clear descriptions.",
            "Responsive layouts for desktop, tablet, Android phones and iPhones.",
            "Working mobile navigation, catalogue search, categories, price filter and sorting.",
            "Frontend-only cart with quantity controls, removal and automatic UGX totals.",
            "Simulated checkout that stops before payment confirmation and collects no customer information.",
            "GitHub Pages compatibility using HTML, CSS and vanilla JavaScript only.",
        ],
    )
    add_note(document, "The implementation exceeds the basic website requirement, but the lecturer's five-person reality check is still compulsory.")

    desktop_image = ROOT / "qa-evidence" / "catalog-desktop.png"
    mobile_image = ROOT / "qa-evidence" / "catalog-mobile.png"
    if desktop_image.exists():
        document.add_picture(str(desktop_image), width=Inches(6.8))
        add_caption(document, "Existing desktop QA evidence — Products catalogue at 1440 × 900 px.")
    if mobile_image.exists():
        document.add_picture(str(mobile_image), width=Inches(3.0))
        add_caption(document, "Existing mobile QA evidence — Products catalogue at 390 × 844 CSS px.")
    add_placeholder_paragraph(document, "Replace or supplement these with final screenshots from the published site after the latest changes are deployed.")

    document.add_heading("Required five-person reality check", level=2)
    document.add_paragraph(
        "Give the live URL to five people who have not seen the website. Do not guide them. Ask each person to find a product price, how to pay and the delivery information. Record where they get stuck."
    )
    test_rows = []
    for person in range(1, 6):
        test_rows.append(
            (
                f"Person {person}",
                "[DEVICE]",
                "[YES/NO + TIME]",
                "[YES/NO + TIME]",
                "[YES/NO + TIME]",
                "[EXACT COMMENT/OBSERVATION]",
            )
        )
    add_table(
        document,
        ["Tester", "Device", "Price found", "How to pay found", "Delivery found", "Problem/comment"],
        test_rows,
        font_size=7.2,
    )
    add_table(
        document,
        ["Problem found", "Evidence", "Fix made", "Retest result"],
        [
            ("[PROBLEM 1]", "[TESTER COMMENT]", "[CHANGE MADE]", "[RESULT]"),
            ("[PROBLEM 2]", "[TESTER COMMENT]", "[CHANGE MADE]", "[RESULT]"),
            ("[PROBLEM 3]", "[TESTER COMMENT]", "[CHANGE MADE]", "[RESULT]"),
        ],
        font_size=8,
    )
    add_note(document, "Do not invent testers, comments or fixes. The three fixes must be linked to real problems found during this test.", placeholder=True)

    # Task 7
    document.add_page_break()
    document.add_heading("Task 7 — Payments on the Website", level=1)
    add_label(document, "Topic 5 • 8 group marks")
    paragraph = document.add_paragraph()
    paragraph.add_run("How to Pay & Order page: ").bold = True
    add_hyperlink(paragraph, "Open the live payment page", LIVE_URL + "pay.html")
    document.add_paragraph(
        "The page presents MTN Mobile Money, Airtel Money, bank transfer and cash on delivery. Each method has three steps and clearly marked sample details. The site explains verification, refunds and delivery and stops before payment confirmation."
    )
    add_table(
        document,
        ["Method", "Intended customer", "Verification", "Status"],
        [
            ("MTN Mobile Money", "Everyday/mobile customers", "Business MTN records, not a screenshot", "SAMPLE ONLY"),
            ("Airtel Money", "Everyday/mobile customers", "Business Airtel records, not a screenshot", "SAMPLE ONLY"),
            ("Bank transfer", "Offices and business buyers", "Cleared bank records", "SAMPLE ONLY"),
            ("Cash on delivery", "Eligible confirmed deliveries", "Delivery handover and sales record", "PROPOSED"),
        ],
        font_size=8,
    )

    document.add_heading("Explanation of the payment choices", level=2)
    document.add_paragraph(
        "Sweet Moments Bakery proposes MTN Mobile Money and Airtel Money because they are familiar mobile payment options for many intended customers in Kampala. They can support relatively small purchases without requiring a customer to hold a bank card. In a real operation, the bakery would publish only a verified business number and would confirm payment from its own mobile-money records. A customer's screenshot would not be accepted by itself as proof that money had cleared."
    )
    document.add_paragraph(
        "Bank transfer is included mainly for schools, offices, cafés, restaurants and event planners that may place larger or repeated orders and require a traceable business record. Cash on delivery is proposed only where the bakery has first confirmed the product, total, delivery fee, location and delivery arrangements. It may reassure customers who are uncomfortable paying before handover, but it also creates cancellation, transport and cash-handling risks, so it would not automatically be available for every order."
    )
    document.add_paragraph(
        "The final mix must be guided by the required survey of 20 potential customers. The group should compare preferred methods and common worries, then explain any decision changed by the results. Refund eligibility would depend on the order status and circumstances. Approved refunds would use an agreed traceable route after the original payment and the customer's eligibility had been verified."
    )
    paragraph = document.add_paragraph(
        "The proposed bakery would not accept cryptocurrency at launch. It is less familiar to the intended customers, can create price and consumer-protection risks, and is unnecessary while familiar payment options are available. Bank of Uganda recognises possible innovation from virtual assets but remains cautious and is working with stakeholders on a regulatory framework. Source: "
    )
    add_hyperlink(paragraph, "Bank of Uganda — Financial Infrastructure and Innovation", "https://bou.or.ug/financial_infrastructure_innovation")

    document.add_heading("Required 20-person payment survey", level=2)
    document.add_paragraph(
        "Ask 20 possible customers which method they prefer and what worries them about paying online. Do not collect names, telephone numbers, addresses, PINs or OTPs."
    )
    add_table(
        document,
        ["Preferred method", "Number of respondents", "Percentage"],
        [
            ("MTN Mobile Money", "[COUNT]", "[PERCENTAGE]"),
            ("Airtel Money", "[COUNT]", "[PERCENTAGE]"),
            ("Bank transfer", "[COUNT]", "[PERCENTAGE]"),
            ("Cash on delivery", "[COUNT]", "[PERCENTAGE]"),
            ("Other", "[COUNT]", "[PERCENTAGE]"),
            ("TOTAL", "[MUST EQUAL 20]", "[MUST EQUAL 100%]"),
        ],
        font_size=8.5,
    )
    add_table(
        document,
        ["Concern", "Number mentioning it", "How the proposal responds"],
        [
            ("[CONCERN 1]", "[COUNT]", "[RESPONSE]"),
            ("[CONCERN 2]", "[COUNT]", "[RESPONSE]"),
            ("[CONCERN 3]", "[COUNT]", "[RESPONSE]"),
        ],
        font_size=8.5,
    )
    add_placeholder_paragraph(document, "Insert final desktop and phone screenshots of the How to Pay page after publishing the latest website files.")

    # Task 8
    document.add_page_break()
    document.add_heading("Task 8 — Rules and Trust", level=1)
    add_label(document, "Topic 6 • 6 group marks • Rules Sheet")
    document.add_heading("1. Creative assets and permission", level=2)
    add_table(
        document,
        ["Asset", "Source", "Permission/status"],
        [
            ("SM wordmark and website layout", "Created for the project in HTML/CSS", "Group-created; suitable for coursework"),
            ("Four bakery images", "OpenAI image generation, 30 October 2026", "AI-generated for the project; do not claim they are real bakery photos"),
            ("Cormorant Garamond", "Google Fonts", "Open-source font supplied through Google Fonts"),
            ("Manrope", "Google Fonts", "Open-source font supplied through Google Fonts"),
            ("Material Symbols Rounded", "Google Fonts / Google Material Symbols", "Apache License 2.0"),
            ("Music", "None used on the website", "Not applicable"),
        ],
        font_size=8,
    )
    document.add_paragraph(
        "Detailed image filenames and descriptions are recorded in images/SOURCES.md. Any future photography must be group-created, owner-approved or used under a licence that permits the intended use."
    )

    document.add_heading("2. Business-name check", level=2)
    document.add_paragraph(
        "An initial general web search on 31 October 2026 found exact or closely matching Sweet Moments Bakery businesses outside Uganda, including businesses in the United Kingdom and the United States. No Ugandan match appeared in the initial general search, but this is not a legal or trademark clearance. Before commercial launch, the group would search the Uganda Registration Services Bureau records, trademark records, Google Maps, major social platforms and .co.ug domain availability. The portfolio must not claim that the name is globally unique."
    )
    sources = document.add_paragraph("Examples checked: ")
    add_hyperlink(sources, "Sweet Moments Bakery (Oxfordshire)", "https://www.sweetmomentsbaker.co.uk/")
    sources.add_run("; ")
    add_hyperlink(sources, "Sweet Moments Bakery (Mastic Beach)", "https://www.sweetmomentsbakeryli.com/")

    document.add_heading("3. Privacy notice and terms", level=2)
    document.add_paragraph(
        "The Policies page explains the information a future operating bakery might need, why it would be needed, who should access it and how long it should be kept. It also provides plain-language order, delivery and refund terms. The draft refers to Uganda's Data Protection and Privacy Act, 2019 but does not claim that the coursework website has received a formal legal review. The current website does not collect customer details."
    )
    policy_link = document.add_paragraph("Live policy page: ")
    add_hyperlink(policy_link, LIVE_URL + "policies.html", LIVE_URL + "policies.html")

    document.add_heading("4. Claims and supporting evidence", level=2)
    add_table(
        document,
        ["Claim or statement", "Evidence/status", "Decision"],
        [
            ("Proposed Kampala bakery", "Coursework business concept", "Clearly label it as proposed/student work"),
            ("Ten products and UGX prices", "Listed consistently in the project files", "Treat prices as proposed and subject to confirmation"),
            ("Kampala delivery", "Planned service area, not an active delivery guarantee", "Use 'proposed' and 'subject to confirmation'"),
            ("Fresh products", "Intended operating standard, not independently verified", "Do not present as a proven historical claim"),
            ("Payment methods", "Demonstration instructions only", "Mark every detail SAMPLE and payments inactive"),
            ("Customer reviews/awards", "None verified", "Do not publish invented reviews, awards or certificates"),
        ],
        font_size=7.8,
    )

    document.add_heading("5. Impersonation and fake reviews", level=2)
    document.add_paragraph(
        "If someone pretended to be Sweet Moments Bakery online, the group would preserve screenshots, URLs and dates; report the fake account to the platform; warn customers through approved channels; secure any affected accounts; and escalate serious fraud to the relevant platform, service provider or authority. The business would not ask customers to share mobile-money PINs, passwords or one-time codes."
    )
    document.add_paragraph(
        "Suspected fake reviews would be documented and reported through the platform's process. Any public reply would remain calm and factual. The group would never create fake positive reviews to hide criticism and would invite genuine complaints through an approved private contact channel."
    )
    add_placeholder_paragraph(document, "Insert a final screenshot of the published Policies page, including the Trust and Authenticity section.")

    # Task 9
    document.add_page_break()
    document.add_heading("Task 9 — Security Basics", level=1)
    add_label(document, "Topic 8 • 6 group marks")
    document.add_paragraph(
        "The following controls must be applied to the real group accounts. Screenshots should show the enabled status but hide email addresses, recovery codes, phone-number endings and other private information."
    )
    security_rows = [
        ("Group email", "Two-step verification enabled", "[REDACTED SCREENSHOT]", "[COMPLETE/PENDING]"),
        ("GitHub", "Two-step verification enabled", "[REDACTED SCREENSHOT]", "[COMPLETE/PENDING]"),
        ("Canva", "Two-step verification enabled", "[REDACTED SCREENSHOT]", "[COMPLETE/PENDING]"),
        ("Every social account", "Two-step verification enabled", "[REDACTED SCREENSHOTS]", "[COMPLETE/PENDING]"),
        ("Passwords", "Long, unique and kept in a password manager or safe place", "[GROUP CONFIRMATION]", "[COMPLETE/PENDING]"),
        ("Live website", "HTTPS and padlock", "[BROWSER SCREENSHOT]", "[COMPLETE/PENDING]"),
        ("Public files", "No passwords, secret keys, PINs or OTPs", "Code review", "Checked locally"),
        ("WhatsApp number", "Group approved for public ordering enquiries", "[GROUP CONFIRMATION]", "[COMPLETE/PENDING]"),
        ("Backups", "Website and Canva work copied to shared folder", "[FOLDER SCREENSHOT]", "[COMPLETE/PENDING]"),
        ("Suspicious-message drill", "Warning signs identified by group", "[DRILL RECORD]", "[COMPLETE/PENDING]"),
    ]
    add_table(document, ["Area", "Required control", "Evidence", "Status"], security_rows, font_size=7.4)

    document.add_heading("Five-line hacked-account response", level=2)
    add_numbered(
        document,
        [
            "Use a clean device to change the compromised password and sign out all sessions.",
            "Revoke unknown applications, restore two-step verification and secure the recovery email.",
            "Inform the group leader and temporarily stop posts, ordering and payment communication.",
            "Preserve screenshots and logs and warn customers not to trust suspicious messages.",
            "Contact the platform, recover from the shared backup and review how access was lost.",
        ],
    )
    document.add_heading("Suspicious-message drill record", level=2)
    add_table(
        document,
        ["Date", "Participants", "Message scenario", "Warning signs identified", "Action taken"],
        [("[DATE]", "[NAMES]", "[SAFE FAKE MESSAGE]", "[LIST WARNING SIGNS]", "[RESULT]")],
        font_size=8,
    )

    # Task 10
    document.add_page_break()
    document.add_heading("Task 10 — Pitch and Portfolio", level=1)
    add_label(document, "All topics • 15 group marks")
    document.add_heading("Proposed 15-minute pitch structure", level=2)
    add_table(
        document,
        ["Time", "Section", "What to show", "Speaker"],
        [
            ("0:00–1:00", "Hook", "Customer problem and Sweet Moments solution", "[MEMBER]"),
            ("1:00–3:00", "Business model", "Customers, value proposition and revenue", "[MEMBER]"),
            ("3:00–6:00", "Marketing", "Brand, content, social pages and feedback", "[MEMBER]"),
            ("6:00–9:00", "Website demo", "Phone navigation, product price, cart and delivery", "[WEB BUILDER]"),
            ("9:00–11:00", "Payments", "How to Pay page, survey and verification", "[PAYMENTS LEAD]"),
            ("11:00–13:00", "Rules/security", "Policies, Rules Sheet and controls", "[RULES/SECURITY LEAD]"),
            ("13:00–15:00", "Learning/close", "Problems, fixes, results and final ask", "[MEMBER]"),
        ],
        font_size=7.8,
    )
    document.add_paragraph("The 15-minute presentation is followed by five minutes of questions. Every member must speak or demonstrate something and should understand their own contribution.")

    document.add_heading("Contribution log", level=2)
    contribution_rows = []
    for _ in range(8):
        contribution_rows.append(("[MEMBER]", "[ROLE/TASK]", "[WHAT I DID]", "[FILE/LINK/SCREENSHOT]", "[INITIALS]"))
    add_table(document, ["Member", "Role/task", "What I did", "Proof", "Initials"], contribution_rows, font_size=7.3)

    document.add_heading("AI use log", level=2)
    ai_rows = [
        ("OpenAI Codex", "Build and refine the five-page website", "HTML, CSS and JavaScript draft", "Opened all pages, checked links and reviewed content", "[MEMBER]"),
        ("OpenAI Codex", "Fix mobile navigation and device responsiveness", "Responsive menu and layout changes", "Checked small Android, iPhone, tablet and desktop widths", "[MEMBER]"),
        ("OpenAI Codex", "Add frontend cart and simulated checkout", "Cart, totals and payment demonstration", "Tested add, change, remove, totals and stopping point", "[MEMBER]"),
        ("OpenAI Codex", "Redesign catalogue and product details", "Filters, sorting and responsive product dialog", "Compared against supplied references and tested interactions", "[MEMBER]"),
        ("OpenAI Codex", "Reduce product image and modal height", "Compact responsive imagery", "Reviewed desktop and mobile screenshots", "[MEMBER]"),
        ("OpenAI image generation", "Create bakery illustrations", "Four local WebP images", "Checked file size, visual suitability and source record", "[MEMBER]"),
        ("OpenAI Codex", "Review Tasks 6–10 against lecturer PDF", "Compliance review and corrected test plan", "Compared output with lecturer's original requirements", "[MEMBER]"),
        ("OpenAI Codex", "Complete payment rationale and trust content", "Payment/crypto explanation and authenticity policy", "Checked source links, notices and all five pages", "[MEMBER]"),
    ]
    add_table(document, ["Tool", "What I asked", "What I used", "How I checked it", "Member"], ai_rows, font_size=6.8)

    document.add_heading("Individual reflection template", level=2)
    add_placeholder_paragraph(document, "COPY THIS SECTION FOR EACH MEMBER — ABOUT 300 WORDS EACH")
    add_table(
        document,
        ["Reflection question", "Member's answer"],
        [
            ("What exactly did I make, and where can it be seen?", "[MEMBER TO COMPLETE]"),
            ("What did I learn that the notes alone did not teach me?", "[MEMBER TO COMPLETE]"),
            ("What went wrong, and what did I change?", "[MEMBER TO COMPLETE]"),
            ("What would I do differently if I started again?", "[MEMBER TO COMPLETE]"),
        ],
        font_size=8,
    )
    add_note(
        document,
        "Peer evaluations must be completed independently and honestly. Appendix C says they are confidential and should be submitted directly to the lecturer; follow the lecturer's final submission instructions.",
    )

    # Appendix
    document.add_page_break()
    document.add_heading("Appendix — Explain the website", level=1)
    add_table(
        document,
        ["File/folder", "Purpose"],
        [
            ("index.html", "Home page and main introduction"),
            ("products.html", "Catalogue, filters, cart controls and product dialog structure"),
            ("about.html", "Proposed story, values and customers"),
            ("pay.html", "Ordering, simulated checkout and payment guidance"),
            ("policies.html", "Privacy, terms, delivery, refunds and authenticity guidance"),
            ("style.css", "Brand colours, typography, layout and responsive breakpoints"),
            ("script.js", "Menu, catalogue, product details, cart, totals and simulated checkout behaviour"),
            ("images/", "Local optimised bakery images and source record"),
            ("localStorage", "Stores only product IDs and quantities in the customer's browser"),
            ("GitHub Pages", "Hosts the static files over HTTPS"),
        ],
        font_size=8.2,
    )

    document.add_heading("Items that must be completed before hand-in", level=2)
    add_bullets(
        document,
        [
            "Publish the latest approved website files and verify all five live pages.",
            "Capture final phone, desktop, payment, Policies and HTTPS screenshots.",
            "Complete the five-person website test and document at least three resulting fixes.",
            "Complete the 20-person payment survey and calculate the real totals and percentages.",
            "Apply two-step verification and collect redacted security evidence.",
            "Conduct and record the suspicious-message drill.",
            "Add group details, contribution signatures, individual reflections and confidential peer evaluations.",
            "Merge Tasks 1–5 ahead of this document and export the final portfolio as the lecturer directs.",
        ],
    )
    add_note(document, "No human participant, survey result, security action, signature or peer evaluation has been invented in this draft.")

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    document.save(OUTPUT)
    return OUTPUT


if __name__ == "__main__":
    output_path = build_document()
    print(output_path)
