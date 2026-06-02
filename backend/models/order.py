from extensions import db
from datetime import datetime

class Order(db.Model):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    service_name = db.Column(db.String(255), nullable=False)
    provider_name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    status = db.Column(db.String(50), default="pending")
    date = db.Column(db.Date, default=datetime.utcnow)
    city = db.Column(db.String(100))
    area = db.Column(db.String(100))
    rating = db.Column(db.Integer, default=0)
    

    # 🔥 علاقة مع user (اختياري بس مهم)
    user = db.relationship("User", back_populates="orders")
    # علاقة مع ال booking
    booking_id = db.Column(db.Integer, db.ForeignKey("booking.id"))
    booking = db.relationship("Booking", back_populates="orders")
    
    service_id = db.Column( db.Integer, db.ForeignKey("services.id"))
    service = db.relationship("Service",  backref="orders")

    