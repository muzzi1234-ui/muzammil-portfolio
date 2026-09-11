import os
from functools import wraps

from flask import jsonify, request
from flask_jwt_extended import (
    create_access_token,
    get_jwt,
    verify_jwt_in_request,
)


ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "change-this-password")


def admin_login(username, password):
    """
    Check admin credentials and create JWT token.
    """

    if username != ADMIN_USERNAME:
        return None

    if password != ADMIN_PASSWORD:
        return None

    token = create_access_token(
        identity=username,
        additional_claims={
            "role": "admin",
        },
    )

    return token


def admin_required(function):
    """
    Protect private admin API routes.
    """

    @wraps(function)
    def decorated_function(*args, **kwargs):
        try:
            verify_jwt_in_request()

            claims = get_jwt()

            if claims.get("role") != "admin":
                return jsonify({
                    "success": False,
                    "message": "Admin access required.",
                }), 403

            return function(*args, **kwargs)

        except Exception:
            return jsonify({
                "success": False,
                "message": "Unauthorized access.",
            }), 401

    return decorated_function