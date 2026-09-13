# =========================================================
# DATABASE
# =========================================================

import os

from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


def init_database(app):
    """
    Initialize SQLAlchemy.

    Local:
        Uses the DATABASE_URL supplied by app.py.

    Vercel:
        If no external DATABASE_URL is configured, SQLite is placed
        inside /tmp because Vercel's deployed filesystem is read-only.
        This fallback is temporary/non-persistent.
    """

    db.init_app(app)

    # Vercel serverless filesystem is read-only except /tmp.
    is_vercel = (
        os.getenv("VERCEL") == "1"
        or os.getenv("VERCEL_ENV") is not None
    )

    database_uri = app.config.get("SQLALCHEMY_DATABASE_URI", "")

    # If Vercel has no external DATABASE_URL, use writable /tmp.
    if is_vercel and (
        not database_uri
        or database_uri.startswith("sqlite:///portfolio_analytics.db")
    ):
        database_uri = "sqlite:////tmp/portfolio_analytics.db"
        app.config["SQLALCHEMY_DATABASE_URI"] = database_uri

    with app.app_context():
        db.create_all()