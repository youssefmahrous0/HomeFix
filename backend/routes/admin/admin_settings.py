from flask import Blueprint, request, jsonify
from extensions import db
from models.admin_settings import AdminSettings


admin_settings_bp = Blueprint(
    "admin_settings",
    __name__
)

# =========================================
# GET SETTINGS
# =========================================

@admin_settings_bp.route(
    "/admin/settings",
    methods=["GET"]
)
def get_settings():

    settings = AdminSettings.query.first()

    if not settings:

        settings = AdminSettings()

        db.session.add(settings)

        db.session.commit()

    return jsonify({
        "settings": settings.to_dict()
    })


# =========================================
# UPDATE SETTINGS
# =========================================

@admin_settings_bp.route(
    "/admin/settings",
    methods=["PUT"]
)
def update_settings():

    data = request.json

    settings = AdminSettings.query.first()

    if not settings:

        settings = AdminSettings()

        db.session.add(settings)

    # =====================================
    # GENERAL
    # =====================================

    general = data.get("general", {})

    settings.app_name = general.get(
        "app_name"
    )

    settings.app_description = general.get(
        "app_description"
    )

    settings.support_email = general.get(
        "support_email"
    )

    settings.support_phone = general.get(
        "support_phone"
    )

    # =====================================
    # NOTIFICATIONS
    # =====================================

    notifications = data.get(
        "notifications",
        {}
    )

    settings.email_notifications = notifications.get(
        "email_notifications",
        False
    )

    settings.sms_notifications = notifications.get(
        "sms_notifications",
        False
    )

    settings.push_notifications = notifications.get(
        "push_notifications",
        False
    )

    # =====================================
    # SECURITY
    # =====================================

    security = data.get("security", {})

    settings.session_timeout = security.get(
        "session_timeout"
    )

    settings.password_length = security.get(
        "password_length"
    )

    settings.two_factor_auth = security.get(
        "two_factor_auth",
        False
    )

    settings.activity_logs = security.get(
        "activity_logs",
        False
    )

    # =====================================
    # FINANCE
    # =====================================

    finance = data.get("finance", {})

    settings.commission_rate = finance.get(
        "commission_rate"
    )

    settings.min_order_amount = finance.get(
        "min_order_amount"
    )

    settings.payment_methods = finance.get(
        "payment_methods"
    )

    settings.vat_rate = finance.get(
        "vat_rate"
    )

    # =====================================
    # CONTACT
    # =====================================

    contact = data.get("contact", {})

    settings.main_phone = contact.get(
        "main_phone"
    )

    settings.main_email = contact.get(
        "main_email"
    )

    settings.whatsapp = contact.get(
        "whatsapp"
    )

    settings.facebook = contact.get(
        "facebook"
    )

    settings.twitter = contact.get(
        "twitter"
    )

    settings.instagram = contact.get(
        "instagram"
    )

    settings.address = contact.get(
        "address"
    )

    # =====================================
    # MAINTENANCE
    # =====================================

    maintenance = data.get(
        "maintenance",
        {}
    )

    settings.maintenance_enabled = maintenance.get(
        "enabled",
        False
    )

    settings.maintenance_message = maintenance.get(
        "message"
    )

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "تم تحديث الإعدادات بنجاح"
    })