from functools import wraps
from flask import request, jsonify
import jwt
from utils.jwt_utils import SECRET_KEY
from models.user import User


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):

        # =========================
        # 1. قراءة Authorization Header
        # =========================
        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return jsonify({"error": "Token missing"}), 401

        parts = auth_header.split(" ")

        if len(parts) != 2 or parts[0] != "Bearer":
            return jsonify({"error": "Invalid Authorization header"}), 401

        token = parts[1]

        # =========================
        # 2. فك التوكن
        # =========================
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])

            # مهم: تأكد إن التوكن فيه user_id
            user_id = data.get("user_id")

            if not user_id:
                return jsonify({"error": "Invalid token payload"}), 401

            # =========================
            # 3. جلب المستخدم
            # =========================
            user = User.query.get(user_id)

            if not user:
                return jsonify({"error": "User not found"}), 404

        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired"}), 401

        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401

        except Exception as e:
            print("AUTH ERROR:", str(e))
            return jsonify({"error": "Internal server error"}), 500

        # =========================
        # 4. تمرير المستخدم للـ route
        # =========================
        return f(user, *args, **kwargs)

    return decorated