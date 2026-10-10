#!/usr/bin/env python3
"""
Generates public/resume.pdf — a clean, ATS-friendly, text-based resume.

No external libraries: the PDF is written directly so it always works in WSL.
Text-based (not an image) so recruiters' ATS parsers can actually read it.

NOTE: Fields marked  # MOCK  are placeholders. Replace them with real values,
then re-run:  python3 tools/build_resume.py
"""

import textwrap

PAGE_W, PAGE_H = 612, 792          # US Letter at 72dpi
MARGIN_L, MARGIN_R = 54, 54
TOP_START = 752                    # y of the first baseline
BOTTOM = 56                        # stop here or we spill to a new page

LEFT = MARGIN_L
RIGHT = PAGE_W - MARGIN_R

# role title shown under the name
TITLE = "Data Analyst Intern"

# ---------------------------------------------------------------- MOCK FIELDS
PHONE = "+855 XX XXX XXX"                     # MOCK - real number
LOCATION = "Phnom Penh, Cambodia"             # MOCK - confirm city
GRAD_YEAR = "Expected 2027"                   # MOCK - real graduation year

EMAIL = "sengthay32@gmail.com"
GITHUB = "github.com/Thay32-Heng"
LINKEDIN = "linkedin.com/in/heng-sengthay-19b202365"

OBJECTIVE = (
    "Third-year Data Science and Engineering student at the Royal University of "
    "Phnom Penh, targeting a Data Analyst internship. Comfortable cleaning messy "
    "data, running exploratory and time-series analysis in Python, and turning "
    "findings into clear dashboards and decision-ready summaries. Actively "
    "growing into data engineering."
)

EDUCATION = [
    ("Royal University of Phnom Penh", "B.Sc. Data Science & Engineering - Year 3",
     GRAD_YEAR),
    # MOCK: add your high school / previous institution below if you want it
]

# NOTE: only list what you can defend in an interview. SQL was deliberately
# left OUT because it has not been learned yet - claiming it is the fastest way
# to lose a technical screen. Add it here the day you finish it.
SKILLS = [
    ("Languages",      "Python, TypeScript, JavaScript"),
    ("Data Analysis",  "Pandas, NumPy, Matplotlib, Jupyter, time-series, data cleaning"),
    ("Dashboards",     "Streamlit, Streamlit-Folium, CSV workflows"),
    ("Web & Tools",    "React, Vite, Tailwind CSS, Git, VS Code"),
]

# Projects, strongest evidence first. Numbers verified from the repos.
PROJECTS = [
    {
        "name": "Phnom Penh Precipitation Time-Series Analysis",
        "tag": "Python / Jupyter / Pandas / Matplotlib",
        "lines": [
            "Built and cleaned a 132-row monthly rainfall series for Phnom Penh (2015-2025, 15,689.7 mm total).",
            "Ran time-plot, seasonal and seasonal-subseries analysis to expose the yearly cycle.",
            "Identified the wet-season peak (703.62 mm, Jun 2020) and driest month (0.34 mm, Dec 2019).",
        ],
        "url": "github.com/Thay32-Heng/Phnom-Penh-Precipitation-Time-Series-Analysis",
    },
    {
        "name": "Kasekor Vision  (active build)",
        "tag": "Python / Streamlit / Folium / Requests",
        "lines": [
            "Interactive map prototype helping Cambodian farmers match crops to local conditions.",
            "Built the Cambodia map layer, a live weather lookup, and a searchable crop dictionary in Streamlit.",
            "Next: NASA POWER climate data, crop-soil scoring, and an offline mode for low-connectivity farms.",
        ],
        "url": "github.com/Thay32-Heng/Kasekor-Vision",
    },
    {
        "name": "EduRisk Analytics",
        "tag": "Python / Streamlit / Pandas",
        "lines": [
            "Five-page Streamlit dashboard for student risk: attendance, scores and course load.",
            "Course + risk filters, attendance/score sliders, and one-click CSV export of the filtered set.",
            "Currently a course lab on a small sample dataset; wiring in a real dataset next.",
        ],
        "url": "github.com/Thay32-Heng/EduRiskAnalysis",
    },
    {
        "name": "JamTlai - Offline Grocery Price Checker",
        "tag": "TypeScript / PWA / Offline-first",
        "lines": [
            "Offline-first PWA for family grocery stores with fast Khmer/English search.",
            "Dual retail/wholesale prices in KHR; works without a network connection.",
        ],
        "url": "github.com/Thay32-Heng/JamTlai",
    },
]

# MOCK: fill these in, or delete the section before sending.
EXTRAS = [
    "Coursework: Data Mining, Data Structures & Algorithms, Statistics, Database Systems.",
    "MOCK - add a hackathon, talk, or competition here if you have one.",
    "MOCK - add a relevant internship, tutoring, or volunteer role here.",
]

# ---------------------------------------------------------------- PDF writing
def esc(s):
    return s.replace("\\", r"\\").replace("(", r"\(").replace(")", r"\)")

