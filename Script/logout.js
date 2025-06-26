// Logout integration using new auth.js logout method and redirect to signin.html
import { logout } from "../Script/auth.js";

document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.getElementById("logout-btn");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", async function (e) {
    e.preventDefault();
    try {
      await logout();
    } catch (error) {
      // Optionally show an error, but always redirect for security
      // alert(error.message || "Logout failed");
    }
    window.location.href = "signin.html";
  });
});
