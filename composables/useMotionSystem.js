// composables/useMotionSystem.js
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";

/**
 * Enhanced motion system that provides unified animations, parallax,
 * scroll-triggered effects, and microinteractions
 */
export default function useMotionSystem() {
  // Configuration
  const config = {
    animations: {
      staggerDelay: 0.08, // Delay between staggered items
      thresholds: {
        default: 0.15, // Default intersection threshold
        hero: 0.05, // More sensitive for hero section
        detailed: 0.25, // More details for important components
      },
      durations: {
        fast: 600, // Quick animations
        default: 800, // Standard animations
        slow: 1200, // Slower, more eye-catching animations
      },
      easings: {
        smooth: "cubic-bezier(0.33, 1, 0.68, 1)", // Smooth, professional easing
        bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)", // Slight bounce
        spring: "cubic-bezier(0.22, 1, 0.36, 1)", // Spring-like motion
      },
    },
    scrollEffects: {
      parallaxIntensity: 0.1, // Default parallax intensity
      scrollSpeedDamper: 0.1, // How quickly scroll events are damped
    },
    interaction: {
      hoverScale: 1.03, // Subtle scale on hover
      activeTap: 0.97, // Slight reduction on active/tap
    },
    performance: {
      useWillChange: true, // Use will-change for better performance
      disableOnReducedMotion: true, // Respect prefers-reduced-motion
    },
  };

  // State
  const animatedElements = ref([]);
  const parallaxElements = ref([]);
  const staggerGroups = ref([]);
  const intersectionObservers = ref({});
  const prefersReducedMotion = ref(false);

  // Check for reduced motion preference
  onMounted(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      prefersReducedMotion.value = mediaQuery.matches;

      // Listen for changes
      const updateMotionPreference = (e) => {
        prefersReducedMotion.value = e.matches;
        updateAnimationState();
      };

      mediaQuery.addEventListener("change", updateMotionPreference);

      // Clean up
      onBeforeUnmount(() => {
        mediaQuery.removeEventListener("change", updateMotionPreference);
      });
    }
  });

  // Update all animations based on motion preference
  const updateAnimationState = () => {
    if (
      prefersReducedMotion.value &&
      config.performance.disableOnReducedMotion
    ) {
      // Apply instant transitions to all animated elements
      animatedElements.value.forEach((el) => {
        if (el && el.style) {
          el.style.transitionDuration = "0s";
          el.style.animationDuration = "0s";
          el.style.transform = "none";
          el.classList.add("animate-in"); // Add the class to make content visible
        }
      });

      // Disable parallax effects
      parallaxElements.value.forEach((el) => {
        if (el && el.style) {
          el.style.transform = "none";
        }
      });
    }
  };

  /**
   * Initialize scroll-triggered animations for elements
   */
  const initScrollAnimations = () => {
    nextTick(() => {
      // Find all elements with animation classes
      animatedElements.value = document.querySelectorAll(
        ".fade-in, .animate-on-scroll, [data-animation]"
      );

      // Set up intersection observer
      const observerOptions = {
        root: null,
        rootMargin: "0px 0px -10% 0px", // Trigger slightly before element is in view
        threshold: config.animations.thresholds.default,
      };

      const handleIntersection = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add animation class
            entry.target.classList.add("animate-in", "visible");

            // If this is part of a stagger group, find and animate related elements
            const staggerGroup = entry.target.closest(".stagger-group");
            if (staggerGroup) {
              animateStaggerGroup(staggerGroup);
            }
          }
        });
      };

      // Create observer
      const observer = new IntersectionObserver(
        handleIntersection,
        observerOptions
      );

      // Start observing elements
      animatedElements.value.forEach((element) => {
        observer.observe(element);
      });

      // Store for cleanup
      intersectionObservers.value.standard = observer;
    });
  };

  /**
   * Initialize parallax effects for elements with the 'parallax' class
   */
  const initParallaxEffects = () => {
    nextTick(() => {
      // Find all parallax elements
      parallaxElements.value = document.querySelectorAll(
        ".parallax, [data-parallax]"
      );

      // No parallax if reduced motion is preferred
      if (
        prefersReducedMotion.value &&
        config.performance.disableOnReducedMotion
      ) {
        return;
      }

      // Add scroll event listener for parallax
      const handleScroll = () => {
        const scrollY = window.scrollY;

        parallaxElements.value.forEach((element) => {
          // Get custom speed or use default
          const speed = parseFloat(
            element.dataset.speed || config.scrollEffects.parallaxIntensity
          );
          const direction = element.dataset.direction || "up";

          // Calculate element position relative to viewport
          const rect = element.getBoundingClientRect();
          const elementMiddle = rect.top + rect.height / 2;
          const viewportMiddle = window.innerHeight / 2;
          const distanceFromCenter = elementMiddle - viewportMiddle;

          // Only animate elements that are near viewport
          if (Math.abs(distanceFromCenter) < window.innerHeight * 1.2) {
            let transform;

            if (direction === "up" || direction === "down") {
              // Vertical parallax
              const yOffset =
                direction === "up"
                  ? -speed * distanceFromCenter
                  : speed * distanceFromCenter;
              transform = `translate3d(0, ${yOffset}px, 0)`;
            } else {
              // Horizontal parallax
              const xOffset =
                direction === "left"
                  ? -speed * distanceFromCenter
                  : speed * distanceFromCenter;
              transform = `translate3d(${xOffset}px, 0, 0)`;
            }

            // Apply transform with GPU acceleration
            element.style.transform = transform;

            // Add will-change for better performance
            if (config.performance.useWillChange) {
              element.style.willChange = "transform";
            }
          }
        });
      };

      // Use throttled scroll for better performance
      let ticking = false;
      const throttledScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener("scroll", throttledScroll, { passive: true });

      // Run once to set initial positions
      handleScroll();

      // Clean up on unmount
      onBeforeUnmount(() => {
        window.removeEventListener("scroll", throttledScroll);
      });
    });
  };

  /**
   * Initialize staggered animations for groups of elements
   */
  const initStaggeredAnimations = () => {
    nextTick(() => {
      // Find all stagger groups
      staggerGroups.value = document.querySelectorAll(".stagger-group");

      // Set up intersection observer
      const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: config.animations.thresholds.default,
      };

      const handleIntersection = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate the stagger group
            animateStaggerGroup(entry.target);

            // Unobserve after animation triggered
            intersectionObservers.value.stagger?.unobserve(entry.target);
          }
        });
      };

      // Create observer
      const observer = new IntersectionObserver(
        handleIntersection,
        observerOptions
      );

      // Start observing stagger groups
      staggerGroups.value.forEach((group) => {
        observer.observe(group);
      });

      // Store for cleanup
      intersectionObservers.value.stagger = observer;
    });
  };

  /**
   * Animate elements in a stagger group with progressive delays
   */
  const animateStaggerGroup = (group) => {
    // Skip if reduced motion is preferred
    if (
      prefersReducedMotion.value &&
      config.performance.disableOnReducedMotion
    ) {
      const children = group.querySelectorAll(
        ".stagger-item, .fade-in, .animate-on-scroll"
      );
      children.forEach((child) => {
        child.classList.add("animate-in", "visible");
      });
      return;
    }

    // Get custom delay or use default
    const delay = parseFloat(
      group.dataset.staggerDelay || config.animations.staggerDelay
    );

    // Get all child items to stagger
    const children = group.querySelectorAll(
      ".stagger-item, .fade-in, .animate-on-scroll"
    );

    // Apply progressive delays
    children.forEach((child, index) => {
      const itemDelay = delay * index;
      child.style.transitionDelay = `${itemDelay}s`;
      child.style.animationDelay = `${itemDelay}s`;

      // Trigger animation after a small layout delay
      setTimeout(() => {
        child.classList.add("animate-in", "visible");
      }, 10);

      // Reset delay after animation completes (for hover effects)
      const animDuration =
        parseFloat(getComputedStyle(child).transitionDuration) * 1000;
      setTimeout(() => {
        child.style.transitionDelay = "0s";
      }, itemDelay * 1000 + animDuration + 50);
    });
  };

  /**
   * Initialize smooth scrolling for anchor links
   */
  const initSmoothScrolling = () => {
    nextTick(() => {
      document
        .querySelectorAll('a[href^="#"]:not([href="#"])')
        .forEach((anchor) => {
          anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
              // Get header height for offset
              const header = document.querySelector("header");
              const headerOffset = header ? header.offsetHeight : 0;

              // Calculate position
              const elementPosition = targetElement.getBoundingClientRect().top;
              const offsetPosition =
                elementPosition + window.pageYOffset - headerOffset - 20;

              // Scroll smoothly
              window.scrollTo({
                top: offsetPosition,
                behavior: prefersReducedMotion.value ? "auto" : "smooth",
              });

              // Update URL
              history.pushState(null, null, targetId);
            }
          });
        });
    });
  };

  /**
   * Initialize magnetic effect on elements with the 'magnetic' class
   */
  const initMagneticEffect = () => {
    if (
      prefersReducedMotion.value &&
      config.performance.disableOnReducedMotion
    ) {
      return;
    }

    nextTick(() => {
      const magneticElements = document.querySelectorAll(".magnetic");

      magneticElements.forEach((element) => {
        // Get custom power or use default
        const power = parseFloat(element.dataset.power || 25);

        // Handle mouse movement
        element.addEventListener("mousemove", (e) => {
          const rect = element.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          element.style.transform = `translate(${x / power}px, ${y / power}px)`;
        });

        // Reset on mouse leave
        element.addEventListener("mouseleave", () => {
          element.style.transform = "translate(0, 0)";
          element.style.transition = "transform 0.5s ease";
        });

        // Remove transition on mouse enter for smoother effect
        element.addEventListener("mouseenter", () => {
          element.style.transition = "transform 0.1s ease";
        });
      });
    });
  };

  /**
   * Initialize number counter animation for elements with data-counter attribute
   */
  const initCounterAnimations = () => {
    nextTick(() => {
      const counterElements = document.querySelectorAll("[data-counter]");

      // Skip if reduced motion is preferred
      if (
        prefersReducedMotion.value &&
        config.performance.disableOnReducedMotion
      ) {
        counterElements.forEach((element) => {
          const target = parseInt(element.dataset.counter);
          element.textContent = target;
        });
        return;
      }

      // Set up intersection observer
      const observerOptions = {
        root: null,
        threshold: 0.5,
      };

      const handleIntersection = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);

            // Unobserve after animation triggered
            intersectionObservers.value.counter?.unobserve(entry.target);
          }
        });
      };

      // Create observer
      const observer = new IntersectionObserver(
        handleIntersection,
        observerOptions
      );

      // Start observing counter elements
      counterElements.forEach((element) => {
        observer.observe(element);
      });

      // Store for cleanup
      intersectionObservers.value.counter = observer;
    });
  };

  /**
   * Animate a counter element from 0 to target value
   */
  const animateCounter = (element) => {
    const target = parseInt(element.dataset.counter);
    const duration = parseInt(element.dataset.duration || 2000);
    const prefix = element.dataset.prefix || "";
    const suffix = element.dataset.suffix || "";

    let startTime = null;
    let currentNumber = 0;

    const countAnimation = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (progress < duration) {
        // Calculate the current number based on progress with easing
        currentNumber = Math.floor(easeOutQuart(progress, 0, target, duration));
        element.textContent = `${prefix}${currentNumber}${suffix}`;
        requestAnimationFrame(countAnimation);
      } else {
        element.textContent = `${prefix}${target}${suffix}`;
      }
    };

    requestAnimationFrame(countAnimation);
  };

  /**
   * Easing function for smoother animations
   * Ease out quart provides a nice acceleration curve
   */
  const easeOutQuart = (t, b, c, d) => {
    t /= d;
    t--;
    return -c * (t * t * t * t - 1) + b;
  };

  /**
   * Initialize all animations and effects
   */
  const initAnimationSystem = () => {
    nextTick(() => {
      initScrollAnimations();
      initParallaxEffects();
      initStaggeredAnimations();
      initSmoothScrolling();
      initMagneticEffect();
      initCounterAnimations();

      // Add global styles
      addGlobalAnimationStyles();
    });
  };

  /**
   * Add global animation styles to the document
   */
  const addGlobalAnimationStyles = () => {
    if (typeof document === "undefined") return;

    // Create style element
    const style = document.createElement("style");
    style.id = "motion-system-styles";
    style.innerHTML = `
      /* Base animation classes */
      .fade-in, .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity ${config.animations.durations.default}ms ${config.animations.easings.smooth},
                    transform ${config.animations.durations.default}ms ${config.animations.easings.smooth};
        will-change: opacity, transform;
      }
      
      .fade-in.animate-in, .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
      }
      
      /* Variants */
      .fade-up {
        transform: translateY(40px);
      }
      
      .fade-down {
        transform: translateY(-40px);
      }
      
      .fade-left {
        transform: translateX(-40px);
      }
      
      .fade-right {
        transform: translateX(40px);
      }
      
      .fade-scale {
        transform: scale(0.9);
      }
      
      /* Stagger animations */
      .stagger-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity ${config.animations.durations.default}ms ${config.animations.easings.smooth},
                    transform ${config.animations.durations.default}ms ${config.animations.easings.smooth};
      }
      
      .stagger-item.animate-in {
        opacity: 1;
        transform: translateY(0);
      }
      
      /* Hover effects */
      .hover-lift {
        transition: transform 0.3s ${config.animations.easings.smooth};
      }
      
      .hover-lift:hover {
        transform: translateY(-5px);
      }
      
      .hover-scale {
        transition: transform 0.3s ${config.animations.easings.smooth};
      }
      
      .hover-scale:hover {
        transform: scale(${config.interaction.hoverScale});
      }
      
      /* Active state */
      .hover-scale:active, .hover-lift:active {
        transform: scale(${config.interaction.activeTap});
        transition-duration: 0.1s;
      }
      
      /* Magnetic effect base */
      .magnetic {
        transition: transform 0.5s ${config.animations.easings.smooth};
      }
      
      /* Special animations */
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      
      .float {
        animation: float 5s ease-in-out infinite;
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      
      .pulse {
        animation: pulse 3s ease-in-out infinite;
      }
      
      /* Reduced motion */
      @media (prefers-reduced-motion: reduce) {
        .fade-in, .animate-on-scroll, .stagger-item, .magnetic, 
        .hover-lift, .hover-scale, .float, .pulse {
          transition: none !important;
          animation: none !important;
          transform: none !important;
        }
      }
    `;

    // Add style to document
    document.head.appendChild(style);
  };

  /**
   * Clean up all observers and event listeners
   */
  const cleanupAnimationSystem = () => {
    // Clean up all intersection observers
    Object.values(intersectionObservers.value).forEach((observer) => {
      if (observer) observer.disconnect();
    });

    // Remove the animation styles
    const styleEl = document.getElementById("motion-system-styles");
    if (styleEl) styleEl.remove();
  };

  // Initialize on mount
  onMounted(() => {
    initAnimationSystem();
  });

  // Clean up on unmount
  onBeforeUnmount(() => {
    cleanupAnimationSystem();
  });

  // Return utility functions that can be used in components
  return {
    animateElement: (element, options = {}) => {
      if (!element) return;

      const delay = options.delay || 0;
      setTimeout(() => {
        element.classList.add("animate-in");
      }, delay);
    },

    animateStaggerGroup,

    // Apply a specific animation to an element
    applyAnimation: (element, animation, options = {}) => {
      if (!element) return;

      // Remove any existing animation classes
      element.classList.remove(
        "fade-up",
        "fade-down",
        "fade-left",
        "fade-right",
        "fade-scale"
      );

      // Add the specified animation class
      element.classList.add(animation);

      // Apply delay if specified
      if (options.delay) {
        element.style.transitionDelay = `${options.delay}s`;
      }

      // Trigger the animation
      setTimeout(() => {
        element.classList.add("animate-in");
      }, 10);
    },
  };
}
