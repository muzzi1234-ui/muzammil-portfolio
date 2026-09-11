import React, { useEffect, useMemo, useState } from "react";
import Admin from "./admin/Admin";

const EMAIL = "muzammil.khalid39@gmail.com";
const WHATSAPP = "https://wa.me/923322483804";
const LINKEDIN =
  "https://www.linkedin.com/in/khawaja-muzammil-k-140a5318a";
const INSTAGRAM =
  "https://www.instagram.com/codewithmuzz/?stkn=MTB4bGg0Ymp1dzY2Zw%3D%3D";

const PROFITPILOT =
  "https://profitpilot-ce6aoihr3-code-with-muzammil.vercel.app/";
const DOCTOR_AI = "https://github.com/muzzi1234-ui/doctor-ai";
const AIR_SHARE = "https://air-share-pro-mu.vercel.app/";
const AIR_SHARE_GITHUB = "https://github.com/muzzi1234-ui/air-share-pro";

const skills = [
  ["Python", "Backend, automation & APIs"],
  ["JavaScript", "Modern web applications"],
  ["SQL", "Databases & data queries"],
  ["React", "Interactive frontend interfaces"],
  ["Flask", "Python web backends"],
  ["HTML / CSS", "Responsive web interfaces"],
  ["Power BI", "Business intelligence dashboards"],
  ["Excel", "Analysis & reporting"],
  ["Machine Learning", "Predictive modelling foundations"],
  ["Deep Learning", "Neural network foundations"],
  ["Pandas", "Data manipulation & analysis"],
  ["NumPy", "Numerical computing"],
];

const projects = [
  {
    number: "01",
    title: "ProfitPilot",
    category: "E-Commerce Profit Intelligence",
    description:
      "A practical business calculator for analysing product costs, fees, marketing spend, margins, ROI and target pricing.",
    tags: ["Python", "Flask", "SQL", "Analytics"],
    live: PROFITPILOT,
  },
  {
    number: "02",
    title: "Doctor AI",
    category: "Medical Appointment Platform",
    description:
      "A medical web platform with patient registration, doctor dashboards, appointments, reviews, reports and AI-assisted features.",
    tags: ["Python", "Flask", "SQL", "APIs"],
    github: DOCTOR_AI,
  },
  {
    number: "03",
    title: "Air Share Pro",
    category: "LAN File Sharing",
    description:
      "A private network file-sharing application designed for fast sharing between devices connected to the same network.",
    tags: ["Python", "Flask", "Networking", "Web"],
    live: AIR_SHARE,
    github: AIR_SHARE_GITHUB,
  },
];

const faqs = [
  {
    question: "What do you build?",
    answer:
      "I build full-stack web applications, business tools, dashboards, APIs and automation-focused systems.",
  },
  {
    question: "Which technologies do you use?",
    answer:
      "My main technologies include Python, JavaScript, SQL, React, Flask, HTML, CSS, Power BI and Excel.",
  },
  {
    question: "Can you build a custom business application?",
    answer:
      "Yes. A project can be designed around a company's workflow, data, reporting requirements and operational needs.",
  },
  {
    question: "Do you work with existing projects?",
    answer:
      "Yes. I can improve existing applications, fix bugs, add features, connect APIs and improve interfaces.",
  },
];

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}

function Logo() {
  return (
    <div className="brand-logo">
      <span className="brand-mark">M</span>
      <span className="brand-name">MUZAMMIL</span>
    </div>
  );
}

