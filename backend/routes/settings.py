from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user import User
from extensions import db
import bcrypt

settings_bp = Blueprint("settings", __name__)

@settings_bp.route("/settings", methods=["GET"])
@jwt_required()
def get_settings():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    return jsonify({
        "email_notifications": user.email_notifications,
        "sms_notifications": user.sms_notifications,
        "instant_notifications": user.instant_notifications,
        "offers_notifications": user.offers_notifications
    })
    
@settings_bp.route("/settings/notifications", methods=["PUT"])
@jwt_required()
def update_notifications():
    user_id = get_jwt_identity()
    data = request.json

    user = User.query.get(user_id)

    user.email_notifications = data.get("email_notifications")
    user.sms_notifications = data.get("sms_notifications")
    user.instant_notifications = data.get("instant_notifications")
    user.offers_notifications = data.get("offers_notifications")

    db.session.commit()

    return jsonify({"msg": "تم التحديث"})

@settings_bp.route("/settings/password", methods=["PUT"])
@jwt_required()
def change_password():
    user_id = get_jwt_identity()
    data = request.json

    user = User.query.get(user_id)

    current = data.get("current_password")
    new = data.get("new_password")

    if not bcrypt.checkpw(current.encode('utf-8'), user.password_hash.encode('utf-8')):
        return jsonify({"msg": "كلمة المرور الحالية غلط"}), 400

    hashed = bcrypt.hashpw(new.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    user.password_hash = hashed

    db.session.commit()

    return jsonify({"msg": "تم تغيير كلمة المرور"})


@settings_bp.route("/settings/delete", methods=["DELETE"])
@jwt_required()
def delete_account():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    db.session.delete(user)
    db.session.commit()

    return jsonify({"msg": "تم حذف الحساب"})