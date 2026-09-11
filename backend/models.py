from datetime import datetime

from database import db


class Visitor(db.Model):
    __tablename__ = "visitors"

    id = db.Column(
        db.Integer,
        primary_key=True,
    )

    # Anonymous visitor/session identification
    session_id = db.Column(
        db.String(100),
        nullable=False,
        index=True,
    )

    # Network information
    ip_address = db.Column(
        db.String(100),
        nullable=True,
    )

    country = db.Column(
        db.String(100),
        nullable=True,
    )

    city = db.Column(
        db.String(100),
        nullable=True,
    )

    # Browser/device information
    browser = db.Column(
        db.String(100),
        nullable=True,
    )

    operating_system = db.Column(
        db.String(100),
        nullable=True,
    )

    device = db.Column(
        db.String(50),
        nullable=True,
    )

    screen_width = db.Column(
        db.Integer,
        nullable=True,
    )

    screen_height = db.Column(
        db.Integer,
        nullable=True,
    )

    language = db.Column(
        db.String(50),
        nullable=True,
    )

    # Traffic source
    referrer = db.Column(
        db.String(1000),
        nullable=True,
    )

    landing_page = db.Column(
        db.String(1000),
        nullable=True,
    )

    exit_page = db.Column(
        db.String(1000),
        nullable=True,
    )

    # Visit information
    first_visit = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    last_visit = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    pages_viewed = db.Column(
        db.Integer,
        default=0,
        nullable=False,
    )

    duration_seconds = db.Column(
        db.Integer,
        default=0,
        nullable=False,
    )

    # New vs returning
    is_returning = db.Column(
        db.Boolean,
        default=False,
        nullable=False,
    )

    # Number of sessions
    session_count = db.Column(
        db.Integer,
        default=1,
        nullable=False,
    )

    # Number of visits
    visit_count = db.Column(
        db.Integer,
        default=1,
        nullable=False,
    )

    # Last activity
    last_activity = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    def to_dict(self):
        return {
            "id": self.id,
            "session_id": self.session_id,

            "ip_address": self.ip_address,
            "country": self.country,
            "city": self.city,

            "browser": self.browser,
            "operating_system": self.operating_system,
            "device": self.device,

            "screen_width": self.screen_width,
            "screen_height": self.screen_height,

            "screen_size": (
                f"{self.screen_width}x{self.screen_height}"
                if self.screen_width and self.screen_height
                else None
            ),

            "language": self.language,

            "referrer": self.referrer,
            "landing_page": self.landing_page,
            "exit_page": self.exit_page,

            "first_visit": (
                self.first_visit.isoformat()
                if self.first_visit
                else None
            ),

            "last_visit": (
                self.last_visit.isoformat()
                if self.last_visit
                else None
            ),

            "pages_viewed": self.pages_viewed,
            "duration_seconds": self.duration_seconds,

            "is_returning": self.is_returning,

            "session_count": self.session_count,
            "visit_count": self.visit_count,

            "last_activity": (
                self.last_activity.isoformat()
                if self.last_activity
                else None
            ),

            "created_at": (
                self.created_at.isoformat()
                if self.created_at
                else None
            ),
        }


class PageVisit(db.Model):
    __tablename__ = "page_visits"

    id = db.Column(
        db.Integer,
        primary_key=True,
    )

    session_id = db.Column(
        db.String(100),
        nullable=False,
        index=True,
    )

    page = db.Column(
        db.String(1000),
        nullable=False,
    )

    visited_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    duration_seconds = db.Column(
        db.Integer,
        default=0,
        nullable=False,
    )

    # Page type
    is_landing_page = db.Column(
        db.Boolean,
        default=False,
        nullable=False,
    )

    is_exit_page = db.Column(
        db.Boolean,
        default=False,
        nullable=False,
    )

    def to_dict(self):
        return {
            "id": self.id,
            "session_id": self.session_id,
            "page": self.page,

            "visited_at": (
                self.visited_at.isoformat()
                if self.visited_at
                else None
            ),

            "duration_seconds": self.duration_seconds,

            "is_landing_page": self.is_landing_page,
            "is_exit_page": self.is_exit_page,
        }


class VisitorEvent(db.Model):
    __tablename__ = "visitor_events"

    id = db.Column(
        db.Integer,
        primary_key=True,
    )

    session_id = db.Column(
        db.String(100),
        nullable=False,
        index=True,
    )

    event_name = db.Column(
        db.String(150),
        nullable=False,
    )

    event_target = db.Column(
        db.String(500),
        nullable=True,
    )

    page = db.Column(
        db.String(1000),
        nullable=True,
    )

    event_data = db.Column(
        db.Text,
        nullable=True,
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    def to_dict(self):
        return {
            "id": self.id,
            "session_id": self.session_id,
            "event_name": self.event_name,
            "event_target": self.event_target,
            "page": self.page,
            "event_data": self.event_data,

            "created_at": (
                self.created_at.isoformat()
                if self.created_at
                else None
            ),
        }


class ContactLead(db.Model):
    """
    Optional information voluntarily submitted
    through the portfolio contact form.
    """

    __tablename__ = "contact_leads"

    id = db.Column(
        db.Integer,
        primary_key=True,
    )

    session_id = db.Column(
        db.String(100),
        nullable=True,
        index=True,
    )

    name = db.Column(
        db.String(150),
        nullable=True,
    )

    email = db.Column(
        db.String(255),
        nullable=True,
    )

    phone = db.Column(
        db.String(50),
        nullable=True,
    )

    message = db.Column(
        db.Text,
        nullable=False,
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    def to_dict(self):
        return {
            "id": self.id,
            "session_id": self.session_id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "message": self.message,

            "created_at": (
                self.created_at.isoformat()
                if self.created_at
                else None
            ),
        }