// ============================================
// Services Page JavaScript
// ============================================

// View Service Details
function viewDetails(serviceName) {
    const details = {
        'House Cleaning': {
            description: 'Professional house cleaning with experienced staff using eco-friendly products. We provide thorough cleaning of all rooms including deep cleaning services.',
            time: '2-4 hours',
            includes: 'Floor cleaning, dusting, bathroom cleaning, kitchen cleaning, window cleaning'
        },
        'Electrical Service': {
            description: 'Expert electrical repairs, installations, and maintenance. Licensed electricians with 10+ years experience.',
            time: '1-3 hours',
            includes: 'Wiring, panel repair, lighting installation, troubleshooting, maintenance'
        },
        'Mechanical Service': {
            description: 'Professional maintenance and repair of appliances including AC, refrigerator, washing machine, and more.',
            time: '1-2 hours',
            includes: 'Diagnosis, repair, maintenance, spare parts, warranty'
        },
        'Emergency Service': {
            description: '24/7 emergency response for urgent situations. Fast and reliable service available round the clock.',
            time: '15-30 minutes',
            includes: 'Emergency repairs, medical support referral, safety assistance, 24/7 hotline'
        },
        'Property Dealing': {
            description: 'Professional assistance in buying, selling, and renting properties. Expert negotiation and legal support.',
            time: 'Varies',
            includes: 'Property search, negotiation, documentation, legal support, verification'
        },
        'Transportation': {
            description: 'Safe and reliable transport services for travel and relocation with professional drivers and vehicles.',
            time: 'On demand',
            includes: 'Comfortable vehicles, trained drivers, insurance, flexible timing'
        },
        'Cloth Laundry': {
            description: 'Professional dry cleaning and laundry service for all types of fabrics with quality assurance.',
            time: '2-3 days',
            includes: 'Washing, dry cleaning, ironing, stain removal, pickup & delivery'
        },
        'Salon Service': {
            description: 'Comprehensive salon services for men and women including haircut, styling, and beauty treatments.',
            time: '30-60 minutes',
            includes: 'Haircut, styling, coloring, facials, manicure, pedicure'
        },
        'Carpenter Service': {
            description: 'Expert carpentry work for furniture repair, custom design, and installation services.',
            time: 'Varies',
            includes: 'Furniture repair, custom design, installation, wood finishing'
        },
        'Freelancer Service': {
            description: 'Professional freelance expertise in web design, content writing, graphic design, and IT solutions.',
            time: 'Project based',
            includes: 'Web design, content, graphics, coding, consulting'
        },
        'Fresh Food Delivery': {
            description: 'Fresh, healthy meals delivered daily with quality assurance and nutritionist support.',
            time: 'Daily',
            includes: 'Fresh meals, customized diet, healthy options, on-time delivery'
        },
        'Library Service': {
            description: 'Digital and physical library access with book rental and research assistance services.',
            time: 'Subscription',
            includes: 'Book access, research support, digital library, monthly subscription'
        },
        'Custom Service': {
            description: 'Custom services tailored to your specific needs and requirements with personalized solutions.',
            time: 'Custom',
            includes: 'Personalized service, flexible timing, custom pricing, expert support'
        }
    };

    const service = details[serviceName] || {
        description: 'Professional service with quality assurance',
        time: 'Varies',
        includes: 'Custom solutions'
    };

    const detailsHTML = `
        <strong>Description:</strong> ${service.description}<br><br>
        <strong>Estimated Time:</strong> ${service.time}<br><br>
        <strong>Includes:</strong> ${service.includes}
    `;

    showAlert(detailsHTML, 'info');
}

// Call Service Function
function callService(phoneNumber) {
    // Create a clickable phone link
    const phone = phoneNumber.replace(/[^\d]/g, '');
    
    // Check if device supports tel protocol
    if (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
        // Mobile device - create tel link
        window.location.href = 'tel:' + phone;
    } else {
        // Desktop - show alert with phone number
        showAlert(`Call us at: <strong>${phoneNumber}</strong><br><br>Click to copy the number to your clipboard.`, 'call');
        
        // Copy to clipboard
        setTimeout(() => {
            navigator.clipboard.writeText(phone).then(() => {
                showAlert(`Phone number copied to clipboard: ${phoneNumber}`, 'success');
            });
        }, 500);
    }
}

// Scroll to services section
function scrollToServices() {
    const servicesSection = document.getElementById('services');
    servicesSection.scrollIntoView({ behavior: 'smooth' });
}

// Book Service Function
function bookService(serviceName, buttonElement) {
    const modal = document.getElementById('bookingModal');
    document.getElementById('serviceName').value = serviceName;
    document.getElementById('modalServiceName').value = serviceName;
    
    // Clear previous form data
    document.getElementById('bookingForm').reset();
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('preferredDate').min = today;
    
    // Show modal with animation
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Add visual feedback to button
    const originalText = buttonElement.textContent;
    buttonElement.textContent = 'Opening...';
    setTimeout(() => {
        buttonElement.textContent = originalText;
    }, 300);
}