function Navbar() {
  return (
    <header className="site-nav">
      <a href="#home" className="nav-logo">
        <Logo />
      </a>

      <nav className="nav-links">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#faq">FAQ</a>
        <a href="#contact">Contact</a>
      </nav>

      <a href="#contact" className="nav-cta">
        Let's talk <span>↗</span>
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-background">
        <span className="hero-shape shape-one" />
        <span className="hero-shape shape-two" />
        <span className="hero-shape shape-three" />
      </div>

      <div className="hero-content reveal">
        <div className="availability">
          <span />
          Available for selected projects
        </div>

        <p className="hero-label">FULL STACK DEVELOPER</p>

        <h1>
          Building useful
          <br />
          <strong>digital products.</strong>
        </h1>

        <p className="hero-description">
          Full Stack Developer focused on practical web applications,
          business systems, automation and data-driven tools.
        </p>

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

        <div className="hero-buttons">
          <a href="#projects" className="primary-button">
            Explore projects <span>↗</span>
          </a>

          <a href={`mailto:${EMAIL}`} className="secondary-button">
            Email me
          </a>
        </div>

        <div className="hero-stack">
          <span>Python</span>
          <span>JavaScript</span>
          <span>SQL</span>
        </div>
      </div>

      <div className="hero-visual reveal">
        <div className="hero-card">
          <div className="hero-card-heading">
            <span>MUZAMMIL</span>
            <span>01</span>
          </div>

          <div className="hero-card-title">
            <span>Build.</span>
            <span>Connect.</span>
            <span>Improve.</span>
          </div>

          <div className="hero-card-lines">
            <span />
            <span />
            <span />
          </div>

          <p>
            Web applications
            <br />
            Business systems
            <br />
            Data & automation
          </p>
        </div>

        <div className="floating-badge badge-one">
          Full Stack
        </div>

        <div className="floating-badge badge-two">
          Data
        </div>

        <div className="floating-badge badge-three">
          Automation
        </div>

        <div className="panda">
          <div className="panda-ear panda-ear-left" />
          <div className="panda-ear panda-ear-right" />

          <div className="panda-head">
            <div className="panda-eye panda-eye-left" />
            <div className="panda-eye panda-eye-right" />
            <div className="panda-nose" />
          </div>

          <div className="panda-body" />
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="section-heading reveal">
        <span className="section-number">01 — About</span>

        <h2>Code that solves real problems.</h2>

        <p>
          I like turning ideas, workflows and messy data into useful digital
          products.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-main reveal">
          <span className="large-number">01</span>

          <h3>
            From idea
            <br />
            to working product.
          </h3>

          <p>
            My focus is full-stack development with an interest in business
            technology, automation and data. I enjoy understanding how a
            product should work before building the interface and backend
            behind it.
          </p>

          <p>
            I work across frontend, backend, databases, APIs and reporting
            tools so the final product feels connected instead of being just
            a collection of screens.
          </p>
        </div>

        <div className="about-items">
          <div className="about-item reveal">
            <span>01</span>
            <div>
              <h3>Frontend</h3>
              <p>Responsive interfaces and interactive experiences.</p>
            </div>
          </div>

          <div className="about-item reveal">
            <span>02</span>
            <div>
              <h3>Backend</h3>
              <p>APIs, application logic, databases and integrations.</p>
            </div>
          </div>

          <div className="about-item reveal">
            <span>03</span>
            <div>
              <h3>Data</h3>
              <p>Dashboards, analysis and practical automation.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section skills-section" id="skills">
      <div className="section-heading reveal">
        <span className="section-number">02 — Skills</span>

        <h2>A practical technology stack.</h2>

        <p>
          Tools I use to build, connect, analyse and improve digital products.
        </p>
      </div>

      <div className="skills-grid">
        {skills.map(([name, description], index) => (
          <article
            className="skill-card reveal"
            key={name}
            style={{ "--skill-delay": `${index * 40}ms` }}
          >
            <span className="skill-number">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <h3>{name}</h3>
              <p>{description}</p>
            </div>

            <span className="skill-arrow">↗</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section projects-section" id="projects">
      <div className="section-heading reveal">
        <span className="section-number">03 — Selected work</span>

        <h2>Projects built to be useful.</h2>

        <p>
          A few examples of applications, business tools and systems I've
          worked on.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <article className="project-card reveal" key={project.title}>
            <div className="project-header">
              <span>{project.number}</span>
              <span>{project.category}</span>
            </div>

            <div className="project-visual">
              <span>{project.number}</span>
              <strong>{project.title}</strong>
            </div>

            <h3>{project.title}</h3>

            <p>{project.description}</p>

            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <div className="project-links">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live project ↗
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section faq-section" id="faq">
      <div className="section-heading reveal">
        <span className="section-number">04 — FAQ</span>

        <h2>Questions, answered.</h2>

        <p>A quick overview before we start working together.</p>
      </div>

      <div className="faq-list">
        {faqs.map((item, index) => {
          const active = open === index;

          return (
            <div
              className={`faq-item reveal ${active ? "active" : ""}`}
              key={item.question}
            >
              <button
                type="button"
                onClick={() => setOpen(active ? -1 : index)}
              >
                <span>
                  <small>0{index + 1}</small>
                  {item.question}
                </span>

                <b>{active ? "−" : "+"}</b>
              </button>

              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function DeveloperAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi. Ask me about Muzammil's skills, projects or contact details.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const fallback = useMemo(
    () => ({
      skills:
        "Muzammil works with Python, JavaScript, SQL, React, Flask, Power BI, Excel, Pandas and NumPy.",
      projects:
        "The portfolio currently includes ProfitPilot, Doctor AI and Air Share Pro.",
      contact:
        "You can contact Muzammil at muzammil.khalid39@gmail.com or through WhatsApp and LinkedIn.",
      default:
        "I can tell you about Muzammil's skills, projects, technology stack or contact options.",
    }),
    []
  );

  const getAnswer = (question) => {
    const q = question.toLowerCase();

    if (
      q.includes("skill") ||
      q.includes("technology") ||
      q.includes("stack")
    ) {
      return fallback.skills;
    }

    if (
      q.includes("project") ||
      q.includes("work") ||
      q.includes("portfolio")
    ) {
      return fallback.projects;
    }

    if (
      q.includes("contact") ||
      q.includes("email") ||
      q.includes("whatsapp")
    ) {
      return fallback.contact;
    }

    return fallback.default;
  };

  const sendMessage = async () => {
    const question = input.trim();

    if (!question || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: question,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
     const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: question,
        }),
      });

      if (!response.ok) {
        throw new Error("AI endpoint unavailable");
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            data.answer ||
            data.response ||
            data.message ||
            getAnswer(question),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: getAnswer(question),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="assistant-button"
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Open developer assistant"
      >
        {open ? "×" : "AI"}
      </button>

      {open && (
        <div className="assistant-panel">
          <div className="assistant-header">
            <div>
              <small>Developer Assistant</small>
              <strong>Muzammil's Portfolio</strong>
            </div>

            <button type="button" onClick={() => setOpen(false)}>
              ×
            </button>
          </div>

          <div className="assistant-messages">
            {messages.map((message, index) => (
              <div
                className={`assistant-message ${message.role}`}
                key={`${message.role}-${index}`}
              >
                {message.text}
              </div>
            ))}

            {loading && (
              <div className="assistant-message assistant">
                Typing...
              </div>
            )}
          </div>

          <div className="assistant-input">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder="Ask something..."
            />

            <button type="button" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      window.prompt("Copy this email:", EMAIL);
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="contact-box reveal">
        <span className="section-number">05 — Contact</span>

        <h2>
          Have an idea?
          <br />
          <strong>Let's build it.</strong>
        </h2>

        <p>
          Tell me what you are trying to build, improve or automate.
          We can start from there.
        </p>

        <a
  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=Portfolio%20Contact`}
  target="_blank"
  rel="noreferrer"
  className="contact-button"
>
  Start a conversation ↗
</a>

        <button
          type="button"
          className="email-copy"
          onClick={copyEmail}
        >
          {copied ? "Email copied" : EMAIL}
        </button>

       <div className="social-row">
  <a
    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=Portfolio%20Contact`}
    target="_blank"
    rel="noreferrer"
    className="social-link"
  >
    <span className="social-circle">E</span>
    Email
  </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="social-link"
          >
            <span className="social-circle">W</span>
            WhatsApp
          </a>

          <a
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer"
            className="social-link"
          >
            <span className="social-circle">in</span>
            LinkedIn
          </a>

          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noreferrer"
            className="social-link"
          >
            <span className="social-circle">IG</span>
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <Logo />

      <div className="footer-links">
        <a href={`mailto:${EMAIL}`}>Email</a>
        <a href={LINKEDIN} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={INSTAGRAM} target="_blank" rel="noreferrer">
          Instagram
        </a>
      </div>
    </footer>
  );
}

function PublicPortfolio() {
  useReveal();

  useEffect(() => {
    const move = (event) => {
      document.documentElement.style.setProperty(
        "--mouse-x",
        `${event.clientX}px`
      );

      document.documentElement.style.setProperty(
        "--mouse-y",
        `${event.clientY}px`
      );
    };

    window.addEventListener("pointermove", move);

    return () => {
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <div className="portfolio-app">
      <div className="cursor-glow" />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <FAQ />
        <Contact />
      </main>

      <Footer />

      <DeveloperAssistant />

      <a href="#home" className="back-top">
        ↑
      </a>
    </div>
  );
}

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  if (path === "/admin") {
    return <Admin />;
  }

  return <PublicPortfolio />;
}

