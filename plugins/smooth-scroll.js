// plugins/smooth-scroll.js
export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    nuxtApp.hook("app:mounted", () => {
      // Find all links that point to internal anchors
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();

          // Get the target element
          const targetId = this.getAttribute("href");

          // Skip empty anchors
          if (targetId === "#") return;

          const targetElement = document.querySelector(targetId);

          if (targetElement) {
            // Smooth scroll to target with easing
            const headerOffset = 80; // Adjust based on your fixed header height
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - headerOffset;

            // Create a custom animation function with easing
            const startPosition = window.pageYOffset;
            const distance = offsetPosition - startPosition;
            let startTime = null;

            function smoothScroll(currentTime) {
              if (startTime === null) startTime = currentTime;
              const timeElapsed = currentTime - startTime;
              const duration = 1000; // ms

              // Easing function (ease-out-cubic)
              const run = easeOutCubic(
                timeElapsed,
                startPosition,
                distance,
                duration
              );
              window.scrollTo(0, run);

              if (timeElapsed < duration) {
                requestAnimationFrame(smoothScroll);
              }
            }

            // Easing function: easeOutCubic
            function easeOutCubic(t, b, c, d) {
              t /= d;
              t--;
              return c * (t * t * t + 1) + b;
            }

            // Start the animation
            requestAnimationFrame(smoothScroll);

            // Update URL hash after scrolling (optional)
            history.pushState(null, null, targetId);
          }
        });
      });

      // Handle initial hash in URL (for direct linking to sections)
      if (window.location.hash) {
        setTimeout(() => {
          const targetElement = document.querySelector(window.location.hash);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 500); // Small delay to ensure page is loaded
      }
    });
  }
});
