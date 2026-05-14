import stripe
import os
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.card import Card
from extensions import db


cards_bp = Blueprint("cards", __name__, url_prefix="/cards")

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

# ✅ جلب الكروت
@cards_bp.route("", methods=["GET"])
@jwt_required()
def get_cards():
    user_id = get_jwt_identity()

    cards = Card.query.filter_by(user_id=user_id).all()
    return jsonify([c.to_dict() for c in cards])


# ✅ إضافة كارت (Stripe)
@cards_bp.route("", methods=["POST"])
@jwt_required()
def add_card():
    user_id = get_jwt_identity()
    data = request.json

    pm_id = data.get("payment_method_id")

    if not pm_id:
        return jsonify({"error": "Missing payment_method_id"}), 400

    try:
        # 🔥 نجيب من Stripe
        pm = stripe.PaymentMethod.retrieve(pm_id)

        if not pm or not pm.card:
            return jsonify({"error": "Invalid payment method"}), 400

        # 🔥 منع التكرار
        existing = Card.query.filter_by(
            user_id=user_id,
            stripe_pm_id=pm.id
        ).first()

        if existing:
            return jsonify({"error": "Card already exists"}), 400

        # 🔥 أول كارت = default
        is_first = Card.query.filter_by(user_id=user_id).count() == 0

        new_card = Card(
            user_id=user_id,
            stripe_pm_id=pm.id,
            last4=pm.card.last4,
            expiry=f"{pm.card.exp_month}/{str(pm.card.exp_year)[-2:]}",
            type=pm.card.brand,
            is_default=is_first
        )

        db.session.add(new_card)
        db.session.commit()

        return jsonify(new_card.to_dict())

    except Exception as e:
        print("ERROR:", str(e))    
        return jsonify({"error": str(e)}), 500


# ✅ حذف كارت
@cards_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_card(id):
    user_id = get_jwt_identity()

    card = Card.query.filter_by(id=id, user_id=user_id).first_or_404()

    db.session.delete(card)
    db.session.commit()

    return jsonify({"message": "deleted"})