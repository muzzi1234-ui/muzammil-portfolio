
import os

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from database import db, init_database
from auth import admin_login, admin_required
from models import (
    Visitor,
    PageVisit,
    VisitorEvent,
    ContactLead,
)
from tracking import (
    get_or_create_session_id,
    track_visitor,
    track_page_visit,
    update_page_duration,
    update_visit_duration,
    mark_exit_page,
    track_event,
    get_visitor_summary,
)


# =========================================================
# ENVIRONMENT
# =========================================================

load_dotenv()


# =========================================================
# FLASK APP
# =========================================================

app = Flask(__name__)


# =========================================================
# DATABASE
# =========================================================

# =========================================================
# DATABASE
# =========================================================

is_vercel = (
    os.getenv("VERCEL") == "1"
    or os.getenv("VERCEL_ENV") is not None
)

database_url = os.getenv("DATABASE_URL")

if database_url:
    # Render/Neon/PostgreSQL URLs may sometimes use postgres://
    if database_url.startswith("postgres://"):
        database_url = database_url.replace(
            "postgres://",
            "postgresql://",
            1,
        )

else:
    # Local development uses normal SQLite.
    # Vercel uses /tmp because its deployed filesystem is read-only.
    if is_vercel:
        database_url = "sqlite:////tmp/portfolio_analytics.db"
    else:
        database_url = "sqlite:///portfolio_analytics.db"


app.config["SQLALCHEMY_DATABASE_URI"] = database_url
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# =========================================================
# JWT
# =========================================================

app.config["JWT_SECRET_KEY"] = os.getenv(
    "JWT_SECRET_KEY",
    "change-this-secret-key",
)

app.config["JWT_ACCESS_TOKEN_EXPIRES"] = False


# =========================================================
# INITIALIZE EXTENSIONS
# =========================================================

jwt = JWTManager(app)

init_database(app)


# =========================================================
# CORS
# =========================================================

# =========================================================
# CORS
# =========================================================

CORS(
    app,
    resources={
        r"/api/*": {
            "origins": [
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "https://muzammil-portfolio-snowy.vercel.app",
            ],
        }
    },
    supports_credentials=True,
)
# =========================================================
# HEALTH CHECK
# =========================================================

@app.route("/")
def home():
    return jsonify({
        "success": True,
        "message": "Muzammil Portfolio Analytics API is running.",
    })


@app.route("/api/health")
def health():
    return jsonify({
        "success": True,
        "status": "online",
        "service": "portfolio-analytics",
    })


# =========================================================
# VISITOR TRACKING
# =========================================================

@app.route("/api/track", methods=["POST"])
def api_track():
    """
    Track a portfolio visitor/page visit.
    """

    try:
        data = request.get_json(
            silent=True
        ) or {}

        session_id = data.get(
            "session_id"
        )

        page = data.get(
            "page",
            "/",
        )

        screen_width = data.get(
            "screen_width"
        )

        screen_height = data.get(
            "screen_height"
        )

        visitor, session_id = track_visitor(
            session_id=session_id,
            page=page,
            screen_width=screen_width,
            screen_height=screen_height,
        )

        is_landing_page = data.get(
            "is_landing_page",
            False,
        )

        track_page_visit(
            session_id=session_id,
            page=page,
            duration_seconds=0,
            is_landing_page=is_landing_page,
        )

        return jsonify({
            "success": True,
            "session_id": session_id,
            "visitor_id": visitor.id,
            "message": "Visitor tracked successfully.",
        })

    except Exception as error:

        db.session.rollback()

        return jsonify({
            "success": False,
            "message": "Visitor tracking failed.",
            "error": str(error),
        }), 500


# =========================================================
# PAGE DURATION
# =========================================================

@app.route("/api/track/duration", methods=["POST"])
def api_track_duration():
    """
    Update duration for a page.
    """

    try:
        data = request.get_json(
            silent=True
        ) or {}

        session_id = data.get(
            "session_id"
        )

        page = data.get(
            "page"
        )

        duration_seconds = int(
            data.get(
                "duration_seconds",
                0,
            )
        )

        success = update_page_duration(
            session_id=session_id,
            page=page,
            duration_seconds=duration_seconds,
        )

        return jsonify({
            "success": success,
        })

    except Exception as error:

        db.session.rollback()

        return jsonify({
            "success": False,
            "message": "Page duration update failed.",
            "error": str(error),
        }), 500


