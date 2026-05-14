from extensions import db

class Provider(db.Model):
    __tablename__ = "providers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    job = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(50))
    rating = db.Column(db.Float, default=4.5)
    reviews = db.Column(db.Integer, default=0)
    experience = db.Column(db.Integer)  # عدد سنوات الخبرة
    orders = db.Column(db.Integer, default=0)
    price = db.Column(db.Float)
    image = db.Column(db.String(10))  # أول حرف أو صورة لاحقًا
    skills = db.Column(db.Text)
    time = db.Column(db.String(50))
    bio = db.Column(db.Text)
    availability = db.Column(db.NVARCHAR(100))
    response_time = db.Column(db.NVARCHAR(100))
    
    
    email = db.Column(db.String(120))
    phone = db.Column(db.String(20))
    is_verified = db.Column(db.Boolean,default=False)
    status = db.Column(db.NVARCHAR(20),default="نشط")
    
    
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)
    

# علاقة بين مزود الخدمة والخدمات التي يقدمها
    services = db.relationship("Service", backref="provider", lazy=True)
    bookings = db.relationship("Booking", back_populates="provider", lazy=True)
    