import os
try:
    import firebase_admin
    from firebase_admin import credentials, firestore
    FIREBASE_AVAILABLE = True
except Exception:
    FIREBASE_AVAILABLE = False

class FirebaseClient:
    def __init__(self, cred_path=None):
        self.app = None
        self.db = None
        if cred_path and FIREBASE_AVAILABLE:
            self.init(cred_path)

    def init(self, cred_path):
        if not FIREBASE_AVAILABLE:
            raise RuntimeError('firebase_admin package not available. Install firebase-admin to use Firebase.')
        cred = credentials.Certificate(cred_path)
        self.app = firebase_admin.initialize_app(cred)
        self.db = firestore.client()

    def create_user(self, user_obj):
        if not self.db:
            raise RuntimeError('Firebase not initialized')
        ref = self.db.collection('users').document(user_obj['email'])
        ref.set(user_obj)
        return True

    def get_user(self, email):
        if not self.db:
            return None
        doc = self.db.collection('users').document(email).get()
        if doc.exists:
            return doc.to_dict()
        return None

    def create_booking(self, booking_obj):
        if not self.db:
            raise RuntimeError('Firebase not initialized')
        ref = self.db.collection('bookings').document(booking_obj['bookingId'])
        ref.set(booking_obj)
        return True

    def get_bookings_by_user(self, email):
        if not self.db:
            return []
        q = self.db.collection('bookings').where('userEmail', '==', email).stream()
        return [doc.to_dict() for doc in q]

    def delete_booking(self, booking_id):
        if not self.db:
            return False
        doc_ref = self.db.collection('bookings').document(booking_id)
        doc_ref.delete()
        return True

    def get_services(self):
        if not self.db:
            return []
        q = self.db.collection('services').stream()
        return [doc.to_dict() for doc in q]
