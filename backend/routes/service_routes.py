from flask import Blueprint, jsonify
from models.service import Service

service_bp = Blueprint("services", __name__, url_prefix="/services")


@service_bp.route("/", methods=["GET"])
def get_services():

    services = Service.query.all()

    result = []

    for service in services:
        result.append({
            "id": service.id,
            "name": service.name,
            "description": service.description,
            "price": service.price,
            "icon": service.icon,

            # 🔥 إضافات مهمة
            "category": service.category.name,
            "rating": service.rating,
            "workers": service.workers
        })

    return jsonify(result), 200