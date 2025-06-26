// Logout integration using AuthSDK.logout and redirect to signin.html
// Assumes AuthSDK is loaded globally via <script src="../Config/auth-sdk.js"></script>
/* global AuthSDK */

document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.getElementById("logout-btn");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", async function (e) {
    e.preventDefault();
    try {
      // Ensure AuthSDK exists before calling logout
      if (typeof AuthSDK !== "undefined" && AuthSDK.logout) {
        await AuthSDK.logout();
      }
    } catch (error) {
      // Optionally show an error, but always redirect for security
      // alert(error.message || "Logout failed");
    }
    window.location.href = "signin.html";
  });
});
