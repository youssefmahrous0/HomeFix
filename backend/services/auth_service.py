import uuid
import re
import jwt
import os
from datetime import datetime, timedelta
from models.user import User
from extensions import db
from utils.jwt_utils import SECRET_KEY
from utils.email_utils import send_reset_email
from utils.password_utils import hash_password, check_password
from flask_jwt_extended import create_access_token
from google.oauth2 import id_token
from google.auth.transport import requests
from werkzeug.utils import secure_filename


# =========================
# إعدادات الرفع
# =========================
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

ALLOWED_IMAGE_EXTENSIONS = {"jpg", "jpeg", "png"}
ALLOWED_DOC_EXTENSIONS = {"jpg", "jpeg", "png", "pdf"}


def allowed_file(filename, allowed_extensions):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in allowed_extensions


# =========================
# JWT GENERATION (موحد)
# =========================
def generate_token(user_id):
    payload = {
        "user_id": user_id,  # 🔥 مهم جدًا
        "exp": datetime.utcnow() + timedelta(days=7)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")


# =========================
# REGISTER
# =========================
def register_user(data, profile_image):

    full_name = data.get("full_name")
    email = data.get("email")
    phone = data.get("phone")
    password = data.get("password")
    user_type = data.get("user_type")
    birth_date = data.get("birth_date")

    # Validation
    if not all([full_name, email, password, phone, user_type]):
        return {"error": "Missing required fields"}, 400

    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return {"error": "Invalid email format"}, 400

    if phone and not re.match(r"^01[0-9]{9}$", phone):
        return {"error": "Invalid phone number"}, 400


    if not profile_image:
        return {"error": "Profile image is required"}, 400


    if len(password) < 6:
        return {"error": "Password must be at least 6 characters"}, 400

    existing_user = User.query.filter(
        (User.email == email) | (User.phone == phone)
    ).first()

    if existing_user:
        return {"error": "User already exists"}, 400

    hashed_password = hash_password(password)

    # Upload image
    profile_path = None
    if profile_image:
        if not allowed_file(profile_image.filename, ALLOWED_IMAGE_EXTENSIONS):
            return {"error": "Invalid image type"}, 400

        filename = f"{uuid.uuid4().hex}_{secure_filename(profile_image.filename)}"
        path = os.path.join(UPLOAD_FOLDER, filename)
        profile_image.save(path)
        profile_path = path

    # Birth date
    if birth_date:
        try:
            birth_date = datetime.strptime(birth_date.strip(), "%Y-%m-%d")
        except:
            return {"error": "Invalid birth date format"}, 400

    user = User(
        full_name=full_name,
        email=email,
        phone=phone,
        password_hash=hashed_password,
        user_type=user_type,
        birth_date=birth_date,
        profile_image=profile_path
    )

    db.session.add(user)
    db.session.commit()

    return {"message": "User registered successfully"}, 201


# =========================
# LOGIN
# =========================
def login_user(data):

    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    # بيانات غلط
    if not user or not check_password(password, user.password_hash):
        return {
            "error": "كلمة المرور أو البريد الإلكتروني غير صحيحة"
        }, 401

    # الحساب موقوف
    if user.status == "موقوف":
        return {
            "error": "تم تعطيل حسابك، تواصل مع الإدارة"
        }, 403

    token = create_access_token(identity=str(user.id))

    return {
        "token": token,
        "user": {
            "id": user.id,
            "name": user.full_name,
            "email": user.email,
            "user_type": user.user_type
        }
    }, 200


# =========================
# GET PROFILE
# =========================
def get_profile(user_id):
    user = User.query.get(user_id)

    if not user:
        return {"error": "User not found"}, 404

    return {
        "name": user.full_name,
        "email": user.email,
        "phone": user.phone or "",
        "address": user.address or "",
        "birth_date": str(user.birth_date) if user.birth_date else ""
    }, 200


# =========================
# FORGOT PASSWORD
# =========================
def forgot_password(data):
    email = data.get("email")

    if not email:
        return {"error": "Email required"}, 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return {"message": "If email exists, reset sent"}, 200

    token = generate_token(user.id)

    reset_link = f"http://localhost:5173/reset-password/{token}?email={user.email}"

    print("RESET LINK:", reset_link)

    send_reset_email(email, reset_link)

    return {"message": "Reset link sent"}, 200


# =========================
# RESET PASSWORD
# =========================
def reset_password(data):

    token = data.get("token")
    new_password = data.get("new_password")

    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = decoded["user_id"]
    except:
        return {"error": "Invalid or expired token"}, 400

    user = User.query.get(user_id)

    if not user:
        return {"error": "User not found"}, 404

    user.password_hash = hash_password(new_password)
    db.session.commit()

    return {"message": "Password reset successful"}, 200


# =========================
# GOOGLE LOGIN
# =========================
def google_login(data):

    token = data.get("token")

    try:
        idinfo = id_token.verify_oauth2_token(
            token,
            requests.Request(),
            os.getenv("GOOGLE_CLIENT_ID")
        )
    except:
        return {"error": "Invalid Google token"}, 401

    email = idinfo.get("email")
    name = idinfo.get("name")
    picture = idinfo.get("picture")

    user = User.query.filter_by(email=email).first()

    if not user:
        user = User(
            full_name=name,
            email=email,
            user_type="client",
            profile_image=picture
        )
        db.session.add(user)
        db.session.commit()

    token = generate_token(user.id)

    return {"token": token}, 200