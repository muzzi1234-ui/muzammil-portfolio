import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section className="section projects-section" id="projects">
      <div className="section-heading">
        <span className="eyebrow">
          <b>+</b> Selected Work
        </span>

        <h2>
          Things I've
          <br />
          <span>been building.</span>
        </h2>

        <p>
          A selection of practical projects across business,
          healthcare, e-commerce and networking.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <div className="project-top">
              <span className="project-number">
                {project.number}
              </span>

              <span className="project-category">
                {project.category}
              </span>
            </div>

            <div className="project-preview">
              <div className="window-dots">
                <i />
                <i />
                <i />
              </div>

              <div className="preview-content">
                <span />
                <span />
                <span />
              </div>

              <div className="preview-bars">
                <b />
                <b />
                <b />
                <b />
                <b />
              </div>
            </div>

            <h3>{project.title}</h3>

            <p>{project.description}</p>

            <div className="technology-list">
              {project.technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>

            <div className="project-links">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Project <span>↗</span>
                </a>
              )}

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <span>↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}