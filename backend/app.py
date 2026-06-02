import os
from dotenv import load_dotenv
load_dotenv()
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
from flask_jwt_extended import JWTManager
from flask import Flask
import sys
sys.stdout.reconfigure(encoding='utf-8')
from flask_socketio import join_room
import threading
from extensions import socketio
import time
from extensions import db
from routes.auth_routes import auth_bp
from routes.service_routes import service_bp
from routes.provider_routes import provider_bp
from routes.contact_routes import contact_bp
from routes.profile import profile_bp
from routes.orders import orders_bp
from routes.settings import settings_bp
from routes.cards import cards_bp
from routes.address_Account import address_bp
from routes.booking import booking_bp
from routes.search_routes import search_bp
from routes.favorite import favorite_bp
from routes.notification_routes import notification_bp
from routes.admin.admin_routes import admin_bp
from routes.admin.admin_users import admin_users
from routes.admin.admin_providers import admin_providers_bp
from routes.admin.admin_services import admin_services_bp
from routes.admin.admin_orders import admin_orders_bp
from routes.admin.admin_reviews import admin_reviews_bp
from routes.admin.admin_complaints import admin_complaints_bp
from routes.admin.admin_ads import admin_ads 
from routes.admin.admin_settings import admin_settings_bp
from routes.chat_routes import chat_bp
from utils.logger import logger
from flask_cors import CORS
from flask_dance.contrib.google import make_google_blueprint
from werkzeug.exceptions import HTTPException
from flask_dance.contrib.facebook import make_facebook_blueprint


google_bp = make_google_blueprint(
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    scope=[
        "openid",
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
    ],
    redirect_to="auth.google_callback"
)

facebook_bp = make_facebook_blueprint(
    client_id=os.getenv("FACEBOOK_CLIENT_ID"),
    client_secret=os.getenv("FACEBOOK_CLIENT_SECRET"),
    scope=["email"],
    redirect_to="auth.facebook_after_login"
)


app = Flask(__name__)
app.config["SECRET_KEY"] = "super-secret-key"  # 🔥 ده الحل

# ======================
# Config (الأول)
# ======================
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# 🔐 JWT Config
app.config["JWT_SECRET_KEY"] = "super-secret-key"
app.config["JWT_TOKEN_LOCATION"] = ["headers"]
app.config["JWT_HEADER_NAME"] = "Authorization"
app.config["JWT_HEADER_TYPE"] = "Bearer"

# ======================
# Extensions (بعد config)
# ======================
db.init_app(app)
socketio.init_app(app)


from flask_cors import CORS
CORS(app)

from flask_jwt_extended import JWTManager
jwt = JWTManager(app)

# ======================
# Routes
# ======================
app.register_blueprint(auth_bp)
app.register_blueprint(service_bp)
app.register_blueprint(provider_bp)
app.register_blueprint(contact_bp)
app.register_blueprint(google_bp, url_prefix="/login")
app.register_blueprint(facebook_bp, url_prefix="/login")
app.register_blueprint(profile_bp)
app.register_blueprint(orders_bp)
app.register_blueprint(settings_bp)
app.register_blueprint(cards_bp)
app.register_blueprint(address_bp)
app.register_blueprint(booking_bp)
app.register_blueprint(search_bp)
app.register_blueprint(favorite_bp)
app.register_blueprint(notification_bp)
app.register_blueprint(admin_bp)
app.register_blueprint(admin_users)
app.register_blueprint(admin_providers_bp)
app.register_blueprint(admin_services_bp)
app.register_blueprint(admin_orders_bp)
app.register_blueprint(admin_reviews_bp)
app.register_blueprint(admin_complaints_bp)
app.register_blueprint(admin_ads)
app.register_blueprint(admin_settings_bp)
app.register_blueprint(chat_bp, url_prefix="/api")


# ======================
# Error Handler
# ======================
@app.errorhandler(Exception)
def handle_error(error):
    if isinstance(error, HTTPException):
        return {"error": error.description}, error.code

    return {"error": str(error)}, 500


#location
@socketio.on("send_location")
def handle_location(data):
    booking_id = data.get("booking_id")

    socketio.emit(
        "receive_location",
        data,
        room=str(booking_id)   # 🔥 مهم
    )
    
@socketio.on("join")
def handle_join(data):
    user_id = data.get("user_id")
    if user_id:
        join_room(str(user_id))
        print(f"User {user_id} joined room")


@socketio.on("join_booking")
def handle_join_booking(data):
    booking_id = data.get("booking_id")
    if booking_id:
        join_room(str(booking_id))
        print(f"Joined booking room {booking_id}")

# ======================
# Run
# ======================
if __name__ == "__main__":
    with app.app_context():
        db.create_all()   # ينشئ الداتابيز تلقائي
       
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True)
    
