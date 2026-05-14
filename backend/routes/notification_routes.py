from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.notification import Notification
from extensions import db

notification_bp = Blueprint("notification", __name__)


# =========================
# 🔔 GET ALL NOTIFICATIONS
# =========================
@notification_bp.route("/notifications", methods=["GET"])
@jwt_required()
def get_notifications():
    user_id = get_jwt_identity()

    notifications = Notification.query\
        .filter_by(user_id=user_id)\
        .order_by(Notification.created_at.desc())\
        .all()

    return jsonify([
        {
            "id": n.id,
            "title": n.title,
            "message": n.message,
            "type": n.type,
            "is_read": n.is_read,

            # 🔥 الحل هنا
            "time": n.created_at.strftime("%Y-%m-%d %H:%M") if n.created_at else None
        }
        for n in notifications
    ]), 200

# =========================
# ✔ MARK AS READ
# =========================
@notification_bp.route("/notifications/read/<int:id>", methods=["PUT"])
@jwt_required()
def mark_as_read(id):
    user_id = get_jwt_identity()

    notification = Notification.query.filter_by(id=id, user_id=user_id).first()

    if not notification:
        return jsonify({"error": "Not found"}), 404

    notification.is_read = True
    db.session.commit()

    return jsonify({"message": "تم القراءة"}), 200


# =========================
# ❌ DELETE NOTIFICATION
# =========================
@notification_bp.route("/notifications/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_notification(id):
    user_id = get_jwt_identity()

    notification = Notification.query.filter_by(id=id, user_id=user_id).first()

    if not notification:
        return jsonify({"error": "Not found"}), 404

    db.session.delete(notification)
    db.session.commit()

    return jsonify({"message": "تم الحذف"}), 200


# =========================
# 🔢 COUNT UNREAD
# =========================
@notification_bp.route("/notifications/unread-count", methods=["GET"])
@jwt_required()
def unread_count():
    user_id = get_jwt_identity()

    count = Notification.query.filter_by(
        user_id=user_id,
        is_read=False
    ).count()

    return jsonify({"unread": count}), 200