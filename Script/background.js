class AnimatedBackground {
  constructor() {
    this.init();
    this.setupEventListeners();
  }

  init() {
    this.createBackgroundElement();
    this.createParticles();
    this.createGeometricShapes();
    this.createOrbs();
    this.createGridPattern();
    this.createWaveEffect();
    this.startAnimations();
  }

  createBackgroundElement() {
    // Create main background container
    const bgContainer = document.createElement("div");
    bgContainer.className = "animated-background";
    bgContainer.id = "animated-bg";

    // Insert at the beginning of body
    document.body.insertBefore(bgContainer, document.body.firstChild);
    this.container = bgContainer;
  }

  createParticles() {
    const particlesContainer = document.createElement("div");
    particlesContainer.className = "particles";

    // Create multiple particles
    for (let i = 1; i <= 15; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";

      // Random properties for more variety
      const size = Math.random() * 4 + 1;
      const left = Math.random() * 100;
      const delay = Math.random() * 20;
      const duration = Math.random() * 15 + 15;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${left}%`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;

      particlesContainer.appendChild(particle);
    }

    this.container.appendChild(particlesContainer);
  }

  createGeometricShapes() {
    const shapesContainer = document.createElement("div");
    shapesContainer.className = "geometric-shapes";

    // Create 5 different geometric shapes
    for (let i = 1; i <= 5; i++) {
      const shape = document.createElement("div");
      shape.className = "shape";

      // Random positioning and timing
      const top = Math.random() * 80 + 10;
      const left = Math.random() * 80 + 10;
      const delay = Math.random() * 25;

      shape.style.top = `${top}%`;
      shape.style.left = `${left}%`;
      shape.style.animationDelay = `${delay}s`;

      shapesContainer.appendChild(shape);
    }

    this.container.appendChild(shapesContainer);
  }

  createOrbs() {
    const orbsContainer = document.createElement("div");
    orbsContainer.className = "orbs";

    // Create 3 pulsing orbs
    for (let i = 1; i <= 3; i++) {
      const orb = document.createElement("div");
      orb.className = "orb";

      const delay = (i - 1) * 2;
      orb.style.animationDelay = `${delay}s`;

      orbsContainer.appendChild(orb);
    }

    this.container.appendChild(orbsContainer);
  }

  createGridPattern() {
    const gridPattern = document.createElement("div");
    gridPattern.className = "grid-pattern";
    this.container.appendChild(gridPattern);
  }

  createWaveEffect() {
    const waveEffect = document.createElement("div");
    waveEffect.className = "wave-effect";
    this.container.appendChild(waveEffect);
  }

  startAnimations() {
    // Add random movement to particles periodically
    setInterval(() => {
      this.addRandomParticle();
    }, 3000);

    // Occasionally create shooting stars
    setInterval(() => {
      this.createShootingStar();
    }, 8000);
  }

  addRandomParticle() {
    const particlesContainer = this.container.querySelector(".particles");
    if (particlesContainer.children.length < 20) {
      const particle = document.createElement("div");
      particle.className = "particle";

      const size = Math.random() * 3 + 1;
      const left = Math.random() * 100;
      const duration = Math.random() * 10 + 15;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${left}%`;
      particle.style.animationDuration = `${duration}s`;

      particlesContainer.appendChild(particle);

      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, duration * 1000);
    }
  }

  createShootingStar() {
    const shootingStar = document.createElement("div");
    shootingStar.style.position = "absolute";
    shootingStar.style.width = "2px";
    shootingStar.style.height = "2px";
    shootingStar.style.background = "rgba(147, 197, 253, 0.9)";
    shootingStar.style.borderRadius = "50%";
    shootingStar.style.boxShadow = "0 0 8px rgba(147, 197, 253, 0.7)";
    shootingStar.style.top = Math.random() * 50 + "%";
    shootingStar.style.left = "-10px";
    shootingStar.style.zIndex = "-9";

    this.container.appendChild(shootingStar);

    // Animate shooting star
    shootingStar.animate(
      [
        { transform: "translateX(-10px) translateY(0px)", opacity: 0 },
        { transform: "translateX(50px) translateY(-20px)", opacity: 1 },
        {
          transform:
            "translateX(" + (window.innerWidth + 100) + "px) translateY(-40px)",
          opacity: 0,
        },
      ],
      {
        duration: 2000,
        easing: "ease-out",
      },
    ).onfinish = () => {
      if (shootingStar.parentNode) {
        shootingStar.parentNode.removeChild(shootingStar);
      }
    };
  }

  setupEventListeners() {
    // Adjust animations based on device performance
    if (window.innerWidth <= 768) {
      this.container.style.animationDuration = "0.8s";
    }

    // Handle window resize
    window.addEventListener("resize", () => {
      this.adjustForScreenSize();
    });

    // Pause animations when tab is not visible (performance optimization)
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.pauseAnimations();
      } else {
        this.resumeAnimations();
      }
    });
  }

  adjustForScreenSize() {
    const isMobile = window.innerWidth <= 768;
    const particles = this.container.querySelectorAll(".particle");

    particles.forEach((particle) => {
      if (isMobile) {
        particle.style.animationDuration = "12s";
      } else {
        particle.style.animationDuration = "20s";
      }
    });
  }

  pauseAnimations() {
    this.container.style.animationPlayState = "paused";
    const animatedElements = this.container.querySelectorAll("*");
    animatedElements.forEach((el) => {
      el.style.animationPlayState = "paused";
    });
  }

  resumeAnimations() {
    this.container.style.animationPlayState = "running";
    const animatedElements = this.container.querySelectorAll("*");
    animatedElements.forEach((el) => {
      el.style.animationPlayState = "running";
    });
  }

  // Method to change background theme
  changeTheme(theme) {
    const themes = {
      space:
        "linear-gradient(135deg, #0c0c0c 0%, #1a0033 25%, #000814 50%, #001d3d 75%, #003566 100%)",
      ocean:
        "linear-gradient(135deg, #001845 0%, #002855 25%, #003566 50%, #0077b6 75%, #00b4d8 100%)",
      sunset:
        "linear-gradient(135deg, #2d1b69 0%, #11998e 25%, #38ef7d 50%, #ffd89b 75%, #19547b 100%)",
      night:
        "linear-gradient(135deg, #2c3e50 0%, #34495e 25%, #2c3e50 50%, #bdc3c7 75%, #2c3e50 100%)",
    };

    if (themes[theme]) {
      this.container.style.background = themes[theme];
    }
  }

  // Method to destroy background (for cleanup)
  destroy() {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}

// Initialize the animated background when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.animatedBackground = new AnimatedBackground();
});

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = AnimatedBackground;
}
