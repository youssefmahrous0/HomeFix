from flask import Blueprint, request, redirect, url_for, session
from services.auth_service import (
    forgot_password,
    register_user,
    login_user,
    reset_password,
    get_profile
)
from middleware.auth_middleware import token_required
from extensions import limiter
from flask_dance.contrib.google import google
from models.user import User
from extensions import db
import jwt
from datetime import datetime, timedelta, timezone
from flask_dance.contrib.facebook import facebook



auth_bp = Blueprint("auth", __name__)

# ================= REGISTER =================
@auth_bp.route("/api/auth/register", methods=["POST"])
def register():

    data = request.form.to_dict()

    mapped_data = {
        "full_name": data.get("name"),
        "phone": data.get("phone"),
        "email": data.get("email"),
        "password": data.get("password"),
        "user_type": "client",
        "birth_date": data.get("birthDate")
    }

    profile_image = request.files.get("image")

    return register_user(mapped_data, profile_image)


# ================= LOGIN =================
@auth_bp.route("/login", methods=["POST"])
@auth_bp.route("/api/auth/login", methods=["POST"])
@limiter.limit("5 per minute")
def login():

    data = request.json if request.is_json else request.form.to_dict()

    return login_user(data)


# ================= FORGOT PASSWORD =================
@auth_bp.route("/api/auth/forgot-password", methods=["POST"])
def forgot_password_route():

    data = request.json if request.is_json else request.form.to_dict()

    return forgot_password(data)


# ================= RESET PASSWORD =================
@auth_bp.route("/api/auth/reset-password", methods=["POST"])
def reset_password_route():

    data = request.json if request.is_json else request.form.to_dict()

    mapped = {
    "token": data.get("token"),
    "new_password": data.get("password"),
    "confirm_password": data.get("password")
}

    return reset_password(mapped)


# ================= GET PROFILE =================
@auth_bp.route("/api/auth/profile", methods=["GET"])
@token_required
def profile(current_user):
    return get_profile(current_user)




#====================== Google Login  ======================


SECRET_KEY = "secret"

def generate_token(user):
    payload = {
        "id": user.id,
        "email": user.email,
        "exp": datetime.utcnow() + timedelta(days=7)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")




@auth_bp.route("/auth/google")
def google_login():
    session.clear()
    return redirect(url_for("google.login", prompt="select_account"))


@auth_bp.route("/google/callback")
def google_callback():

    if not google.authorized:
        return redirect("https://home-fix-zeta.vercel.app")

    resp = google.get("/oauth2/v2/userinfo")

    if not resp.ok:
        return redirect("https://home-fix-zeta.vercel.app")

    info = resp.json()

    email = info["email"]
    name = info["name"]
    picture = info["picture"]

    
    user = User.query.filter_by(email=email).first()

    
    if user:
        jwt_token = generate_token(user)
        return redirect(
            f"https://home-fix-zeta.vercel.app/social-success?token={jwt_token}"
        )

    
    user = User(
    full_name=name,
    email=email,
    profile_image=picture,
    user_type="client",
    auth_provider="google",
    phone=f"google_{info['id']}"
)

    db.session.add(user)
    db.session.commit()

    jwt_token = generate_token(user)

    return redirect(
        f"https://home-fix-zeta.vercel.app/social-success?token={jwt_token}"
    )
    
    
    
#====================== Facebook Login  ======================
@auth_bp.route("/auth/facebook")
def facebook_login():
    session.clear()
    return redirect("/login/facebook")


@auth_bp.route("/facebook/after-login")
def facebook_after_login():

    resp = facebook.get("/me?fields=id,name,email,picture")

    if not resp.ok:
        return redirect("https://home-fix-zeta.vercel.app")

    info = resp.json()

    email = info.get("email")
    name = info.get("name")
    picture = info["picture"]["data"]["url"]

    if not email:
        email = f'{info["id"]}@facebook.com'

    user = User.query.filter_by(email=email).first()

    if not user:
        user = User(
    full_name=name,
    email=email,
    profile_image=picture,
    user_type="client",
    auth_provider="facebook",
    phone=f"facebook_{info['id']}"
)
        db.session.add(user)
        db.session.commit()

    token = generate_token(user)

    return redirect(
        f"https://home-fix-zeta.vercel.app/social-success?token={token}"
    )