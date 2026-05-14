from flask import Blueprint, request
from models.address import Address
from extensions import db
from flask_jwt_extended import jwt_required, get_jwt_identity
address_bp = Blueprint("address", __name__)



# ================= ADD =================
@address_bp.route("/addresses", methods=["POST"])
@jwt_required()
def add_address():
    user_id = get_jwt_identity()

    data = request.json
    if not data:
        return {"error": "No data"}, 400

    if data.get("is_default"):
        Address.query.filter_by(user_id=user_id, is_default=True)\
            .update({"is_default": False})

    new_address = Address(
        full_name=data.get("full_name"),
        phone=data.get("phone"),
        governorate=data.get("governorate"),
        area=data.get("area"),
        street=data.get("street"),
        building_number=data.get("building_number"),
        floor=data.get("floor"),
        apartment_number=data.get("apartment_number"),
        address_type=data.get("address_type", "home"),
        is_default=data.get("is_default", False),
        user_id=user_id
    )

    db.session.add(new_address)
    db.session.commit()

    return {"data": new_address.to_dict()}


# ================= GET =================
@address_bp.route("/addresses", methods=["GET"])
@jwt_required()
def get_addresses():
    user_id = get_jwt_identity()

    addresses = Address.query.filter_by(user_id=user_id).all()
    return {"data": [a.to_dict() for a in addresses]}

# ================= DELETE =================
@address_bp.route("/addresses/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_address(id):
    user_id = get_jwt_identity()

    address = Address.query.filter_by(id=id, user_id=user_id).first()

    if not address:
        return {"error": "Not found"}, 404

    db.session.delete(address)
    db.session.commit()

    return {"message": "Deleted"}


# ================= UPDATE =================
@address_bp.route("/addresses/<int:id>", methods=["PUT"])
@jwt_required()
def update_address(id):
    user_id = get_jwt_identity()

    data = request.json
    address = Address.query.filter_by(id=id, user_id=user_id).first()

    if not address:
        return {"error": "Not found"}, 404

    if data.get("is_default"):
        Address.query.filter_by(user_id=user_id, is_default=True)\
            .update({"is_default": False})

    address.full_name = data.get("full_name")
    address.phone = data.get("phone")
    address.governorate = data.get("governorate")
    address.area = data.get("area")
    address.street = data.get("street")
    address.building_number = data.get("building_number")
    address.floor = data.get("floor")
    address.apartment_number = data.get("apartment_number")
    address.address_type = data.get("address_type")
    address.is_default = data.get("is_default", address.is_default)

    db.session.commit()

    return {"data": address.to_dict()}