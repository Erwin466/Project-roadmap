import { apiRequest } from "../Config/auth-sdk.js";

// Signup Form Functionality
// Assumes AuthSDK is loaded globally via <script src="../Config/auth-sdk.js"></script>
document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signup-form-element");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const strengthBar = document.querySelector(".strength-fill");
  const strengthText = document.querySelector(".strength-text");
  const socialBtns = document.querySelectorAll(".social-btn");

  // Password strength checker
  function checkPasswordStrength(password) {
    let strength = 0;
    let strengthLevel = "";
    let color = "";

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
      strengthLevel = "Weak";
      color = "#ef4444";
    } else if (strength <= 50) {
      strengthLevel = "Fair";
      color = "#f97316";
    } else if (strength <= 75) {
      strengthLevel = "Good";
      color = "#eab308";
    } else {
      strengthLevel = "Strong";
      color = "#22c55e";
    }

    return { strength, strengthLevel, color };
  }

  // Update password strength indicator
  passwordInput.addEventListener("input", function () {
    const password = this.value;
    const result = checkPasswordStrength(password);

    strengthBar.style.width = result.strength + "%";
    strengthBar.style.backgroundColor = result.color;
    strengthText.textContent =
      password.length > 0 ? result.strengthLevel : "Password strength";
    strengthText.style.color = result.color;
  });

  // Password confirmation validation
  confirmPasswordInput.addEventListener("input", function () {
    const password = passwordInput.value;
    const confirmPassword = this.value;

    if (confirmPassword.length > 0) {
      if (password === confirmPassword) {
        confirmPasswordInput.style.borderColor = "#22c55e";
      } else {
        confirmPasswordInput.style.borderColor = "#ef4444";
      }
    } else {
      confirmPasswordInput.style.borderColor = "";
    }
  });

  // Signup form submission with AuthSDK integration
  // Helper to show inline messages
  function showSignupMessage(msg, type) {
    let msgDiv = document.getElementById("signup-msg");
    if (!msgDiv) {
      msgDiv = document.createElement("div");
      msgDiv.id = "signup-msg";
      msgDiv.className =
        type === "success" ? "success-message" : "error-message";
      signupForm.prepend(msgDiv);
    }
    msgDiv.textContent = msg;
    msgDiv.className = type === "success" ? "success-message" : "error-message";
  }

  const submitBtn =
    signupForm.querySelector(".signup-btn") ||
    signupForm.querySelector('button[type="submit"]');

  signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Remove previous messages
    let msgDiv = document.getElementById("signup-msg");
    if (msgDiv) msgDiv.remove();

    const email = document.getElementById("email").value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const firstName = document.getElementById("firstName")
      ? document.getElementById("firstName").value.trim()
      : "";
    const lastName = document.getElementById("lastName")
      ? document.getElementById("lastName").value.trim()
      : "";
    // const learningGoal = document.getElementById("learningGoal")
    //   ? document.getElementById("learningGoal").value
    //   : "";

    // Use constant-time comparison to prevent timing attacks
    function constantTimeEquals(a, b) {
      if (a.length !== b.length) return false;
      let result = 0;
      for (let i = 0; i < a.length; i++) {
        result |= a.charCodeAt(i) ^ b.charCodeAt(i);
      }
      return result === 0;
    }
    if (!constantTimeEquals(password, confirmPassword)) {
      showSignupMessage("Passwords do not match.", "error");
      confirmPasswordInput.focus();
      return;
    }

    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Creating Account...";

    try {
      // Register user
      const res = await apiRequest("auth/register/", {
        method: "POST",
        body: JSON.stringify({
          username: firstName + " " + lastName,
          email,
          password,
        }),
        csrf: true,
      });
      if (res.error) throw new Error(res.message || "Registration failed");

      showSignupMessage(
        "Account created! Please check your email to verify your account.",
        "success",
      );
      setTimeout(() => {
        window.location.href = "signin.html";
      }, 1000);
    } catch (error) {
      showSignupMessage(error.message || "Sign up failed", "error");
    }
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  });

  // Social login handlers
  socialBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const provider = this.classList.contains("google-btn")
        ? "Google"
        : "GitHub";

      // Add loading state
      // const originalText = this.innerHTML;
      this.innerHTML = `<span>Connecting to ${provider}...</span>`;
      this.disabled = true;

      // Redirect to OAuth2 provider
      window.location.href = `/api/v1/auth/oauth2/login/${provider.toLowerCase()}/`;
    });
  });

  // Real-time email validation
  const emailInput = document.getElementById("email");
  emailInput.addEventListener("blur", function () {
    const email = this.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email)) {
      this.style.borderColor = "#ef4444";
      this.classList.add("error");
    } else if (email) {
      this.style.borderColor = "#22c55e";
      this.classList.remove("error");
      this.classList.add("success");
    }
  });

  // Learning goal change handler
  document
    .getElementById("learningGoal")
    .addEventListener("change", function () {
      if (this.value === "other") {
        // You could add a custom input field here for "other" option
        console.log("Custom learning goal selected");
      }
    });

  // Add input focus animations
  const inputs = document.querySelectorAll("input, select");
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", function () {
      if (!this.value) {
        this.parentElement.classList.remove("focused");
      }
    });
  });
});
