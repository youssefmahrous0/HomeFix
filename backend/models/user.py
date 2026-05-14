from extensions import db

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.NVARCHAR(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.VARCHAR(50), unique=True, nullable=True)
    password_hash = db.Column(db.String(255))
    user_type = db.Column(db.String(20), nullable=False)  # client / provider / admin
    profile_image = db.Column(db.String(255))
    birth_date = db.Column(db.Date)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    auth_provider = db.Column(db.String(50), nullable=True)
    address = db.Column(db.NVARCHAR(255), nullable=True)
    status = db.Column(db.NVARCHAR(20),default="نشط")
    
    # 🔔 الإشعارات
    email_notifications = db.Column(db.Boolean, default=True)
    sms_notifications = db.Column(db.Boolean, default=False)
    instant_notifications = db.Column(db.Boolean, default=True)
    offers_notifications = db.Column(db.Boolean, default=False)

    # 🔗 علاقة الطلبات
    orders = db.relationship("Order", back_populates="user")
    cards = db.relationship("Card", backref="user", lazy=True, cascade="all, delete")
    bookings = db.relationship( "Booking", back_populates="user", lazy=True)
