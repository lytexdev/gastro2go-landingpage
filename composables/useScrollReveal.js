// composables/useScrollReveal.js
import { onMounted, onUnmounted } from "vue";

export default function useScrollReveal() {
  let observer = null;

  const createObserver = () => {
    const options = {
      root: null, // use viewport as root
      rootMargin: "0px 0px -10% 0px", // trigger slightly before element enters viewport
      threshold: [0.1, 0.2, 0.5, 0.8], // multiple thresholds for granular control
    };

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Get animation style from data attribute
        const style = entry.target.dataset.animation || "fade-up";
        const delay = entry.target.dataset.delay || 0;

        // Add appropriate animation class when element enters viewport
        if (entry.isIntersecting) {
          // Set delay if specified
          if (delay) {
            entry.target.style.animationDelay = `${delay}s`;
          }

          // Add animation class
          entry.target.classList.add("animated", style);

          // Add specific threshold-based classes for progressive animations
          if (entry.intersectionRatio > 0.5) {
            entry.target.classList.add("half-visible");
          }

          if (entry.intersectionRatio > 0.8) {
            entry.target.classList.add("mostly-visible");
          }
        }
      });
    }, options);

    // Observe all elements with the 'scroll-reveal' class
    document.querySelectorAll(".scroll-reveal").forEach((element) => {
      observer.observe(element);
    });
  };

  const destroyObserver = () => {
    if (observer) {
      observer.disconnect();
    }
  };

  onMounted(() => {
    // Small delay to ensure DOM is fully rendered
    setTimeout(createObserver, 100);

    // Add necessary CSS for animations
    const style = document.createElement("style");
    style.innerHTML = `
      .scroll-reveal {
        opacity: 0;
        will-change: transform, opacity;
      }
      
      .scroll-reveal.animated {
        animation-duration: 0.8s;
        animation-fill-mode: both;
        opacity: 1;
      }
      
      @keyframes fade-up {
        from {
          opacity: 0;
          transform: translateY(40px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes fade-down {
        from {
          opacity: 0;
          transform: translateY(-40px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes fade-left {
        from {
          opacity: 0;
          transform: translateX(-40px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes fade-right {
        from {
          opacity: 0;
          transform: translateX(40px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes zoom-in {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      @keyframes zoom-out {
        from {
          opacity: 0;
          transform: scale(1.1);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      @keyframes flip {
        from {
          opacity: 0;
          transform: perspective(400px) rotateY(90deg);
        }
        to {
          opacity: 1;
          transform: perspective(400px) rotateY(0deg);
        }
      }
      
      @keyframes spin {
        from {
          opacity: 0;
          transform: rotate(360deg) scale(0.5);
        }
        to {
          opacity: 1;
          transform: rotate(0) scale(1);
        }
      }
      
      /* Progressive animation classes */
      .scroll-reveal.half-visible {
        opacity: 0.7;
      }
      
      .scroll-reveal.mostly-visible {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  });

  onUnmounted(() => {
    destroyObserver();
  });

  return {
    destroyObserver,
  };
}
