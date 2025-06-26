/mnt/4BC9EBFC28ECC8F5/Others/Projects/Project-roadmap/Script/signin.js
// Improved Sign-in page functionality with UI/UX enhancements
// Assumes AuthSDK is loaded globally via <script src="../Config/auth-sdk.js"></script>

document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signin-form-element');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');
    const submitBtn = signinForm.querySelector('.signin-btn') || signinForm.querySelector('button[type="submit"]');

    // Helper to show inline messages
    function showSigninMessage(msg, type) {
        let msgDiv = document.getElementById('signin-msg');
        if (!msgDiv) {
            msgDiv = document.createElement('div');
            msgDiv.id = 'signin-msg';
            msgDiv.className = type === 'success' ? 'success-message' : 'error-message';
            signinForm.prepend(msgDiv);
        }
        msgDiv.textContent = msg;
        msgDiv.className = type === 'success' ? 'success-message' : 'error-message';
    }

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
    signinForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Remove previous messages
        let msgDiv = document.getElementById('signin-msg');
        if (msgDiv) msgDiv.remove();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Validate form
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        addValidationFeedback(emailInput, isEmailValid);
        addValidationFeedback(passwordInput, isPasswordValid);

        if (!isEmailValid) {
            showSigninMessage('Please enter a valid email address.', 'error');
            emailInput.focus();
            return;
        }
        if (!isPasswordValid) {
            showSigninMessage('Password must be at least 6 characters.', 'error');
            passwordInput.focus();
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Signing In...';

        try {
            await AuthSDK.login(email, password);
            showSigninMessage('Welcome! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'main.html';
            }, 1000);
        } catch (error) {
            showSigninMessage(error.message || "Login failed", 'error');
        }

        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    });

    // Social sign-in buttons (demo only)
    const googleBtn = document.querySelector('.google-btn');
    const githubBtn = document.querySelector('.github-btn');

    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            showSigninMessage('Google sign-in would be implemented here', 'error');
        });
    }
    if (githubBtn) {
        githubBtn.addEventListener('click', function() {
            showSigninMessage('GitHub sign-in would be implemented here', 'error');
        });
    }
});
