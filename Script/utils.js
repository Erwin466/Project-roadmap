// Utility functions for input sanitization, validation, formatting, and UI helpers
import { API_BASE_URL } from "../Config/api.js";

/**
 * Universal API request utility that prepends the production backend base URL.
 * Usage: apiRequest("courses/", { method: "GET" })
 */
export async function apiRequest(endpoint, options = {}) {
  const url = endpoint.startsWith("http")
    ? endpoint
    : API_BASE_URL + endpoint.replace(/^\/+/, "");
  const response = await fetch(url, {
    credentials: "include", // or "same-origin" if using cookies
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || response.statusText);
  }
  return response.json();
}
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

export function showNotification() {
  // Placeholder for notification UI logic
}

export function trapFocus() {
  // Placeholder for accessibility helper for modals
}
// Show a global error notification at the top of the page
export function showGlobalError(message) {
  let errorDiv = document.getElementById("global-error");
  if (!errorDiv) {
    errorDiv = document.createElement("div");
    errorDiv.id = "global-error";
    errorDiv.className = "global-error";
    document.body.prepend(errorDiv);
  }
  errorDiv.textContent = message;
  errorDiv.style.display = "block";
  setTimeout(() => {
    errorDiv.style.display = "none";
  }, 5000);
}

// ...other utilities...
