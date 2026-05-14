from extensions import db

class Booking(db.Model):
    __tablename__ = "booking"  # مهم عشان يربط بالجدول

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    provider_id = db.Column(db.Integer, db.ForeignKey("providers.id"))
    service = db.Column(db.NVARCHAR(100), nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.NVARCHAR(50), nullable=False)
    address = db.Column(db.NVARCHAR(255), nullable=False)
    city = db.Column(db.NVARCHAR(100), nullable=False)
    area = db.Column(db.NVARCHAR(100), nullable=False)
    phone = db.Column(db.NVARCHAR(20), nullable=False)
    notes = db.Column(db.NVARCHAR(None))  # = NVARCHAR(MAX)
    payment_method = db.Column(db.NVARCHAR(50), nullable=False)
    booking_code = db.Column(db.NVARCHAR(100), unique=True, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
     
     # ✅ دول الجداد
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)
    
    # 🔥 أضف دول
    status = db.Column(db.String(50), default="pending")
    status_times = db.Column(db.JSON, default={})
    
    orders = db.relationship("Order", back_populates="booking")
    user = db.relationship("User", back_populates="bookings")
    provider = db.relationship("Provider",back_populates="bookings")
    
   
    def __repr__(self):
        return f"<Booking {self.id}>"