const skills = [
  {
    number: "01",
    type: "Programming Language",
    name: "Python",
    text: "Backend development, application logic, automation and APIs.",
  },
  {
    number: "02",
    type: "Programming Language",
    name: "JavaScript",
    text: "Interactive web applications and modern frontend development.",
  },
  {
    number: "03",
    type: "Database Language",
    name: "SQL",
    text: "Database queries, data management and business data analysis.",
  },
  {
    number: "04",
    type: "Web Language",
    name: "HTML",
    text: "Semantic website structure and accessible web interfaces.",
  },
  {
    number: "05",
    type: "Web Styling",
    name: "CSS",
    text: "Responsive layouts, animations and modern user interfaces.",
  },
  {
    number: "06",
    type: "Frontend Development",
    name: "React",
    text: "Component-based interfaces and modern single-page applications.",
  },
  {
    number: "07",
    type: "Backend Development",
    name: "Flask",
    text: "Python web applications, REST APIs and full-stack systems.",
  },
  {
    number: "08",
    type: "Business Intelligence",
    name: "Power BI",
    text: "Business dashboards, KPIs, visualizations and data insights.",
  },
  {
    number: "09",
    type: "Data & Analytics",
    name: "Excel",
    text: "Business calculations, reporting, analysis and data organization.",
  },
];

export default function Skills() {
  return (
    <section className="section skills-section" id="skills">
      <div className="section-heading">
        <span className="eyebrow">
          <b>+</b> Skills & Technologies
        </span>

        <h2>
          The tools I use to
          <br />
          <span>build things.</span>
        </h2>

        <p>
          A practical technology stack covering programming,
          frontend, backend, databases and business intelligence.
        </p>
      </div>

      <div className="skills-intro">
        <strong>09</strong>

        <div>
          <span>Core technologies</span>
          <p>
            My development work combines <b>programming</b>,
            <b> web development</b>, <b>databases</b> and
            <b> business intelligence</b> to create useful
            digital products.
          </p>
        </div>
      </div>

      <div className="skills-grid">
        {skills.map((skill) => (
          <article className="skill-card" key={skill.name}>
            <div className="skill-top">
              <span className="skill-symbol">◆</span>
              <span>{skill.number}</span>
            </div>

            <small>{skill.type}</small>

            <h3>{skill.name}</h3>

            <p>{skill.text}</p>
          </article>
        ))}
      </div>

      <div className="skill-marquee">
        <div>
          PYTHON <i>✦</i>
          JAVASCRIPT <i>✦</i>
          SQL <i>✦</i>
          REACT <i>✦</i>
          FLASK <i>✦</i>
          HTML <i>✦</i>
          CSS <i>✦</i>
          POWER BI <i>✦</i>
          EXCEL <i>✦</i>
        </div>
      </div>
    </section>
  );
}