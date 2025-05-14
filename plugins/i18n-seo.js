export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("i18n-seo", {
    mounted(el, binding, vnode) {
      const { $i18n } = nuxtApp;

      // Function to update SEO metadata
      const updateSEOMetadata = (newLocale) => {
        const { title, description, keywords } = binding.value || {};

        // Skip if no metadata keys were provided
        if (!title && !description && !keywords) return;

        // Update head metadata
        const metaTags = document.head.querySelectorAll("meta");
        let titleTag = document.head.querySelector("title");

        // Update title if exists
        if (title && titleTag) {
          titleTag.textContent = $i18n.t(title);
        }

        // Update meta tags
        metaTags.forEach((tag) => {
          const name = tag.getAttribute("name");
          const property = tag.getAttribute("property");

          // Update description
          if (
            description &&
            (name === "description" || property === "og:description")
          ) {
            tag.setAttribute("content", $i18n.t(description));
          }

          // Update keywords
          if (keywords && name === "keywords") {
            tag.setAttribute("content", $i18n.t(keywords));
          }

          // Update og:title
          if (title && property === "og:title") {
            tag.setAttribute("content", $i18n.t(title));
          }
        });
      };

      // Initial update
      updateSEOMetadata($i18n.locale.value);

      // Listen for locale changes
      $i18n.$on("locale:changed", (newLocale) => {
        updateSEOMetadata(newLocale);
      });

      // Store cleanup function on element
      el._cleanup = () => {
        $i18n.$off("locale:changed", updateSEOMetadata);
      };
    },

    unmounted(el) {
      // Clean up listener
      if (el._cleanup) {
        el._cleanup();
      }
    },
  });
});
