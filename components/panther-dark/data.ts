export const stackCategories = [
  {
    number: "01",
    title: "Data Engineering",
    description: "Reliable systems built to move, transform, and serve data at scale.",
    tools: ["Python", "SQL", "Apache Spark", "Airflow", "Kafka", "dbt"],
  },
  {
    number: "02",
    title: "Data Science & ML",
    description: "Focused modeling workflows that turn uncertainty into clear outcomes.",
    tools: ["Pandas", "TensorFlow", "PyTorch", "scikit-learn", "NumPy", "MLflow"],
  },
  {
    number: "03",
    title: "Cloud & DevOps",
    description: "Production infrastructure designed for resilience and repeatable delivery.",
    tools: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Linux"],
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
    title: "Real-Time Anomaly Detection",
    type: "anomaly",
    fog: "Critical failures were buried inside 14M daily sensor events.",
    strategy: "Built a streaming feature pipeline with adaptive detection thresholds.",
    vision: "Cut incident response time by 73% while reducing false alerts.",
    stack: "PYTHON / KAFKA / SPARK",
  },
  {
    index: "02",
    title: "Demand Intelligence Engine",
    type: "forecast",
    fog: "Static forecasts left inventory teams reacting weeks too late.",
    strategy: "Deployed a probabilistic model blending sales, seasonality, and market signals.",
    vision: "Improved forecast accuracy by 31% across 1,200 product lines.",
    stack: "PYTORCH / AIRFLOW / AWS",
  },
  {
    index: "03",
    title: "Unified Customer Vault",
    type: "vault",
    fog: "Fragmented records obscured the true customer journey.",
    strategy: "Engineered an identity-resolution layer and governed warehouse model.",
    vision: "Created one trusted view used by six cross-functional teams.",
    stack: "DBT / SNOWFLAKE / SQL",
  },
] as const

export const experienceTimeline = [
  {
    year: "2025",
    role: "Lead Data Architect",
    description:
      "Designing resilient, cloud-native data platforms that unify real-time intelligence and governed analytics.",
    focus: "SYSTEM DESIGN / STRATEGY",
  },
  {
    year: "2023",
    role: "Senior Data Engineer",
    description:
      "Scaled event-driven pipelines and transformed fragmented services into a dependable data ecosystem.",
    focus: "STREAMING / PLATFORM",
  },
  {
    year: "2021",
    role: "Machine Learning Engineer",
    description:
      "Moved predictive models beyond notebooks into observable, repeatable production workflows.",
    focus: "MLOPS / INFERENCE",
  },
  {
    year: "2019",
    role: "Data Scientist",
    description:
      "Translated ambiguous business questions into clear experiments, forecasts, and decision-ready stories.",
    focus: "MODELING / INSIGHT",
  },
  {
    year: "2017",
    role: "The First Script",
    description:
      "Automated a repetitive problem with Python and discovered the leverage hidden inside well-structured data.",
    focus: "PYTHON / CURIOSITY",
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

export const postMortems = [
  {
    id: "INC-042",
    title: "The Silent Schema Drift",
    date: "2024.08.17",
    system: "STREAM_PROCESSOR",
    crash:
      "A vendor changed a nested event field without notice. The pipeline stayed green while quietly dropping 18% of incoming records.",
    fix:
      "Quarantined malformed events, replayed the raw topic, and introduced contract validation at every ingestion boundary.",
    lesson:
      "A successful job is not the same as correct data. Monitor business invariants, not just infrastructure health.",
    terms: "SCHEMA REGISTRY / DLQ / REPLAY",
  },
  {
    id: "INC-057",
    title: "The Costly Cartesian Join",
    date: "2025.02.03",
    system: "FEATURE_PIPELINE",
    crash:
      "An overlooked many-to-many join multiplied a feature table beyond memory limits and brought the overnight model run to a halt.",
    fix:
      "Stopped the workflow, corrected the grain, added cardinality assertions, and backfilled only the affected partitions.",
    lesson:
      "Define data grain before writing the join. Scale magnifies assumptions faster than it magnifies value.",
    terms: "SPARK / ASSERTIONS / PARTITIONING",
  },
] as const

export const certifications = [
  {
    rank: "CERT / 01",
    title: "AWS Certified",
    subtitle: "Data Analytics — Specialty",
    type: "cloud",
  },
  {
    rank: "CERT / 02",
    title: "GCP Data Engineer",
    subtitle: "Professional Certification",
    type: "network",
  },
  {
    rank: "CERT / 03",
    title: "Databricks Engineer",
    subtitle: "Data Engineer — Professional",
    type: "lakehouse",
  },
  {
    rank: "RANK / 04",
    title: "Kaggle Silver",
    subtitle: "Competition Medalist",
    type: "competition",
  },
] as const

export const logbookEntries = [
  {
    date: "MAY 18, 2025",
    readTime: "08 MIN",
    category: "DATA ARCHITECTURE",
    title: "The Cost of a Pipeline Nobody Understands",
    excerpt:
      "Why operational clarity matters more than clever abstractions when a data platform begins to scale across teams.",
  },
  {
    date: "APR 02, 2025",
    readTime: "06 MIN",
    category: "MACHINE LEARNING",
    title: "Your Model Is Not the Product",
    excerpt:
      "A field note on the systems, interfaces, and human decisions that turn a strong prediction into measurable value.",
  },
  {
    date: "FEB 21, 2025",
    readTime: "11 MIN",
    category: "DATA QUALITY",
    title: "Monitoring the Truth, Not Just the Job",
    excerpt:
      "Green dashboards can still deliver broken data. These are the invariants I monitor beyond pipeline uptime.",
  },
  {
    date: "JAN 09, 2025",
    readTime: "05 MIN",
    category: "ENGINEERING CULTURE",
    title: "Silence as a Technical Advantage",
    excerpt:
      "How deep work, deliberate communication, and fewer handoffs produce calmer systems and better engineering decisions.",
  },
] as const

