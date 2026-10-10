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

export const featuredProjects = [
  {
    index: "01",
    title: "EduRisk Analytics",
    type: "anomaly",
    url: "https://github.com/Thay32-Heng/EduRiskAnalysis",
    fog: "Student risk signals were spread across attendance, scores, course, and filters.",
    strategy: "Built an interactive Streamlit dashboard to inspect student risk levels and isolate course performance.",
    vision: "Turned a simple student dataset into a usable early-warning monitoring tool.",
    stack: "PYTHON / STREAMLIT / PANDAS",
  },
  {
    index: "02",
    title: "Phnom Penh Precipitation Analysis",
    type: "forecast",
    url: "https://github.com/Thay32-Heng/Phnom-Penh-Precipitation-Time-Series-Analysis",
    fog: "Ten years of monthly rainfall needed cleaning before it could reveal trends and seasons.",
    strategy: "Ran an exploratory time-series analysis across Phnom Penh precipitation from 2015 to 2025.",
    vision: "Exposed long-term trends, recurring seasonal patterns, and unusual weather events.",
    stack: "PYTHON / JUPYTER / TIME SERIES",
  },
  {
    index: "03",
    title: "Kasekor Vision",
    type: "vault",
    url: "https://github.com/Thay32-Heng/Kasekor-Vision",
    fog: "Farmers need to know which crops fit local geographic and environmental conditions.",
    strategy: "Built an interactive map prototype that recommends crops from location and environmental factors.",
    vision: "Supports Cambodian agriculture with clearer, data-backed crop decisions.",
    stack: "PYTHON / STREAMLIT / FOLIUM",
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
    rank: "STATUS / 03",
    title: "No formal certification yet",
    subtitle: "Certifications will be added after completion",
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
      "A Year 3 RUPP time-series project inspecting monthly Phnom Penh rainfall from 2015 to 2025 for trends and seasonality.",
    url: "https://github.com/Thay32-Heng/Phnom-Penh-Precipitation-Time-Series-Analysis",
  },
  {
    category: "MAP PROTOTYPE",
    title: "Kasekor Vision",
    excerpt:
      "An agriculture prototype that combines an interactive Cambodia map with environmental factors to recommend crops.",
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

