import os
import uuid
from datetime import datetime
from functools import wraps
from dotenv import load_dotenv
from flask import Flask, request, jsonify, send_from_directory, abort
from passlib.hash import bcrypt
import jwt

from models import db, User, Booking, SERVICES
from firebase_client import FirebaseClient, FIREBASE_AVAILABLE

load_dotenv()

# Configuration
JWT_SECRET = os.environ.get('JWT_SECRET', 'dev-secret-change-me')
USE_FIREBASE = os.environ.get('USE_FIREBASE', 'false').lower() in ('1', 'true', 'yes')
FIREBASE_CRED = os.environ.get('FIREBASE_CREDENTIALS')

app = Flask(__name__, static_folder='..', static_url_path='/')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///../solzer.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize DB
db.init_app(app)

# Initialize Firebase if requested
firebase_client = None
if USE_FIREBASE:
    if not FIREBASE_AVAILABLE:
        print('WARNING: USE_FIREBASE set but firebase_admin not installed')
    else:
        if FIREBASE_CRED:
            firebase_client = FirebaseClient(FIREBASE_CRED)
        else:
            firebase_client = FirebaseClient()

# Utility
def generate_token(email):
    payload = {'sub': email, 'iat': datetime.utcnow().timestamp()}
    token = jwt.encode(payload, JWT_SECRET, algorithm='HS256')
    return token

def verify_token(token):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        return payload.get('sub')
    except Exception:
        return None

def auth_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.headers.get('Authorization', '')
        if not auth.startswith('Bearer '):
            return jsonify({'error': 'Authorization required'}), 401
        token = auth.split(' ', 1)[1]
        email = verify_token(token)
        if not email:
            return jsonify({'error': 'Invalid token'}), 401
        request.user_email = email
        return f(*args, **kwargs)
    return decorated

# Routes
@app.route('/api/services', methods=['GET'])
def get_services():
    if USE_FIREBASE and firebase_client:
        try:
            services = firebase_client.get_services()
            if services:
                return jsonify({'services': services})
        except Exception:
            pass
    return jsonify({'services': SERVICES})

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json or {}
    name = data.get('name')
    email = (data.get('email') or '').lower().strip()
    password = data.get('password')
    if not name or not email or not password:
        return jsonify({'error': 'Missing fields'}), 400

    # Check firebase
    if USE_FIREBASE and firebase_client:
        existing = firebase_client.get_user(email)
        if existing:
            return jsonify({'error': 'Email already exists'}), 400
        user_obj = {'name': name, 'email': email, 'password_hash': bcrypt.hash(password), 'createdAt': datetime.utcnow().isoformat()}
        firebase_client.create_user(user_obj)
        token = generate_token(email)
        return jsonify({'token': token, 'user': {'name': name, 'email': email}}), 201

    # Use local DB
    with app.app_context():
        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'Email already exists'}), 400
        u = User(name=name, email=email, password_hash=bcrypt.hash(password))
        db.session.add(u)
        db.session.commit()
        token = generate_token(email)
        return jsonify({'token': token, 'user': u.to_dict()}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json or {}
    email = (data.get('email') or '').lower().strip()
    password = data.get('password')
    if not email or not password:
        return jsonify({'error': 'Missing fields'}), 400

    if USE_FIREBASE and firebase_client:
        user = firebase_client.get_user(email)
        if not user:
            return jsonify({'error': 'Invalid credentials'}), 401
        if not bcrypt.verify(password, user.get('password_hash')):
            return jsonify({'error': 'Invalid credentials'}), 401
        token = generate_token(email)
        return jsonify({'token': token, 'user': user}), 200

    with app.app_context():
        user = User.query.filter_by(email=email).first()
        if not user or not bcrypt.verify(password, user.password_hash):
            return jsonify({'error': 'Invalid credentials'}), 401
        token = generate_token(email)
        return jsonify({'token': token, 'user': user.to_dict()}), 200

@app.route('/api/users/me', methods=['GET'])
@auth_required
def me():
    email = request.user_email
    if USE_FIREBASE and firebase_client:
        user = firebase_client.get_user(email)
        if not user:
            return jsonify({'error': 'Not found'}), 404
        return jsonify({'user': user})
    with app.app_context():
        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({'error': 'Not found'}), 404
        return jsonify({'user': user.to_dict()})

@app.route('/api/bookings', methods=['GET', 'POST'])
@auth_required
def bookings():
    email = request.user_email
    if request.method == 'GET':
        if USE_FIREBASE and firebase_client:
            try:
                items = firebase_client.get_bookings_by_user(email)
                return jsonify({'bookings': items})
            except Exception:
                pass
        with app.app_context():
            items = Booking.query.filter_by(user_email=email).order_by(Booking.date_time.desc()).all()
            return jsonify({'bookings': [b.to_dict() for b in items]})

    # POST - create booking
    data = request.json or {}
    service_name = data.get('serviceName')
    date = data.get('date')
    time = data.get('time')
    address = data.get('address')
    phone = data.get('phone')
    notes = data.get('notes')
    if not service_name or not date:
        return jsonify({'error': 'Missing fields'}), 400
    try:
        date_time = datetime.fromisoformat(date)
    except Exception:
        # try basic parse (date only)
        date_time = datetime.strptime(date, '%Y-%m-%d')

    booking_id = f"BOOK-{uuid.uuid4().hex[:10].upper()}"
    booking_obj = {
        'bookingId': booking_id,
        'userEmail': email,
        'serviceName': service_name,
        'dateTime': date_time.isoformat(),
        'time': time,
        'address': address,
        'phone': phone,
        'notes': notes,
        'createdAt': datetime.utcnow().isoformat()
    }

    if USE_FIREBASE and firebase_client:
        firebase_client.create_booking(booking_obj)
        return jsonify({'booking': booking_obj}), 201

    with app.app_context():
        b = Booking(booking_id=booking_id, user_email=email, service_name=service_name,
                    date_time=date_time, time=time, address=address, phone=phone, notes=notes)
        db.session.add(b)
        db.session.commit()
        return jsonify({'booking': b.to_dict()}), 201

@app.route('/api/bookings/<booking_id>', methods=['DELETE'])
@auth_required
def delete_booking(booking_id):
    email = request.user_email
    if USE_FIREBASE and firebase_client:
        firebase_client.delete_booking(booking_id)
        return jsonify({'deleted': True}), 200
    with app.app_context():
        b = Booking.query.filter_by(booking_id=booking_id, user_email=email).first()
        if not b:
            return jsonify({'error': 'Not found'}), 404
        db.session.delete(b)
        db.session.commit()
        return jsonify({'deleted': True}), 200

# Serve static files (existing frontend files) from project root
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def static_proxy(path):
    root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    if path == '':
        path = 'index.html'
    full = os.path.join(root, path)
    if os.path.exists(full) and os.path.isfile(full):
        return send_from_directory(root, path)
    # fallback
    return send_from_directory(root, 'index.html')

if __name__ == '__main__':
    # Create DB if needed
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=True)
