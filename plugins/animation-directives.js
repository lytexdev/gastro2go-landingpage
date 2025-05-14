// plugins/animation-directives.js
export default defineNuxtPlugin((nuxtApp) => {
  // v-animate directive for scroll-triggered animations
  nuxtApp.vueApp.directive("animate", {
    mounted(el, binding) {
      // Get animation settings from binding
      const animation = binding.value?.animation || binding.arg || "fadeIn";
      const delay = binding.value?.delay || 0;
      const duration = binding.value?.duration || 800;
      const threshold = binding.value?.threshold || 0.2;
      const once = binding.value?.once !== false; // Default to true

      // Create intersection observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Add animation class and custom styles
              setTimeout(() => {
                el.classList.add(`animation-${animation}`, "animation-active");
                el.style.animationDuration = `${duration}ms`;
              }, delay);

              // If animation should only happen once, disconnect observer
              if (once) {
                observer.disconnect();
              }
            } else if (!once) {
              // Remove animation class if not 'once'
              el.classList.remove("animation-active");
            }
          });
        },
        {
          threshold: threshold,
          rootMargin: "0px 0px -10% 0px", // Trigger slightly before element enters viewport
        }
      );

      // Add base animation class and observe element
      el.classList.add("animated-element", `animation-${animation}`);
      observer.observe(el);

      // Store observer on element to clean up later
      el._animation_observer = observer;
    },
    unmounted(el) {
      // Clean up observer
      if (el._animation_observer) {
        el._animation_observer.disconnect();
      }
    },
  });

  // v-parallax directive for parallax scrolling effects
  nuxtApp.vueApp.directive("parallax", {
    mounted(el, binding) {
      // Get parallax settings
      const speed = binding.value?.speed || binding.arg || 0.1;
      const direction = binding.value?.direction || "up";
      const limit = binding.value?.limit || 100;

      // Function to update element position on scroll
      const handleScroll = () => {
        const scrollY = window.pageYOffset;
        const rect = el.getBoundingClientRect();
        const elementTop = rect.top + scrollY;

        // Only apply effect when element is near viewport
        if (
          scrollY + window.innerHeight > elementTop &&
          scrollY < elementTop + rect.height
        ) {
          let yPos = 0;

          if (direction === "up") {
            yPos = -(scrollY * speed);
            if (yPos < -limit) yPos = -limit;
          } else {
            yPos = scrollY * speed;
            if (yPos > limit) yPos = limit;
          }

          // Use transform for better performance
          el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
      };

      // Add scroll event listener - throttled for performance
      let ticking = false;
      const scrollHandler = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener("scroll", scrollHandler, { passive: true });

      // Store handler for cleanup
      el._parallax_handler = scrollHandler;

      // Initial position setup
      handleScroll();
    },
    unmounted(el) {
      // Remove event listener
      if (el._parallax_handler) {
        window.removeEventListener("scroll", el._parallax_handler);
      }
    },
  });

  // Add animation classes to the document
  if (process.client) {
    const style = document.createElement("style");
    style.innerHTML = `
        .animated-element {
          opacity: 0;
          will-change: transform, opacity;
        }
        
        .animated-element.animation-active {
          animation-fill-mode: both;
          opacity: 1;
        }
        
        .animation-fadeIn {
          transform: translateY(30px);
        }
        
        .animation-fadeIn.animation-active {
          animation-name: fadeIn;
        }
        
        .animation-fadeInUp {
          transform: translateY(50px);
        }
        
        .animation-fadeInUp.animation-active {
          animation-name: fadeInUp;
        }
        
        .animation-fadeInDown {
          transform: translateY(-50px);
        }
        
        .animation-fadeInDown.animation-active {
          animation-name: fadeInDown;
        }
        
        .animation-fadeInLeft {
          transform: translateX(-50px);
        }
        
        .animation-fadeInLeft.animation-active {
          animation-name: fadeInLeft;
        }
        
        .animation-fadeInRight {
          transform: translateX(50px);
        }
        
        .animation-fadeInRight.animation-active {
          animation-name: fadeInRight;
        }
        
        .animation-zoomIn {
          transform: scale(0.85);
        }
        
        .animation-zoomIn.animation-active {
          animation-name: zoomIn;
        }
        
        .animation-zoomOut {
          transform: scale(1.15);
        }
        
        .animation-zoomOut.animation-active {
          animation-name: zoomOut;
        }
        
        .animation-flip {
          transform: rotateY(90deg);
          perspective: 1000px;
        }
        
        .animation-flip.animation-active {
          animation-name: flip;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes zoomOut {
          from {
            opacity: 0;
            transform: scale(1.15);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes flip {
          from {
            opacity: 0;
            transform: rotateY(90deg);
          }
          to {
            opacity: 1;
            transform: rotateY(0);
          }
        }
      `;
    document.head.appendChild(style);
  }
});
