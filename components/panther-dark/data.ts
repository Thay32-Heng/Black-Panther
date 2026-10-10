// Single place to correct a profile link, so a URL never has to be hunted down
// across three components.
export const linkedinUrl = "https://www.linkedin.com/in/heng-sengthay-19b202365/"

export const stackCategories = [
  {
    number: "01",
    title: "Data Analysis & Dashboards",
    description: "Course and project workflows for cleaning data and making it readable.",
    tools: ["Python", "Pandas", "NumPy", "Jupyter", "Streamlit", "Matplotlib"],
  },
  {
    number: "02",
    title: "Maps & Visual Prototypes",
    description: "Interactive visual prototypes that explain location-based data.",
    tools: ["Folium", "Streamlit-Folium", "CSV Workflows", "Data Cleaning", "Interactive Maps", "Prototypes"],
  },
  {
    number: "03",
    title: "Web & Offline Apps",
    description: "Small practical apps built for speed, usability, and offline access.",
    tools: ["TypeScript", "React", "Vite", "Tailwind CSS", "Offline-First UI", "Local Data"],
  },
]

export const pipelineStages = [
  {
    number: "01",
    title: "Raw Sources",
    label: "INPUT LAYER",
    detail: "APIs · Events · Databases",
    type: "sources",
  },
  {
    number: "02",
    title: "Ingestion & Processing",
    label: "COMPUTE LAYER",
    detail: "Stream · Batch · Transform",
    type: "processing",
  },
  {
    number: "03",
    title: "Data Vault",
    suffix: "(Warehouse)",
    label: "STORAGE LAYER",
    detail: "Modeled · Tested · Governed",
    type: "vault",
  },
  {
    number: "04",
    title: "Output & ML Models",
    label: "INTELLIGENCE LAYER",
    detail: "Predict · Visualize · Decide",
    type: "output",
  },
] as const

export const chartSeries = {
  "7 Days": [34, 42, 38, 55, 49, 68, 74, 66, 82, 78, 91, 96],
  "1 Month": [28, 35, 32, 44, 41, 52, 48, 63, 69, 65, 78, 86],
  "1 Year": [18, 23, 31, 28, 39, 47, 43, 57, 62, 71, 77, 89],
} as const

export type ChartPeriod = keyof typeof chartSeries

// Ordered by evidence strength, not by build order: the first card is the one
// a recruiter reads in the 15 seconds they actually spend here.
//   status: ANALYSED    = finished, real data, real findings
//           ACTIVE BUILD = being built right now, shown as open roadmap
//           LAB BUILD   = course lab, UI complete, sample data
export const featuredProjects = [
  {
    index: "01",
    title: "Phnom Penh Precipitation Analysis",
    status: "ANALYSED",
    type: "forecast",
    url: "https://github.com/Thay32-Heng/Phnom-Penh-Precipitation-Time-Series-Analysis",
    fog: "Eleven years of Phnom Penh rainfall sat unexamined - no structure, no season, no extremes pulled out.",
    strategy: "Built a clean 132-row monthly series (2015-2025) and ran time-plot, seasonal and seasonal-subseries analysis.",
    vision: "Pinned the extremes: 703.62 mm in June 2020 and 0.34 mm in December 2019, across 15,689.7 mm total.",
    stack: "PYTHON / JUPYTER / TIME SERIES",
  },
  {
    index: "02",
    title: "Kasekor Vision",
    status: "ACTIVE BUILD",
    type: "vault",
    url: "https://github.com/Thay32-Heng/Kasekor-Vision",
    fog: "Cambodian farmers pick crops from habit, not from data about their own soil and weather.",
    strategy: "Building an interactive map that pairs a farmer's location with a live weather lookup and crop dictionary.",
    vision: "Next: real NASA POWER climate data, crop-soil scoring, and offline mode for low-connectivity farms.",
    stack: "PYTHON / STREAMLIT / FOLIUM",
  },
  {
    index: "03",
    title: "EduRisk Analytics",
    status: "LAB BUILD",
    type: "anomaly",
    url: "https://github.com/Thay32-Heng/EduRiskAnalysis",
    fog: "Attendance, scores and course load sit apart, so nobody can see who is actually falling behind.",
    strategy: "Built a 5-page dashboard with course and risk filters, attendance and score sliders, and CSV export.",
    vision: "A reusable monitoring interface. Runs on a small sample dataset today - real data is the next step.",
    stack: "PYTHON / STREAMLIT / PANDAS",
  },
] as const

