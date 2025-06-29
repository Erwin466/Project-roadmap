// Example: Fetch, update, and logout user profile using apiRequest utility
import { apiRequest, showGlobalError } from "../Script/utils.js";
import { logout as authLogout } from "../Script/auth.js";

document.addEventListener("DOMContentLoaded", async function () {
  const profileContainer = document.getElementById("profile-container");
  const loadingDiv = document.createElement("div");
  loadingDiv.textContent = "Loading profile...";
  loadingDiv.className = "profile-loading-message";
  profileContainer.appendChild(loadingDiv);

  // Helper to render the profile form
  function renderProfileForm(profile) {
    profileContainer.innerHTML = "";

    // Success/Error message area
    const msgDiv = document.createElement("div");
    msgDiv.id = "profile-msg";
    msgDiv.style.marginBottom = "16px";
    profileContainer.appendChild(msgDiv);

    // Email (read-only)
    const emailDiv = document.createElement("div");
    emailDiv.innerHTML = `<strong>Email:</strong> ${profile.email}`;
    emailDiv.style.marginBottom = "12px";
    profileContainer.appendChild(emailDiv);

    // Name fields
    const nameForm = document.createElement("form");
    nameForm.id = "profile-update-form";
    nameForm.innerHTML = `
            <div class="input-group">
                <label for="firstName">First Name <span style="color:#ef4444">*</span></label>
                <input type="text" id="firstName" value="${profile.first_name || ""}" required />
            </div>
            <div class="input-group">
                <label for="lastName">Last Name <span style="color:#ef4444">*</span></label>
                <input type="text" id="lastName" value="${profile.last_name || ""}" required />
            </div>
            <div class="input-group">
                <label for="learningGoal">Learning Goal</label>
                <input type="text" id="learningGoal" value="${profile.learning_goal || ""}" />
            </div>
            <button type="submit" class="profile-btn">Update Profile</button>
        `;
    profileContainer.appendChild(nameForm);

    // Logout button
    const logoutBtn = document.createElement("button");
    logoutBtn.textContent = "Logout";
    logoutBtn.style.marginTop = "20px";
    logoutBtn.id = "logout-btn";
    logoutBtn.className = "profile-btn logout-btn";
    profileContainer.appendChild(logoutBtn);

    // Handle profile update
    nameForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      msgDiv.textContent = "";
      msgDiv.className = "";
      const updateBtn = nameForm.querySelector('button[type="submit"]');
      updateBtn.disabled = true;
      updateBtn.textContent = "Saving...";

      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const learningGoal = document.getElementById("learningGoal").value.trim();

      if (!firstName || !lastName) {
        msgDiv.textContent = "First and last name are required.";
        msgDiv.className = "error-message";
        updateBtn.disabled = false;
        updateBtn.textContent = "Update Profile";
        document.getElementById(!firstName ? "firstName" : "lastName").focus();
        return;
      }

      try {
        // Ensure AuthSDK exists before calling its methods
        // Use unified apiRequest utility for backend integration
        const updatedProfile = await apiRequest("users/me/", {
          method: "PATCH",
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            learning_goal: learningGoal,
          }),
        });
        renderProfileForm(updatedProfile);
        msgDiv.textContent = "Profile updated successfully!";
        msgDiv.className = "success-message";
      } catch (error) {
        msgDiv.textContent = error.message || "Could not update profile.";
        msgDiv.className = "error-message";
      }
      updateBtn.disabled = false;
      updateBtn.textContent = "Update Profile";
    });

    // Handle logout
    logoutBtn.addEventListener("click", async function () {
      logoutBtn.disabled = true;
      logoutBtn.textContent = "Logging out...";
      try {
        await authLogout();
        window.location.href = "signin.html";
      } catch {
        window.location.href = "signin.html";
      }
    });
  }

  try {
    // Ensure AuthSDK exists before calling its methods
    // Use unified apiRequest utility for backend integration
    const profile = await apiRequest("users/me/");
    renderProfileForm(profile);
  } catch (error) {
    profileContainer.innerHTML = "";
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent =
      error.message || "Could not load profile. Please sign in again.";
    profileContainer.appendChild(errorDiv);

    // Show global error notification for better UX
    showGlobalError(
      error.message || "Could not load profile. Please sign in again.",
    );

    // Optionally redirect to sign-in if unauthorized
    // setTimeout(() => window.location.href = 'signin.html', 2000);
  }
});
