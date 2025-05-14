export default defineNuxtPlugin(({ $i18n }) => {
  const router = useRouter()
  const route = useRoute()

  // Initialize language based on browser preferences
  const initializeLanguage = () => {
    if (process.client) {
      try {
        // Check for stored user preference
        const storedLocale = localStorage.getItem('user-locale')
        if (storedLocale && ['de', 'en'].includes(storedLocale)) {
          $i18n.locale.value = storedLocale
          return
        }

        // Check browser language
        const browserLang = navigator.language.split('-')[0]
        if (browserLang && ['de', 'en'].includes(browserLang)) {
          $i18n.locale.value = browserLang
        } else {
          $i18n.locale.value = 'de'
        }
      } catch (error) {
        console.error('Error initializing language:', error)
        $i18n.locale.value = 'de'
      }
    }
  }

  // Update HTML lang attribute
  const updateHtmlLang = (locale) => {
    if (process.client) {
      try {
        document.documentElement.lang = locale
      } catch (error) {
        console.error('Error updating HTML lang attribute:', error)
      }
    }
  }

  // Initialize language on client-side
  if (process.client) {
    initializeLanguage()
    updateHtmlLang($i18n.locale.value)
  }

  // Watch for locale changes
  watch($i18n.locale, (newLocale) => {
    if (process.client) {
      // Update HTML lang attribute
      updateHtmlLang(newLocale)

      // Update metadata for SEO
      try {
        useHead({
          htmlAttrs: {
            lang: newLocale
          }
        })
      } catch (error) {
        console.error('Error updating metadata:', error)
      }

      // Store user preference
      try {
        localStorage.setItem('user-locale', newLocale)
      } catch (error) {
        console.error('Error storing language preference:', error)
      }

      // Handle routing
      const currentPath = route.fullPath
      const pathWithoutLocale = currentPath.replace(/^\/[a-z]{2}(?=\/|$)/, '')

      if (newLocale === 'de') {
        router.push(pathWithoutLocale)
      } else {
        router.push(`/${newLocale}${pathWithoutLocale}`)
      }
    }
  })
})
