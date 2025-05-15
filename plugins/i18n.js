export default defineNuxtPlugin(async (nuxtApp) => {
  const { $i18n } = nuxtApp;

  // Set language based on browser preference on first visit (if not already set)
  const initializeLanguage = () => {
    if (process.client) {
      // Check if we have a stored preference in localStorage
      const storedLang = localStorage.getItem("preferredLanguage");

      if (storedLang && storedLang !== $i18n.locale.value) {
        // Use stored preference
        $i18n.setLocale(storedLang);
      } else if (!storedLang) {
        // Get browser language
        const browserLang = navigator.language.split("-")[0];

        // Only set the language if it's one of our supported locales
        const availableLocales = $i18n.locales.value.map(
          (locale) => locale.code
        );

        if (
          availableLocales.includes(browserLang) &&
          browserLang !== $i18n.locale.value
        ) {
          $i18n.setLocale(browserLang);
          // Store this preference
          localStorage.setItem("preferredLanguage", browserLang);
        } else {
          // Store current locale as preference for future visits
          localStorage.setItem("preferredLanguage", $i18n.locale.value);
        }
      }
    }
  };

  // Update HTML lang attribute when language changes
  const updateHtmlLang = (newLocale) => {
    if (process.client) {
      document.documentElement.setAttribute("lang", newLocale);
    }
  };

  // Run initialization
  nuxtApp.hook("app:mounted", () => {
    initializeLanguage();
    updateHtmlLang($i18n.locale.value);
  });

  // Watch for locale changes to update HTML lang attribute
  watch($i18n.locale, (newLocale) => {
    updateHtmlLang(newLocale);

    // Update metadata for SEO when language changes
    const head = nuxtApp._appConfig.head;
    if (head && head.htmlAttrs) {
      head.htmlAttrs.lang = newLocale;
    }

    // Store user preference
    if (process.client) {
      localStorage.setItem("preferredLanguage", newLocale);
    }
  });
});
