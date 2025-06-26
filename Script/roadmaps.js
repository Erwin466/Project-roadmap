// Roadmaps Page Interactive Functionality

import { apiRequest } from "../Config/auth-sdk.js";

document.addEventListener("DOMContentLoaded", function () {
  console.log("Roadmaps page loaded");

  // Initialize page functionality
  initializeCardAnimations();
  initializeSkillTagInteractions();
  initializeStartLearningButtons();
  initializeScrollEffects();
  loadCourses();
  loadUserGamification();

  // Add smooth scrolling for any anchor links
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

// Card hover animations and interactions
function initializeCardAnimations() {
  const cards = document.querySelectorAll(".roadmap-card");

  cards.forEach((card) => {
    // Add tilt effect on mouse move for circular cards
    card.addEventListener("mousemove", function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.05)`;
    });

    // Reset transform on mouse leave
    card.addEventListener("mouseleave", function () {
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";
    });

    // Add click animation for circular cards
    card.addEventListener("click", function (e) {
      if (!e.target.closest(".start-btn")) {
        card.style.transform += " scale(0.95)";
        setTimeout(() => {
          card.style.transform = card.style.transform.replace(
            " scale(0.95)",
            "",
          );
        }, 150);
      }
    });
  });
}

// Skill tag interactions
function initializeSkillTagInteractions() {
  const skillTags = document.querySelectorAll(".skill-tag");

  skillTags.forEach((tag) => {
    tag.addEventListener("click", function () {
      // Add a pulse animation when clicked
      tag.style.animation = "pulse 0.6s ease";

      // Reset animation after completion
      setTimeout(() => {
        tag.style.animation = "";
      }, 600);

      // You could add functionality here to filter or search related content
      console.log(`Clicked on skill: ${tag.textContent}`);
    });
  });
}

// Start Learning button functionality
function initializeStartLearningButtons() {
  const startButtons = document.querySelectorAll(".start-btn");

  startButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Add loading animation
      const originalText = button.textContent;
      button.style.background = "linear-gradient(135deg, #34a853, #4285f4)";
      button.textContent = "Loading...";
      button.style.pointerEvents = "none";

      // Get roadmap type from card title
      const cardTitle =
        this.closest(".roadmap-card").querySelector(".card-title").textContent;
      const roadmapType = getRoadmapType(cardTitle);

      // Simulate loading and redirect to detailed roadmap
      setTimeout(() => {
        window.location.href = `roadmap-detail.html?type=${roadmapType}`;
      }, 1000);
    });
  });
}

// Helper function to convert card title to roadmap type
function getRoadmapType(title) {
  const typeMap = {
    "AI/ML Engineer": "ai-ml-engineer",
    "Web Scraping Specialist": "web-scraping",
    "AI Student": "ai-student",
    "Freelance Software Developer": "freelance-dev",
    "Full Stack Web Developer": "fullstack",
    "Mobile App Developer": "mobile-dev",
  };

  return typeMap[title] || "ai-ml-engineer";
}

// Scroll effects
function initializeScrollEffects() {
  let ticking = false;

  function updateScrollEffects() {
    const scrolled = window.pageYOffset;
    const nav = document.getElementById("nav");

    // Add/remove background opacity based on scroll
    if (scrolled > 50) {
      nav.style.background = "rgba(10, 10, 10, 0.98)";
    } else {
      nav.style.background = "rgba(10, 10, 10, 0.95)";
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
}

// Intersection Observer for card animations
function initializeIntersectionObserver() {
  const cards = document.querySelectorAll(".roadmap-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  cards.forEach((card) => {
    observer.observe(card);
  });
}

// Add pulse animation keyframes
const style = document.createElement("style");
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }

    @keyframes glow {
        0% { box-shadow: 0 0 5px rgba(66, 133, 244, 0.3); }
        50% { box-shadow: 0 0 20px rgba(66, 133, 244, 0.6); }
        100% { box-shadow: 0 0 5px rgba(66, 133, 244, 0.3); }
    }
`;
document.head.appendChild(style);

// Filter functionality (for future enhancement)
function filterRoadmaps(category) {
  const cards = document.querySelectorAll(".roadmap-card");

  cards.forEach((card) => {
    const cardCategory = card.dataset.category;

    if (category === "all" || cardCategory === category) {
      card.style.display = "block";
      card.style.opacity = "1";
    } else {
      card.style.opacity = "0.3";
    }
  });
}

// Search functionality (for future enhancement)
function searchRoadmaps(query) {
  const cards = document.querySelectorAll(".roadmap-card");
  const searchTerm = query.toLowerCase();

  cards.forEach((card) => {
    const title = card.querySelector(".card-title").textContent.toLowerCase();
    const description = card
      .querySelector(".card-description")
      .textContent.toLowerCase();
    const skills = Array.from(card.querySelectorAll(".skill-tag"))
      .map((tag) => tag.textContent.toLowerCase())
      .join(" ");

    if (
      title.includes(searchTerm) ||
      description.includes(searchTerm) ||
      skills.includes(searchTerm)
    ) {
      card.style.display = "block";
      card.style.opacity = "1";
    } else {
      card.style.display = "none";
    }
  });
}

// Course loading and rendering
const courseList = document.getElementById("course-list");
const loading = document.getElementById("loading");
const errorMsg = document.getElementById("error-msg");
const searchInput = document.getElementById("search-input");
const filterForm = document.getElementById("filter-form");
let currentPage = 1;
let totalPages = 1;

async function loadCourses(page = 1, search = "", filters = {}) {
  loading.style.display = "block";
  errorMsg.textContent = "";
  try {
    let url = `courses/?page=${page}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    // Add filter params
    Object.keys(filters).forEach((key) => {
      url += `&${key}=${encodeURIComponent(filters[key])}`;
    });
    const data = await apiRequest(url);
    renderCourses(data.results);
    currentPage = data.page;
    totalPages = data.total_pages;
    renderPagination();
  } catch (err) {
    errorMsg.textContent = err.message;
  } finally {
    loading.style.display = "none";
  }
}

function renderCourses(courses) {
  courseList.innerHTML = "";
  if (!courses.length) {
    courseList.innerHTML = "<p>No courses found.</p>";
    return;
  }
  courses.forEach((course) => {
    const el = document.createElement("div");
    el.className = "course-card";
    el.innerHTML = `
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <span>Progress: ${course.progress || 0}%</span>
            <a href="roadmap-detail.html?id=${course.id}">View Details</a>
        `;
    courseList.appendChild(el);
  });
}

function renderPagination() {
  // ...implement pagination controls...
}

searchInput.addEventListener("input", () => {
  loadCourses(1, searchInput.value, getFilters());
});

filterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loadCourses(1, searchInput.value, getFilters());
});

function getFilters() {
  // ...extract filter values from form...
  return {};
}

// Gamification integration
async function loadUserGamification() {
  try {
    const data = await apiRequest("gamification/profile/");
    // ...render user points, badges, etc...
  } catch {}
}

// Export functions for potential external use
window.RoadmapsPage = {
  filterRoadmaps,
  searchRoadmaps,
};
