export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="hero-status">
            <span className="status-dot" />
            Available for meaningful projects
          </div>

          <div className="hero-tech">
            <span>◆ Python</span>
            <span>◆ React</span>
            <span>◆ SQL</span>
            <span>◆ Full Stack</span>
          </div>

          <p className="hero-greeting">HI! 👋</p>

          <h1>
            Muzammil
            <br />
            <span>Khalid.</span>
          </h1>

          <div className="hero-role">
            <span />
            <strong>Full Stack Developer</strong>
          </div>

          <div className="hero-line">
            <span />
            <p>
              Full Stack Development
              <b> × </b>
              Business Technology
              <b> × </b>
              Data & Automation
            </p>
          </div>

          <p className="hero-description">
            I build modern web applications, business tools and
            data-driven digital products using Python, JavaScript,
            SQL and modern frontend technologies — turning ideas
            and business problems into useful digital experiences.
          </p>

          <div className="hero-stack">
            <span>Python</span>
            <span>JavaScript</span>
            <span>SQL</span>
            <span>React</span>
            <span>Flask</span>
          </div>

          <div className="hero-actions">
            <a href="#projects" className="button button-primary">
              Explore my work <span>→</span>
            </a>

            <a href="#contact" className="button button-secondary">
              Let's talk
            </a>
          </div>

          <a href="#about" className="hero-scroll">
            <span>Scroll to explore</span>
            <b>↓</b>
          </a>
        </div>

        <div className="hero-side">
          <div className="hero-orbit">
            <div className="orbit-ring ring-one" />
            <div className="orbit-ring ring-two" />

            <div className="hero-center-card">
              <div className="center-letter">M</div>

              <span>BUILDING</span>
              <strong>USEFUL<br />DIGITAL<br />PRODUCTS</strong>
            </div>

            <span className="orbit-label label-one">PYTHON</span>
            <span className="orbit-label label-two">REACT</span>
            <span className="orbit-label label-three">SQL</span>
            <span className="orbit-label label-four">DATA</span>
          </div>

          <div className="hero-year">
            <span>FULL STACK</span>
            <strong>2026</strong>
          </div>
        </div>
      </div>
    </section>
  );
}