from flask import Blueprint, jsonify, request
from models.service import Service
from models.category import Category
from extensions import db

admin_services_bp = Blueprint(
    "admin_services",
    __name__
)

# ==================================================
# GET ALL SERVICES
# ==================================================

@admin_services_bp.route(
    "/admin/services",
    methods=["GET"]
)
def get_services():

    services = Service.query.order_by(
        Service.id.desc()
    ).all()

    data = []

    for service in services:

        data.append({
            "id": service.id,
            "name": service.name,
            "category": service.category.name
            if service.category else "بدون تصنيف",
            "description": service.description,
            "min_price": int(service.price),
            "max_price": int(service.price + 150),
            "providers_count": 1 if service.provider_id else 0,
            "orders_count": len(service.orders),
            "rating": service.rating,
            "status": service.status,
        })

    return jsonify({
        "services": data
    })


# ==================================================
# ADD SERVICE
# ==================================================

@admin_services_bp.route(
    "/admin/services",
    methods=["POST"]
)
def add_service():

    data = request.json

    service = Service(
        name=data.get("name"),
        category_id=data.get("category_id"),
        description=data.get("description"),
        status="نشط",
        providers_count=0,
        orders_count=0,
        rating=0
    )

    db.session.add(service)
    db.session.commit()

    return jsonify({
        "message": "تم إضافة الخدمة"
    })


# ==================================================
# UPDATE SERVICE
# ==================================================

@admin_services_bp.route(
    "/admin/services/<int:id>",
    methods=["PUT"]
)
def update_service(id):

    service = Service.query.get(id)

    if not service:
        return jsonify({
            "error": "Service not found"
        }), 404

    data = request.json

    service.name = data.get(
        "name",
        service.name
    )

    service.category_id = data.get(
    "category_id",
    service.category_id
)

    service.description = data.get(
        "description",
        service.description
    )
    
    service.price = data.get(
    "price",
    service.price
)

    db.session.commit()

    return jsonify({
        "message": "تم تعديل الخدمة"
    })


# ==================================================
# DELETE SERVICE
# ==================================================

@admin_services_bp.route(
    "/admin/services/<int:id>",
    methods=["DELETE"]
)
def delete_service(id):

    service = Service.query.get(id)

    if not service:
        return jsonify({
            "error": "Service not found"
        }), 404

    db.session.delete(service)

    db.session.commit()

    return jsonify({
        "message": "تم حذف الخدمة"
    })


# ==================================================
# TOGGLE STATUS
# ==================================================

@admin_services_bp.route(
    "/admin/services/<int:id>/status",
    methods=["PUT"]
)
def change_status(id):

    service = Service.query.get(id)

    if not service:
        return jsonify({
            "error": "Service not found"
        }), 404

    data = request.json

    service.status = data.get("status")

    db.session.commit()

    return jsonify({
        "message": "تم تحديث الحالة"
    })
    
    
@admin_services_bp.route("/admin/categories", methods=["GET"])
def get_categories():

    categories = Category.query.all()

    return jsonify({
        "categories": [
            {
                "id": category.id,
                "name": category.name
            }
            for category in categories
        ]
    })