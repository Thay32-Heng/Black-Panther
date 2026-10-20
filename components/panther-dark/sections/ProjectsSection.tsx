import Link from "next/link"

import { featuredProjects } from "../data"
import { ProjectVisual } from "../ProjectVisual"

import MotionSection from "../MotionSection"
export default function ProjectsSection() {
  return (
          <MotionSection className="projects rin-tone-teal" id="projects" tabIndex={-1} aria-labelledby="projects-title">
        <div className="projects-inner">
          <header className="projects-heading">
            <p className="projects-overline">/ Projects with public code</p>
            <h2 id="projects-title">Eight projects, and what each one found.</h2>
            <p className="projects-intro">
              Every card states the problem, what I actually did, and the result
              the data gave. The status label is honest about how finished each
              one is. Open a case study for the full write-up.
            </p>
          </header>

          <div className="projects-list">
            {featuredProjects.map((project, index) => (
              <article
                className={
                  index === 0 ? "project-card project-card-highlight" : "project-card"
                }
                key={project.title}
              >
                <div className="project-visual">
                  <div className="project-visual-meta">
                    <span>PROJECT / {project.index}</span>
                    <span>{project.status}</span>
                  </div>
                  <ProjectVisual type={project.type} />
                  <span className="visual-corner visual-corner-one" />
                  <span className="visual-corner visual-corner-two" />
                </div>

                <div className="project-copy">
                  <div className="project-index">
                    <span>CASE STUDY {project.index}</span>
                    <span>{project.stack}</span>
                  </div>
                  <h3>{project.title}</h3>

                  <dl className="project-details">
                    <div>
                      <dt>The problem</dt>
                      <dd>{project.fog}</dd>
                    </div>
                    <div>
                      <dt>What I did</dt>
                      <dd>{project.strategy}</dd>
                    </div>
                    <div className="project-result">
                      <dt>What the data showed</dt>
                      <dd>{project.vision}</dd>
                    </div>
                  </dl>

                  {/* rin HUD metric cards for each project */}
                  <div className="rin-hud-grid" style={{ marginTop: '24px' }}>
                    {project.metrics?.map((metric) => (
                      <div className="rin-hud" key={metric.label}>
                        <p className="rin-hud-label">{metric.label}</p>
                        <p className="rin-hud-title" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700, marginTop: '8px' }}>
                          {metric.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="project-actions">
                    <Link
                      className="rin-cut-btn rin-cut-btn-solid"
                      href={`/project/${project.slug}`}
                    >
                      Case Study
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <a
                      className="rin-cut-btn"
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Code
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </MotionSection>
  )
}
