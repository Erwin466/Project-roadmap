/**
 * Social Login Utility
 * Handles redirecting users to the backend OAuth2 login endpoints for Google and GitHub.
 * Usage:
 *   import { handleSocialLogin } from "./social-login.js";
 *   document.getElementById("google-login").onclick = () => handleSocialLogin("google");
 *   document.getElementById("github-login").onclick = () => handleSocialLogin("github");
 */

import { API_BASE_URL } from "../Config/api.js";

/**
 * Redirects the user to the backend OAuth2 login endpoint for the given provider.
 * @param {"google"|"github"} provider
 */
export function handleSocialLogin(provider) {
  if (!provider || (provider !== "google" && provider !== "github")) {
    throw new Error("Unsupported social login provider.");
  }
  // Construct the backend OAuth2 login URL
  const url = `${API_BASE_URL}auth/oauth2/login/${provider}/`;
  window.location.href = url;
}

/**
 * Optionally, call this on page load to check for OAuth errors in the URL.
 * If an error is present, display a user-friendly message.
 * Usage:
 *   import { checkSocialLoginError } from "./social-login.js";
 *   checkSocialLoginError();
 */
export function checkSocialLoginError() {
  const params = new URLSearchParams(window.location.search);
  const error = params.get("error");
  if (error) {
    alert(
      "Social login failed: " + decodeURIComponent(error.replace(/\+/g, " ")),
    );
    // Optionally, remove the error from the URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}
