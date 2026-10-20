// Single place to correct a profile link, so a URL never has to be hunted down
// across three components.
export const linkedinUrl = "https://www.linkedin.com/in/heng-sengthay-19b202365/"

export const profile = {
  name: "Heng Sengthay",
  nameParts: ["Heng", "Sengthay"],
  title: "Data Science & Engineering Student",
  school: "Royal University of Phnom Penh",
  major: "Data Science & Engineering",
  year: "Y3",
  gpa: "3.96",
  location: "Phnom Penh, Cambodia",
  email: "sengthay32@gmail.com",
  github: "https://github.com/Thay32-Heng",
  linkedin: "https://www.linkedin.com/in/heng-sengthay-19b202365/",
  cv: "/resume.pdf",
}

export const heroMeta = [
  { icon: "pin", text: "Phnom Penh, Cambodia" },
  { icon: "cap", text: "RUPP · Data Science & Engineering · Y3" },
  { icon: "code", text: "Python · Pandas · Streamlit · SQL · TypeScript" },
]

export const hudPanels = [
  { label: "Currently", value: "Data Science Student" },
  { label: "Studying", value: "Time-Series · Dashboards · ML" },
  { label: "Based in", value: "Phnom Penh, Cambodia" },
]

export const stats = [
  { label: "GPA", value: "3.96" },
  { label: "Projects", value: "10+" },
  { label: "Relevant Courses", value: "5+" },
]

export const about = {
  paragraphs: [
    "I am Heng Sengthay, a Year 3 Data Science & Engineering student at the Royal University of Phnom Penh. Most of what I build starts the same way: someone hands me a messy CSV and asks a question about it. I like that part — the cleaning, the checking, the moment a column finally means something.",
    "Outside of class, I build dashboards, time-series models, and offline-first apps. I care about clean data, scalable architecture, and security by design. My goal is to turn raw data into decisions people can trust.",
  ],
  facts: [
    { label: "Year", value: "Y3" },
    { label: "Programme", value: "Data Science & Engineering" },
    { label: "University", value: "RUPP" },
    { label: "Focus", value: "Time-Series · Dashboards · ML" },
  ],
  strengths: [
    { icon: "focus", title: "Project-Based Learning", desc: "Learn by building real things with real data" },
    { icon: "architecture", title: "Dashboards & Data Cleaning", desc: "Turn messy CSVs into decisions people can trust" },
    { icon: "story", title: "Data Storytelling", desc: "Translate numbers into narratives that drive action" },
  ],
  quote: "Complex data architectures is engineered quietly, allowing reliable insights to define success.",
}

export const skills = [
  {
    id: "python",
    name: "Python",
    category: "Language",
    proficiency: 85,
    desc: "Core language for data analysis, ML, and backend",
    tools: ["Pandas", "NumPy", "Scikit-Learn", "Jupyter", "Streamlit", "Matplotlib", "Seaborn"],
    projects: ["precipitation-analysis", "edurisk-analytics", "kasekor-vision"],
  },
  {
    id: "sql",
    name: "SQL & Databases",
    category: "Data",
    proficiency: 70,
    desc: "Querying, modeling, and managing relational data",
    tools: ["PostgreSQL", "MySQL", "SQLite", "Data Modeling", "Query Optimization"],
    projects: ["edurisk-analytics", "kasekor-vision"],
  },
  {
    id: "pandas",
    name: "Pandas & NumPy",
    category: "Data",
    proficiency: 80,
    desc: "Data manipulation, cleaning, and analysis",
    tools: ["DataFrames", "Time-Series", "GroupBy", "Pivot Tables", "Data Validation"],
    projects: ["precipitation-analysis", "edurisk-analytics", "sales-analysis", "ecg-analysis"],
  },
  {
    id: "ml",
    name: "Machine Learning",
    category: "ML",
    proficiency: 65,
    desc: "Supervised learning, model evaluation, and deployment",
    tools: ["Scikit-Learn", "XGBoost", "LightGBM", "Model Evaluation", "Cross-Validation"],
    projects: ["gold-price-prediction", "churn-prediction", "precipitation-analysis"],
  },
  {
    id: "visualization",
    name: "Data Visualization",
    category: "Data",
    proficiency: 75,
    desc: "Creating clear, actionable charts and dashboards",
    tools: ["Matplotlib", "Seaborn", "Plotly", "Streamlit", "Folium", "Chart.js"],
    projects: ["edurisk-analytics", "kasekor-vision", "precipitation-analysis", "sales-analysis"],
  },
  {
    id: "typescript",
    name: "TypeScript & React",
    category: "Web",
    proficiency: 60,
    desc: "Building interactive web apps and dashboards",
    tools: ["React", "Next.js", "Vite", "Tailwind CSS", "Chart.js", "D3.js"],
    projects: ["portfolio", "jam-tlai", "kasekor-vision"],
  },
  {
    id: "cpp",
    name: "C++",
    category: "Language",
    proficiency: 75,
    desc: "Algorithms, data structures, and performance-critical code",
    tools: ["STL", "Algorithms", "Data Structures", "OOP", "Memory Management"],
    projects: ["coursework", "algorithms"],
  },
  {
    id: "git",
    name: "Git & GitHub",
    category: "Tools",
    proficiency: 80,
    desc: "Version control, collaboration, and CI/CD",
    tools: ["Git", "GitHub Actions", "Branching Strategies", "Code Review"],
    projects: ["all"],
  },
]

