from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user import User
from extensions import db

profile_bp = Blueprint("profile", __name__, url_prefix="/profile")


# =========================
# GET PROFILE
# =========================
@profile_bp.route("/", methods=["GET"])
@jwt_required()
def get_profile():
    user_id = int(get_jwt_identity())  

    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "name": user.full_name,
        "email": user.email,
        "phone": user.phone or "",
        "address": user.address or "",
        "birth_date": str(user.birth_date) if user.birth_date else "",
        "created_at": str(user.created_at) if user.created_at else ""
    })


# =========================
# UPDATE PROFILE
# =========================
@profile_bp.route("/", methods=["PUT"])
@jwt_required()
def update_profile():
    user_id = int(get_jwt_identity())
    data = request.get_json()

    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    user.full_name = data.get("name", user.full_name)
    user.phone = data.get("phone", user.phone)
    user.address = data.get("address", user.address)
    user.birth_date = data.get("birth_date")

    db.session.commit()

    return jsonify({"message": "Profile updated successfully"})