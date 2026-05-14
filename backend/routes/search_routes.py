from flask import Blueprint, request, jsonify
from sqlalchemy import or_ ,func
from models.service import Service
from models.provider import Provider
from models.category import Category

search_bp = Blueprint("search", __name__)

@search_bp.route("/search")
def search():
    query = request.args.get("q", "").strip()

    if not query:
        services = Service.query.all()
        providers = Provider.query.all()
    else:
        services = Service.query.filter(
          or_(
          func.lower(Service.name).contains(query.lower()),
          func.lower(Service.description).contains(query.lower()),
          func.lower(Service.icon).contains(query.lower()),
           Service.category.has(func.lower(Category.name).contains(query.lower()))
          )
         ).all()

        providers = Provider.query.filter(
        or_(
          func.lower(Provider.name).contains(query.lower()),
          func.lower(Provider.job).contains(query.lower()),
          func.lower(Provider.skills).contains(query.lower()),
          func.lower(Provider.location).contains(query.lower())
         )
         ).all()

    return jsonify({
        "services": [
            {
                "id": s.id,
                "name": s.name,
                "description": s.description,
                "icon": s.icon,
                "category": s.category.name if s.category else None,
                "price": s.price,
                "providers_count": len(s.provider.services) if s.provider else 0,
            } for s in services
        ],
        "providers": [
            {
                "id": p.id,
                "name": p.name,
                "job": p.job,
                "price": p.price,
                "rating": p.rating,
                "location": p.location,
                "skills": p.skills,
                "experience": p.experience,
                "orders": p.orders,
            } for p in providers
        ]
    })