import { API_BASE_URL } from "../Config/api.js";

const storageKey = "jwt_tokens";

/**
 * Get JWT tokens from localStorage.
 * @returns {Object|null}
 */
export function getTokens() {
  try {
    return JSON.parse(localStorage.getItem(storageKey));
  } catch {
    return null;
  }
}

/**
 * Save JWT tokens to localStorage.
 * @param {Object} tokens
 */
export function setTokens(tokens) {
  localStorage.setItem(storageKey, JSON.stringify(tokens));
}

/**
 * Remove JWT tokens from localStorage.
 */
export function clearTokens() {
  localStorage.removeItem(storageKey);
}

/**
 * Login with email and password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} tokens
 */
export async function login(email, password) {
  const res = await fetch(API_BASE_URL + "auth/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
  if (!res.ok) {
    let msg = "Login failed";
    try {
      const err = await res.json();
      msg = err.detail || err.message || msg;
    } catch {
      // Ignore JSON parse errors, use default message
    }
    throw new Error(msg);
  }
  const data = await res.json();
  setTokens(data);
  return data;
}

/**
 * Logout the user and clear tokens.
 */
export async function logout() {
  await fetch(API_BASE_URL + "auth/logout/", {
    method: "POST",
    credentials: "include",
  });
  clearTokens();
}

/**
 * Refresh the access token using the refresh token.
 * @returns {Promise<Object>} new tokens
 */
export async function refresh() {
  const tokens = getTokens();
  if (!tokens?.refresh) throw new Error("No refresh token");
  const res = await fetch(API_BASE_URL + "auth/token/refresh/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: tokens.refresh }),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Token refresh failed");
  const data = await res.json();
  setTokens(data);
  return data;
}

/**
 * Get CSRF token from cookies (for cookie-based auth).
 * @returns {string|null}
 */
export function getCSRFToken() {
  const match = document.cookie.match(/csrftoken=([^;]+)/);
  return match ? match[1] : null;
}

/**
 * Authenticated fetch with automatic token handling and refresh.
 * @param {string} endpoint - API endpoint (relative to API_BASE_URL)
 * @param {Object} options - fetch options
 * @returns {Promise<Response>}
 */
export async function authFetch(endpoint, options = {}) {
  const url = endpoint.startsWith("http")
    ? endpoint
    : API_BASE_URL + endpoint.replace(/^\/+/, "");
  const opts = { ...options, credentials: "include" };

  // Attach Authorization header if using JWT in localStorage
  const tokens = getTokens();
  if (tokens?.access) {
    opts.headers = {
      ...(opts.headers || {}),
      Authorization: "Bearer " + tokens.access,
    };
  }

  // Attach CSRF token if requested
  if (opts.csrf) {
    const csrf = getCSRFToken();
    if (csrf) {
      opts.headers = {
        ...(opts.headers || {}),
        "X-CSRFToken": csrf,
      };
    }
  }

  let response = await fetch(url, opts);

  // If unauthorized, try to refresh token and retry once
  if (response.status === 401 && tokens?.refresh) {
    try {
      await refresh();
      const newTokens = getTokens();
      if (newTokens?.access) {
        opts.headers = {
          ...(opts.headers || {}),
          Authorization: "Bearer " + newTokens.access,
        };
      }
      response = await fetch(url, opts);
    } catch {
      clearTokens();
      throw new Error("Session expired. Please log in again.");
    }
  }

  return response;
}

/**
 * Universal API request utility with auth and error handling.
 * @param {string} endpoint
 * @param {Object} options
 * @returns {Promise<any>}
 */
export async function apiRequest(endpoint, options = {}) {
  const response = await authFetch(endpoint, options);
  if (!response.ok) {
    let errorMsg = "API error";
    try {
      const err = await response.json();
      errorMsg = err.detail || err.message || errorMsg;
    } catch {
      // Ignore JSON parse errors, use default errorMsg
    }
    throw new Error(errorMsg);
  }
  // Return parsed JSON or empty object
  try {
    return await response.json();
  } catch {
    return {};
  }
}
