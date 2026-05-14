# models/address.py

from extensions import db

class Address(db.Model):
    __tablename__ = "addresses"

    id = db.Column(db.Integer, primary_key=True)

    full_name = db.Column(db.NVARCHAR(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)

    governorate = db.Column(db.NVARCHAR(100))
    area = db.Column(db.NVARCHAR(100))
    street = db.Column(db.NVARCHAR(200))

    building_number = db.Column(db.String(20))
    floor = db.Column(db.NVARCHAR(20))
    apartment_number = db.Column(db.String(20))

    address_type = db.Column(db.String(20), default="home")
    is_default = db.Column(db.Boolean, default=False)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    def to_dict(self):
        return {
            "id": self.id,
            "full_name": self.full_name,
            "phone": self.phone,
            "governorate": self.governorate,
            "area": self.area,
            "street": self.street,
            "building_number": self.building_number,
            "floor": self.floor,
            "apartment_number": self.apartment_number,
            "address_type": self.address_type,
            "is_default": self.is_default
        }