export const stackCategories = [
  {
    number: "01",
    title: "Data Analysis & ML",
    description: "Course and project workflows for cleaning data, modeling, and making it readable.",
    tools: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Jupyter", "Streamlit", "Matplotlib", "Seaborn", "Plotly", "Folium"],
  },
  {
    number: "02",
    title: "Databases & SQL",
    description: "Querying, modeling, and managing relational data for analytics and applications.",
    tools: ["PostgreSQL", "MySQL", "SQLite", "Data Modeling", "Query Optimization", "Data Validation"],
  },
  {
    number: "03",
    title: "Web & Visualization",
    description: "Building interactive dashboards and web apps for data products.",
    tools: ["TypeScript", "React", "Next.js", "Vite", "Tailwind CSS", "Chart.js", "D3.js", "Plotly", "Streamlit"],
  },
  {
    number: "04",
    title: "Systems & Tools",
    description: "Version control, algorithms, and engineering fundamentals.",
    tools: ["Git", "GitHub Actions", "C++", "Algorithms", "Data Structures", "Linux", "Docker"],
  },
]

export const pipelineStages = [
  {
    number: "01",
    title: "Raw Sources",
    label: "INPUT LAYER",
    detail: "APIs · Events · Databases · CSVs",
    type: "sources",
  },
  {
    number: "02",
    title: "Ingestion & Processing",
    label: "COMPUTE LAYER",
    detail: "Stream · Batch · Transform · Clean",
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
    slug: "phnom-penh-precipitation-analysis",
    title: "Phnom Penh Precipitation Analysis",
    status: "ANALYSED",
    type: "forecast",
    url: "https://github.com/Thay32-Heng/Phnom-Penh-Precipitation-Time-Series-Analysis",
    fog: "Eleven years of Phnom Penh rainfall sat unexamined — no structure, no season, no extremes pulled out.",
    strategy: "Built a clean 132-row monthly series (2015–2025) and ran time-plot, seasonal and seasonal-subseries analysis.",
    vision: "Pinned the extremes: 703.62 mm in June 2020 and 0.34 mm in December 2019, across 15,689.7 mm total.",
    stack: "PYTHON / JUPYTER / TIME SERIES",
    metrics: [
      { label: "Rows analysed", value: "132" },
      { label: "Total rainfall", value: "15,689.7 mm" },
      { label: "Wet season share", value: "78%" },
    ],
  },
  {
    index: "02",
    slug: "kasekor-vision",
    title: "Kasekor Vision",
    status: "ACTIVE BUILD",
    type: "vault",
    url: "https://github.com/Thay32-Heng/Kasekor-Vision",
    fog: "Cambodian farmers pick crops from habit, not from data about their own soil and weather.",
    strategy: "Building an interactive map that pairs a farmer's location with a live weather lookup and crop dictionary.",
    vision: "Next: real NASA POWER climate data, crop-soil scoring, and offline mode for low-connectivity farms.",
    stack: "PYTHON / STREAMLIT / FOLIUM",
    metrics: [
      { label: "Provinces mapped", value: "25" },
      { label: "Crop types", value: "12" },
      { label: "Data sources", value: "3 APIs" },
    ],
  },
  {
    index: "03",
    slug: "edurisk-analytics",
    title: "EduRisk Analytics",
    status: "LAB BUILD",
    type: "anomaly",
    url: "https://github.com/Thay32-Heng/EduRiskAnalysis",
    fog: "Attendance, scores and course load sit apart, so nobody can see who is actually falling behind.",
    strategy: "Built a 5-page dashboard with course and risk filters, attendance and score sliders, and CSV export.",
    vision: "A reusable monitoring interface. Runs on a small sample dataset today — real data is the next step.",
    stack: "PYTHON / STREAMLIT / PANDAS",
    metrics: [
      { label: "Dashboard pages", value: "5" },
      { label: "Risk filters", value: "4" },
      { label: "Export formats", value: "CSV" },
    ],
  },
  {
    index: "04",
    slug: "gold-price-prediction",
    title: "Gold Price Prediction",
    status: "ANALYSED",
    type: "forecast",
    url: "https://github.com/Thay32-Heng/Gold-Price-Analysis---Simple-Prediction",
    fog: "Gold prices are volatile and traditional models struggle with non-linear patterns.",
    strategy: "Built a simple prediction model using historical market data and Scikit-Learn to forecast future gold price trends.",
    vision: "Validated model performance on historical data; ready for backtesting on live data.",
    stack: "PYTHON / SCIKIT-LEARN / PANDAS",
    metrics: [
      { label: "Model type", value: "Regression" },
      { label: "Features", value: "Technical indicators" },
      { label: "Validation", value: "Time-series split" },
    ],
  },
  {
    index: "05",
    slug: "sales-data-analysis",
    title: "Sales Data Analysis",
    status: "ANALYSED",
    type: "vault",
    url: "https://github.com/Thay32-Heng/Sales-Data-Analysis",
    fog: "Raw sales data sat in CSVs — no visibility into top products, seasonal trends, or customer segments.",
    strategy: "Performed Exploratory Data Analysis (EDA) on a sales dataset to identify top-selling products and seasonal trends.",
    vision: "Identified top-performing products, peak sales periods, and customer purchasing patterns.",
    stack: "PYTHON / MATPLOTLIB / SEABORN / EDA",
    metrics: [
      { label: "Records analysed", value: "10K+" },
      { label: "Top product share", value: "35%" },
      { label: "Seasonal lift", value: "2.3x" },
    ],
  },
  {
    index: "06",
    slug: "ecg-signal-analysis",
    title: "ECG Signal Analysis",
    status: "ANALYSED",
    type: "anomaly",
    url: "https://github.com/Thay32-Heng/ECG-Signal_Analysis",
    fog: "Raw ECG signals contain noise — detecting heartbeats reliably is non-trivial.",
    strategy: "Analyzed bio-medical ECG data to detect heartbeats and visualize signal patterns using SciPy and NumPy.",
    vision: "Implemented peak detection and signal filtering; visualized clean vs raw signals.",
    stack: "PYTHON / NUMPY / SCIPY / HEALTH TECH",
    metrics: [
      { label: "Signal length", value: "30 min" },
      { label: "Sampling rate", value: "360 Hz" },
      { label: "Detection accuracy", value: "98%+" },
    ],
  },
  {
    index: "07",
    slug: "customer-churn-prediction",
    title: "Customer Churn Prediction",
    status: "ANALYSED",
    type: "forecast",
    url: "https://github.com/Thay32-Heng/Customer-Churn-Prediction",
    fog: "Businesses lose customers silently — no early warning system existed.",
    strategy: "Performed data quality assessment, EDA, and predictive modeling with cross-validation and hyperparameter tuning on customer churn data.",
    vision: "Built a churn prediction pipeline with LightGBM; identified key drivers of churn.",
    stack: "PYTHON / LIGHTGBM / SCIKIT-LEARN / PANDAS",
    metrics: [
      { label: "Model", value: "LightGBM" },
      { label: "AUC", value: "0.92" },
      { label: "Features", value: "25 engineered" },
    ],
  },
  {
    index: "08",
    slug: "jamtlai-price-checker",
    title: "JamTlai Price Checker",
    status: "ANALYSED",
    type: "vault",
    url: "https://github.com/Thay32-Heng/JamTlai",
    fog: "Family grocery stores check prices manually — slow, error-prone, no offline access.",
    strategy: "Developed an offline-first PWA with fast Khmer/English search, dual retail/wholesale prices in KHR, and local data sync.",
    vision: "Deployed for family use; handles 5K+ products with sub-100ms search.",
    stack: "TYPESCRIPT / REACT / VITE / TAILWIND / PWA / INDEXEDDB",
    metrics: [
      { label: "Products", value: "5,000+" },
      { label: "Search latency", value: "<100ms" },
      { label: "Offline support", value: "Full" },
    ],
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
      "Developed an offline-first price checker for family grocery stores with fast Khmer/English search and dual retail/wholesale prices in KHR.",
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
    title: "Eight GitHub project areas",
    subtitle: "Dashboards · time series · maps · offline apps · ML · EDA · signals · PWA",
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
      "A Year 3 time-series project: 132 monthly rainfall records (2015–2025), seasonal subseries analysis, and the wet/dry extremes.",
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
  {
    category: "ML PREDICTION",
    title: "Gold Price Prediction",
    excerpt:
      "Simple prediction model using historical market data to forecast future gold price trends with Scikit-Learn.",
    url: "https://github.com/Thay32-Heng/Gold-Price-Analysis---Simple-Prediction",
  },
  {
    category: "EDA",
    title: "Sales Data Analysis",
    excerpt:
      "Exploratory Data Analysis on a sales dataset to identify top-selling products and seasonal trends.",
    url: "https://github.com/Thay32-Heng/Sales-Data-Analysis",
  },
  {
    category: "SIGNAL PROCESSING",
    title: "ECG Signal Analysis",
    excerpt:
      "Analyzed bio-medical ECG data to detect heartbeats and visualize signal patterns using Python libraries.",
    url: "https://github.com/Thay32-Heng/ECG-Signal_Analysis",
  },
  {
    category: "ML CLASSIFICATION",
    title: "Customer Churn Prediction",
    excerpt:
      "Performed data quality assessment, EDA, and predictive modeling with cross-validation and hyperparameter tuning on customer churn data.",
    url: "https://github.com/Thay32-Heng/Customer-Churn-Prediction",
  },
] as const