import { useState } from "react";

const questions = [
  [
    "What does Muzammil build?",
    "I build practical websites, business dashboards, e-commerce tools, healthcare platforms and productivity applications.",
  ],
  [
    "What technologies do you work with?",
    "My projects include Python, Flask, React, JavaScript, SQL, Power BI, Excel and modern frontend technologies.",
  ],
  [
    "Can I request a custom website?",
    "Yes. You can contact me with your idea, required features and preferred design. We can discuss the project before development.",
  ],
  [
    "Can you build business dashboards?",
    "Yes. Business dashboards can include KPIs, charts, tables, financial analysis, sales analysis, inventory and other useful business metrics.",
  ],
  [
    "Do you work on e-commerce projects?",
    "Yes. ProfitPilot is an example of an e-commerce-focused project designed around product profitability and business calculations.",
  ],
  [
    "How can I contact you?",
    "You can contact me through LinkedIn, Fiverr, Email, WhatsApp, Instagram or Facebook from the contact section.",
  ],
  [
    "Are the projects shown here real projects?",
    "Yes. The portfolio showcases projects and development work that I have worked on across different technical and business areas.",
  ],
];

export default function FAQ() {
  const [active, setActive] = useState(null);

  function toggle(index) {
    setActive(active === index ? null : index);
  }

  return (
    <section className="section faq-section" id="faq">
      <div className="section-heading">
        <span className="eyebrow">
          <b>+</b> Frequently Asked Questions
        </span>

        <h2>
          A few things
          <br />
          <span>you may want to know.</span>
        </h2>

        <p>
          Simple answers before we turn an idea into something useful.
        </p>
      </div>

      <div className="faq-list">
        {questions.map(([question, answer], index) => {
          const isOpen = active === index;

          return (
            <article
              className={`faq-item ${isOpen ? "faq-open" : ""}`}
              key={question}
            >
              <button
                type="button"
                className="faq-question"
                onClick={() => toggle(index)}
              >
                <span>
                  <small>
                    {String(index + 1).padStart(2, "0")}
                  </small>

                  {question}
                </span>

                <b>{isOpen ? "−" : "+"}</b>
              </button>

              <div className="faq-answer">
                <p>{answer}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}