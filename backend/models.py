from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(180), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'createdAt': self.created_at.isoformat()
        }

class Booking(db.Model):
    __tablename__ = 'bookings'
    id = db.Column(db.Integer, primary_key=True)
    booking_id = db.Column(db.String(64), unique=True, nullable=False)
    user_email = db.Column(db.String(180), nullable=False)
    service_name = db.Column(db.String(200), nullable=False)
    date_time = db.Column(db.DateTime, nullable=False)
    time = db.Column(db.String(50), nullable=True)
    address = db.Column(db.String(512), nullable=True)
    phone = db.Column(db.String(50), nullable=True)
    notes = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'bookingId': self.booking_id,
            'userEmail': self.user_email,
            'serviceName': self.service_name,
            'dateTime': self.date_time.isoformat(),
            'time': self.time,
            'address': self.address,
            'phone': self.phone,
            'notes': self.notes,
            'createdAt': self.created_at.isoformat()
        }

# Simple in-memory services list - can be replaced with DB or Firebase
SERVICES = [
    {'id': 1, 'name': 'House Cleaning', 'description': 'Deep cleaning, kitchen, bathroom, and sofa cleaning.'},
    {'id': 2, 'name': 'Appliance Repair', 'description': 'AC, Washing Machine, Fridge, and Geyser repair.'},
    {'id': 3, 'name': 'Salon at Home', 'description': 'Facials, Haircuts, Waxing, Manicure/Pedicure services.'},
    {'id': 4, 'name': 'Handyman & Repair', 'description': 'Plumbing, electrical fixes, and carpentry work.'},
    {'id': 5, 'name': 'Mechanical Services', 'description': 'Vehicle repair and mechanical maintenance.'},
    {'id': 6, 'name': 'Emergency Services', 'description': '24/7 emergency response and priority handling.'},
    {'id': 7, 'name': 'Property Dealing', 'description': 'Buy, sell, and rent properties with expert agents.'},
    {'id': 8, 'name': 'Transportation', 'description': 'Household moving, parcel delivery, insured services.'},
    {'id': 9, 'name': 'Laundry Services', 'description': 'Clothes, dry cleaning, ironing, pickup/delivery.'},
    {'id': 10, 'name': 'Carpenter Services', 'description': 'Furniture making, repairs, and installation.'},
    {'id': 11, 'name': 'Freelancer Services', 'description': 'Virtual assistance, writing, and design.'},
    {'id': 12, 'name': 'Fresh Food Delivery', 'description': 'Daily fresh produce and meal delivery.'},
    {'id': 13, 'name': 'Library Services', 'description': 'Book lending, consulting and reading programs.'},
    {'id': 14, 'name': 'Other Services', 'description': 'Custom service requests and solutions.'}
]
