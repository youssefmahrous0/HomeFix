import time
import math
import requests
from extensions import socketio, db
from datetime import datetime
from models.Booking import Booking
from models.provider import Provider


# =========================
# 📏 حساب المسافة
# =========================
def calculate_distance(lat1, lon1, lat2, lon2):
    R = 6371  # KM

    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)

    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(math.radians(lat1))
        * math.cos(math.radians(lat2))
        * math.sin(dlon / 2) ** 2
    )

    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return R * c


# =========================
# 🚀 LIVE TRACKING
# =========================
def start_tracking(
    booking_id,
    provider_lat,
    provider_lng,
    user_lat,
    user_lng
):

    try:

        # =========================
        # 🗺️ OSRM ROUTE
        # =========================
        url = (
            f"https://router.project-osrm.org/route/v1/driving/"
            f"{provider_lng},{provider_lat};"
            f"{user_lng},{user_lat}"
            f"?overview=full&geometries=geojson"
        )

        response = requests.get(url)

        if response.status_code != 200:
            print("❌ OSRM ERROR")
            return

        data = response.json()

        if not data.get("routes"):
            print("❌ No routes found")
            return

        route_data = data["routes"][0]

        # =========================
        # 📏 المسافة الكلية
        # =========================
        total_distance_km = route_data["distance"] / 1000

        # =========================
        # ⏱️ الوقت الكلي
        # =========================
        total_duration_min = route_data["duration"] / 60

        # =========================
        # 🛣️ نقاط الطريق
        # =========================
        coords = route_data["geometry"]["coordinates"]

        # تحويل [lng, lat] → [lat, lng]
        route = [[c[1], c[0]] for c in coords]

        total_points = len(route)

        print(f"🔥 tracking started {booking_id}")
        
        # =========================
        # 🚗 بدء الحركة
        # =========================
        booking = Booking.query.get(booking_id)

        if booking:

         booking.status = "on_the_way"

         status_times = booking.status_times or {}

         status_times["on_the_way"] = (
          datetime.now().isoformat()
         )

         booking.status_times = status_times

         db.session.commit()

        # =========================
        # 🚗 تحريك الفني
        # =========================
        for index, point in enumerate(route):

            lat = point[0]
            lng = point[1]

            # نسبة التقدم
            progress = index / total_points

            # المسافة المتبقية
            remaining_distance = (
                total_distance_km * (1 - progress)
            )

            # الوقت المتبقي
            remaining_eta = (
                total_duration_min * (1 - progress)
            )

            socketio.emit(
                "receive_location",
                {
                    "booking_id": booking_id,
                    "lat": lat,
                    "lng": lng,

                    # 📏 KM
                    "distance": round(
                        max(0, remaining_distance),
                        2
                    ),

                    # ⏱️ Minutes
                    "eta": int(
                        max(1, remaining_eta)
                    ),

                    "status": "on_the_way"
                },
                room=str(booking_id)
            )

            print(
                f"📍 {booking_id} -> "
                f"{lat}, {lng} | "
                f"{remaining_distance:.2f} KM | "
                f"{remaining_eta:.1f} MIN"
            )

            # سرعة الحركة
            time.sleep(2)

        # =========================
        # ✅ وصل الفني
        # =========================
        socketio.emit(
            "receive_location",
            {
                "booking_id": booking_id,
                "lat": user_lat,
                "lng": user_lng,
                "distance": 0,
                "eta": 0,
                "status": "arrived"
            },
            room=str(booking_id)
        )
        
        # =========================
        # ✅ تحديث الوصول
        # =========================
        booking = Booking.query.get(booking_id)

        if booking:

          booking.status = "arrived"

          status_times = booking.status_times or {}

          status_times["arrived"] = (
         datetime.now().isoformat()
          )

          booking.status_times = status_times

          db.session.commit()
        
        print(f"✅ provider arrived {booking_id}")

    except Exception as e:
        print("❌ TRACKING ERROR:", str(e))