# =========================================================
# TOTAL VISIT DURATION
# =========================================================

@app.route("/api/track/visit-duration", methods=["POST"])
def api_visit_duration():
    """
    Update total visitor session duration.
    """

    try:
        data = request.get_json(
            silent=True
        ) or {}

        session_id = data.get(
            "session_id"
        )

        duration_seconds = int(
            data.get(
                "duration_seconds",
                0,
            )
        )

        success = update_visit_duration(
            session_id=session_id,
            duration_seconds=duration_seconds,
        )

        return jsonify({
            "success": success,
        })

    except Exception as error:

        db.session.rollback()

        return jsonify({
            "success": False,
            "message": "Visit duration update failed.",
            "error": str(error),
        }), 500


# =========================================================
# EXIT PAGE
# =========================================================

@app.route("/api/track/exit", methods=["POST"])
def api_exit():
    """
    Mark the visitor's exit page.
    """

    try:
        data = request.get_json(
            silent=True
        ) or {}

        session_id = data.get(
            "session_id"
        )

        page = data.get(
            "page"
        )

        success = mark_exit_page(
            session_id=session_id,
            page=page,
        )

        return jsonify({
            "success": success,
        })

    except Exception as error:

        db.session.rollback()

        return jsonify({
            "success": False,
            "message": "Exit tracking failed.",
            "error": str(error),
        }), 500


# =========================================================
# EVENT TRACKING
# =========================================================

@app.route("/api/event", methods=["POST"])
def api_event():
    """
    Track portfolio interactions.

    Examples:
    WhatsApp Click
    Email Click
    LinkedIn Click
    Fiverr Click
    Instagram Click
    Facebook Click
    Project Opened
    GitHub Click
    Live Demo Click
    Portfolio AI Opened
    FAQ Opened
    """

    try:
        data = request.get_json(
            silent=True
        ) or {}

        session_id = data.get(
            "session_id"
        )

        event_name = data.get(
            "event_name"
        )

        event_target = data.get(
            "event_target"
        )

        page = data.get(
            "page"
        )

        event_data = data.get(
            "event_data"
        )

        event = track_event(
            session_id=session_id,
            event_name=event_name,
            event_target=event_target,
            page=page,
            event_data=event_data,
        )

        if not event:

            return jsonify({
                "success": False,
                "message": "Invalid event.",
            }), 400

        return jsonify({
            "success": True,
            "event_id": event.id,
        })

    except Exception as error:

        db.session.rollback()

        return jsonify({
            "success": False,
            "message": "Event tracking failed.",
            "error": str(error),
        }), 500


# =========================================================
# CONTACT LEAD
# =========================================================

@app.route("/api/contact", methods=["POST"])
def api_contact():
    """
    Save information voluntarily submitted
    through the portfolio contact form.
    """

    try:
        data = request.get_json(
            silent=True
        ) or {}

        message = (
            data.get("message")
            or ""
        ).strip()

        if not message:

            return jsonify({
                "success": False,
                "message": "Message is required.",
            }), 400

        lead = ContactLead(
            session_id=data.get(
                "session_id"
            ),

            name=(
                data.get("name")
                or ""
            ).strip() or None,

            email=(
                data.get("email")
                or ""
            ).strip() or None,

            phone=(
                data.get("phone")
                or ""
            ).strip() or None,

            message=message,
        )

        db.session.add(lead)
        db.session.commit()

        return jsonify({
            "success": True,
            "lead_id": lead.id,
            "message": "Message received successfully.",
        })

    except Exception as error:

        db.session.rollback()

        return jsonify({
            "success": False,
            "message": "Contact submission failed.",
            "error": str(error),
        }), 500


# =========================================================
# ADMIN LOGIN
# =========================================================

