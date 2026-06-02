from extensions import db
from models.category import Category

class Service(db.Model):
    __tablename__ = "services"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float)
    icon = db.Column(db.String(50))
    
    
    # =====================================
    # الإحصائيات
    # =====================================
    providers_count = db.Column( db.Integer, default=0 )
    orders_count = db.Column( db.Integer, default=0)
    
    # 🔥 إضافات
    rating = db.Column(db.Float, default=4.5)
    workers = db.Column(db.Integer, default=20)
    
    # =====================================
    # الحالة
    # =====================================
    status = db.Column(db.String(50),  default="نشط")
    

    # ✅ العلاقات (المهم)
    provider_id = db.Column(db.Integer, db.ForeignKey("providers.id"))

    category_id = db.Column(
        db.Integer,
        db.ForeignKey("categories.id"),
        nullable=False
    )