// Helper to check authentication state using AuthSDK
function checkAuthState() {
  if (window.AuthSDK && typeof window.AuthSDK.getTokens === "function") {
    const tokens = window.AuthSDK.getTokens && window.AuthSDK.getTokens();
    return !!tokens || window.AuthSDK.config.useCookies;
  }
  // Fallback: check localStorage for legacy support
  return !!localStorage.getItem("authTokens");
}

// Modularize code, add intersection observer, accessibility, and auth state nav

document.addEventListener("DOMContentLoaded", () => {
  // Keyboard navigation improvements
  document.body.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      document.body.classList.add("user-tabbing");
    }
  });

  // Intersection observer for animations
  const fadeEls = document.querySelectorAll(".fade-in");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    });
    fadeEls.forEach((el) => observer.observe(el));
  }

  // Auth state nav
  const isAuth = checkAuthState();
  document.getElementById("nav-dashboard").style.display = isAuth ? "" : "none";
  document.getElementById("nav-signin").style.display = isAuth ? "none" : "";
  document.getElementById("nav-signup").style.display = isAuth ? "none" : "";
  document.getElementById("nav-logout").style.display = isAuth ? "" : "none";
  document.getElementById("nav-logout").onclick = () => {
    localStorage.removeItem("authTokens");
    window.location.reload();
  };

  let topDiv = document.getElementById("top");
  let middleTop = document.getElementById("middle-top");
  let lottieElement1 = document.getElementById("lottieElement1");
  let lottieElement2 = document.getElementById("lottieElement2");

  // Function to set responsive dimensions
  function setResponsiveDimensions() {
    let screenWidth = window.innerWidth;

    topDiv.style.width = "100%";
    middleTop.style.width = "100%";

    // Responsive positioning for lottie elements
    if (screenWidth <= 480) {
      // Mobile
      lottieElement1.style.left = `${screenWidth * 0.25}px`;
      lottieElement1.style.width = `${screenWidth * 0.5}px`;
      lottieElement2.style.width = `${screenWidth * 0.5}px`;
    } else if (screenWidth <= 768) {
      // Tablet
      lottieElement1.style.left = `${screenWidth * 0.3}px`;
      lottieElement1.style.width = `${screenWidth * 0.4}px`;
      lottieElement2.style.width = `${screenWidth * 0.4}px`;
    } else {
      // Desktop
      lottieElement1.style.left = `${screenWidth * 0.35}px`;
      lottieElement1.style.width = `${screenWidth * 0.25}px`;
      lottieElement2.style.width = `${screenWidth * 0.25}px`;
    }
  }

  // Set initial dimensions
  setResponsiveDimensions();

  // Handle window resize
  window.addEventListener("resize", setResponsiveDimensions);

  // setInterval(() => {
  //     if (window.scrollY > 1000) {
  //         lottieElement2.style.opacity = 1;
  //         lottieElement2.style.top = `${1500}px`;
  //         lottieElement2.style.left = `${700}px`;}
  //     else {
  //         lottieElement2.style.opacity = 0;
  //         lottieElement2.style.top = `${500}px`;
  //         lottieElement2.style.left = `${200}px`;}
  //     }, 1000);

  let lastScrollY = 0;

  window.addEventListener("wheel", (event) => {
    let screenWidth = window.innerWidth;
    let isMobile = screenWidth <= 768;

    // Adjust animation scale based on screen size
    let scaleValue = isMobile ? 2 : 4;
    let topOffset = isMobile ? -1000 : -2000;

    if (event.deltaY > 0 && lastScrollY == 0) {
      // Show the left rocket and start animation
      lottieElement1.style.top = `${topOffset}px`;
      lottieElement1.style.scale = scaleValue;
      lottieElement2.style.opacity = 1;
      setTimeout(
        () => {
          lottieElement2.classList.remove("lottieElement2backward");
          lottieElement2.classList.add("lottieElement2forward");
          window.scrollTo({
            top: isMobile ? window.innerHeight : 1080,
            behavior: "smooth",
          });
        },
        isMobile ? 200 : 300,
      );
    }
    if (event.deltaY < 0 && lastScrollY == 1080) {
      lottieElement2.classList.remove("lottieElement2forward");
      lottieElement2.classList.add("lottieElement2backward");
      setTimeout(
        () => {
          lottieElement1.style.top = `${200}px`;
          lottieElement1.style.scale = 1;
          // Hide the left rocket when returning to top
          lottieElement2.style.opacity = 0;
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        },
        isMobile ? 400 : 800,
      );
    }
    lastScrollY = window.scrollY;
    console.log(lastScrollY);
  });

  // Touch support for mobile devices
  let touchStartY = 0;
  let touchEndY = 0;

  document.addEventListener("touchstart", (e) => {
    touchStartY = e.changedTouches[0].screenY;
  });

  document.addEventListener("touchend", (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  });

  function handleSwipe() {
    let screenWidth = window.innerWidth;
    let isMobile = screenWidth <= 768;

    if (touchEndY < touchStartY - 50) {
      // Swipe up - scroll down
      let scaleValue = isMobile ? 2 : 4;
      let topOffset = isMobile ? -1000 : -2000;

      lottieElement1.style.top = `${topOffset}px`;
      lottieElement1.style.scale = scaleValue;

      // Show the left rocket and start animation
      lottieElement2.style.opacity = 1;
      setTimeout(
        () => {
          lottieElement2.classList.remove("lottieElement2backward");
          lottieElement2.classList.add("lottieElement2forward");
          window.scrollTo({
            top: isMobile ? window.innerHeight : 1080,
            behavior: "smooth",
          });
        },
        isMobile ? 200 : 300,
      );
    }

    if (touchEndY > touchStartY + 50) {
      // Swipe down - scroll up
      lottieElement2.classList.remove("lottieElement2forward");
      lottieElement2.classList.add("lottieElement2backward");
      setTimeout(
        () => {
          lottieElement1.style.top = `${200}px`;
          lottieElement1.style.scale = 1;
          // Hide the left rocket when returning to top
          lottieElement2.style.opacity = 0;
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        },
        isMobile ? 400 : 800,
      );
    }
  }
});
