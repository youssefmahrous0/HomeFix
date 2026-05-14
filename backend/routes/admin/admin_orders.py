from flask import Blueprint, jsonify, request

from models.order import Order

from extensions import db

admin_orders_bp = Blueprint(
    "admin_orders",
    __name__
)

# =====================================================
# GET ALL ORDERS
# =====================================================

@admin_orders_bp.route(
    "/admin/orders",
    methods=["GET"]
)
def get_orders():

    orders = Order.query.order_by(
        Order.id.desc()
    ).all()

    data = []

    for order in orders:

        data.append({

            "id":
                order.id,

            "order_number":
                f"#ORD-{order.id}",

            "customer":
                order.user.full_name
                if order.user
                else "غير معروف",

            "provider":
                order.provider_name,

            "service":
                order.service_name,

            "amount":
                float(order.price),

            "date":
                order.date.strftime("%Y-%m-%d")
                if order.date
                else "",

            "time":
                "03:00 م",

            "status":
                order.status,

            "payment_status":
                "مدفوع"
                if order.status == "completed"
                else "معلق",

            "location":
                f"{order.city} - {order.area}",

            "rating":
                order.rating,

        })

    return jsonify({

        "orders":
            data,

        "total_orders":
            len(data),

        "active_orders":
            len([
                o for o in data
                if o["status"] == "pending"
            ]),

        "completed_orders":
            len([
                o for o in data
                if o["status"] == "completed"
            ]),

        "total_revenue":
            sum([
                o["amount"]
                for o in data
                if o["payment_status"] == "مدفوع"
            ])

    })


# =====================================================
# GET SINGLE ORDER
# =====================================================

@admin_orders_bp.route(
    "/admin/orders/<int:id>",
    methods=["GET"]
)
def get_order(id):

    order = Order.query.get(id)

    if not order:

        return jsonify({
            "error": "Order not found"
        }), 404

    return jsonify({

        "id":
            order.id,

        "order_number":
            f"#ORD-{order.id}",

        "customer":
            order.user.full_name
            if order.user
            else "غير معروف",

        "provider":
            order.provider_name,

        "service":
            order.service_name,

        "amount":
            float(order.price),

        "date":
            order.date.strftime("%Y-%m-%d")
            if order.date
            else "",

        "time":
            "03:00 م",

        "status":
            order.status,

        "payment_status":
            "مدفوع"
            if order.status == "completed"
            else "معلق",

        "location":
            f"{order.city} - {order.area}",

        "rating":
            order.rating,

    })


# =====================================================
# UPDATE STATUS
# =====================================================

@admin_orders_bp.route(
    "/admin/orders/<int:id>/status",
    methods=["PUT"]
)
def update_status(id):

    order = Order.query.get(id)

    if not order:

        return jsonify({
            "error": "Order not found"
        }), 404

    data = request.json

    order.status = data.get(
        "status",
        order.status
    )

    db.session.commit()

    return jsonify({
        "message": "تم تحديث حالة الطلب"
    })