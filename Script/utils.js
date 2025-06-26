// Utility functions for input sanitization, validation, formatting, and UI helpers
export function sanitizeInput(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

export function validateEmail(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

export function validatePasswordStrength(pw) {
  return pw.length >= 8 && /[A-Z]/.test(pw) && /[0-9]/.test(pw);
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString();
}

export function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function throttle(fn, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function showNotification(msg, type = "info") {
  // ...show notification UI...
}

export function trapFocus(element) {
  // ...accessibility helper for modals...
}
// ...other utilities...
