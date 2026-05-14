from extensions import db
from datetime import datetime
from sqlalchemy import Unicode, UnicodeText


class Advertisement(db.Model):

    __tablename__ = "advertisements"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    # =====================================
    # البيانات الأساسية
    # =====================================

    title = db.Column(
        Unicode(255),
        nullable=False
    )

    description = db.Column(
        UnicodeText,
        nullable=False
    )

    location = db.Column(
        Unicode(255)
    )

    image = db.Column(
        db.String(500)
    )

    # =====================================
    # الإحصائيات
    # =====================================

    views = db.Column(
        db.Integer,
        default=0
    )

    clicks = db.Column(
        db.Integer,
        default=0
    )

    ctr = db.Column(
        db.Float,
        default=0
    )

    # =====================================
    # الحالة
    # =====================================

    status = db.Column(
        Unicode(50),
        default="نشط"
    )

    ad_type = db.Column(
        Unicode(50),
        default="بانر"
    )

    # =====================================
    # التواريخ
    # =====================================

    start_date = db.Column(
        db.Date
    )

    end_date = db.Column(
        db.Date
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )