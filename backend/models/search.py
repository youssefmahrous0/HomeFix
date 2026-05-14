from extensions import db


class Service(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.Text)
    icon = db.Column(db.String(100))

class Provider(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    job = db.Column(db.String(100))
    price = db.Column(db.Integer)
    rating = db.Column(db.Float)
    location = db.Column(db.String(100))
    skills = db.Column(db.String)

    service_id = db.Column(db.Integer, db.ForeignKey('service.id'))
    service = db.relationship("Service", backref="providers")