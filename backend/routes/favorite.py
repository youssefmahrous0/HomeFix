from flask import Blueprint, request, jsonify
from extensions import db
from models.favorite import Favorite
from models.provider import Provider

favorite_bp = Blueprint("favorite", __name__)

@favorite_bp.route("/favorite/toggle", methods=["POST"])
def toggle_favorite():
    data = request.get_json()

    user_id = data.get("user_id")
    provider_id = data.get("provider_id")

    if not user_id or not provider_id:
        return jsonify({"error": "Missing data"}), 400

    fav = Favorite.query.filter_by(
        user_id=user_id,
        provider_id=provider_id
    ).first()

    if fav:
        db.session.delete(fav)
        db.session.commit()
        return jsonify({"status": "removed", "is_favorite": False})

    # ✅ تأكد إن provider موجود
    p = Provider.query.get(provider_id)
    if not p:
        return jsonify({"error": "Provider not found"}), 404

    new_fav = Favorite(user_id=user_id, provider_id=provider_id)
    db.session.add(new_fav)
    db.session.commit()

    return jsonify({"status": "added", "is_favorite": True})
    
    
@favorite_bp.route("/favorite/check", methods=["POST"])
def check_favorite():
    data = request.get_json()

    user_id = data.get("user_id")
    provider_id = data.get("provider_id")

    if not user_id or not provider_id:
        return jsonify({"error": "Missing data"}), 400

    fav = Favorite.query.filter_by(
        user_id=user_id,
        provider_id=provider_id
    ).first()

    return jsonify({"is_favorite": bool(fav)})
    
    
    
@favorite_bp.route("/favorites/<int:user_id>", methods=["GET"])
def get_favorites(user_id):

    favs = Favorite.query.filter_by(user_id=user_id).all()

    providers = []

    for f in favs:
        p = Provider.query.get(f.provider_id)

        # ✅ حماية لو الفني اتحذف
        if not p:
            continue

        providers.append({
            "id": p.id,
            "name": p.name,
            "job": p.job,
            "price": p.price,
            "rating": p.rating,
            "location": p.location,
            "skills": p.skills,
            "experience": p.experience,
            "orders": p.orders,
            "is_favorite": True
        })

    return jsonify({
        "count": len(providers),
        "providers": providers
    })
    
