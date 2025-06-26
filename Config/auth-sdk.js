// Auth SDK for automatic JWT token management
// Supports httpOnly cookies (recommended) and localStorage fallback

(function (global) {
  const config = {
    apiBase: '/api/',
    useCookies: true, // Prefer httpOnly cookies
    storageKey: 'jwt_tokens',
    refreshEndpoint: '/auth/refresh/',
    loginEndpoint: '/auth/login/',
    logoutEndpoint: '/auth/logout/',
    csrfEndpoint: '/auth/csrf/',
    tokenStatusEndpoint: '/auth/token-status/',
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
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Login failed');
    const data = await res.json();
    setTokens(data);
    config.onAuthEvent && config.onAuthEvent('login', data);
    return data;
  }

  async function logout() {
    await fetch(config.apiBase + config.logoutEndpoint, {
      method: 'POST',
      credentials: 'include',
    });
    clearTokens();
    config.onAuthEvent && config.onAuthEvent('logout');
  }

  async function refresh() {
    const res = await fetch(config.apiBase + config.refreshEndpoint, {
      method: 'POST',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Token refresh failed');
    const data = await res.json();
    setTokens(data);
    config.onAuthEvent && config.onAuthEvent('refresh', data);
    return data;
  }

  async function getCSRFToken() {
    const res = await fetch(config.apiBase + config.csrfEndpoint, {
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to get CSRF token');
    return res.headers.get('X-CSRFToken') || '';
  }

  // HTTP interceptor for fetch
  function authFetch(input, init = {}) {
    init.credentials = 'include';
    if (!config.useCookies) {
      const tokens = getTokens();
      if (tokens && tokens.access) {
        init.headers = Object.assign({}, init.headers, {
          Authorization: 'Bearer ' + tokens.access,
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
          config.onAuthEvent && config.onAuthEvent('logout');
        }
      }
      return res;
    });
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
})(typeof window !== 'undefined' ? window : globalThis);
