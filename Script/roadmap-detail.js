// Roadmap Detail Page Functionality

import { apiRequest } from "../Config/auth-sdk.js";

document.addEventListener("DOMContentLoaded", function () {
  console.log("Roadmap detail page loaded");

  // Get roadmap data from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const roadmapType = urlParams.get("type") || "ai-ml-engineer";
  window.courseId = urlParams.get("id");

  // Initialize page with roadmap data
  initializeRoadmapData(roadmapType);
  initializePhaseToggle();
  initializeLessonButtons();
  initializeActionButtons();
  initializeProgress();

  // Smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// Roadmap data configuration
const roadmapData = {
  "ai-ml-engineer": {
    title: "AI/ML Engineer",
    badge: "HOT TREND",
    badgeClass: "hot",
    subtitle: "Master the complete journey from beginner to AI/ML expert",
    stats: {
      duration: "12-18 Months",
      lessons: "150+ Lessons",
      projects: "25+ Projects",
      level: "Beginner",
    },
  },
  "web-scraping": {
    title: "Web Scraping Specialist",
    badge: "POPULAR",
    badgeClass: "popular",
    subtitle: "Master web data extraction and automation techniques",
    stats: {
      duration: "6-8 Months",
      lessons: "80+ Lessons",
      projects: "15+ Projects",
      level: "Intermediate",
    },
  },
  "ai-student": {
    title: "AI Student Path",
    badge: "BEGINNER",
    badgeClass: "beginner",
    subtitle: "Perfect roadmap for AI university students",
    stats: {
      duration: "4-6 Months",
      lessons: "60+ Lessons",
      projects: "10+ Projects",
      level: "Beginner",
    },
  },
  "freelance-dev": {
    title: "Freelance Software Developer",
    badge: "FLEXIBLE",
    badgeClass: "flexible",
    subtitle: "Build skills for successful freelancing career",
    stats: {
      duration: "8-10 Months",
      lessons: "120+ Lessons",
      projects: "20+ Projects",
      level: "Intermediate",
    },
  },
  fullstack: {
    title: "Full Stack Web Developer",
    badge: "IN-DEMAND",
    badgeClass: "popular",
    subtitle: "Complete frontend and backend development mastery",
    stats: {
      duration: "10-12 Months",
      lessons: "140+ Lessons",
      projects: "25+ Projects",
      level: "Beginner",
    },
  },
  "mobile-dev": {
    title: "Mobile App Developer",
    badge: "TRENDING",
    badgeClass: "trending",
    subtitle: "Build native and cross-platform mobile applications",
    stats: {
      duration: "8-10 Months",
      lessons: "100+ Lessons",
      projects: "15+ Projects",
      level: "Intermediate",
    },
  },
};

// Initialize roadmap data based on type
function initializeRoadmapData(roadmapType) {
  const data = roadmapData[roadmapType];
  if (!data) return;

  // Update page title
  document.title = `${data.title} Roadmap - Learn and Master`;
  document.getElementById("roadmap-title").textContent =
    `${data.title} Roadmap`;

  // Update header content
  const badge = document.getElementById("roadmap-badge");
  const titleMain = document.getElementById("roadmap-title-main");
  const subtitle = document.getElementById("roadmap-subtitle");

  badge.textContent = data.badge;
  badge.className = `roadmap-badge ${data.badgeClass}`;
  titleMain.textContent = data.title;
  subtitle.textContent = data.subtitle;

  // Update stats
  const statItems = document.querySelectorAll(".stat-item");
  const statsArray = Object.values(data.stats);

  statItems.forEach((item, index) => {
    if (statsArray[index]) {
      const number = item.querySelector(".stat-number");
      const label = item.querySelector(".stat-label");

      if (index === 0) {
        number.textContent = statsArray[0].split(" ")[0];
        label.textContent = statsArray[0].split(" ")[1];
      } else {
        const parts = statsArray[index].split(" ");
        number.textContent = parts[0];
        label.textContent = parts.slice(1).join(" ");
      }
    }
  });
}

// Phase toggle functionality
function initializePhaseToggle() {
  const phaseHeaders = document.querySelectorAll(".phase-header");

  phaseHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const phase = this.parentElement;
      const content = phase.querySelector(".phase-content");
      const isExpanded = content.style.display === "block";

      // Close all other phases
      document.querySelectorAll(".phase-content").forEach((otherContent) => {
        if (otherContent !== content) {
          otherContent.style.display = "none";
        }
      });

      // Toggle current phase
      content.style.display = isExpanded ? "none" : "block";

      // Add animation
      if (!isExpanded) {
        content.style.opacity = "0";
        content.style.transform = "translateY(-10px)";
        setTimeout(() => {
          content.style.transition = "all 0.3s ease";
          content.style.opacity = "1";
          content.style.transform = "translateY(0)";
        }, 10);
      }
    });
  });

  // Open first phase by default
  const firstPhaseContent = document.querySelector(".phase-content");
  if (firstPhaseContent) {
    firstPhaseContent.style.display = "block";
  }
}

