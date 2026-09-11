import { useState } from "react";
import SocialLinks from "./SocialLinks";

const API_URL = "http://127.0.0.1:5050";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setStatus("Sending...");

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("Message sent successfully.");
        setForm({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setStatus(data.message || "Unable to send message.");
      }
    } catch (error) {
      console.error(error);
      setStatus(
        "Backend is unavailable. Please use Email or WhatsApp."
      );
    }
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="section-heading">
        <span className="eyebrow">
          <b>+</b> Let's Connect
        </span>

        <h2>
          Have an idea?
          <br />
          <span>Let's make it real.</span>
        </h2>

        <p>
          Whether it is a website, dashboard, business tool or
          a new idea, you can reach me through any of the
          platforms below.
        </p>
      </div>

      <div className="contact-layout">
        <div className="contact-info">
          <div className="contact-badge">
            <span>●</span>
            Open for conversations
          </div>

          <h3>Good ideas deserve good execution.</h3>

          <p>
            Send a message and tell me what you are trying to
            build.
          </p>

          <SocialLinks />
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-heading">
            <span>01 — CONTACT FORM</span>
            <h3>Tell me about your idea.</h3>
          </div>

          <label>
            Your name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Muzammil"
            />
          </label>

          <label>
            Email address
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Message
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What would you like to build?"
              rows="5"
              required
            />
          </label>

          <button type="submit" className="button button-primary">
            Send a message <span>↗</span>
          </button>

          {status && <p className="form-status">{status}</p>}
        </form>
      </div>
    </section>
  );
}