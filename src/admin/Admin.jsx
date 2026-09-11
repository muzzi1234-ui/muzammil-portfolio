import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:5050";

export default function Admin({
  token,
  onLogin,
  onLogout,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [summary, setSummary] = useState(null);
  const [visitors, setVisitors] = useState([]);
  const [events, setEvents] = useState([]);
  const [leads, setLeads] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(event) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        setError(
          data.message || "Invalid admin credentials."
        );
        return;
      }

      onLogin(data.token);
    } catch (err) {
      console.error(err);
      setError("Cannot connect to analytics backend.");
    } finally {
      setLoading(false);
    }
  }

  async function loadDashboard() {
    if (!token) return;

    setLoading(true);
    setError("");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const [
        summaryResponse,
        visitorsResponse,
        eventsResponse,
        leadsResponse,
      ] = await Promise.all([
        fetch(`${API_URL}/api/admin/summary`, {
          headers,
        }),
        fetch(`${API_URL}/api/admin/visitors?limit=100`, {
          headers,
        }),
        fetch(`${API_URL}/api/admin/events?limit=100`, {
          headers,
        }),
        fetch(`${API_URL}/api/admin/leads?limit=100`, {
          headers,
        }),
      ]);

      const summaryData = await summaryResponse.json();
      const visitorsData = await visitorsResponse.json();
      const eventsData = await eventsResponse.json();
      const leadsData = await leadsResponse.json();

      if (summaryData.success) {
        setSummary(summaryData.summary);
      }

      if (visitorsData.success) {
        setVisitors(visitorsData.visitors || []);
      }

      if (eventsData.success) {
        setEvents(eventsData.events || []);
      }

      if (leadsData.success) {
        setLeads(leadsData.leads || []);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to load analytics.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      loadDashboard();
    }
  }, [token]);

  if (!token) {
    return (
      <div className="admin-login-page">
        <form className="admin-login-card" onSubmit={login}>
          <div className="admin-logo">M</div>

          <span className="eyebrow">PRIVATE AREA</span>

          <h1>Portfolio Admin</h1>

          <p>
            Sign in to view your portfolio analytics.
          </p>

          <label>
            Username
            <input
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              placeholder="Admin username"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Admin password"
              required
            />
          </label>

          {error && (
            <div className="admin-error">{error}</div>
          )}

          <button
            className="button button-primary admin-submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <a href="/" className="admin-back">
            ← Back to portfolio
          </a>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <span className="eyebrow">ANALYTICS</span>
          <h1>Portfolio Dashboard</h1>
        </div>

        <div className="admin-header-actions">
          <button
            type="button"
            onClick={loadDashboard}
            className="admin-refresh"
          >
            ↻ Refresh
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="admin-logout"
          >
            Logout
          </button>
        </div>
      </header>

      {error && (
        <div className="admin-error admin-wide">
          {error}
        </div>
      )}

      <main className="admin-content">
        <div className="admin-stats">
          <div>
            <small>Visitors</small>
            <strong>
              {summary?.total_visitors ?? visitors.length}
            </strong>
          </div>

          <div>
            <small>Page Visits</small>
            <strong>
              {summary?.total_page_visits ?? "—"}
            </strong>
          </div>

          <div>
            <small>Events</small>
            <strong>
              {summary?.total_events ?? events.length}
            </strong>
          </div>

          <div>
            <small>Contact Leads</small>
            <strong>{leads.length}</strong>
          </div>
        </div>

        <section className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <span>RECENT VISITORS</span>
              <h2>Visitors</h2>
            </div>
          </div>

          <div className="admin-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Session</th>
                  <th>Last activity</th>
                </tr>
              </thead>

              <tbody>
                {visitors.map((visitor) => (
                  <tr key={visitor.id}>
                    <td>{visitor.id}</td>
                    <td>{visitor.session_id}</td>
                    <td>
                      {visitor.last_activity || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!visitors.length && (
              <div className="admin-empty">
                No visitor records yet.
              </div>
            )}
          </div>
        </section>

        <section className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <span>INTERACTIONS</span>
              <h2>Events</h2>
            </div>
          </div>

          <div className="admin-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Target</th>
                  <th>Page</th>
                </tr>
              </thead>

              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td>{event.event_name}</td>
                    <td>{event.event_target || "—"}</td>
                    <td>{event.page || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!events.length && (
              <div className="admin-empty">
                No events yet.
              </div>
            )}
          </div>
        </section>

        <section className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <span>CONTACT</span>
              <h2>Leads</h2>
            </div>
          </div>

          <div className="admin-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                </tr>
              </thead>

              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td>{lead.name || "—"}</td>
                    <td>{lead.email || "—"}</td>
                    <td>{lead.message || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!leads.length && (
              <div className="admin-empty">
                No contact leads yet.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}