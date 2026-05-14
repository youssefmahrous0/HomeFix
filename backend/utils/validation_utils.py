import re

def validate_register(data):

    required = ["full_name","phone","email","password","confirm_password","user_type"]

    for field in required:
        if field not in data:
            return f"{field} is required"

    # Email validation
    email_pattern = r"^[\w\.-]+@[\w\.-]+\.\w+$"
    if not re.match(email_pattern, data["email"]):
        return "Invalid email format"

    # Phone validation (Egypt example)
    phone_pattern = r"^01[0-9]{9}$"
    if not re.match(phone_pattern, data["phone"]):
        return "Invalid phone number"

    # Password length
    if len(data["password"]) < 6:
        return "Password must be at least 6 characters"

    if data["password"] != data["confirm_password"]:
        return "Passwords do not match"

    # User type validation
    if data["user_type"] not in ["client"]:
        return "Invalid user type"

    return None