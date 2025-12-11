// ============================================
// Authentication Page JavaScript
// ============================================

// Toggle between Sign In and Sign Up forms
function toggleForms(event) {
    event.preventDefault();
    const authContainer = document.querySelector('.auth-container');
    const signInContainer = document.querySelector('.sign-in-container');
    const signUpContainer = document.querySelector('.sign-up-container');
    
    authContainer.classList.toggle('sign-up-mode');
    signInContainer.classList.toggle('active');
    signUpContainer.classList.toggle('active');
    
    // Clear forms when switching
    clearForms();
}

// Clear all form inputs
function clearForms() {
    document.getElementById('signInForm').reset();
    document.getElementById('signUpForm').reset();
}

// Sign In Form Handler
document.getElementById('signInForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('signInEmail').value.trim();
    const password = document.getElementById('signInPassword').value.trim();
    
    // Validation
    if (!email || !password) {
        showError('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters');
        return;
    }
    
    // Simulate API call
    simulateAuthentication('sign-in', { email, password });
});

// Sign Up Form Handler
document.getElementById('signUpForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('signUpName').value.trim();
    const email = document.getElementById('signUpEmail').value.trim();
    const password = document.getElementById('signUpPassword').value.trim();
    const confirmPassword = document.getElementById('signUpConfirmPassword').value.trim();
    const terms = document.getElementById('terms').checked;
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
        showError('Please fill in all fields');
        return;
    }
    
    if (name.length < 2) {
        showError('Name must be at least 2 characters');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }
    
    if (!terms) {
        showError('You must agree to the Terms & Conditions');
        return;
    }
    
    // Simulate API call
    simulateAuthentication('sign-up', { name, email, password });
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Simulate authentication process
function simulateAuthentication(type, data) {
    // Simulate loading state
    const button = event.target.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Processing...';
    button.disabled = true;
    
    // Simulate API delay
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        
        // Check if email already exists (demo purpose)
        if (emailExists(data.email) && type === 'sign-up') {
            showError('This email is already registered. Please sign in or use a different email.');
            return;
        }
        
        // Success
        if (type === 'sign-in') {
            showSuccess(`Welcome back, ${data.email}!`, function() {
                // Redirect or perform action
                console.log('User signed in:', data);
                // window.location.href = 'dashboard.html';
            });
        } else {
            showSuccess(`Account created successfully! Welcome, ${data.name}!`, function() {
                // Redirect or perform action
                console.log('User signed up:', data);
                // Save to localStorage for demo
                saveUserData(data);
                // window.location.href = 'dashboard.html';
            });
        }
    }, 1500);
}

// Demo function to check if email exists
function emailExists(email) {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    return existingUsers.some(user => user.email === email);
}

// Demo function to save user data
function saveUserData(userData) {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    existingUsers.push(userData);
    localStorage.setItem('users', JSON.stringify(existingUsers));
}

// Show success message
function showSuccess(message, callback) {
    const modal = document.getElementById('successModal');
    const messageElement = document.getElementById('successMessage');
    messageElement.textContent = message;
    modal.classList.add('show');
    
    const closeButton = modal.querySelector('.close');
    closeButton.onclick = () => {
        modal.classList.remove('show');
        if (callback) callback();
    };
    
    const continueButton = modal.querySelector('button');
    continueButton.onclick = () => {
        modal.classList.remove('show');
        if (callback) callback();
    };
}

// Show error message
function showError(message) {
    const modal = document.getElementById('errorModal');
    const messageElement = document.getElementById('errorMessage');
    messageElement.textContent = message;
    modal.classList.add('show');
    
    const closeButton = modal.querySelector('.close');
    closeButton.onclick = () => {
        modal.classList.remove('show');
    };
    
    const continueButton = modal.querySelector('button');
    continueButton.onclick = () => {
        modal.classList.remove('show');
    };
}

// Close modal
function closeModal() {
    document.getElementById('successModal').classList.remove('show');
    document.getElementById('errorModal').classList.remove('show');
}

// Forgot password handler
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('forgot-password')) {
        event.preventDefault();
        const email = document.getElementById('signInEmail').value.trim();
        
        if (!email) {
            showError('Please enter your email address first');
            return;
        }
        
        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }
        
        showSuccess(`Password reset link sent to ${email}. Check your inbox!`);
    }
});

// Enter key support for forms
document.getElementById('signInForm').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('signInForm').dispatchEvent(new Event('submit'));
    }
});

document.getElementById('signUpForm').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('signUpForm').dispatchEvent(new Event('submit'));
    }
});

// Password visibility toggle (optional enhancement)
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
    } else {
        input.type = 'password';
    }
}

// Initialize
console.log('Authentication page loaded successfully');