// Lesson button functionality
function initializeLessonButtons() {
  const lessonButtons = document.querySelectorAll(".lesson-btn:not(:disabled)");

  lessonButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const lessonItem = this.closest(".lesson-item");
      const lessonTitle = lessonItem.querySelector("h5").textContent;

      // Add loading state
      const originalText = button.textContent;
      button.textContent = "Loading...";
      button.style.pointerEvents = "none";

      // Simulate lesson start
      setTimeout(() => {
        alert(
          `Starting lesson: ${lessonTitle}\n\nThis would open the lesson content or redirect to the learning platform.`,
        );

        // Reset button
        button.textContent = "Continue";
        button.style.pointerEvents = "auto";
        button.style.background = "linear-gradient(135deg, #4caf50, #8bc34a)";

        // Update progress
        updateProgress(5); // Add 5% progress
      }, 1000);
    });
  });
}

// Action buttons functionality
function initializeActionButtons() {
  const enrollBtn = document.getElementById("enroll-btn");
  const previewBtn = document.getElementById("preview-btn");

  enrollBtn.addEventListener("click", function () {
    // Add enrollment animation
    const originalText = this.textContent;
    this.textContent = "Processing...";
    this.style.pointerEvents = "none";

    setTimeout(() => {
      alert(
        "Enrollment successful! Welcome to your learning journey.\n\nYou would be redirected to the course dashboard or payment page.",
      );
      this.textContent = "Enrolled ✓";
      this.style.background = "linear-gradient(135deg, #4caf50, #8bc34a)";
    }, 2000);
  });

  previewBtn.addEventListener("click", function () {
    alert(
      "Opening course preview...\n\nThis would show a modal or redirect to preview content.",
    );
  });
}

// Progress management
let currentProgress = 0;

function initializeProgress() {
  loadCourseDetail();
  loadGamification();
}

async function loadCourseDetail() {
  try {
    const course = await apiRequest(`courses/${window.courseId}/`);
    renderCourse(course);
    loadProgress();
  } catch (err) {
    lessonContainer.innerHTML = `<p>${err.message}</p>`;
  }
}

function renderCourse(course) {
  // ...render course title, description, lessons...
}

async function loadProgress() {
  try {
    const progress = await apiRequest(
      `courses/progress/?course_id=${window.courseId}`,
    );
    // ...update progress bar, show completed lessons...
  } catch {}
}

function updateProgress(increment) {
  currentProgress = Math.min(100, currentProgress + increment);
  // localStorage.setItem('roadmap-progress', currentProgress);
  updateProgressDisplay();
}

function updateProgressDisplay() {
  const progressFill = document.getElementById("progress-fill");
  const progressPercentage = document.getElementById("progress-percentage");

  progressFill.style.width = `${currentProgress}%`;
  progressPercentage.textContent = `${currentProgress}%`;

  // Add celebration effect for milestones
  if (currentProgress % 25 === 0 && currentProgress > 0) {
    celebrateProgress();
  }
}

function celebrateProgress() {
  // Add celebration animation
  const progressSection = document.getElementById("progress-section");
  progressSection.style.transform = "scale(1.02)";
  progressSection.style.boxShadow = "0 10px 30px rgba(66, 133, 244, 0.3)";

  setTimeout(() => {
    progressSection.style.transform = "scale(1)";
    progressSection.style.boxShadow = "";
  }, 300);
}

enrollBtn.addEventListener("click", async () => {
  try {
    await apiRequest("courses/enrollments/", {
      method: "POST",
      body: JSON.stringify({ course_id: window.courseId }),
    });
    loadProgress();
  } catch (err) {
    alert(err.message);
  }
});

async function completeLesson(lessonId) {
  try {
    await apiRequest("courses/completion/", {
      method: "POST",
      body: JSON.stringify({ course_id: window.courseId, lesson_id: lessonId }),
    });
    loadProgress();
    loadGamification();
  } catch (err) {
    alert(err.message);
  }
}

async function loadGamification() {
  try {
    const data = await apiRequest("gamification/profile/");
    // ...render points, badges, etc...
  } catch {}
}

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    // Close any open modals or return to previous page
    if (document.referrer.includes("roadmaps.html")) {
      window.history.back();
    }
  }
});

// Scroll effects
let ticking = false;

function updateScrollEffects() {
  const scrolled = window.pageYOffset;
  const nav = document.getElementById("nav");

  // Keep navigation transparent like main page (no background change on scroll)
  // No background changes needed - nav should stay transparent

  // Parallax effect for header
  const header = document.getElementById("roadmap-header");
  if (header) {
    header.style.transform = `translateY(${scrolled * 0.1}px)`;
  }

  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateScrollEffects);
    ticking = true;
  }
}

window.addEventListener("scroll", requestTick);

// Export functions for external use
window.RoadmapDetail = {
  updateProgress,
  initializeRoadmapData,
};
