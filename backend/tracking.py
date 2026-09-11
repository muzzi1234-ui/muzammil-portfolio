import json
import uuid

import requests
from flask import request
from user_agents import parse

from database import db
from models import Visitor, PageVisit, VisitorEvent


def get_client_ip():
    """Get the visitor's IP address."""

    forwarded_for = request.headers.get("X-Forwarded-For")

    if forwarded_for:
        return forwarded_for.split(",")[0].strip()

    real_ip = request.headers.get("X-Real-IP")

    if real_ip:
        return real_ip.strip()

    return request.remote_addr


def get_location_from_ip(ip_address):
    """
    Get approximate country/city from IP.

    IP geolocation is approximate and does not provide
    an exact home address.
    """

    if not ip_address:
        return {
            "country": None,
            "city": None,
        }

    local_ips = {
        "127.0.0.1",
        "::1",
        "localhost",
    }

    if ip_address in local_ips:
        return {
            "country": "Localhost",
            "city": "Local Development",
        }

    try:
        response = requests.get(
            f"https://ipwho.is/{ip_address}",
            timeout=5,
        )

        if response.ok:
            data = response.json()

            if data.get("success"):
                return {
                    "country": data.get("country"),
                    "city": data.get("city"),
                }

    except requests.RequestException:
        pass

    except Exception:
        pass

    return {
        "country": None,
        "city": None,
    }


def get_device_information():
    """Detect browser, OS and device type."""

    user_agent_string = request.headers.get(
        "User-Agent",
        "",
    )

    user_agent = parse(user_agent_string)

    browser = (
        user_agent.browser.family
        or "Unknown"
    )

    operating_system = (
        user_agent.os.family
        or "Unknown"
    )

    if user_agent.is_mobile:
        device = "Mobile"

    elif user_agent.is_tablet:
        device = "Tablet"

    elif user_agent.is_pc:
        device = "Desktop"

    else:
        device = "Other"

    return {
        "browser": browser,
        "operating_system": operating_system,
        "device": device,
    }


def get_request_information():
    """Collect browser/request information."""

    device_info = get_device_information()

    return {
        "ip_address": get_client_ip(),

        "browser": device_info["browser"],

        "operating_system": device_info[
            "operating_system"
        ],

        "device": device_info["device"],

        "language": request.headers.get(
            "Accept-Language",
            "",
        )[:50],

        "referrer": request.headers.get(
            "Referer",
            "",
        )[:1000],
    }


def create_session_id():
    """Create a unique anonymous session ID."""

    return str(uuid.uuid4())


def get_or_create_session_id():
    """
    Get session ID sent by frontend.

    If no ID exists, create a new one.
    """

    session_id = request.headers.get(
        "X-Visitor-Session"
    )

    if not session_id:
        session_id = request.args.get(
            "session_id"
        )

    if not session_id:
        session_id = create_session_id()

    return session_id


def track_visitor(
    session_id=None,
    page="/",
    screen_width=None,
    screen_height=None,
):
    """
    Create or update visitor analytics.
    """

    if not session_id:
        session_id = get_or_create_session_id()

    visitor = Visitor.query.filter_by(
        session_id=session_id
    ).first()

    request_info = get_request_information()

    ip_address = request_info["ip_address"]

    location = get_location_from_ip(
        ip_address
    )

    if visitor:

        visitor.is_returning = True

        visitor.last_visit = db.func.now()

        visitor.last_activity = db.func.now()

        visitor.session_count = (
            visitor.session_count or 0
        ) + 1

        visitor.visit_count = (
            visitor.visit_count or 0
        ) + 1

        if page:
            visitor.exit_page = page

        if screen_width:
            visitor.screen_width = screen_width

        if screen_height:
            visitor.screen_height = screen_height

        db.session.commit()

        return visitor, session_id

    visitor = Visitor(
        session_id=session_id,

        ip_address=ip_address,

        country=location.get(
            "country"
        ),

        city=location.get(
            "city"
        ),

        browser=request_info[
            "browser"
        ],

        operating_system=request_info[
            "operating_system"
        ],

        device=request_info[
            "device"
        ],

        screen_width=screen_width,

        screen_height=screen_height,

        language=request_info[
            "language"
        ],

        referrer=request_info[
            "referrer"
        ],

        landing_page=page or "/",

        exit_page=page or "/",

        pages_viewed=0,

        duration_seconds=0,

        is_returning=False,

        session_count=1,

        visit_count=1,

    )

    db.session.add(visitor)

    db.session.commit()

    return visitor, session_id


