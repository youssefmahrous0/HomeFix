from flask import (
    Blueprint,
    jsonify,
    request
)

from extensions import db

from models.complaint import Complaint

admin_complaints_bp = Blueprint(
    "admin_complaints",
    __name__
)

# =====================================================
# GET ALL COMPLAINTS
# =====================================================

@admin_complaints_bp.route(
    "/admin/complaints",
    methods=["GET"]
)
def get_complaints():

    complaints = Complaint.query.order_by(
        Complaint.id.desc()
    ).all()

    data = []

    for item in complaints:

        data.append({

            "id":
                item.id,

            "ticket_number":
                f"#TKT-{item.id}",

            "customer":
             item.user.full_name
             if item.user else "غير معروف",

            "provider":
             item.provider.name
             if item.provider else "غير معروف", 

            "subject":
                item.subject,

            "description":
                item.description,

            "priority":
                item.priority,

            "status":
                item.status,

            "response":
                item.response,

            "order_number":
                f"#ORD-{item.order_id}",

            "date":
                item.created_at.strftime(
                    "%Y-%m-%d"
                ) if item.created_at
                else ""

        })

    # =====================================================
    # STATS
    # =====================================================

    total_complaints = len(data)

    new_complaints = len([

        c for c in data
        if c["status"] == "جديدة"

    ])

    pending_complaints = len([

        c for c in data
        if c["status"] == "قيد المراجعة"

    ])

    resolved_complaints = len([

        c for c in data
        if c["status"] == "محلولة"

    ])

    return jsonify({

        "complaints":
            data,

        "total_complaints":
            total_complaints,

        "new_complaints":
            new_complaints,

        "pending_complaints":
            pending_complaints,

        "resolved_complaints":
            resolved_complaints,

    })


# =====================================================
# GET SINGLE COMPLAINT
# =====================================================

@admin_complaints_bp.route(
    "/admin/complaints/<int:id>",
    methods=["GET"]
)
def get_single_complaint(id):

    item = Complaint.query.get(id)

    if not item:

        return jsonify({
            "error":
            "Complaint not found"
        }), 404

    return jsonify({

        "id":
            item.id,

        "ticket_number":
            f"#TKT-{item.id}",

        "customer":
          item.user.full_name
          if item.user else "غير معروف",

       "provider":
         item.provider.name
          if item.provider else "غير معروف",

        "subject":
            item.subject,

        "description":
            item.description,

        "priority":
            item.priority,

        "status":
            item.status,

        "response":
            item.response,

        "order_number":
            f"#ORD-{item.order_id}",

        "date":
            item.created_at.strftime(
                "%Y-%m-%d"
            ) if item.created_at
            else ""

    })


# =====================================================
# UPDATE COMPLAINT STATUS
# =====================================================

@admin_complaints_bp.route(
    "/admin/complaints/<int:id>/status",
    methods=["PUT"]
)
def update_complaint_status(id):

    item = Complaint.query.get(id)

    if not item:

        return jsonify({
            "error":
            "Complaint not found"
        }), 404

    data = request.json

    item.status = data.get(
        "status",
        item.status
    )

    db.session.commit()

    return jsonify({
        "message":
        "تم تحديث حالة الشكوى"
    })


# =====================================================
# ADD RESPONSE
# =====================================================

@admin_complaints_bp.route(
    "/admin/complaints/<int:id>/reply",
    methods=["PUT"]
)
def reply_complaint(id):

    item = Complaint.query.get(id)

    if not item:

        return jsonify({
            "error":
            "Complaint not found"
        }), 404

    data = request.json

    item.response = data.get(
        "response"
    )

    item.status = "محلولة"

    db.session.commit()

    return jsonify({
        "message":
        "تم إرسال الرد"
    })