from extensions import db

class Card(db.Model):
    __tablename__ = "cards"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    stripe_pm_id = db.Column(db.String(255))  # مهم لو Stripe
    last4 = db.Column(db.String(4), nullable=False)
    expiry = db.Column(db.String(5), nullable=False)  # MM/YY
    type = db.Column(db.String(20), nullable=False)   # visa / mastercard
    is_default = db.Column(db.Boolean, default=False)  # 🔥 إضافة مفيدة
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "last4": self.last4,
            "expiry": self.expiry,
            "type": self.type,
            "is_default": self.is_default
        }