export const experienceTimeline = [
  {
    year: "2026",
    role: "Y3 Data Science & Engineering",
    description:
      "Studying data science and engineering at Royal University of Phnom Penh with a focus on practical, project-driven learning.",
    focus: "RUPP / DATA SCIENCE / ENGINEERING",
  },
  {
    year: "2025",
    role: "Time-Series Analysis Project",
    description:
      "Analyzed a decade of Phnom Penh precipitation data to identify trends, seasonality, and unusual weather periods.",
    focus: "PANDAS / TIME SERIES / JUPYTER",
  },
  {
    year: "2025",
    role: "EduRisk Analytics Dashboard",
    description:
      "Built an interactive Streamlit dashboard that monitors attendance, scores, and student risk levels with filters and exports.",
    focus: "STREAMLIT / DASHBOARDS / VISUALIZATION",
  },
  {
    year: "2025",
    role: "Kasekor Vision Prototype",
    description:
      "Created an agriculture decision prototype that recommends crops from geographic and environmental factors.",
    focus: "PYTHON / MAPS / PROTOTYPING",
  },
  {
    year: "2024",
    role: "JamTlai PWA",
    description:
      "Developed an offline-first price checker for family grocery stores with fast Khmer/English search and KHR pricing.",
    focus: "TYPESCRIPT / PWA / LOCAL-FIRST",
  },
] as const

export const engineeringPrinciples = [
  {
    number: "01",
    title: "Clean Data > Complex Models",
    description:
      "A sophisticated model cannot rescue a broken foundation. I prioritize observable, tested, and trustworthy data before adding complexity.",
    code: "QUALITY / CLARITY",
  },
  {
    number: "02",
    title: "Scalable Architecture",
    description:
      "Systems should grow without becoming fragile. I design modular foundations that remain clear under greater volume, velocity, and change.",
    code: "SCALE / RESILIENCE",
  },
  {
    number: "03",
    title: "Security in the Fog",
    description:
      "Trust is an architectural requirement, not an afterthought. Every pipeline should protect access, lineage, and sensitive information by design.",
    code: "TRUST / GOVERNANCE",
  },
] as const

export const learningSignals = [
  {
    rank: "ACADEMIC / 01",
    title: "RUPP · Year 3",
    subtitle: "Data Science and Engineering coursework and labs",
  },
  {
    rank: "PROJECT / 02",
    title: "Four GitHub project areas",
    subtitle: "Dashboards · time series · maps · offline apps",
  },
  {
    rank: "BUILD / 03",
    title: "This site runs live APIs",
    subtitle: "GitHub + status APIs, live on this site",
  },
] as const

export const projectNotes = [
  {
    category: "STUDENT DASHBOARD",
    title: "EduRisk Analytics",
    excerpt:
      "A Streamlit lab dashboard for monitoring attendance, scores, and student risk levels with filters, charts, and CSV export.",
    url: "https://github.com/Thay32-Heng/EduRiskAnalysis",
  },
  {
    category: "TIME SERIES",
    title: "Phnom Penh Precipitation Analysis",
    excerpt:
      "A Year 3 time-series project: 132 monthly rainfall records (2015-2025), seasonal subseries analysis, and the wet/dry extremes.",
    url: "https://github.com/Thay32-Heng/Phnom-Penh-Precipitation-Time-Series-Analysis",
  },
  {
    category: "MAP PROTOTYPE",
    title: "Kasekor Vision",
    excerpt:
      "An agriculture prototype I'm actively building: interactive Cambodia map, live weather lookup, and a crop dictionary.",
    url: "https://github.com/Thay32-Heng/Kasekor-Vision",
  },
  {
    category: "OFFLINE APP",
    title: "JamTlai Price Checker",
    excerpt:
      "An offline-first grocery price checker with fast Khmer/English search and dual retail/wholesale prices in KHR.",
    url: "https://github.com/Thay32-Heng/JamTlai",
  },
] as const

