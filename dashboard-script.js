// ====================================
// DASHBOARD SCRIPT.JS
// User Dashboard Interactivity & Data Management
// ====================================

// ====================================
// INITIALIZATION
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard script loaded');
    
    // Initialize page
    setActiveNavLink();
    loadUserProfile();
    displayBookingHistory();
    addEventListeners();
    
    // Smooth transitions
    addSmoothTransitions();
});

// ====================================
// NAVIGATION MANAGEMENT
// ====================================

function setActiveNavLink() {
    // Get current page
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    
    // Get all nav links
    const navLinks = document.querySelectorAll('a[href*=".html"]');
    
    navLinks.forEach(link => {
        // Remove active class
        link.classList.remove('text-primary-blue', 'font-bold');
        link.classList.add('text-gray-500');
        
        // Add active class to current page
        if (link.getAttribute('href').includes(currentPage) || 
            (currentPage === 'dashboard.html' && link.getAttribute('href').includes('dashboard.html'))) {
            link.classList.remove('text-gray-500');
            link.classList.add('text-primary-blue', 'font-bold');
        }
    });
}

function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.toggle('-translate-x-full');
    }
}

// ====================================
// USER PROFILE MANAGEMENT
// ====================================

function loadUserProfile() {
    const userProfile = document.getElementById('user-profile');
    const userGreeting = document.getElementById('user-greeting');
    
    if (!userProfile) return;
    
    // Get logged-in user from localStorage
    const loggedInUser = getLoggedInUser();
    
    if (loggedInUser) {
        // User is logged in
        userProfile.innerHTML = `
            <div class="bg-gradient-to-r from-primary-blue to-primary-light p-8 rounded-2xl text-white shadow-xl">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm opacity-90">Welcome back</p>
                        <h2 class="text-4xl font-bold mt-2">${loggedInUser.name}</h2>
                        <p class="text-sm opacity-75 mt-2">${loggedInUser.email}</p>
                        <p class="text-sm opacity-75">Member since: ${new Date(loggedInUser.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div class="text-right">
                        <button onclick="viewUserProfile()" class="bg-white text-primary-blue px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 mb-3">
                            View Profile
                        </button>
                        <button onclick="logout()" class="block bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition duration-300">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        if (userGreeting) {
            userGreeting.textContent = `Dashboard - ${loggedInUser.name}`;
        }
    } else {
        // User not logged in
        userProfile.innerHTML = `
            <div class="bg-gradient-to-r from-gray-200 to-gray-300 p-8 rounded-2xl shadow-xl">
                <div class="text-center">
                    <h2 class="text-3xl font-bold text-gray-700 mb-4">Welcome to Solzer Services</h2>
                    <p class="text-gray-600 mb-6">Please sign in to access your dashboard and booking history</p>
                    <div class="flex gap-4 justify-center">
                        <a href="auth.html" class="bg-primary-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-light transition duration-300">
                            Sign In
                        </a>
                        <a href="services.html" class="bg-secondary-gold text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300">
                            Browse Services
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
}

function getLoggedInUser() {
    try {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const currentUser = localStorage.getItem('currentUser');
        
        if (currentUser) {
            const user = users.find(u => u.email === currentUser);
            if (user) {
                return user;
            }
        }
    } catch (e) {
        console.error('Error loading user:', e);
    }
    return null;
}

function viewUserProfile() {
    const user = getLoggedInUser();
    if (!user) {
        showAlert('Please sign in first', 'error');
        return;
    }
    
    // Create profile modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
    modal.onclick = (e) => e.target === modal && modal.remove();
    
    modal.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-pulse-in">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-primary-blue">User Profile</h2>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700 transition">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <p class="text-gray-900 bg-gray-100 p-3 rounded-lg">${user.name}</p>
                </div>
                
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <p class="text-gray-900 bg-gray-100 p-3 rounded-lg">${user.email}</p>
                </div>
                
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Account Created</label>
                    <p class="text-gray-900 bg-gray-100 p-3 rounded-lg">${new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
                
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Account Status</label>
                    <p class="text-green-600 bg-green-50 p-3 rounded-lg font-semibold">✓ Active</p>
                </div>
            </div>
            
            <div class="mt-8 flex gap-3">
                <button onclick="this.closest('.fixed').remove()" class="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition duration-300">
                    Close
                </button>
                <button onclick="editUserProfile()" class="flex-1 py-2 px-4 bg-primary-blue text-white rounded-lg font-semibold hover:bg-primary-light transition duration-300">
                    Edit Profile
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function editUserProfile() {
    // For now, show a simple alert
    showAlert('Profile editing feature coming soon!', 'info');
}

function logout() {
    // Confirm logout
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        showAlert('You have been logged out', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }
}

// ====================================
// BOOKING HISTORY MANAGEMENT
// ====================================

function displayBookingHistory() {
    const bookingHistory = document.getElementById('booking-history');
    
    if (!bookingHistory) return;
    
    // Get user bookings
    const user = getLoggedInUser();
    
    if (!user) {
        bookingHistory.innerHTML = `
            <div class="col-span-full text-center py-12">
                <p class="text-gray-500 mb-4">No bookings yet. Sign in to book services.</p>
                <a href="services.html" class="inline-block bg-primary-blue text-white px-6 py-2 rounded-lg hover:bg-primary-light transition">
                    Browse Services
                </a>
            </div>
        `;
        return;
    }
    
    try {
        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        const userBookings = bookings.filter(b => b.userEmail === user.email);
        
        if (userBookings.length === 0) {
            bookingHistory.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <p class="text-gray-500 mb-4">No bookings yet. Start by booking a service.</p>
                    <a href="services.html" class="inline-block bg-secondary-gold text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition">
                        Book a Service
                    </a>
                </div>
            `;
            return;
        }
        
        // Sort bookings by date (newest first)
        userBookings.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
        
        // Clear and populate
        bookingHistory.innerHTML = '';
        
        userBookings.forEach(booking => {
            const bookingCard = createBookingCard(booking);
            bookingHistory.appendChild(bookingCard);
        });
        
    } catch (e) {
        console.error('Error loading bookings:', e);
        bookingHistory.innerHTML = `
            <div class="col-span-full text-center py-12">
                <p class="text-red-500">Error loading bookings. Please refresh the page.</p>
            </div>
        `;
    }
}

function createBookingCard(booking) {
    const card = document.createElement('div');
    const bookingDate = new Date(booking.dateTime);
    const today = new Date();
    const isUpcoming = bookingDate > today;
    
    card.className = `bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300 border-l-4 ${
        isUpcoming ? 'border-l-primary-blue' : 'border-l-gray-400'
    }`;
    
    const statusBadge = isUpcoming 
        ? '<span class="inline-block bg-blue-100 text-primary-blue px-3 py-1 rounded-full text-xs font-semibold">Upcoming</span>'
        : '<span class="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Completed</span>';
    
    card.innerHTML = `
        <div class="flex justify-between items-start mb-4">
            <div>
                <h3 class="text-xl font-bold text-gray-900">${booking.serviceName}</h3>
                <p class="text-sm text-gray-500 mt-1">Booking ID: ${booking.bookingId}</p>
            </div>
            ${statusBadge}
        </div>
        
        <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
                <p class="text-xs text-gray-500 font-semibold">Date & Time</p>
                <p class="text-gray-900">${bookingDate.toLocaleDateString()} ${booking.time}</p>
            </div>
            <div>
                <p class="text-xs text-gray-500 font-semibold">Service Provider</p>
                <p class="text-gray-900">Professional Available</p>
            </div>
            <div>
                <p class="text-xs text-gray-500 font-semibold">Location</p>
                <p class="text-gray-900 truncate">${booking.address}</p>
            </div>
            <div>
                <p class="text-xs text-gray-500 font-semibold">Contact</p>
                <p class="text-gray-900">${booking.phone}</p>
            </div>
        </div>
        
        <div class="bg-gray-50 rounded-lg p-3 mb-4">
            <p class="text-xs text-gray-500 font-semibold mb-1">Notes</p>
            <p class="text-sm text-gray-700">${booking.notes || 'No additional notes'}</p>
        </div>
        
        <div class="flex gap-3">
            <button onclick="rescheduleBooking('${booking.bookingId}')" class="flex-1 py-2 px-3 bg-primary-blue text-white rounded-lg font-semibold hover:bg-primary-light transition duration-300 text-sm">
                Reschedule
            </button>
            <button onclick="cancelBooking('${booking.bookingId}')" class="flex-1 py-2 px-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition duration-300 text-sm">
                Cancel
            </button>
        </div>
    `;
    
    return card;
}

function rescheduleBooking(bookingId) {
    showAlert('Rescheduling feature coming soon! Please call us at the contact number for now.', 'info');
}

function cancelBooking(bookingId) {
    if (confirm('Are you sure you want to cancel this booking?')) {
        try {
            const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
            const updatedBookings = bookings.filter(b => b.bookingId !== bookingId);
            localStorage.setItem('bookings', JSON.stringify(updatedBookings));
            
            showAlert('Booking cancelled successfully', 'success');
            displayBookingHistory();
        } catch (e) {
            showAlert('Error cancelling booking', 'error');
        }
    }
}

// ====================================
// EVENT LISTENERS & UTILITIES
// ====================================

function addEventListeners() {
    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.getElementById('mobile-menu');
            if (menu) {
                menu.classList.add('-translate-x-full');
            }
        });
    });
}

function addSmoothTransitions() {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add animation to cards
    const cards = document.querySelectorAll('.bg-white.rounded-xl.shadow');
    cards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
    });
}

// ====================================
// ALERT SYSTEM
// ====================================

function showAlert(message, type = 'info') {
    // Create alert container if not exists
    let alertContainer = document.getElementById('alert-container');
    if (!alertContainer) {
        alertContainer = document.createElement('div');
        alertContainer.id = 'alert-container';
        alertContainer.className = 'fixed top-4 right-4 z-[9999] space-y-3';
        document.body.appendChild(alertContainer);
    }
    
    // Determine colors based on type
    const colors = {
        success: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-400', icon: '✓' },
        error: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-400', icon: '✕' },
        info: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-400', icon: 'ℹ' },
        warning: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-400', icon: '⚠' }
    };
    
    const config = colors[type] || colors.info;
    
    // Create alert
    const alert = document.createElement('div');
    alert.className = `${config.bg} border-l-4 ${config.border} rounded-lg p-4 shadow-lg max-w-sm animate-pulse-in`;
    alert.innerHTML = `
        <div class="flex items-center">
            <span class="text-2xl ${config.text} mr-3">${config.icon}</span>
            <p class="${config.text} font-medium">${message}</p>
            <button onclick="this.parentElement.parentElement.remove()" class="${config.text} ml-auto hover:opacity-70 transition">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
        </div>
    `;
    
    alertContainer.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alert.style.animation = 'fadeOutUp 0.3s ease-out';
        setTimeout(() => alert.remove(), 300);
    }, 5000);
}

// ====================================
// ANIMATIONS
// ====================================

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOutUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
    
    @keyframes pulse-in {
        0% {
            opacity: 0;
            transform: scale(0.95);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .animate-pulse-in {
        animation: pulse-in 0.3s ease-out;
    }
`;
document.head.appendChild(style);

// ====================================
// EXPORT FOR EXTERNAL USE
// ====================================

window.showAlert = showAlert;
window.toggleMenu = toggleMenu;
window.logout = logout;
window.viewUserProfile = viewUserProfile;
window.editUserProfile = editUserProfile;
window.rescheduleBooking = rescheduleBooking;
window.cancelBooking = cancelBooking;
