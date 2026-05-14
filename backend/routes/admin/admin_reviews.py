from flask import Blueprint, jsonify

from extensions import db

from models.order import Order

admin_reviews_bp = Blueprint(
    "admin_reviews",
    __name__
)

# =====================================================
# GET ALL REVIEWS
# =====================================================

@admin_reviews_bp.route(
    "/admin/reviews",
    methods=["GET"]
)
def get_reviews():

    orders = Order.query.filter(
        Order.rating > 0
    ).order_by(
        Order.id.desc()
    ).all()

    data = []

    for order in orders:

        customer_name = "غير معروف"

        if order.user:

            if hasattr(order.user, "full_name"):

                customer_name = (
                    order.user.full_name
                )

            elif hasattr(
                order.user,
                "username"
            ):

                customer_name = (
                    order.user.username
                )

        # =================================================
        # COMMENT
        # =================================================

        comment = "خدمة ممتازة"

        if order.rating == 5:

            comment = (
                "ممتاز جدًا، أنصح بالتعامل معه"
            )

        elif order.rating == 4:

            comment = (
                "خدمة جيدة جدًا"
            )

        elif order.rating == 3:

            comment = (
                "الخدمة جيدة"
            )

        elif order.rating == 2:

            comment = (
                "الخدمة مقبولة لكن يوجد بعض المشاكل"
            )

        elif order.rating == 1:

            comment = (
                "خدمة سيئة جدًا"
            )

        data.append({

            "id":
                order.id,

            "customer":
                customer_name,

            "provider":
                order.provider_name,

            "service":
                order.service_name,

            "rating":
                order.rating,

            "comment":
                comment,

            "date":
                order.date.strftime(
                    "%Y-%m-%d"
                )
                if order.date
                else "",

            "order_number":
                f"#ORD-{order.id}",

            "helpful_count":
                order.rating * 3,

        })

    # =====================================================
    # STATS
    # =====================================================

    total_reviews = len(data)

    average_rating = round(

        sum([
            r["rating"]
            for r in data
        ]) / total_reviews,

        1

    ) if total_reviews > 0 else 0

    five_star_reviews = len([

        r for r in data
        if r["rating"] == 5

    ])

    negative_reviews = len([

        r for r in data
        if r["rating"] <= 2

    ])

    return jsonify({

        "reviews":
            data,

        "total_reviews":
            total_reviews,

        "average_rating":
            average_rating,

        "five_star_reviews":
            five_star_reviews,

        "negative_reviews":
            negative_reviews,

    })


# =====================================================
# DELETE REVIEW
# =====================================================

@admin_reviews_bp.route(
    "/admin/reviews/<int:id>",
    methods=["DELETE"]
)
def delete_review(id):

    order = Order.query.get(id)

    if not order:

        return jsonify({
            "error": "Review not found"
        }), 404

    order.rating = 0

    db.session.commit()

    return jsonify({
        "message": "تم حذف التقييم"
    })