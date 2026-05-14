from flask import Blueprint, request, jsonify
from utils.email_utils import send_contact_email
from models.contact import Contact, db

contact_bp = Blueprint("contact", __name__)

#====================
# post /contact
#====================

@contact_bp.route("/contact", methods=["POST"])
def contact():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    subject = data.get("subject")
    message = data.get("message")

    if not all([name, email, phone, subject, message]):
        return jsonify({
            "success": False,
            "error": "All fields are required"
        }), 400

    # ✅ تخزين في DB
    new_message = Contact(
        name=name,
        email=email,
        phone=phone,
        subject=subject,
        message=message
    )

    db.session.add(new_message)
    db.session.commit()

    # ✉️ إرسال الإيميل
    email_content = f"""
📩 رسالة جديدة من صفحة تواصل معنا

👤 الاسم الكامل: {name}
📧 البريد الإلكتروني: {email}
📱 رقم الهاتف: {phone}
📝 الموضوع: {subject}

💬 الرسالة:
{message}
"""

    success = send_contact_email(
        name=name,
        email=email,
        subject="رسالة من موقع HomeFix",
        message=email_content
    )

    if not success:
        return jsonify({
            "success": False,
            "error": "Failed to send email"
        }), 500

    return jsonify({
        "success": True,
        "data": "Message saved + sent ✅"
    }), 200
    
    
    
    
@contact_bp.route("/contact-info", methods=["GET"])
def get_contact_info():
    return jsonify({
        "whatsapp": "+20 XXX XXX XXXX",
        "email": "info@homefix.com",
        "support": "support@homefix.com",
        "phone": "+20 XXX XXX XXXX",
        "address": "القاهرة، مصر",
        "street": "شارع التحرير، وسط البلد"
    })