def track_page_visit(
    session_id,
    page,
    duration_seconds=0,
    is_landing_page=False,
):
    """
    Record a page visit.
    """

    if not session_id or not page:
        return None

    page_visit = PageVisit(
        session_id=session_id,

        page=page,

        duration_seconds=(
            duration_seconds or 0
        ),

        is_landing_page=(
            is_landing_page
        ),

        is_exit_page=False,
    )

    db.session.add(page_visit)

    visitor = Visitor.query.filter_by(
        session_id=session_id
    ).first()

    if visitor:

        visitor.pages_viewed = (
            visitor.pages_viewed or 0
        ) + 1

        visitor.exit_page = page

        visitor.last_activity = (
            db.func.now()
        )

        visitor.last_visit = (
            db.func.now()
        )

        visitor.duration_seconds = (
            visitor.duration_seconds or 0
        ) + (
            duration_seconds or 0
        )

    db.session.commit()

    return page_visit


def update_page_duration(
    session_id,
    page,
    duration_seconds,
):
    """
    Update the duration of the latest page visit.
    """

    if not session_id or not page:
        return False

    page_visit = (
        PageVisit.query
        .filter_by(
            session_id=session_id,
            page=page,
        )
        .order_by(
            PageVisit.id.desc()
        )
        .first()
    )

    if not page_visit:
        return False

    page_visit.duration_seconds = (
        duration_seconds or 0
    )

    visitor = Visitor.query.filter_by(
        session_id=session_id
    ).first()

    if visitor:

        visitor.duration_seconds = (
            db.session.query(
                db.func.sum(
                    PageVisit.duration_seconds
                )
            )
            .filter_by(
                session_id=session_id
            )
            .scalar()
            or 0
        )

        visitor.last_activity = (
            db.func.now()
        )

    db.session.commit()

    return True


def update_visit_duration(
    session_id,
    duration_seconds,
):
    """
    Update total visitor session duration.
    """

    if not session_id:
        return False

    visitor = Visitor.query.filter_by(
        session_id=session_id
    ).first()

    if not visitor:
        return False

    visitor.duration_seconds = (
        duration_seconds or 0
    )

    visitor.last_activity = (
        db.func.now()
    )

    db.session.commit()

    return True


def mark_exit_page(
    session_id,
    page,
):
    """
    Mark the latest page as the exit page.
    """

    if not session_id or not page:
        return False

    visitor = Visitor.query.filter_by(
        session_id=session_id
    ).first()

    if visitor:
        visitor.exit_page = page

    latest_page = (
        PageVisit.query
        .filter_by(
            session_id=session_id
        )
        .order_by(
            PageVisit.id.desc()
        )
        .first()
    )

    if latest_page:
        latest_page.is_exit_page = False

    current_page = (
        PageVisit.query
        .filter_by(
            session_id=session_id,
            page=page,
        )
        .order_by(
            PageVisit.id.desc()
        )
        .first()
    )

    if current_page:
        current_page.is_exit_page = True

    db.session.commit()

    return True


def track_event(
    session_id,
    event_name,
    event_target=None,
    page=None,
    event_data=None,
):
    """
    Track basic portfolio interactions.

    Examples:
        WhatsApp Click
        Email Click
        LinkedIn Click
        Fiverr Click
        Project Opened
        GitHub Click
        Live Demo Click
        Portfolio AI Opened
        FAQ Opened
    """

    if not session_id or not event_name:
        return None

    if isinstance(event_data, dict):
        event_data = json.dumps(
            event_data,
            ensure_ascii=False,
        )

    visitor_event = VisitorEvent(
        session_id=session_id,

        event_name=event_name,

        event_target=(
            event_target[:500]
            if event_target
            else None
        ),

        page=(
            page[:1000]
            if page
            else None
        ),

        event_data=(
            event_data[:5000]
            if event_data
            else None
        ),
    )

    db.session.add(visitor_event)

    visitor = Visitor.query.filter_by(
        session_id=session_id
    ).first()

    if visitor:
        visitor.last_activity = (
            db.func.now()
        )

    db.session.commit()

    return visitor_event


def get_visitor_summary():
    """
    Return basic analytics totals for admin dashboard.
    """

    total_visitors = Visitor.query.count()

    returning_visitors = (
        Visitor.query
        .filter_by(
            is_returning=True
        )
        .count()
    )

    new_visitors = (
        Visitor.query
        .filter_by(
            is_returning=False
        )
        .count()
    )

    total_page_views = (
        db.session.query(
            db.func.sum(
                Visitor.pages_viewed
            )
        ).scalar()
        or 0
    )

    total_duration = (
        db.session.query(
            db.func.sum(
                Visitor.duration_seconds
            )
        ).scalar()
        or 0
    )

    total_events = (
        VisitorEvent.query.count()
    )

    total_sessions = (
        db.session.query(
            db.func.sum(
                Visitor.session_count
            )
        ).scalar()
        or 0
    )

    return {
        "total_visitors": total_visitors,

        "new_visitors": new_visitors,

        "returning_visitors": (
            returning_visitors
        ),

        "total_page_views": (
            total_page_views
        ),

        "total_duration_seconds": (
            total_duration
        ),

        "total_events": total_events,

        "total_sessions": total_sessions,
    }