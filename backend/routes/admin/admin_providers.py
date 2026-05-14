from flask import Blueprint, jsonify, request
from models.provider import Provider
from extensions import db

admin_providers_bp = Blueprint("admin_providers", __name__)


# ==================================================
# GET ALL PROVIDERS
# ==================================================
@admin_providers_bp.route("/admin/providers", methods=["GET"])
def get_providers():

    providers = Provider.query.order_by(
        Provider.id.desc()
    ).all()

    data = []

    for provider in providers:

        data.append({
       "id": provider.id,
       "name": provider.name,
       "email": provider.email,
       "phone": provider.phone,
       "job": provider.job,
       "address": provider.location,
       "rating": provider.rating or 0,
       "reviews": provider.reviews or 0,
       "orders": provider.orders or 0,
       "earnings": provider.price or 0,
       "status": provider.status,
       "image": provider.image,
       "bio": provider.bio,
       "skills": provider.skills,
       "experience": provider.experience,
       "availability": provider.availability,
       "response_time": provider.response_time,
       "is_verified": provider.is_verified,
     })

    return jsonify({
        "providers": data
    })


# ==================================================
# ADD PROVIDER
# ==================================================
@admin_providers_bp.route("/admin/providers", methods=["POST"])
def add_provider():

    data = request.json

    provider = Provider(
    name=data.get("name"),
    email=data.get("email"),
    phone=data.get("phone"),
    job=data.get("job"),
    location=data.get("address"),
    rating=0,
    reviews=0,
    orders=0,
    price=0,
    image=data.get("image"),
    bio=data.get("bio"),
    skills=data.get("skills"),
    experience=data.get("experience"),
    availability=data.get("availability"),
    response_time=data.get("response_time")
)

    db.session.add(provider)
    db.session.commit()

    return jsonify({
        "message": "تم إضافة مقدم الخدمة بنجاح"
    })


# ==================================================
# UPDATE PROVIDER
# ==================================================
@admin_providers_bp.route("/admin/providers/<int:id>", methods=["PUT"])
def update_provider(id):

    provider = Provider.query.get(id)

    if not provider:
        return jsonify({
            "error": "Provider not found"
        }), 404

    data = request.json

    provider.name = data.get("name", provider.name)
    provider.job = data.get("job", provider.job)
    provider.location = data.get("address",provider.location)
    provider.bio = data.get("bio",provider.bio)
    provider.skills = data.get( "skills", provider.skills)
    provider.experience = data.get("experience", provider.experience)
    provider.availability = data.get("availability", provider.availability)
    provider.response_time = data.get("response_time", provider.response_time)
    provider.email = data.get("email", provider.email)
    provider.phone = data.get("phone",provider.phone)
    provider.rating = data.get("rating", provider.rating)
    provider.location = data.get( "address", provider.location)
     
    db.session.commit()

    return jsonify({
        "message": "تم تعديل البيانات بنجاح"
    })


# ==================================================
# GET SINGLE PROVIDER DETAILS
# ==================================================
@admin_providers_bp.route("/admin/providers/<int:id>", methods=["GET"])
def get_provider_details(id):

    provider = Provider.query.get(id)

    if not provider:
        return jsonify({
            "error": "Provider not found"
        }), 404

    return jsonify({
    "provider": {
        "id": provider.id,
        "name": provider.name,
        "email": provider.email,
        "phone": provider.phone,
        "job": provider.job,
        "address": provider.location,
        "rating": provider.rating or 0,
        "reviews": provider.reviews or 0,
        "orders": provider.orders or 0,
        "earnings": provider.price or 0,
        "status": provider.status,
        "image": provider.image,
        "bio": provider.bio,
        "skills": provider.skills,
        "experience": provider.experience,
        "availability": provider.availability,
        "response_time": provider.response_time,
        "is_verified": provider.is_verified,
    }
})


# ==================================================
# TOGGLE STATUS
# ==================================================
@admin_providers_bp.route("/admin/providers/<int:id>/status", methods=["PUT"])
def change_provider_status(id):

    provider = Provider.query.get(id)

    if not provider:
        return jsonify({
            "error": "Provider not found"
        }), 404

    data = request.json

    provider.status = data.get("status")

    db.session.commit()

    return jsonify({
        "message": "تم تحديث الحالة"
    })



# ==================================================
# VERIFY PROVIDER
# ==================================================
@admin_providers_bp.route(
    "/admin/providers/<int:id>/verify",
    methods=["PUT"]
)
def verify_provider(id):

    provider = Provider.query.get(id)

    if not provider:
        return jsonify({
            "error": "Provider not found"
        }), 404

    provider.is_verified = not provider.is_verified

    db.session.commit()

    return jsonify({
        "message": "تم تحديث حالة التوثيق",
        "is_verified": provider.is_verified
    })




# ==================================================
# DELETE PROVIDER
# ==================================================
@admin_providers_bp.route("/admin/providers/<int:id>", methods=["DELETE"])
def delete_provider(id):

    provider = Provider.query.get(id)

    if not provider:
        return jsonify({
            "error": "Provider not found"
        }), 404

    db.session.delete(provider)
    db.session.commit()

    return jsonify({
        "message": "تم حذف مقدم الخدمة"
    })