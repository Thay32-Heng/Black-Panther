import { featuredProjects } from "../data"
import { ProjectVisual } from "../ProjectVisual"

import MotionSection from "../MotionSection"
export default function ProjectsSection() {
  return (
          <MotionSection className="projects" id="projects" tabIndex={-1} aria-labelledby="projects-title">
        <div className="projects-inner">
          <header className="projects-heading">
            <p className="projects-overline">/ Projects with public code</p>
            <h2 id="projects-title">Three projects, and what each one found.</h2>
            <p className="projects-intro">
              Every card states the problem, what I actually did, and the result
              the data gave. The status label is honest about how finished each
              one is.
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

                  <div className="project-actions">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Code
                      <span aria-hidden="true">↗</span>
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
