from flask import Blueprint, request, jsonify, current_app
from models.Booking import Booking
from models.provider import Provider
from models.order import Order
from models.user import User
from extensions import db, socketio
import random
from flask import current_app
import string
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from threading import Thread
from routes.tracking import start_tracking
from extensions import socketio   # أو من الملف اللي فيه socketio
import threading
from models.notification import Notification
import time
from datetime import datetime, timedelta
import pytz
from routes.tracking import calculate_distance
import math





booking_bp = Blueprint("booking", __name__)


# =========================
# ⏱️ delayed tracking
# =========================
def delayed_tracking(app, booking_id, delay):

    print(f"⏳ waiting {delay} seconds before tracking {booking_id}")

    time.sleep(delay)

    with app.app_context():

        booking = Booking.query.get(booking_id)

        if not booking:
            return

        provider = Provider.query.get(booking.provider_id)

        if not provider:
            return

        start_tracking(
            booking.id,
            provider.lat,
            provider.lng,
            booking.lat,
            booking.lng
        )


# =========================
# 🔥 CREATE BOOKING
# =========================
@booking_bp.route("/bookings", methods=["POST"])
@jwt_required()
def create_booking():

    data = request.get_json()
    user_id = get_jwt_identity()

    try:
        # =========================
        # ✅ validation
        # =========================
        required_fields = [
            "provider_id", "service", "date", "time",
            "address", "city", "area", "phone", "payment"
        ]

        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({"error": f"{field} مطلوب"}), 400

        # =========================
        # ✅ check provider
        # =========================
        provider = Provider.query.get(data["provider_id"])
        if not provider:
            return jsonify({"error": "الفني غير موجود"}), 404
        if provider.lat is None or provider.lng is None:
            return jsonify({"error": "موقع الفني غير متوفر"}), 400
        # =========================
        # 📏 حساب المسافة بين الفني والعميل
        # =========================
        distance = calculate_distance(
           provider.lat,
           provider.lng,
          float(data["lat"]),
           float(data["lng"])
            )
        # =========================
         # ⏱️ ETA بالدقائق
        # =========================
        speed = 40  # km/h
        eta_minutes = (distance / speed) * 60
        
        cairo = pytz.timezone("Africa/Cairo")

        # =========================
        # ✅ parse date + time
        # =========================
        try:
            time_str = data["time"].strip().upper()
            try:
                # 12-hour format
                naive_datetime = datetime.strptime(
                    f"{data['date']} {time_str}",
                    "%Y-%m-%d %I:%M %p")
            except:
                # 24-hour format
                naive_datetime = datetime.strptime(
                    f"{data['date']} {time_str}",
                    "%Y-%m-%d %H:%M")
            booking_datetime = cairo.localize(naive_datetime)
            date_obj = booking_datetime.date()

        except Exception as e:
            print("TIME PARSE ERROR:", e)
            print("DATE:", data.get("date"))
            print("TIME:", data.get("time"))

            return jsonify({
                "error": "صيغة التاريخ/الوقت غير صحيحة"}), 400
         # =========================
         # ⏱️ حساب delay (Cairo)
         # =========================
        now = datetime.now(cairo)
        # وقت بدء الحركة
        tracking_start = booking_datetime - timedelta(minutes=eta_minutes)

        delay = (tracking_start - now).total_seconds()

        if delay < 0:
         delay = 0
        # =========================
        # 🔥 1. create booking
        # =========================
        new_booking = Booking(
            user_id=user_id,
            provider_id=data["provider_id"],
            service=data["service"],
            date=date_obj,
            time=data["time"],
            address=data["address"],
            city=data["city"],
            area=data["area"],
            phone=data["phone"],
            notes=data.get("notes"),
            payment_method=data["payment"],

            # ✅ الحالة الجديدة
            status="scheduled",
            status_times={
                "scheduled": datetime.now(cairo).isoformat()
            },

            lat=data.get("lat"),
            lng=data.get("lng")
        )

        db.session.add(new_booking)
        db.session.flush()

        # =========================
        # 🔔 notification
        # =========================
        notification = Notification(
            user_id=user_id,
            title="تم إرسال طلبك",
            message=f"تم حجز {data['service']} مع {provider.name} في {data['date']} {data['time']}",
            type="booking"
        )
        db.session.add(notification)

        socketio.emit(
            "new_notification",
            {
                "title": "تم إرسال طلبك",
                "message": f"تم حجز {data['service']} مع {provider.name}",
                "type": "booking"
            },
            room=str(user_id)
        )

        # =========================
        # 🔥 booking code
        # =========================
        random_part = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        new_booking.booking_code = f"BK{new_booking.id}{random_part}"

        # =========================
        # 🔥 create order
        # =========================
        new_order = Order(
            user_id=user_id,
            service_name=data["service"],
            booking_id=new_booking.id,
            provider_name=provider.name,
            price=provider.price,
            status="scheduled",
            date=date_obj,
            city=data["city"],
            area=data["area"],
            rating=0
        )

        db.session.add(new_order)
        db.session.commit()

        # =========================
        # 🚀 تشغيل tracking في الوقت المحدد
        # =========================
        threading.Thread(
            target=delayed_tracking,
            args=(current_app._get_current_object(), new_booking.id, delay),
            daemon=True
        ).start()

        return jsonify({
            "message": "تم الحجز بنجاح",
            "booking_id": new_booking.id,
            "booking_code": new_booking.booking_code
        }), 201

    except Exception as e:
        print("ERROR:", e)
        return jsonify({
            "error": "فشل في الحجز",
            "details": str(e)
        }), 500


