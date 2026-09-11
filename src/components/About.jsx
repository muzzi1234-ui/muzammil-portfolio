const cards = [
  {
    number: "01",
    title: "Development",
    text: "Frontend, backend and practical web applications.",
  },
  {
    number: "02",
    title: "Business",
    text: "Business thinking combined with digital solutions.",
  },
  {
    number: "03",
    title: "Data",
    text: "SQL, dashboards, analysis and data-driven tools.",
  },
  {
    number: "04",
    title: "Problem Solving",
    text: "Turning real-world requirements into usable products.",
  },
];

export default function About() {
  return (
    <section className="section about-section" id="about">
      <div className="section-heading">
        <span className="eyebrow">
          <b>+</b> About Me
        </span>

        <h2>
          Where business
          <br />
          <span>meets technology.</span>
        </h2>
      </div>

      <div className="about-layout">
        <div className="about-main">
          <p className="about-lead">
            With a background in BBA Marketing and a growing
            technical skill set, I enjoy working at the
            intersection of business, data and software.
          </p>

          <div className="about-number">01</div>

          <p>
            I like building things that have a purpose — not
            just beautiful interfaces, but tools that solve a
            problem, explain information clearly or make
            someone's work easier.
          </p>

          <p>
            My learning journey has taken me through Python,
            Flask, React, JavaScript, SQL, Power BI, Excel and
            different areas of modern application development.
          </p>

          <div className="about-pair">
            <span>Business mindset</span>
            <b>+</b>
            <span>Technical curiosity</span>
          </div>
        </div>

        <div className="about-cards">
          {cards.map((card) => (
            <article className="about-card" key={card.number}>
              <span className="card-number">{card.number}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <span className="card-arrow">↗</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}