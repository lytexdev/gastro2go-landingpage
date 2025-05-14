// plugins/page-transitions.js
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("page:start", () => {
    // Add a loading class to indicate navigation started
    document.body.classList.add("page-transition");
  });

  nuxtApp.hook("page:finish", () => {
    // Remove the loading class
    setTimeout(() => {
      document.body.classList.remove("page-transition");
    }, 200); // Small delay to ensure smooth transitions
  });

  // Add transition styles to the document
  if (process.client) {
    const style = document.createElement("style");
    style.innerHTML = `
        .page-transition {
          position: relative;
        }
        
        .page-transition::after {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(5px);
          z-index: 9999;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        
        .page-transition.active::after {
          opacity: 1;
        }
      `;
    document.head.appendChild(style);
  }
});
