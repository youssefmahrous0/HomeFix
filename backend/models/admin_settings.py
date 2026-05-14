from extensions import db
from sqlalchemy import Unicode, UnicodeText


class AdminSettings(db.Model):

    __tablename__ = "admin_settings"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    # =====================================
    # GENERAL
    # =====================================

    app_name = db.Column(
        Unicode(255),
        default="HomeFix"
    )

    app_description = db.Column(
        UnicodeText
    )

    support_email = db.Column(
        db.String(255)
    )

    support_phone = db.Column(
        db.String(50)
    )

    # =====================================
    # NOTIFICATIONS
    # =====================================

    email_notifications = db.Column(
        db.Boolean,
        default=True
    )

    sms_notifications = db.Column(
        db.Boolean,
        default=True
    )

    push_notifications = db.Column(
        db.Boolean,
        default=True
    )

    # =====================================
    # SECURITY
    # =====================================

    session_timeout = db.Column(
        db.Integer,
        default=30
    )

    password_length = db.Column(
        db.Integer,
        default=8
    )

    two_factor_auth = db.Column(
        db.Boolean,
        default=False
    )

    activity_logs = db.Column(
        db.Boolean,
        default=True
    )

    # =====================================
    # FINANCE
    # =====================================

    commission_rate = db.Column(
        db.Float,
        default=15
    )

    min_order_amount = db.Column(
        db.Float,
        default=50
    )

    payment_methods = db.Column(
        Unicode(255),
        default="جميع الطرق"
    )

    vat_rate = db.Column(
        db.Float,
        default=14
    )

    # =====================================
    # CONTACT
    # =====================================

    main_phone = db.Column(
        db.String(50)
    )

    main_email = db.Column(
        db.String(255)
    )

    whatsapp = db.Column(
        db.String(50)
    )

    facebook = db.Column(
        Unicode(255)
    )

    twitter = db.Column(
        Unicode(255)
    )

    instagram = db.Column(
        Unicode(255)
    )

    address = db.Column(
        UnicodeText
    )

    # =====================================
    # MAINTENANCE
    # =====================================

    maintenance_enabled = db.Column(
        db.Boolean,
        default=False
    )

    maintenance_message = db.Column(
        UnicodeText
    )

    # =====================================
    # TO DICT
    # =====================================

    def to_dict(self):

        return {

            "general": {
                "app_name": self.app_name,
                "app_description": self.app_description,
                "support_email": self.support_email,
                "support_phone": self.support_phone,
            },

            "notifications": {
                "email_notifications":
                    self.email_notifications,

                "sms_notifications":
                    self.sms_notifications,

                "push_notifications":
                    self.push_notifications,
            },

            "security": {
                "session_timeout":
                    self.session_timeout,

                "password_length":
                    self.password_length,

                "two_factor_auth":
                    self.two_factor_auth,

                "activity_logs":
                    self.activity_logs,
            },

            "finance": {
                "commission_rate":
                    self.commission_rate,

                "min_order_amount":
                    self.min_order_amount,

                "payment_methods":
                    self.payment_methods,

                "vat_rate":
                    self.vat_rate,
            },

            "contact": {
                "main_phone":
                    self.main_phone,

                "main_email":
                    self.main_email,

                "whatsapp":
                    self.whatsapp,

                "facebook":
                    self.facebook,

                "twitter":
                    self.twitter,

                "instagram":
                    self.instagram,

                "address":
                    self.address,
            },

            "maintenance": {
                "enabled":
                    self.maintenance_enabled,

                "message":
                    self.maintenance_message,
            },
        }