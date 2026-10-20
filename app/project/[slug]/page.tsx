import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { featuredProjects } from "@/components/panther-dark/data"

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

/**
 * The eight case studies are a fixed list, so they prerender at build time
 * instead of being rendered on demand. `dynamicParams` stays at its default,
 * which means a slug that is not in this list still reaches the page and is
 * turned into a real 404 by `notFound()`.
 */
export async function generateStaticParams() {
  return featuredProjects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = featuredProjects.find((p) => p.slug === slug)

  if (!project) {
    return { title: "Project Not Found" }
  }

  return {
    title: `${project.title} — Heng Sengthay`,
    description: project.vision,
    openGraph: {
      title: project.title,
      description: project.vision,
      type: "article",
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = featuredProjects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <article className="project-detail">
      <header className="project-detail-header">
        <Link href="/" className="back-link" aria-label="Back to projects">
          <svg className="w-5 h-5" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          Back to Projects
        </Link>

        <div className="project-meta">
          <span className="project-index">PROJECT / {project.index}</span>
          <span className={`project-status status-${project.status.toLowerCase().replace(" ", "-")}`}>
            {project.status}
          </span>
        </div>

        <h1 className="project-title">{project.title}</h1>
        <p className="project-stack">{project.stack}</p>
      </header>

      <div className="project-detail-content">
        <section className="project-section" aria-labelledby="problem-heading">
          <h2 id="problem-heading" className="section-title rin-cond">The Problem</h2>
          <p className="project-fog">{project.fog}</p>
        </section>

        <section className="project-section" aria-labelledby="strategy-heading">
          <h2 id="strategy-heading" className="section-title rin-cond">The Strategy</h2>
          <p className="project-strategy">{project.strategy}</p>
        </section>

        <section className="project-section" aria-labelledby="vision-heading">
          <h2 id="vision-heading" className="section-title rin-cond">The Vision</h2>
          <p className="project-vision">{project.vision}</p>
        </section>

        <section className="project-section" aria-labelledby="metrics-heading">
          <h2 id="metrics-heading" className="section-title rin-cond">Key Metrics</h2>
          <div className="metrics-grid rin-hud-grid">
            {project.metrics?.map((metric, i) => (
              <div key={i} className="rin-hud metric-card">
                <p className="rin-hud-label">{metric.label}</p>
                <p className="rin-hud-title" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700, marginTop: '8px' }}>
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="project-section" aria-labelledby="stack-heading">
          <h2 id="stack-heading" className="section-title rin-cond">Tech Stack</h2>
          <div className="stack-tags">
            {project.stack.split(" / ").map((tech, i) => (
              <span key={i} className="stack-tag">{tech}</span>
            ))}
          </div>
        </section>

        <section className="project-section" aria-labelledby="links-heading">
          <h2 id="links-heading" className="section-title rin-cond">Links</h2>
          <div className="project-links">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rin-cut-btn rin-cut-btn-solid"
            >
              <svg className="w-5 h-5" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.16 1.18a10.94 10.94 0 0 1 5.77 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.12 3.05.73.81 1.17 1.84 1.17 3.1 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.15v3.19c0 .3.21.66.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>
              View Code
            </a>
          </div>
        </section>
      </div>

      <footer className="project-footer">
        <Link href="/" className="rin-cut-btn">
          <svg className="w-4 h-4" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          Back to All Projects
        </Link>
      </footer>
    </article>
  )
}