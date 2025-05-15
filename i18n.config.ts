export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'de',
  fallbackLocale: 'de',
  silentTranslationWarn: true,
  silentFallbackWarn: true,
  missingWarn: false,
  fallbackWarn: false,
  messages: {
    de: {
      meta: {
        title: 'Gastro2Go.io - Digitalisierung für Gastronomen',
        description: 'Bestellungen, Treuepunkte, Reservierungen – alles in einer App. Die Digital-Plattform für Restaurants ohne Provisionen.',
        keywords: 'Gastronomy, Restaurant, App, Bestellsystem, Digitalisierung, Gastronomie, QR-Code, Online-Bestellung'
      },
      nav: {
        home: 'Start',
        benefits: 'Vorteile',
        demo: 'Demo',
        pricing: 'Preise',
        features: 'Funktionen',
        about: 'Über uns',
        contact: 'Kontakt',
        language: 'Sprache',
        login: 'Login',
        register: 'Registrieren',
        cta: 'Jetzt starten'
      },
      hero: {
        title: 'Dein Restaurant. Deine Plattform.',
        subtitle: 'Bestellungen, Treuepunkte, Reservierungen – alles in einer App.',
        typewriter: [
          'Digitalisiere dein Restaurant ohne Provisionen',
          'Mehr Umsatz durch digitale Bestellungen',
          'Stärke deine Kundenbindung mit Treuepunkten',
          'Spare Zeit und Kosten durch Automatisierung',
          'Behalte die volle Kontrolle über deine Daten',
          'Profitiere von 24/7 Support und Updates',
          'Starte in 30 Tagen ohne Risiko',
          'Werde Teil der digitalen Gastronomie-Revolution'
        ],
        cta: 'Jetzt kostenlos starten',
        demo: 'Live-Demo ansehen',
        stats: {
          restaurants: 'Restaurants',
          orders: 'Bestellungen',
          customers: 'Kunden'
        }
      }
    },
    en: {}
  }
})) 