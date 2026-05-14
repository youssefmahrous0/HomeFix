from extensions import db
from sqlalchemy import Unicode, UnicodeText

class Notification(db.Model):
    __tablename__ = "notifications"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    # 🔥 عربي مضمون 100%
    title = db.Column(Unicode(255), nullable=False)
    message = db.Column(UnicodeText, nullable=False)
    type = db.Column(db.String(50))
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(
    db.DateTime,
    default=db.func.now(),        # 👈 ده مهم
    server_default=db.func.now(), # 👈 وده كمان
    nullable=False
)