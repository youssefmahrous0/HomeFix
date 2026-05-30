from config import settings
from models.user import User
from flask import Blueprint, request, jsonify
from services.ai_service import process_chat
import asyncio
import jwt

chat_bp = Blueprint("chat", __name__)

SECRET_KEY = settings.JWT_SECRET


@chat_bp.route("/chat", methods=["POST"])
def chat():

    data = request.json
    user = None

    auth_header = request.headers.get("Authorization")

    if auth_header:

        try:
            token = auth_header.replace("Bearer ", "")
            token_data = jwt.decode(
                token,
                settings.JWT_SECRET,
                algorithms=["HS256"]
            )

            user = User.query.get(token_data["id"])

        except Exception as e:
            print("JWT Error:", e)

    result = asyncio.run(
        process_chat(
            message=data.get("message"),
            location=data.get("location"),
            user=user
        )
    )

    return jsonify(result)