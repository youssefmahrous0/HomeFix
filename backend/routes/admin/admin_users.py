from flask import Blueprint, jsonify, request
from models.user import User
from extensions import db

admin_users = Blueprint("admin_users", __name__)

# GET USERS
@admin_users.route("/admin/users", methods=["GET"])
def get_users():

    users = User.query.filter_by(user_type="client").all()

    data = []

    for user in users:
        data.append({
            "id": user.id,
            "name": user.full_name,
            "email": user.email,
            "phone": user.phone,
            "address": user.address,
            "status": user.status,
            "orders": 0,
            "spent": 0,
            "joined_at": user.created_at.strftime("%Y-%m-%d")
            if user.created_at else ""
        })

    return jsonify({
        "users": data
    })


# ADD USER
@admin_users.route("/admin/users", methods=["POST"])
def add_user():

    data = request.get_json()

    new_user = User(
    full_name=data.get("name"),
    email=data.get("email"),
    phone=data.get("phone"),
    address=data.get("address"),
    user_type="client",
    status=data.get("status")
)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "User added"
    }), 201
    
    
# UPDATE USER STATUS
# UPDATE USER
@admin_users.route("/admin/users/<int:id>", methods=["PUT"])
def update_user(id):

    user = User.query.get(id)

    if not user:
        return jsonify({
            "message": "User not found"
        }), 404

    data = request.get_json()

    user.full_name = data.get("name", user.full_name)
    user.email = data.get("email", user.email)
    user.phone = data.get("phone", user.phone)
    user.address = data.get("address", user.address)
    user.status = data.get("status", user.status)

    db.session.commit()

    return jsonify({
        "message": "User updated successfully"
    })
    
    
    
