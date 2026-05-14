from extensions import db
from datetime import datetime
from sqlalchemy import Unicode, UnicodeText


class Complaint(db.Model):

    __tablename__ = "complaints"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    # =====================================
    # العلاقات
    # =====================================

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id")
    )

    order_id = db.Column(
        db.Integer,
        db.ForeignKey("orders.id")
    )

    provider_id = db.Column(
        db.Integer,
        db.ForeignKey("providers.id")
    )

    # =====================================
    # البيانات
    # =====================================

    subject = db.Column(
        Unicode(255),
        nullable=False
    )

    description = db.Column(
        UnicodeText,
        nullable=False
    )

    priority = db.Column(
        Unicode(50),
        default="متوسط"
    )

    status = db.Column(
        Unicode(50),
        default="جديدة"
    )

    response = db.Column(
        UnicodeText
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    # =====================================
    # RELATIONSHIPS
    # =====================================

    user = db.relationship(
        "User",
        backref="complaints"
    )

    order = db.relationship(
        "Order",
        backref="complaints"
    )

    provider = db.relationship(
        "Provider",
        backref="complaints"
    )