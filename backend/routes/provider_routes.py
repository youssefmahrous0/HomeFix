from flask import Blueprint, request, jsonify
from models.provider import Provider
from extensions import db
from models.service import Service

provider_bp = Blueprint("providers", __name__, url_prefix="/providers")


# =========================
# Get All Providers
# =========================
@provider_bp.route("/", methods=["GET"])
def get_providers():

    # 🔍 Query Params
    city = request.args.get("city")
    min_price = request.args.get("min_price", type=float)
    max_price = request.args.get("max_price", type=float)
    sort_by = request.args.get("sort_by")

    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 10, type=int)

    # 🔥 Base Query
    query = Provider.query

    # 📍 Filter by location
    if city:
        query = query.filter(Provider.location.ilike(f"%{city}%"))

    # 💰 Filter by price
    if min_price is not None:
        query = query.filter(Provider.price >= min_price)

    if max_price is not None:
        query = query.filter(Provider.price <= max_price)

    
    # ⭐ Sorting
    if sort_by == "price_asc":
      query = query.order_by(Provider.price.asc())

    elif sort_by == "price_desc":
      query = query.order_by(Provider.price.desc())

    elif sort_by == "rating_desc":
       query = query.order_by(Provider.rating.desc())

  # ✅ مهم جداً
    else:
       query = query.order_by(Provider.id.desc())
  
     
     
    # 📄 Pagination
    pagination = query.paginate(
        page=page,
        per_page=per_page,
        error_out=False
    )

    # 📦 Response Data
    result = []

    for p in pagination.items:
     result.append({
        "id": p.id,
        "name": p.name,
        "job": p.job,
        "location": p.location,
        "price": p.price,
        "rating": round(p.rating or 0, 1),
        "reviews": p.reviews,
        "experience": p.experience,
        "orders": p.orders,
        "image": p.image,
        "skills": p.skills.split(",") if p.skills else [],
        "time": p.time ,
        "services": [
        {"id": s.id, "name": s.name}
        for s in p.services
    ]
    })

    # 📤 Final Response
    return jsonify({
        "data": result,
        "total": pagination.total,
        "page": pagination.page,
        "pages": pagination.pages
    }), 200
    
    
    
# =========================
# Get Single Provider
# =========================
@provider_bp.route("/<int:id>", methods=["GET"])
def get_provider(id):
    provider = Provider.query.get(id)

    if not provider:
        return jsonify({"error": "Provider not found"}), 404

    return jsonify({
        "id": provider.id,
        "name": provider.name,
        "job": provider.job,
        "location": provider.location,
        "price": provider.price,
        "rating": round(provider.rating or 0, 1),
        "reviews": provider.reviews,
        "experience": provider.experience,
        "orders": provider.orders,
        "image": provider.image,
        "bio": provider.bio,
        "availability": provider.availability,
        "response_time": provider.response_time,
        "skills": provider.skills.split(",") if provider.skills else [],
        "time": provider.time,
        "services": [
            {"id": s.id, "name": s.name}
            for s in (provider.services or [])
        ]
    }), 200