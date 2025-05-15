export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Gastro2Go - Digitale Speisekarte für Restaurants',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Digitale Speisekarte für Restaurants - einfach, modern und effizient' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/images/logo.svg' }
      ],
      htmlAttrs: {
        lang: 'de'
      }
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  css: ['~/assets/scss/main.scss'],
  modules: [
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
  ],
  i18n: {
    vueI18n: './i18n.config.ts',
    locales: [
      { code: 'de', iso: 'de-DE', file: 'de.json', name: 'Deutsch' },
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' }
    ],
    defaultLocale: 'de',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    langDir: 'locales/',
    lazy: true,
    compilation: {
      strictMessage: false,
      escapeHtml: false
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/_variables.scss"; @import "@/assets/scss/_mixins.scss";'
        }
      }
    }
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://gastro2go.io'
    }
  },
  nitro: {
    compressPublicAssets: true,
  },
  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true,
    viewTransition: true
  },
  routeRules: {
    '/': { prerender: true },
    '/images/**': { static: true }
  },
  image: {
    dir: 'public/images'
  }
})
