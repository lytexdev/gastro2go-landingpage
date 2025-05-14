<template>
  <div class="landing-page" v-i18n-seo="{ title: 'meta.title', description: 'meta.description', keywords: 'meta.keywords' }">
    <HeroSection />
    <BenefitsSection />
    <DemoSection />
    <PricingSection />
    <FeaturesSection />
    <TestimonialsSection />
    <AboutSection />
    <ContactSection />
  </div>
</template>

<script setup>
import HeroSection from '../components/sections/HeroSection.vue';
import BenefitsSection from '../components/sections/BenefitsSection.vue';
import DemoSection from '../components/sections/DemoSection.vue';
import PricingSection from '../components/sections/PricingSection.vue';
import FeaturesSection from '../components/sections/FeaturesSection.vue';
import TestimonialsSection from '../components/sections/TestimonialsSection.vue';
import AboutSection from '../components/sections/AboutSection.vue';
import ContactSection from '../components/sections/ContactSection.vue';

const { t } = useI18n();

// Set page metadata
useHead({
  title: t('meta.title'),
  meta: [
    { name: 'description', content: t('meta.description') },
    { name: 'keywords', content: t('meta.keywords') },
    // Open Graph metadata
    { property: 'og:title', content: t('meta.title') },
    { property: 'og:description', content: t('meta.description') },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://gastro2go.io' },
    { property: 'og:image', content: 'https://gastro2go.io/social-preview.jpg' },
    // Twitter Cards
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: t('meta.title') },
    { name: 'twitter:description', content: t('meta.description') },
    { name: 'twitter:image', content: 'https://gastro2go.io/social-preview.jpg' },
  ]
});

// Add structured data for SEO
const jsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  'name': 'Gastro2Go.io',
  'applicationCategory': 'BusinessApplication',
  'operatingSystem': 'Web, iOS, Android',
  'description': t('meta.description'),
  'offers': {
    '@type': 'Offer',
    'price': '49',
    'priceCurrency': 'EUR',
    'priceValidUntil': '2025-12-31'
  },
  'aggregateRating': {
    '@type': 'AggregateRating',
    'ratingValue': '4.8',
    'ratingCount': '12'
  }
}));

// Add structured data to head
onMounted(() => {
  updateStructuredData();
  
  // Watch for locale changes to update structured data
  const { locale } = useI18n();
  watch(locale, () => {
    updateStructuredData();
  });
});

// Function to update structured data
const updateStructuredData = () => {
  // Remove old script tag if exists
  const existingScript = document.getElementById('structured-data');
  if (existingScript) {
    existingScript.remove();
  }
  
  // Add new script tag with updated data
  const script = document.createElement('script');
  script.id = 'structured-data';
  script.type = 'application/ld+json';
  script.text = JSON.stringify(jsonLd.value);
  document.head.appendChild(script);
};
</script>

<style>
.landing-page {
  overflow-x: hidden;
}
</style>
