// Signup Form Functionality
// Assumes AuthSDK is loaded globally via <script src="../Config/auth-sdk.js"></script>
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form-element');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const strengthBar = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    const socialBtns = document.querySelectorAll('.social-btn');

    // Password strength checker
    function checkPasswordStrength(password) {
        let strength = 0;
        let strengthLevel = '';
        let color = '';

        // Length check
        if (password.length >= 8) strength += 25;
        // Uppercase check
        if (/[A-Z]/.test(password)) strength += 25;
        // Lowercase check
        if (/[a-z]/.test(password)) strength += 25;
        // Number or special character check
        if (/\d|\W/.test(password)) strength += 25;

        // Determine strength level and color
        if (strength <= 25) {
            strengthLevel = 'Weak';
            color = '#ef4444';
        } else if (strength <= 50) {
            strengthLevel = 'Fair';
            color = '#f97316';
        } else if (strength <= 75) {
            strengthLevel = 'Good';
            color = '#eab308';
        } else {
            strengthLevel = 'Strong';
            color = '#22c55e';
        }

        return { strength, strengthLevel, color };
    }

    // Update password strength indicator
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const result = checkPasswordStrength(password);

        strengthBar.style.width = result.strength + '%';
        strengthBar.style.backgroundColor = result.color;
        strengthText.textContent = password.length > 0 ? result.strengthLevel : 'Password strength';
        strengthText.style.color = result.color;
    });

    // Password confirmation validation
    confirmPasswordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        const confirmPassword = this.value;

        if (confirmPassword.length > 0) {
            if (password === confirmPassword) {
                confirmPasswordInput.style.borderColor = '#22c55e';
            } else {
                confirmPasswordInput.style.borderColor = '#ef4444';
            }
        } else {
            confirmPasswordInput.style.borderColor = '';
        }
    });

    // Signup form submission with AuthSDK integration
    // Helper to show inline messages
    function showSignupMessage(msg, type) {
        let msgDiv = document.getElementById('signup-msg');
        if (!msgDiv) {
            msgDiv = document.createElement('div');
            msgDiv.id = 'signup-msg';
            msgDiv.className = type === 'success' ? 'success-message' : 'error-message';
            signupForm.prepend(msgDiv);
        }
        msgDiv.textContent = msg;
        msgDiv.className = type === 'success' ? 'success-message' : 'error-message';
    }

    const submitBtn = signupForm.querySelector('.signup-btn') || signupForm.querySelector('button[type="submit"]');

    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Remove previous messages
        let msgDiv = document.getElementById('signup-msg');
        if (msgDiv) msgDiv.remove();

        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const firstName = document.getElementById('firstName') ? document.getElementById('firstName').value.trim() : '';
        const lastName = document.getElementById('lastName') ? document.getElementById('lastName').value.trim() : '';
        const learningGoal = document.getElementById('learningGoal') ? document.getElementById('learningGoal').value : '';

        if (password !== confirmPassword) {
            showSignupMessage('Passwords do not match.', 'error');
            confirmPasswordInput.focus();
            return;
        }

        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Creating Account...';

        try {
            // Register user
            const res = await fetch('/api/auth/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password,
                    first_name: firstName,
                    last_name: lastName,
                    learning_goal: learningGoal
                }),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.detail || 'Registration failed');
            }
            // Auto-login after successful registration
            await AuthSDK.login(email, password);
            showSignupMessage('Account created! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'main.html';
            }, 1000);
        } catch (error) {
            showSignupMessage(error.message || "Sign up failed", 'error');
        }
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    });
});
                this.style.borderColor = '#22c55e';
                this.classList.remove('error');
                this.classList.add('success');
            } else {
                this.style.borderColor = '#ef4444';
                this.classList.remove('success');
                this.classList.add('error');
            }
        } else {
            this.style.borderColor = '';
            this.classList.remove('error', 'success');
        }
    });

    // Form validation
    function validateForm() {
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const learningGoal = document.getElementById('learningGoal').value;
        const termsAccepted = document.getElementById('terms').checked;

        let isValid = true;
        let errors = [];

        // Name validation
        if (!firstName) {
            errors.push('First name is required');
            isValid = false;
        }
        if (!lastName) {
            errors.push('Last name is required');
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            errors.push('Email is required');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            errors.push('Please enter a valid email address');
            isValid = false;
        }

        // Password validation
        if (!password) {
            errors.push('Password is required');
            isValid = false;
        } else if (password.length < 8) {
            errors.push('Password must be at least 8 characters long');
            isValid = false;
        }

        // Confirm password validation
        if (!confirmPassword) {
            errors.push('Please confirm your password');
            isValid = false;
        } else if (password !== confirmPassword) {
            errors.push('Passwords do not match');
            isValid = false;
        }

        // Learning goal validation
        if (!learningGoal) {
            errors.push('Please select a learning goal');
            isValid = false;
        }

        // Terms validation
        if (!termsAccepted) {
            errors.push('You must agree to the Terms of Service and Privacy Policy');
            isValid = false;
        }

        return { isValid, errors };
    }

    // Show error messages
    function showErrors(errors) {
        // Remove existing error messages
        const existingErrorDiv = document.querySelector('.error-messages');
        if (existingErrorDiv) {
            existingErrorDiv.remove();
        }

        if (errors.length > 0) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-messages';
            errorDiv.innerHTML = `
                <ul>
                    ${errors.map(error => `<li>${error}</li>`).join('')}
                </ul>
            `;
            signupForm.insertBefore(errorDiv, signupForm.firstChild);
        }
    }

    // Show success message
    function showSuccess() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div class="success-content">
                <h3>Account Created Successfully!</h3>
                <p>Welcome to our learning community. You can now sign in to your account.</p>
                <a href="signin.html" class="success-link">Go to Sign In</a>
            </div>
        `;
        document.getElementById('signup-form-container').innerHTML = '';
        document.getElementById('signup-form-container').appendChild(successDiv);
    }

    // Handle form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const validation = validateForm();

        if (validation.isValid) {
            // Remove any existing error messages
            showErrors([]);

            // Show loading state
            const submitBtn = this.querySelector('.signup-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Creating Account...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                // Here you would normally send data to your backend
                const formData = {
                    firstName: document.getElementById('firstName').value,
                    lastName: document.getElementById('lastName').value,
                    email: document.getElementById('email').value,
                    password: passwordInput.value,
                    learningGoal: document.getElementById('learningGoal').value,
                    newsletter: document.getElementById('newsletter').checked
                };

                console.log('Signup data:', formData);

                // Show success message
                showSuccess();
            }, 1500);
        } else {
            showErrors(validation.errors);
        }
    });

    // Social login handlers
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const provider = this.classList.contains('google-btn') ? 'Google' : 'GitHub';

            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = `<span>Connecting to ${provider}...</span>`;
            this.disabled = true;

            // Simulate social login
            setTimeout(() => {
                // Here you would integrate with actual OAuth providers
                alert(`${provider} signup would be implemented here`);
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1000);
        });
    });

    // Real-time email validation
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('blur', function() {
        const email = this.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email && !emailRegex.test(email)) {
            this.style.borderColor = '#ef4444';
            this.classList.add('error');
        } else if (email) {
            this.style.borderColor = '#22c55e';
            this.classList.remove('error');
            this.classList.add('success');
        }
    });

    // Learning goal change handler
    document.getElementById('learningGoal').addEventListener('change', function() {
        if (this.value === 'other') {
            // You could add a custom input field here for "other" option
            console.log('Custom learning goal selected');
        }
    });

    // Add input focus animations
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});
