from flask import Blueprint, request, jsonify
from services.ai_service import process_chat
import asyncio

chat_bp = Blueprint("chat", __name__)

@chat_bp.route("/chat", methods=["POST"])
def chat():

    data = request.json

    result = asyncio.run(
        process_chat(
            message=data.get("message"),
            session_id=data.get("session_id"),
            location=data.get("location")
        )
    )

    return jsonify(result)