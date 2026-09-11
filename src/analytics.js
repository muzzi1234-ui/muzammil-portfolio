const API_URL = "http://127.0.0.1:5050";

const SESSION_KEY = "muzammil_portfolio_session";

function getSessionId() {
  let sessionId = localStorage.getItem(SESSION_KEY);

  if (!sessionId) {
    sessionId =
      "session-" +
      Date.now() +
      "-" +
      Math.random().toString(36).slice(2);

    localStorage.setItem(SESSION_KEY, sessionId);
  }

  return sessionId;
}

async function sendRequest(endpoint, payload) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    return await response.json();
  } catch (error) {
    console.warn(`[Analytics] ${endpoint} failed.`, error);
    return null;
  }
}

export function initializeAnalytics() {
  const sessionId = getSessionId();

  const startedAt = Date.now();
  const page = window.location.pathname || "/";

  console.log("[Analytics] Public portfolio loaded.");

  sendRequest("/api/track", {
    session_id: sessionId,
    page,
    screen_width: window.innerWidth,
    screen_height: window.innerHeight,
    is_landing_page: true,
  }).then((data) => {
    if (data?.success) {
      console.log("[Analytics] Visitor tracked successfully.");
    }
  });

  const clickHandler = (event) => {
    const target = event.target.closest("a, button");

    if (!target) return;

    const text =
      target.innerText?.trim() ||
      target.getAttribute("aria-label") ||
      "Unknown";

    sendRequest("/api/event", {
      session_id: sessionId,
      event_name: "Interaction",
      event_target: text,
      page: window.location.pathname,
      event_data: {
        href: target.getAttribute("href") || "",
      },
    });
  };

  const beforeUnloadHandler = () => {
    const duration = Math.round(
      (Date.now() - startedAt) / 1000
    );

    sendRequest("/api/track/duration", {
      session_id: sessionId,
      page,
      duration_seconds: duration,
    });

    sendRequest("/api/track/visit-duration", {
      session_id: sessionId,
      duration_seconds: duration,
    });

    sendRequest("/api/track/exit", {
      session_id: sessionId,
      page,
    });
  };

  document.addEventListener("click", clickHandler);
  window.addEventListener("beforeunload", beforeUnloadHandler);

  return () => {
    document.removeEventListener("click", clickHandler);
    window.removeEventListener(
      "beforeunload",
      beforeUnloadHandler
    );
  };
}