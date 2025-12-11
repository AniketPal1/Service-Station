// ============================================
// Main JavaScript for Solzer Service Station
// ============================================

// Page initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('Solzer Service Station - Homepage loaded successfully');
    
    // Set active nav link
    setActiveNavLink();
    
    // Add smooth transitions
    addSmoothTransitions();
});

// Set active navigation link
function setActiveNavLink() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (currentPage.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
}

// Add smooth transitions to cards
function addSmoothTransitions() {
    const cards = document.querySelectorAll('.feature-card, .service-preview-card, .contact-item, .stat-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Mobile menu toggle (if needed in future)
function toggleMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('-translate-x-full');
    }
}

// Log page metrics
window.addEventListener('load', function() {
    console.log('Page fully loaded');
    console.log('Solzer Service Station - Ready for user interaction');
});

// Handle navigation to other pages
document.addEventListener('click', function(event) {
    const link = event.target.closest('a');
    if (link && link.href) {
        const href = link.getAttribute('href');
        if (href && href !== '#' && !href.startsWith('http')) {
            console.log('Navigating to:', href);
        }
    }
});
 