@app.route("/api/admin/login", methods=["POST"])
def api_admin_login():
    """
    Private admin login.
    """

    try:
        data = request.get_json(
            silent=True
        ) or {}

        username = (
            data.get("username")
            or ""
        ).strip()

        password = (
            data.get("password")
            or ""
        )

        token = admin_login(
            username=username,
            password=password,
        )

        if not token:

            return jsonify({
                "success": False,
                "message": "Invalid admin credentials.",
            }), 401

        return jsonify({
            "success": True,
            "token": token,
            "message": "Admin login successful.",
        })

    except Exception as error:

        return jsonify({
            "success": False,
            "message": "Admin login failed.",
            "error": str(error),
        }), 500


# =========================================================
# ADMIN SUMMARY
# =========================================================

@app.route("/api/admin/summary", methods=["GET"])
@admin_required
def api_admin_summary():
    """
    Dashboard overview statistics.
    """

    try:
        summary = get_visitor_summary()

        return jsonify({
            "success": True,
            "summary": summary,
        })

    except Exception as error:

        return jsonify({
            "success": False,
            "message": "Could not load analytics summary.",
            "error": str(error),
        }), 500


# =========================================================
# ADMIN VISITORS
# =========================================================

@app.route("/api/admin/visitors", methods=["GET"])
@admin_required
def api_admin_visitors():
    """
    Return visitor records.
    """

    try:
        limit = request.args.get(
            "limit",
            100,
            type=int,
        )

        if limit < 1:
            limit = 100

        if limit > 1000:
            limit = 1000

        visitors = (
            Visitor.query
            .order_by(
                Visitor.last_activity.desc()
            )
            .limit(limit)
            .all()
        )

        return jsonify({
            "success": True,
            "visitors": [
                visitor.to_dict()
                for visitor in visitors
            ],
        })

    except Exception as error:

        return jsonify({
            "success": False,
            "message": "Could not load visitors.",
            "error": str(error),
        }), 500


# =========================================================
# ADMIN PAGE VISITS
# =========================================================

@app.route("/api/admin/page-visits", methods=["GET"])
@admin_required
def api_admin_page_visits():
    """
    Return page visit records.
    """

    try:
        limit = request.args.get(
            "limit",
            200,
            type=int,
        )

        if limit < 1:
            limit = 200

        if limit > 2000:
            limit = 2000

        page_visits = (
            PageVisit.query
            .order_by(
                PageVisit.visited_at.desc()
            )
            .limit(limit)
            .all()
        )

        return jsonify({
            "success": True,
            "page_visits": [
                page_visit.to_dict()
                for page_visit in page_visits
            ],
        })

    except Exception as error:

        return jsonify({
            "success": False,
            "message": "Could not load page visits.",
            "error": str(error),
        }), 500


# =========================================================
# ADMIN EVENTS
# =========================================================

@app.route("/api/admin/events", methods=["GET"])
@admin_required
def api_admin_events():
    """
    Return visitor interaction events.
    """

    try:
        limit = request.args.get(
            "limit",
            200,
            type=int,
        )

        if limit < 1:
            limit = 200

        if limit > 2000:
            limit = 2000

        events = (
            VisitorEvent.query
            .order_by(
                VisitorEvent.created_at.desc()
            )
            .limit(limit)
            .all()
        )

        return jsonify({
            "success": True,
            "events": [
                event.to_dict()
                for event in events
            ],
        })

    except Exception as error:

        return jsonify({
            "success": False,
            "message": "Could not load events.",
            "error": str(error),
        }), 500


# =========================================================
# ADMIN CONTACT LEADS
# =========================================================

@app.route("/api/admin/leads", methods=["GET"])
@admin_required
def api_admin_leads():
    """
    Return voluntarily submitted contact leads.
    """

    try:
        limit = request.args.get(
            "limit",
            100,
            type=int,
        )

        if limit < 1:
            limit = 100

        if limit > 1000:
            limit = 1000

        leads = (
            ContactLead.query
            .order_by(
                ContactLead.created_at.desc()
            )
            .limit(limit)
            .all()
        )

        return jsonify({
            "success": True,
            "leads": [
                lead.to_dict()
                for lead in leads
            ],
        })

    except Exception as error:

        return jsonify({
            "success": False,
            "message": "Could not load contact leads.",
            "error": str(error),
        }), 500


