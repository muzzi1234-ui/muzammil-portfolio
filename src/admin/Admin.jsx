
import { useEffect, useState } from "react";

const API_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:5050"
    : "";

const TOKEN_KEY = "muzammil_portfolio_admin_token";

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at 15% 10%, rgba(184, 194, 119, 0.18), transparent 28%), radial-gradient(circle at 85% 20%, rgba(241, 196, 82, 0.14), transparent 25%), #f5f1e6",
    color: "#263025",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    padding: "28px",
    boxSizing: "border-box",
  },

  loginWrap: {
    minHeight: "calc(100vh - 56px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  loginCard: {
    width: "min(440px, 100%)",
    background: "rgba(255, 253, 246, 0.92)",
    border: "1px solid rgba(72, 82, 55, 0.12)",
    borderRadius: "28px",
    padding: "38px",
    boxShadow: "0 25px 80px rgba(47, 54, 36, 0.14)",
    backdropFilter: "blur(18px)",
  },

  logo: {
    width: "58px",
    height: "58px",
    borderRadius: "18px",
    display: "grid",
    placeItems: "center",
    background: "#66734a",
    color: "#fffdf6",
    fontSize: "25px",
    fontWeight: 800,
    marginBottom: "24px",
    boxShadow: "0 12px 30px rgba(74, 85, 51, 0.22)",
  },

  eyebrow: {
    display: "inline-block",
    fontSize: "11px",
    fontWeight: 800,
    letterSpacing: "0.18em",
    color: "#7b835d",
    marginBottom: "10px",
  },

  title: {
    margin: 0,
    fontSize: "clamp(30px, 5vw, 44px)",
    lineHeight: 1.05,
    letterSpacing: "-0.04em",
    color: "#283023",
  },

  subtitle: {
    margin: "14px 0 28px",
    color: "#727967",
    lineHeight: 1.6,
  },

  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: 700,
    color: "#4f5845",
    marginBottom: "17px",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    marginTop: "8px",
    padding: "14px 15px",
    borderRadius: "14px",
    border: "1px solid rgba(72, 82, 55, 0.16)",
    background: "#fffef9",
    color: "#283023",
    outline: "none",
    fontSize: "15px",
  },

  button: {
    width: "100%",
    border: 0,
    borderRadius: "14px",
    padding: "14px 18px",
    background: "#66734a",
    color: "#fffdf6",
    fontWeight: 800,
    fontSize: "15px",
    cursor: "pointer",
    boxShadow: "0 12px 25px rgba(74, 85, 51, 0.18)",
  },

  error: {
    padding: "12px 14px",
    borderRadius: "12px",
    background: "rgba(176, 71, 62, 0.08)",
    border: "1px solid rgba(176, 71, 62, 0.16)",
    color: "#a34239",
    fontSize: "13px",
    marginBottom: "15px",
  },

  back: {
    display: "block",
    textAlign: "center",
    marginTop: "22px",
    color: "#6d7753",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 700,
  },

  header: {
    maxWidth: "1250px",
    margin: "0 auto 28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap",
  },

  headerTitle: {
    margin: 0,
    fontSize: "clamp(28px, 5vw, 46px)",
    letterSpacing: "-0.04em",
    color: "#283023",
  },

  headerText: {
    margin: "8px 0 0",
    color: "#747b68",
  },

  logout: {
    border: "1px solid rgba(72, 82, 55, 0.15)",
    background: "rgba(255, 253, 246, 0.8)",
    color: "#4e5841",
    borderRadius: "12px",
    padding: "11px 17px",
    fontWeight: 800,
    cursor: "pointer",
  },

  grid: {
    maxWidth: "1250px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
    gap: "16px",
  },

  stat: {
    background: "rgba(255, 253, 246, 0.9)",
    border: "1px solid rgba(72, 82, 55, 0.1)",
    borderRadius: "20px",
    padding: "22px",
    boxShadow: "0 12px 40px rgba(47, 54, 36, 0.06)",
  },

  statLabel: {
    color: "#7a806d",
    fontSize: "12px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },

  statValue: {
    marginTop: "10px",
    fontSize: "32px",
    fontWeight: 850,
    color: "#35402d",
  },

  section: {
    maxWidth: "1250px",
    margin: "24px auto 0",
    background: "rgba(255, 253, 246, 0.88)",
    border: "1px solid rgba(72, 82, 55, 0.1)",
    borderRadius: "22px",
    overflow: "hidden",
    boxShadow: "0 12px 40px rgba(47, 54, 36, 0.05)",
  },

  sectionHeader: {
    padding: "20px 22px",
    borderBottom: "1px solid rgba(72, 82, 55, 0.09)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "18px",
    color: "#35402d",
  },

  tableWrap: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "650px",
  },

  th: {
    textAlign: "left",
    padding: "13px 18px",
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#7b826e",
    background: "rgba(238, 235, 220, 0.48)",
  },

  td: {
    padding: "14px 18px",
    borderTop: "1px solid rgba(72, 82, 55, 0.07)",
    fontSize: "13px",
    color: "#505947",
  },

  empty: {
    padding: "30px",
    textAlign: "center",
    color: "#858b79",
  },
};

function StatCard({ label, value }) {
  return (
    <div style={styles.stat}>
      <div style={styles.statLabel}>{label}</div>
      <div style={styles.statValue}>{value ?? 0}</div>
    </div>
  );
}

