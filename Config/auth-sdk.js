// Auth SDK for automatic JWT token management
// Supports httpOnly cookies (recommended) and localStorage fallback

(function (global) {
  const config = {
    apiBase: "https://rmplatform-production.up.railway.app/api/v1/",
    useCookies: true, // Prefer httpOnly cookies
    storageKey: "jwt_tokens",
    refreshEndpoint: "/auth/refresh/",
    loginEndpoint: "/auth/login/",
    logoutEndpoint: "/auth/logout/",
    csrfEndpoint: "/auth/csrf/",
    tokenStatusEndpoint: "/auth/token-status/",
    onAuthEvent: null, // Optional callback
  };

  function setConfig(userConfig) {
    Object.assign(config, userConfig);
  }

  function getTokens() {
    if (config.useCookies) return null; // httpOnly cookies, not accessible
    try {
      return JSON.parse(localStorage.getItem(config.storageKey));
    } catch {
      return null;
    }
  }

  function setTokens(tokens) {
    if (!config.useCookies) {
      localStorage.setItem(config.storageKey, JSON.stringify(tokens));
    }
  }

  function clearTokens() {
    if (!config.useCookies) {
      localStorage.removeItem(config.storageKey);
    }
  }

  async function login(email, password) {
    const res = await fetch(config.apiBase + config.loginEndpoint, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    setTokens(data);
    config.onAuthEvent && config.onAuthEvent("login", data);
    return data;
  }

  async function logout() {
    await fetch(config.apiBase + config.logoutEndpoint, {
      method: "POST",
      credentials: "include",
    });
    clearTokens();
    config.onAuthEvent && config.onAuthEvent("logout");
  }

  async function refresh() {
    const res = await fetch(config.apiBase + config.refreshEndpoint, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Token refresh failed");
    const data = await res.json();
    setTokens(data);
    config.onAuthEvent && config.onAuthEvent("refresh", data);
    return data;
  }

  // Add CSRF token handling for cookie-based auth
  function getCSRFToken() {
    const match = document.cookie.match(/csrftoken=([^;]+)/);
    return match ? match[1] : null;
  }

  // HTTP interceptor for fetch
  function authFetch(input, init = {}) {
    init.credentials = "include";
    if (!config.useCookies) {
      const tokens = getTokens();
      if (tokens && tokens.access) {
        init.headers = Object.assign({}, init.headers, {
          Authorization: "Bearer " + tokens.access,
        });
      }
    }
    return fetch(input, init).then(async (res) => {
      if (res.status === 401) {
        try {
          await refresh();
          // Retry original request
          return fetch(input, init);
        } catch {
          clearTokens();
          config.onAuthEvent && config.onAuthEvent("logout");
        }
      }
      return res;
    });
  }

  // TypeScript type definitions (JSDoc style for JS)
  /**
   * @typedef {Object} AuthTokens
   * @property {string} access
   * @property {string} refresh
   */

  /**
   * @typedef {Object} UserProfile
   * @property {string} username
   * @property {string} email
   * @property {string[]} roles
   * @property {number} points
   * @property {string[]} badges
   */

  async function apiRequest(endpoint, options = {}) {
    const url = config.apiBase + endpoint.replace(/^\//, "");
    const headers = options.headers || {};
    if (options.csrf) {
      const csrf = getCSRFToken();
      if (csrf) headers["X-CSRFToken"] = csrf;
    }
    headers["Content-Type"] = "application/json";
    options.headers = headers;
    options.credentials = "include";
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        let errorMsg = "API error";
        try {
          const err = await response.json();
          errorMsg = err.detail || err.message || errorMsg;
        } catch {}
        throw new Error(errorMsg);
      }
      return await response.json();
    } catch (err) {
      if (err.name === "TypeError") {
        throw new Error("Network error. Please check your connection.");
      }
      throw err;
    }
  }

  // Token refresh logic with fallback
  async function refreshToken(refresh) {
    try {
      const data = await apiRequest("auth/token/refresh/", {
        method: "POST",
        body: JSON.stringify({ refresh }),
      });
      return data;
    } catch (err) {
      // Fallback: force logout or prompt re-authentication
      localStorage.removeItem("authTokens");
      window.location.href = "/Page/signin.html";
      throw err;
    }
  }

  global.AuthSDK = {
    setConfig,
    login,
    logout,
    refresh,
    getCSRFToken,
    authFetch,
    getTokens,
    setTokens,
    clearTokens,
    config,
  };
})(typeof window !== "undefined" ? window : globalThis);