# =========================================================
# ADMIN SINGLE VISITOR
# =========================================================

@app.route("/api/admin/visitors/<int:visitor_id>", methods=["GET"])
@admin_required
def api_admin_single_visitor(visitor_id):
    """
    Return one visitor and their pages/events.
    """

    try:
        visitor = db.session.get(
            Visitor,
            visitor_id,
        )

        if not visitor:

            return jsonify({
                "success": False,
                "message": "Visitor not found.",
            }), 404

        pages = (
            PageVisit.query
            .filter_by(
                session_id=visitor.session_id
            )
            .order_by(
                PageVisit.visited_at.asc()
            )
            .all()
        )

        events = (
            VisitorEvent.query
            .filter_by(
                session_id=visitor.session_id
            )
            .order_by(
                VisitorEvent.created_at.asc()
            )
            .all()
        )

        return jsonify({
            "success": True,

            "visitor": visitor.to_dict(),

            "pages": [
                page.to_dict()
                for page in pages
            ],

            "events": [
                event.to_dict()
                for event in events
            ],
        })

    except Exception as error:

        return jsonify({
            "success": False,
            "message": "Could not load visitor.",
            "error": str(error),
        }), 500


# =========================================================
# RUN SERVER
# =========================================================

# ============================================================
# DEVELOPER ASSISTANT API
# ============================================================

@app.route("/api/ai", methods=["POST", "OPTIONS"])
def developer_assistant():
    if request.method == "OPTIONS":
        return jsonify({"ok": True}), 200

    try:
        data = request.get_json(silent=True) or {}
        message = str(data.get("message", "")).strip().lower()

        if not message:
            return jsonify({
                "answer": "Please ask me something about Muzammil's portfolio."
            }), 200

        # Skills / technology
        if any(word in message for word in [
            "skill", "skills", "technology", "technologies",
            "stack", "language", "languages"
        ]):
            answer = (
                "Muzammil works with Python, JavaScript, SQL, React, "
                "Flask, HTML, CSS, Power BI, Excel, Pandas and NumPy."
            )

        # Projects
        elif any(word in message for word in [
            "project", "projects", "work", "portfolio",
            "profitpilot", "doctor ai", "air share"
        ]):
            answer = (
                "The portfolio currently features ProfitPilot, Doctor AI "
                "and Air Share Pro."
            )

        # Contact
        elif any(word in message for word in [
            "contact", "email", "whatsapp", "linkedin", "instagram"
        ]):
            answer = (
                "You can contact Muzammil at "
                "muzammil.khalid39@gmail.com. "
                "The portfolio also provides WhatsApp, LinkedIn and "
                "Instagram contact options."
            )

        # About
        elif any(word in message for word in [
            "who", "muzammil", "about", "developer"
        ]):
            answer = (
                "Muzammil Khalid is a Full Stack Developer focused on "
                "web applications, business systems, automation and data-driven tools."
            )

        # Backend / frontend
        elif any(word in message for word in [
            "backend", "frontend", "database", "api"
        ]):
            answer = (
                "Muzammil works across frontend and backend development, "
                "including React, JavaScript, Python, Flask, SQL and APIs."
            )

        else:
            answer = (
                "I can tell you about Muzammil's skills, projects, "
                "technology stack, development work or contact options."
            )

        return jsonify({
            "success": True,
            "answer": answer
        }), 200

    except Exception as error:
        print("Developer Assistant Error:", error)

        return jsonify({
            "success": False,
            "answer": "Sorry, I could not process that question right now."
        }), 500


if __name__ == "__main__":

    print("")
    print("=" * 60)
    print(" MUZAMMIL PORTFOLIO ANALYTICS BACKEND")
    print("=" * 60)
    print(" Server: http://127.0.0.1:5050")
    print(" Health: http://127.0.0.1:5050/api/health")
    print(" Admin API: /api/admin/*")
    print("=" * 60)
    print("")

    app.run(
        host="127.0.0.1",
        port=5050,
        debug=True,
    )