# =========================
# 🔄 UPDATE STATUS
# =========================
@booking_bp.route("/update-status/<int:id>", methods=["PUT"])
@jwt_required()
def update_status(id):

    data = request.get_json()

    booking = Booking.query.get(id)

    if not booking:
        return jsonify({
            "error": "Booking not found"
        }), 404

    order = Order.query.filter_by(
        booking_id=id
    ).first()

    new_status = data.get("status")

    # ✅ تحديث حالة الحجز
    booking.status = new_status

    # ✅ حفظ وقت الحالة
    status_times = booking.status_times or {}

    cairo = pytz.timezone("Africa/Cairo")

    status_times[new_status] = datetime.now(cairo).isoformat()

    booking.status_times = status_times

    # ✅ تحديث الـ order
    if order:
        order.status = new_status

    user_id = get_jwt_identity()

    notification = Notification(
        user_id=user_id,
        title="تحديث حالة الطلب",
        message=f"حالة الطلب أصبحت {new_status}",
        type="status"
    )

    db.session.add(notification)

    db.session.commit()

    socketio.emit(
        "new_notification",
        {
            "title": "تحديث حالة الطلب",
            "message": f"حالة الطلب أصبحت {new_status}",
            "type": "status"
        },
        room=str(user_id)
    )

    return jsonify({
        "message": "تم تحديث الحالة",
        "status": new_status
    }), 200


# =========================
# ❌ CANCEL BOOKING
# =========================
@booking_bp.route("/cancel/<int:id>", methods=["PUT"])
@jwt_required()
def cancel_booking(id):

    user_id = get_jwt_identity()

    booking = Booking.query.filter_by(
        id=id,
        user_id=user_id
    ).first()

    if not booking:
        return jsonify({
            "error": "غير مصرح"
        }), 403

    # ✅ cancel booking
    booking.status = "cancelled"

    # ✅ update order status
    order = Order.query.filter_by(
        booking_id=id
    ).first()

    if order:
        order.status = "cancelled"

    # 🔔 notification
    notification = Notification(
        user_id=user_id,
        title="تم إلغاء الطلب",
        message="تم إلغاء الحجز بنجاح",
        type="cancel"
    )

    db.session.add(notification)

    db.session.commit()

    socketio.emit(
        "new_notification",
        {
            "title": "تم إلغاء الطلب",
            "message": "تم إلغاء الحجز بنجاح",
            "type": "cancel"
        },
        room=str(user_id)
    )

    return jsonify({
        "message": "تم إلغاء الحجز بنجاح"
    }), 200
    
    
    
@booking_bp.route("/booking/<int:id>", methods=["GET"])
@jwt_required()
def get_booking(id):

    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    booking = Booking.query.filter_by(
        id=id,
        user_id=user_id
    ).first()

    if not booking:
        return jsonify({"error": "غير مصرح"}), 403

    provider = Provider.query.get(
        booking.provider_id
    ) if booking.provider_id else None

    # =========================
    # 📍 provider location
    # =========================
    provider_lat = provider.lat if provider else None
    provider_lng = provider.lng if provider else None

    # =========================
    # 📏 distance + eta
    # =========================
    distance = None
    eta = None

    if (
        provider_lat is not None and
        provider_lng is not None and
        booking.lat is not None and
        booking.lng is not None
    ):

        distance = calculate_distance(
            float(provider_lat),
            float(provider_lng),
            float(booking.lat),
            float(booking.lng)
        )

        speed = 40

        eta = max(
            1,
            math.ceil((distance / speed) * 60)
        )

    return jsonify({

        "id": booking.id,
        "booking_code": booking.booking_code,
        "service": booking.service,

        "date": booking.date.strftime("%Y-%m-%d")
        if booking.date else None,

        "time": booking.time,
        "address": booking.address,
        "payment": booking.payment_method,
        
         # ✅ notes
        "notes": booking.notes,

        # 📍 العميل
        "lat": booking.lat,
        "lng": booking.lng,

        # 🔥 status
        "status": booking.status,
        "status_times": booking.status_times,
        
        # ✅ NEW
       "phone": booking.phone,
       "email": user.email if user else "",

        # 👨‍🔧 provider
        "provider": {
            "name": provider.name if provider else "",
            "price": provider.price if provider else 0,
        },

        # 📍 الفني
        "provider_location": {
            "lat": provider_lat,
            "lng": provider_lng
        },

        # 📏 tracking
        "distance": round(distance, 2)
        if distance is not None else None,

        "eta": eta

    }), 200