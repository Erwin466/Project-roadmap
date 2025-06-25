// Sign-in page functionality
document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signin-form-element');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');
    
    // Form validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function validatePassword(password) {
        return password.length >= 6;
    }
    
    // Add input validation feedback
    function addValidationFeedback(input, isValid) {
        if (isValid) {
            input.style.borderColor = 'rgba(34, 197, 94, 0.8)';
        } else {
            input.style.borderColor = 'rgba(239, 68, 68, 0.8)';
        }
    }
    
    // Real-time validation
    emailInput.addEventListener('blur', function() {
        const isValid = validateEmail(this.value);
        addValidationFeedback(this, isValid);
    });
    
    passwordInput.addEventListener('blur', function() {
        const isValid = validatePassword(this.value);
        addValidationFeedback(this, isValid);
    });
    
    // Reset border color on focus
    [emailInput, passwordInput].forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = 'rgba(119, 11, 92, 0.8)';
        });
    });
    
    // Form submission
    signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const remember = rememberCheckbox.checked;
        
        // Validate form
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        
        addValidationFeedback(emailInput, isEmailValid);
        addValidationFeedback(passwordInput, isPasswordValid);
        
        if (isEmailValid && isPasswordValid) {
            // Show loading state
            const submitBtn = document.querySelector('.signin-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Signing In...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Here you would typically make an API call to your backend
                console.log('Sign-in attempt:', {
                    email: email,
                    password: password,
                    remember: remember
                });
                
                // For demo purposes, show success message
                alert('Sign-in successful! (This is a demo)');
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Optionally redirect to main page
                // window.location.href = 'main.html';
            }, 2000);
        } else {
            // Show error message
            showErrorMessage('Please check your email and password.');
        }
    });
    
    // Error message display
    function showErrorMessage(message) {
        // Remove existing error message
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Create new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: #ef4444;
            padding: 10px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 14px;
            text-align: center;
        `;
        errorDiv.textContent = message;
        
        // Insert before submit button
        const submitBtn = document.querySelector('.signin-btn');
        submitBtn.parentNode.insertBefore(errorDiv, submitBtn);
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }
    
    // Social sign-in buttons
    const googleBtn = document.querySelector('.google-btn');
    const githubBtn = document.querySelector('.github-btn');
    
    googleBtn.addEventListener('click', function() {
        console.log('Google sign-in clicked');
        alert('Google sign-in would be implemented here');
    });
    
    githubBtn.addEventListener('click', function() {
        console.log('GitHub sign-in clicked');
        alert('GitHub sign-in would be implemented here');
    });
    
    // Responsive video background adjustment
    function adjustVideoBackground() {
        const video = document.getElementById('videoBackground');
        const screenWidth = window.innerWidth;
        
        if (screenWidth <= 768) {
            video.style.objectPosition = 'center center';
        }
    }
    
    // Initial adjustment and resize listener
    adjustVideoBackground();
    window.addEventListener('resize', adjustVideoBackground);
    
    // Add smooth animations for form interactions
    const formInputs = document.querySelectorAll('.input-group input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
    
    // Add hover effects for social buttons
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
