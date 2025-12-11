# Solzer Service Station - Project Setup Guide

## 📁 Project Structure

```
Solzer-service-station/
├── index.html              # Main homepage
├── services.html           # Services listing page
├── auth.html               # Sign in/Sign up page
├── dashboard.html          # Dashboard page (optional)
├── style.css               # Homepage styles
├── services-style.css      # Services page styles
├── auth-style.css          # Authentication page styles
├── script.js               # Homepage JavaScript
├── services-script.js      # Services page JavaScript
├── auth-script.js          # Authentication JavaScript
└── .git/                   # Git repository
```

## 🚀 How to Open the Project

### Method 1: Open in Browser (Recommended)
1. Navigate to the project folder: `c:\Users\anike\OneDrive\Desktop\Solzer service station`
2. **Double-click on `index.html`** to open the homepage in your default browser

### Method 2: Using VS Code
1. Open VS Code
2. Go to File → Open Folder
3. Select: `c:\Users\anike\OneDrive\Desktop\Solzer service station`
4. Right-click on `index.html` → "Open with Live Server" (if Live Server extension is installed)

### Method 3: Using a Simple HTTP Server
```powershell
cd "c:\Users\anike\OneDrive\Desktop\Solzer service station"
python -m http.server 8000
```
Then open: `http://localhost:8000`

## 📄 Page Navigation

### Homepage (index.html)
- **Features Section** - Why choose us
- **Services Preview** - Quick overview of services
- **Statistics** - Company metrics
- **Contact Info** - Phone, email, address
- **Call to Action** - Book service or sign up

**Navigation Links:**
- Home → `index.html`
- Services → `services.html`
- Account → `auth.html`
- Contact → Scrolls to contact section

### Services Page (services.html)
- **13+ Service Categories**:
  - House Cleaning
  - Electrical Service
  - Mechanical Service
  - Emergency Service
  - Property Dealing
  - Transportation
  - Cloth Laundry
  - Salon Service
  - Carpenter Service
  - Freelancer Service
  - Fresh Food Delivery
  - Library Service
  - Other Services

**Each Service Card Has 3 Buttons:**
1. **📅 Book Now** - Opens booking form modal
2. **ℹ️ Details** - Shows service information
3. **📞 Call** - Calls provider or copies phone number

### Authentication Page (auth.html)
- **Sign In Form** - Email and password login
- **Sign Up Form** - Create new account with validation
- **Toggle** - Switch between sign in and sign up
- **Form Validation** - Email, password strength, confirmation

## ✨ Features

### ✅ Working Features
- ✔️ Full page navigation between all pages
- ✔️ Responsive design (mobile, tablet, desktop)
- ✔️ Smooth scrolling animations
- ✔️ Interactive buttons with hover effects
- ✔️ Form validation (Sign In/Sign Up)
- ✔️ Service booking with modal
- ✔️ Call functionality (mobile-friendly)
- ✔️ Alert notifications
- ✔️ LocalStorage for bookings
- ✔️ Professional gradient theme

### 🎨 Design Features
- Modern purple/blue gradient colors
- Glassmorphism effects on cards
- Smooth transitions and animations
- Professional typography
- Mobile-first responsive design
- Accessibility-friendly

## 🔧 How to Use Each Page

### 1. Homepage (index.html)
```
Purpose: Welcome users and showcase services
Actions:
  - Click "Explore Services" → Go to services.html
  - Click "Sign In / Sign Up" → Go to auth.html
  - View features and statistics
  - Check contact information
```

### 2. Services (services.html)
```
Purpose: Browse and book services
Actions:
  - Click "Book Now" → Opens booking form
  - Click "Details" → Shows service info
  - Click "Call" → Call provider or copy number
  - Fill booking form with:
    * Full Name
    * Email
    * Phone
    * Preferred Date & Time
    * Service Address
    * Additional Notes
  - Get booking confirmation
```

### 3. Authentication (auth.html)
```
Purpose: User account management
Actions:
  - Sign In:
    * Enter email and password
    * Click "Sign In"
    * Get confirmation
  
  - Sign Up:
    * Enter full name
    * Enter email
    * Enter password
    * Confirm password
    * Agree to terms
    * Click "Sign Up"
    * Get account confirmation
```

## 🐛 Fixed Bugs

### Issues Resolved:
1. ✅ Missing `index.html` - Created main landing page
2. ✅ Broken navigation links - Fixed all page links
3. ✅ Missing navbar on auth page - Added navigation bar
4. ✅ CSS inconsistencies - Unified styling across pages
5. ✅ Form validation issues - Implemented proper validation
6. ✅ Mobile responsiveness - Fixed responsive design
7. ✅ Button functionality - All buttons now working
8. ✅ Modal display issues - Fixed positioning and visibility

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: 480px to 767px
- **Small Mobile**: Below 480px

## 💾 Data Storage

### LocalStorage Keys:
- `users` - Stored user accounts (Sign Up)
- `bookings` - Stored service bookings

Data is stored locally in the browser and persists after refresh.

## 🌐 Browser Compatibility

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 📝 File Descriptions

| File | Purpose |
|------|---------|
| `index.html` | Homepage landing page |
| `services.html` | Service browsing and booking |
| `auth.html` | User authentication (sign in/up) |
| `dashboard.html` | User dashboard (future use) |
| `style.css` | Homepage styles |
| `services-style.css` | Services page styles |
| `auth-style.css` | Authentication page styles |
| `script.js` | Homepage JavaScript |
| `services-script.js` | Services page JavaScript |
| `auth-script.js` | Authentication JavaScript |

## 🚨 Important Notes

1. **Local Storage** - Demo data is stored in browser only
2. **No Backend** - This is a frontend-only prototype
3. **Phone Number** - Uses demo number: +91-9876543210
4. **Responsive** - Works perfectly on all devices
5. **Icons** - Uses Font Awesome icons (CDN loaded)

## 🔄 How to Extend

### Add More Services:
1. Go to `services.html`
2. Copy a service card
3. Update service name and icon
4. Add details in `services-script.js`

### Add Backend:
1. Connect form submissions to API
2. Replace LocalStorage with database
3. Add real authentication
4. Implement payment gateway

### Customize Colors:
1. Edit gradient colors in CSS files
2. Primary color: `#667eea` (purple)
3. Secondary color: `#764ba2` (dark purple)

## ✉️ Contact Information

- **Phone**: +91-9876543210
- **Email**: support@solzer.com
- **Address**: 123 Service Lane, City, State 12345

---

**All pages are now fully functional and properly linked. Open `index.html` to start!**
