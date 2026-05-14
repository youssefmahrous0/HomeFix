from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.order import Order
from models.Booking import Booking  # 🔥 مهم
from models.provider import Provider


orders_bp = Blueprint("orders", __name__)

@orders_bp.route("/my-orders", methods=["GET"])
@jwt_required()
def get_my_orders():
    user_id = get_jwt_identity()

    orders = Order.query.filter_by(user_id=user_id).all()
    
    data = []
    for o in orders:
        data.append({
            "id": o.id,
            "service": o.service_name,
            "provider": o.provider_name,
            "booking_id": o.booking_id,
            "price": float(o.price),
            "status": o.status,
            "date": o.date.strftime("%Y-%m-%d") if o.date else None,
            "location": f"{o.city} - {o.area}",
            "rating": o.rating
        })

    return jsonify(data), 200, {'Content-Type': 'application/json; charset=utf-8'}



#Booking details in Orders

@orders_bp.route("/order-booking/<int:id>", methods=["GET"])
@jwt_required()
def get_booking_details(id):

    booking = Booking.query.get(id)

    if not booking:
        return jsonify({"error": "Booking not found"}), 404

    # 🔥 لازم يبقى جوه الفنكشن
    provider = Provider.query.get(booking.provider_id)

    return jsonify({
        "service": booking.service,
        "date": booking.date.strftime("%Y-%m-%d") if booking.date else None,
        "time": booking.time,
        "address": booking.address,
        "city": booking.city,
        "area": booking.area,
        "phone": booking.phone,
        "payment": booking.payment_method,
        "booking_code": booking.booking_code,

        # 🔥 provider data
        "provider": {
            "name": provider.name if provider else "",
            "price": float(provider.price) if provider else 0
        }
    }), 200