function DataTable({ title, rows, columns }) {
  return (
    <section style={styles.section}>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>{title}</h2>
        <span style={styles.statLabel}>{rows.length} records</span>
      </div>

      {rows.length === 0 ? (
        <div style={styles.empty}>No data available yet.</div>
      ) : (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key} style={styles.th}>
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, index) => (
                <tr key={row.id ?? index}>
                  {columns.map((column) => (
                    <td key={column.key} style={styles.td}>
                      {column.render
                        ? column.render(row)
                        : row[column.key] ?? "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default function Admin() {
  const [token, setToken] = useState(
    () => localStorage.getItem(TOKEN_KEY) || ""
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [summary, setSummary] = useState(null);
  const [visitors, setVisitors] = useState([]);
  const [events, setEvents] = useState([]);
  const [leads, setLeads] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(newToken) {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
    setSummary(null);
    setVisitors([]);
    setEvents([]);
    setLeads([]);
  }

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

      if (!response.ok || !data.success || !data.token) {
        setError(
          data.message || "Invalid admin credentials."
        );
        return;
      }

      handleLogin(data.token);
    } catch (err) {
      console.error(err);
      setError(
        "Cannot connect to analytics backend. Make sure Flask is running on port 5050."
      );
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
      const responses = await Promise.all([
        fetch(`${API_URL}/api/admin/summary`, { headers }),
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

      if (responses.some((response) => response.status === 401)) {
        handleLogout();
        setError("Admin session expired. Please sign in again.");
        return;
      }

      const [
        summaryData,
        visitorsData,
        eventsData,
        leadsData,
      ] = await Promise.all(
        responses.map((response) => response.json())
      );

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
      setError(
        "Unable to load analytics. Check that the backend is running."
      );
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
      <div style={styles.page}>
        <div style={styles.loginWrap}>
          <form style={styles.loginCard} onSubmit={login}>
            <div style={styles.logo}>M</div>

            <span style={styles.eyebrow}>PRIVATE AREA</span>

            <h1 style={styles.title}>Portfolio Admin</h1>

            <p style={styles.subtitle}>
              Sign in to view your portfolio analytics,
              visitors, events and contact leads.
            </p>

            <label style={styles.label}>
              Username
              <input
                style={styles.input}
                value={username}
                onChange={(event) =>
                  setUsername(event.target.value)
                }
                placeholder="Admin username"
                autoComplete="username"
                required
              />
            </label>

            <label style={styles.label}>
              Password
              <input
                style={styles.input}
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Admin password"
                autoComplete="current-password"
                required
              />
            </label>

            {error && (
              <div style={styles.error}>{error}</div>
            )}

            <button
              type="submit"
              style={{
                ...styles.button,
                opacity: loading ? 0.7 : 1,
              }}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <a href="/" style={styles.back}>
              ← Back to portfolio
            </a>
          </form>
        </div>
      </div>
    );
  }

  const totalVisitors =
    summary?.total_visitors ??
    summary?.visitors ??
    visitors.length;

  const totalEvents =
    summary?.total_events ??
    summary?.events ??
    events.length;

  const totalLeads =
    summary?.total_leads ??
    summary?.leads ??
    leads.length;

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <span style={styles.eyebrow}>MUZAMMIL KHALID</span>
          <h1 style={styles.headerTitle}>
            Portfolio Analytics
          </h1>
          <p style={styles.headerText}>
            Visitors, activity and contact leads.
          </p>
        </div>

        <button
          type="button"
          style={styles.logout}
          onClick={handleLogout}
        >
          Sign out
        </button>
      </header>

      {error && (
        <div
          style={{
            ...styles.error,
            maxWidth: "1250px",
            margin: "0 auto 18px",
          }}
        >
          {error}
        </div>
      )}

      <div style={styles.grid}>
        <StatCard
          label="Total Visitors"
          value={totalVisitors}
        />

        <StatCard
          label="Total Events"
          value={totalEvents}
        />

        <StatCard
          label="Contact Leads"
          value={totalLeads}
        />

        <StatCard
          label="Tracked Sessions"
          value={visitors.length}
        />
      </div>

      <DataTable
        title="Recent Visitors"
        rows={visitors}
        columns={[
          {
            key: "ip_address",
            label: "IP",
          },
          {
            key: "page",
            label: "Page",
          },
          {
            key: "country",
            label: "Country",
          },
          {
            key: "created_at",
            label: "Date",
          },
        ]}
      />

      <DataTable
        title="Recent Events"
        rows={events}
        columns={[
          {
            key: "event_name",
            label: "Event",
          },
          {
            key: "page",
            label: "Page",
          },
          {
            key: "created_at",
            label: "Date",
          },
        ]}
      />

      <DataTable
        title="Contact Leads"
        rows={leads}
        columns={[
          {
            key: "name",
            label: "Name",
          },
          {
            key: "email",
            label: "Email",
          },
          {
            key: "message",
            label: "Message",
          },
          {
            key: "created_at",
            label: "Date",
          },
        ]}
      />

      <div
        style={{
          maxWidth: "1250px",
          margin: "24px auto 0",
          textAlign: "center",
          color: "#858b79",
          fontSize: "12px",
        }}
      >
        {loading
          ? "Refreshing analytics..."
          : "Analytics dashboard • Muzammil Khalid"}
      </div>
    </div>
  );
}

