from flask import Blueprint, jsonify
from models.user import User
from models.order import Order
from models.provider import Provider
from extensions import db
from sqlalchemy import func
from models.service import Service

admin_bp = Blueprint("admin", __name__)

@admin_bp.route("/api/admin/dashboard", methods=["GET"])
def admin_dashboard():

    # إجمالي المستخدمين (clients فقط)
    total_users = User.query.filter_by(
       user_type="client"
      ).count()

    # إجمالي مقدمي الخدمات
    total_providers = Provider.query.count()

    total_orders = Order.query.count()

    completed_orders = Order.query.filter_by(status="completed").count()

    pending_orders = Order.query.filter_by(status="pending").count()

    cancelled_orders = Order.query.filter_by(status="cancelled").count()
    

    total_revenue = db.session.query(
    func.sum(Order.price)
).scalar() or 0
    
    services_count = Service.query.count()
    
    latest_orders = Order.query.order_by(
    Order.date.desc()
).limit(5).all()

    latest_orders_data = []

    for order in latest_orders:

      latest_orders_data.append({
        "id": order.id,

        "client": order.user.full_name
        if order.user else "غير معروف",

        "service": order.service_name,

        # اسم مقدم الخدمة
        "provider": order.provider_name
        if order.provider_name else "غير محدد",

        "price": float(order.price or 0),

        "status": order.status
    })
        
        
   # توزيع الخدمات الحقيقي
   # توزيع الخدمات - 8 خدمات ثابتة

    allowed_services = [
       "سباكة",
       "كهرباء",
       "تكييف",
       "تنظيف",
       "دهانات",
       "أخري"
      ]

    services_distribution_data = []

    total_services = len(allowed_services)

    for service_name in allowed_services:

      percentage = round(100 / total_services)

      services_distribution_data.append({
        "name": service_name,
        "value": percentage
      })
      
      
    # أداء الخدمات حسب الحالة
    services_status = db.session.query(
      Order.service_name,
       Order.status,
     func.count(Order.id)
     ).group_by(
     Order.service_name,
      Order.status
     ).all()

    bar_chart_dict = {}

    for service_name, status, count in services_status:

      if service_name not in bar_chart_dict:
        bar_chart_dict[service_name] = {
            "service": service_name,
            "completed": 0,
            "pending": 0,
            "cancelled": 0
        }

      if status == "completed":
        bar_chart_dict[service_name]["completed"] = count

      elif status == "pending":
        bar_chart_dict[service_name]["pending"] = count

      elif status == "cancelled":
        bar_chart_dict[service_name]["cancelled"] = count

    bar_chart_data = list(bar_chart_dict.values())
    
    
    
    
    # =========================
    # أفضل مقدمي الخدمات
    # =========================

    top_providers = Provider.query.order_by(
        Provider.rating.desc(),
        Provider.orders.desc()
    ).limit(5).all()

    top_providers_data = []

    for index, provider in enumerate(top_providers, start=1):
        top_providers_data.append({
            "rank": index,
            "id": provider.id,
            "name": provider.name,
            "job": provider.job,
            "rating": round(provider.rating or 0, 1),
            "orders": provider.orders,
            "price": provider.price
        })

    # =========================
    # النشاطات الأخيرة
    # =========================

    latest_activities = []

    # آخر الطلبات
    latest_orders_activity = Order.query.order_by(
        Order.id.desc()
    ).limit(3).all()

    for order in latest_orders_activity:
        latest_activities.append({
            "title": "طلب جديد",
            "description": f"{order.user.full_name} طلب خدمة {order.service_name}",
            "time": "منذ دقائق",
            "type": "order"
        })

    # آخر مقدمي الخدمات
    latest_providers = Provider.query.order_by(
        Provider.id.desc()
    ).limit(2).all()

    for provider in latest_providers:
        latest_activities.append({
            "title": "مقدم خدمة جديد",
            "description": f"انضم {provider.name} كمقدم خدمة {provider.job}",
            "time": "حديثاً",
            "type": "provider"
        })

    # أعلى التقييمات
    top_rated = Provider.query.order_by(
        Provider.rating.desc()
    ).limit(2).all()

    for provider in top_rated:
        latest_activities.append({
            "title": "تقييم جديد",
            "description": f"{provider.name} حصل على تقييم {provider.rating} ⭐",
            "time": "منذ قليل",
            "type": "rating"
        })

    return jsonify({
    "statistics": {
        "users": total_users,
        "providers": total_providers,
        "orders": total_orders,
        "completed_orders": completed_orders,
        "pending_orders": pending_orders,
        "cancelled_orders": cancelled_orders,
        "revenue": total_revenue,
        "services": services_count
    },

    "services_distribution": services_distribution_data or [],
    "bar_chart_data": bar_chart_data,
    "latest_orders": latest_orders_data,

    # الجديد
    "top_providers": top_providers_data,
    "latest_activities": latest_activities
})