class Doc:
    def __init__(self):
        self.y = TOP_START
        self.ops = []
        self.pages = []
        self.new_page()

    def new_page(self):
        if hasattr(self, "ops") and self.ops:
            self.pages.append(self.ops)
        self.ops = []

    def space(self, amount):
        self.y -= amount

    def need(self, amount):
        if self.y - amount < BOTTOM:
            self.new_page()
            self.y = TOP_START

    def text(self, x, size, txt, font="F1", color=(0, 0, 0)):
        self.ops.append(
            f"BT /{font} {size} Tf {color[0]} {color[1]} {color[2]} rg "
            f"1 0 0 1 {x:.1f} {self.y:.1f} Tm ({esc(txt)}) Tj ET"
        )

    def wrap(self, txt, width_chars):
        return textwrap.wrap(txt, width_chars)

    def para(self, txt, size=9.5, lead=12.5, indent=0, color=(0, 0, 0)):
        for line in self.wrap(txt, int(90 - indent)):
            self.need(lead)
            self.text(MARGIN_L + indent, size, line, "F1", color)
            self.space(lead)

    def rule(self, color=(0.75, 0.75, 0.75)):
        self.need(6)
        self.ops.append(
            f"{color[0]} {color[1]} {color[2]} RG 0.7 w "
            f"{MARGIN_L} {self.y:.1f} m {RIGHT} {self.y:.1f} l S"
        )
        self.space(9)

    def heading(self, txt):
        self.space(6)
        self.need(20)
        self.text(MARGIN_L, 11.5, txt, "F2")
        self.space(3)
        self.rule()

    def build(self):
        self.pages.append(self.ops)
        objects = []
        n_pages = len(self.pages)
        font_objs = []
        for f in ("F1", "F2"):
            font_objs.append(f"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
            font_objs.append(f"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")
        # font_objs currently [F1reg, F1bold, F2reg, F2bold] but we only need two
        font_objs = [
            "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
            "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
        ]
        # Build objects: 1 catalog, 2 pages, 3 font1, 4 font2, then page+content per page
        objs = {}
        page_ids = []
        next_id = 5
        for _ in range(n_pages):
            page_ids.append(next_id)
            objs[next_id] = None  # placeholder for page
            next_id += 1
            objs[next_id] = None  # placeholder for content stream
            next_id += 1
        content_ids = [pid + 1 for pid in page_ids]

        objs[1] = "<< /Type /Catalog /Pages 2 0 R >>"
        kids = " ".join(f"{pid} 0 R" for pid in page_ids)
        objs[2] = f"<< /Type /Pages /Count {n_pages} /Kids [{kids}] >>"
        objs[3] = font_objs[0]
        objs[4] = font_objs[1]
        for i, pid in enumerate(page_ids):
            objs[pid] = (
                f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {PAGE_W} {PAGE_H}] "
                f"/Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> "
                f"/Contents {content_ids[i]} 0 R >>"
            )
            stream = "\n".join(self.pages[i])
            objs[content_ids[i]] = f"<< /Length {len(stream)} >>\nstream\n{stream}\nendstream"

        out = "%PDF-1.4\n"
        offsets = {}
        max_id = max(objs.keys())
        for oid in range(1, max_id + 1):
            offsets[oid] = len(out)
            out += f"{oid} 0 obj\n{objs[oid]}\nendobj\n"
        xref_pos = len(out)
        out += f"xref\n0 {max_id + 1}\n0000000000 65535 f \n"
        for oid in range(1, max_id + 1):
            out += f"{offsets[oid]:010d} 00000 n \n"
        out += (
            f"trailer\n<< /Size {max_id + 1} /Root 1 0 R >>\n"
            f"startxref\n{xref_pos}\n%%EOF\n"
        )
        return out.encode("latin-1", "ignore")


d = Doc()

# ---- header
d.text(MARGIN_L, 19, "HENG SENGTHAY", "F2")
d.space(15)
d.text(MARGIN_L, 11, TITLE, "F2")
d.space(14)
contact_line = f"{PHONE}  |  {LOCATION}  |  {EMAIL}"
d.para(contact_line, size=9.5, lead=12)
contact_line2 = f"{LINKEDIN}  |  {GITHUB}"
d.para(contact_line2, size=9.5, lead=12)
d.rule(color=(0.3, 0.3, 0.3))

# ---- objective
d.heading("OBJECTIVE")
d.para(OBJECTIVE)

# ---- education
d.heading("EDUCATION")
for inst, prog, when in EDUCATION:
    d.need(30)
    d.text(MARGIN_L, 10.5, inst, "F2")
    d.text(RIGHT - len(when) * 5.2, 10.5, when, "F2")
    d.space(13)
    d.text(MARGIN_L, 9.5, prog)
    d.space(16)

# ---- skills
d.heading("TECHNICAL SKILLS")
for label, items in SKILLS:
    d.need(15)
    d.text(MARGIN_L, 10, f"{label}:", "F2")
    d.text(MARGIN_L + 92, 10, items)
    d.space(13)

# ---- projects
d.heading("PROJECTS")
for p in PROJECTS:
    d.need(60)
    d.text(MARGIN_L, 10.5, p["name"], "F2")
    d.space(12)
    d.text(MARGIN_L, 9, p["tag"], color=(0.35, 0.35, 0.35))
    d.space(13)
    for ln in p["lines"]:
        for line in d.wrap(ln, 86):
            d.need(12)
            d.text(MARGIN_L, 9.5, "\u00b7 " + line.strip())
            d.space(12.5)
    d.need(12)
    d.text(MARGIN_L, 8.5, p["url"], color=(0.2, 0.35, 0.65))
    d.space(16)

# ---- extras
d.heading("ADDITIONAL")
for e in EXTRAS:
    d.need(14)
    d.text(MARGIN_L, 9.5, "\u00b7 " + e)
    d.space(13)

pdf = d.build()
with open("public/resume.pdf", "wb") as f:
    f.write(pdf)
print(f"wrote public/resume.pdf ({len(pdf)} bytes, {len(d.pages)} page(s))")