// Close Booking Modal
function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Close Success Modal
function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Booking Form Submission
document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form values
    const serviceName = document.getElementById('serviceName').value;
    const customerName = document.getElementById('customerName').value.trim();
    const customerEmail = document.getElementById('customerEmail').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();
    const preferredDate = document.getElementById('preferredDate').value;
    const preferredTime = document.getElementById('preferredTime').value;
    const customerAddress = document.getElementById('customerAddress').value.trim();
    const additionalNotes = document.getElementById('additionalNotes').value.trim();
    
    // Validation
    if (!customerName || !customerEmail || !customerPhone || !preferredDate || !preferredTime || !customerAddress) {
        showAlert('Please fill in all required fields', 'error');
        return;
    }
    
    // Name validation
    if (customerName.length < 2) {
        showAlert('Please enter a valid name (at least 2 characters)', 'error');
        return;
    }
    
    // Email validation
    if (!isValidEmail(customerEmail)) {
        showAlert('Please enter a valid email address', 'error');
        return;
    }
    
    // Phone validation
    if (!isValidPhone(customerPhone)) {
        showAlert('Please enter a valid phone number (10 digits)', 'error');
        return;
    }
    
    // Date validation
    const selectedDate = new Date(preferredDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showAlert('Please select a future date', 'error');
        return;
    }
    
    // Address validation
    if (customerAddress.length < 10) {
        showAlert('Please enter a complete address', 'error');
        return;
    }
    
    // Show processing state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Processing...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        
        // Save booking to localStorage (for demo)
        saveBooking({
            serviceName,
            customerName,
            customerEmail,
            customerPhone,
            preferredDate,
            preferredTime,
            customerAddress,
            additionalNotes,
            bookingId: generateBookingId(),
            bookingDate: new Date().toLocaleDateString()
        });
        
        // Close booking modal
        closeBookingModal();
        
        // Show success modal
        showSuccessMessage(serviceName, preferredDate, preferredTime);
        
        // Log booking data
        console.log('Booking confirmed:', {
            serviceName,
            customerName,
            customerEmail,
            customerPhone,
            preferredDate,
            preferredTime,
            customerAddress,
            additionalNotes
        });
    }, 1500);
});

// Show Success Message
function showSuccessMessage(serviceName, date, time) {
    const modal = document.getElementById('successModal');
    const message = document.getElementById('successMessage');
    
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    message.innerHTML = `
        <strong>${serviceName}</strong> has been successfully booked!<br><br>
        <strong>Scheduled Date:</strong> ${formattedDate}<br>
        <strong>Scheduled Time:</strong> ${time}<br><br>
        A confirmation email will be sent shortly. Our team will contact you soon.
    `;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation (10 digits)
function isValidPhone(phone) {
    const phoneRegex = /^\d{10}$/;
    const digitsOnly = phone.replace(/\D/g, '');
    return phoneRegex.test(digitsOnly);
}

// Generate booking ID
function generateBookingId() {
    return 'BK' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Save booking to localStorage
function saveBooking(bookingData) {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(bookingData);
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

// Show Alert Function
function showAlert(message, type = 'info') {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    
    let bgColor, borderColor;
    let icon = '';
    
    switch(type) {
        case 'error':
            bgColor = '#e74c3c';
            borderColor = '#c0392b';
            icon = '❌ ';
            break;
        case 'success':
            bgColor = '#27ae60';
            borderColor = '#229954';
            icon = '✓ ';
            break;
        case 'info':
            bgColor = '#3498db';
            borderColor = '#2980b9';
            icon = 'ℹ️ ';
            break;
        case 'call':
            bgColor = '#667eea';
            borderColor = '#764ba2';
            icon = '📞 ';
            break;
        default:
            bgColor = '#95a5a6';
            borderColor = '#7f8c8d';
            icon = '';
    }
    
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 6px;
        background: ${bgColor};
        border: 2px solid ${borderColor};
        color: white;
        font-weight: 500;
        z-index: 3000;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease;
        max-width: 400px;
        font-size: 14px;
        line-height: 1.5;
    `;
    
    alert.innerHTML = `${icon}${message}`;
    
    document.body.appendChild(alert);
    
    // Add animation
    const style = document.createElement('style');
    if (!document.getElementById('alertStyles')) {
        style.id = 'alertStyles';
        style.innerHTML = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove after 5 seconds
    setTimeout(() => {
        alert.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => alert.remove(), 300);
    }, 5000);
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const bookingModal = document.getElementById('bookingModal');
    const successModal = document.getElementById('successModal');
    
    if (event.target === bookingModal) {
        closeBookingModal();
    }
    
    if (event.target === successModal) {
        closeSuccessModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeBookingModal();
        closeSuccessModal();
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Set minimum date for date input
window.addEventListener('load', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('preferredDate').min = today;
});

// Add service card hover effect
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Log page load
console.log('Services page loaded successfully');

// Display booking count in console (for demo)
window.addEventListener('load', function() {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    if (bookings.length > 0) {
        console.log(`Total bookings: ${bookings.length}`);
        console.log('Recent bookings:', bookings.slice(-3));
    }
});
