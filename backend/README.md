Flask backend for Solzer Service Station
======================================

This backend provides REST endpoints for authentication, services, and bookings.
It supports both a local SQLite database (default) and optional Firebase Firestore.

Requirements
------------
- Python 3.10+
- pip

Install dependencies:

```bash
python -m pip install -r backend/requirements.txt
```

Environment variables
---------------------
Create a `.env` file in the `backend/` folder or set environment variables:

- `JWT_SECRET` - secret for JWT tokens (default: dev-secret-change-me)
- `DATABASE_URL` - SQLAlchemy DB URI (default: sqlite:///../solzer.db)
- `USE_FIREBASE` - set to `true` to enable Firebase (optional)
- `FIREBASE_CREDENTIALS` - path to Firebase service account JSON (optional)
- `PORT` - port to run Flask app (default 5000)

Firebase setup (optional)
-------------------------
1. Create Firebase project and service account key (JSON) from Firebase Console.
2. Place the JSON file somewhere accessible and set `FIREBASE_CREDENTIALS` to its path.
3. Set `USE_FIREBASE=true`.

Run the server
--------------

```bash
# from project root
cd backend
python app.py
```

Endpoints
---------
- `GET /api/services` - list services
- `POST /api/signup` - JSON {name, email, password} -> create user, return token
- `POST /api/login` - JSON {email, password} -> returns token
- `GET /api/users/me` - requires `Authorization: Bearer <token>`
- `GET /api/bookings` - requires auth, returns bookings for current user
- `POST /api/bookings` - requires auth, JSON {serviceName, date, time, address, phone, notes}
- `DELETE /api/bookings/<bookingId>` - requires auth, deletes booking

Notes
-----
- Frontend currently uses LocalStorage. To integrate front-end with backend, update JS to call the API endpoints and store tokens (preferably in HttpOnly cookies or in-memory storage) instead of LocalStorage.
- The `app.py` serves the existing static frontend files from the project root for convenience.

Security
--------
- Passwords are hashed with bcrypt (via passlib).
- JWT tokens are signed with `JWT_SECRET`.
- For production, configure `JWT_SECRET` and use HTTPS.

Support
-------
If you want, I can:
- Update front-end scripts to call the backend endpoints (signup/login/bookings)
- Add session cookie support instead of JWT
- Add CORS configuration and production tips
