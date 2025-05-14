// plugins/cursor-effects.js
export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    nuxtApp.hook("app:mounted", () => {
      // Only apply cursor effects on desktop
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      if (isMobile) return;

      // Create cursor elements
      const cursorDot = document.createElement("div");
      const cursorCircle = document.createElement("div");

      cursorDot.classList.add("cursor-dot");
      cursorCircle.classList.add("cursor-circle");

      document.body.appendChild(cursorDot);
      document.body.appendChild(cursorCircle);

      // Add cursor styles
      const style = document.createElement("style");
      style.innerHTML = `
          body {
            cursor: none;
          }
          
          a, button, .clickable, [role="button"] {
            cursor: none;
          }
          
          .cursor-dot {
            position: fixed;
            top: 0;
            left: 0;
            width: 8px;
            height: 8px;
            background-color: var(--color-primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 999999;
            transition: transform 0.1s ease;
          }
          
          .cursor-circle {
            position: fixed;
            top: 0;
            left: 0;
            width: 40px;
            height: 40px;
            border: 1px solid var(--color-primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 999998;
            transition: transform 0.15s ease, width 0.3s ease, height 0.3s ease, background-color 0.3s ease;
            transform: translate(-50%, -50%);
          }
          
          .cursor-hover {
            transform: translate(-50%, -50%) scale(1.5);
            background-color: rgba(var(--color-primary-rgb), 0.1);
            border-width: 2px;
          }
          
          .cursor-down {
            transform: translate(-50%, -50%) scale(0.9);
          }
          
          @media (max-width: 768px) {
            .cursor-dot, .cursor-circle {
              display: none;
            }
            
            body {
              cursor: auto;
            }
            
            a, button, .clickable, [role="button"] {
              cursor: pointer;
            }
          }
        `;
      document.head.appendChild(style);

      // Track mouse position with lerping for smooth movement
      let mouseX = 0;
      let mouseY = 0;
      let dotX = 0;
      let dotY = 0;
      let circleX = 0;
      let circleY = 0;

      document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      // Track cursor state
      let isHovering = false;
      let isDown = false;

      // Add hover effect to interactive elements
      const interactiveElements = document.querySelectorAll(
        'a, button, .clickable, [role="button"], input, textarea, select'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          cursorCircle.classList.add("cursor-hover");
          isHovering = true;
        });

        el.addEventListener("mouseleave", () => {
          cursorCircle.classList.remove("cursor-hover");
          isHovering = false;
        });
      });

      // Add click effect
      document.addEventListener("mousedown", () => {
        cursorCircle.classList.add("cursor-down");
        isDown = true;
      });

      document.addEventListener("mouseup", () => {
        cursorCircle.classList.remove("cursor-down");
        isDown = false;
      });

      // Animation loop for smooth cursor movement
      function animateCursor() {
        // Smooth movement with lerping
        const dotSpeed = 0.2;
        const circleSpeed = 0.1;

        dotX += (mouseX - dotX) * dotSpeed;
        dotY += (mouseY - dotY) * dotSpeed;

        circleX += (mouseX - circleX) * circleSpeed;
        circleY += (mouseY - circleY) * circleSpeed;

        // Apply transforms
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
        cursorCircle.style.transform = `translate(${circleX}px, ${circleY}px)`;

        requestAnimationFrame(animateCursor);
      }

      animateCursor();

      // Handle cursor visibility
      document.addEventListener("mouseenter", () => {
        cursorDot.style.opacity = "1";
        cursorCircle.style.opacity = "1";
      });

      document.addEventListener("mouseleave", () => {
        cursorDot.style.opacity = "0";
        cursorCircle.style.opacity = "0";
      });
    });
  }
});
