<template>
  <section id="features" class="features-section">
    <div class="container">
      <div class="section-header text-center">
        <h2 v-animate="'fadeInUp'">{{ $t('features.title') }}</h2>
        <p class="section-subtitle" v-animate="{ animation: 'fadeInUp', delay: 0.2 }">
          {{ $t('features.subtitle') }}
        </p>
      </div>
      
      <div class="features-tabs">
        <!-- 3D Interactive Feature Tabs -->
        <div class="tabs-wrapper">
          <div class="tabs-container" ref="tabsContainer" :style="{ transform: `rotateY(${rotationY}deg) rotateX(${rotationX}deg)` }">
            <button 
              v-for="(category, index) in featureCategories" 
              :key="index"
              class="tab-button-3d"
              :class="{ 
                'active': activeTab === index,
                'next': (index === activeTab + 1) || (activeTab === featureCategories.length - 1 && index === 0),
                'prev': (index === activeTab - 1) || (activeTab === 0 && index === featureCategories.length - 1)
              }"
              :style="getTabPosition(index)"
              @click="setActiveTab(index)"
            >
              <div class="tab-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <component :is="getIconComponent(category.icon)" />
                </svg>
              </div>
              <span>{{ category.name }}</span>
            </button>
          </div>
        </div>
        
        <!-- Tab Content with Animations -->
        <div class="tabs-content">
          <transition-group 
            name="tab-transition" 
            mode="out-in"
          >
            <div 
              v-for="(category, index) in featureCategories" 
              :key="index"
              class="tab-panel"
              v-show="activeTab === index"
            >
              <div class="feature-list stagger-group" data-base-delay="0.1">
                <div 
                  v-for="(feature, featureIndex) in category.features" 
                  :key="featureIndex"
                  class="feature-item"
                >
                  <div class="feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M5 12l5 5l10 -10"></path>
                    </svg>
                  </div>
                  <span>{{ feature }}</span>
                </div>
              </div>
              
              <div class="feature-image-wrapper">
                <div class="feature-image-container" :class="{ 'animate-in': activeTab === index }">
                  <img 
                    :src="`/images/features/${category.icon}.webp`" 
                    :alt="category.name"
                    loading="lazy"
                    width="400"
                    height="300"
                    class="feature-image"
                  />
                  
                  <!-- Feature highlights that animate in -->
                  <div class="feature-highlight highlight-1">
                    <div class="highlight-dot"></div>
                    <div class="highlight-content">
                      <h4>{{ getFeatureHighlight(index, 0).title }}</h4>
                      <p>{{ getFeatureHighlight(index, 0).desc }}</p>
                    </div>
                  </div>
                  
                  <div class="feature-highlight highlight-2">
                    <div class="highlight-dot"></div>
                    <div class="highlight-content">
                      <h4>{{ getFeatureHighlight(index, 1).title }}</h4>
                      <p>{{ getFeatureHighlight(index, 1).desc }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
    
    <!-- Background decoration -->
    <div class="decoration-grid"></div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import useAnimations from '~/composables/useAnimations';

// Get translations for feature categories
const { t } = useI18n();

const featureCategories = computed(() => {
  // Direct access to the translation structure
  const categories = [];
  for (let i = 0; i < 8; i++) {
    categories.push({
      name: t(`features.categories.${i}.name`),
      icon: t(`features.categories.${i}.icon`),
      features: [
        t(`features.categories.${i}.features.0`),
        t(`features.categories.${i}.features.1`),
        t(`features.categories.${i}.features.2`),
        t(`features.categories.${i}.features.3`)
      ]
    });
  }
  return categories;
});

const activeTab = ref(0);
const tabsContainer = ref(null);
const rotationX = ref(0);
const rotationY = ref(0);
let autoRotateInterval = null;
let mouseX = 0;
let mouseY = 0;

// Dynamically position tabs in 3D space
const getTabPosition = (index) => {
  const totalTabs = featureCategories.value.length;
  const angle = (index * (360 / totalTabs)) * (Math.PI / 180);
  const radius = 200;
  
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  
  return {
    transform: `translateX(${x}px) translateZ(${z}px)`
  };
};

// Set active tab with animation
const setActiveTab = (index) => {
  // Reset auto-rotate interval on user interaction
  if (autoRotateInterval) {
    clearInterval(autoRotateInterval);
  }
  
  // Animate to new tab
  const totalTabs = featureCategories.value.length;
  const targetAngle = -(index * (360 / totalTabs));
  
  // Smoothly rotate to the selected tab
  rotationY.value = targetAngle;
  
  // Update active tab after a short delay
  setTimeout(() => {
    activeTab.value = index;
  }, 300);
  
  // Restart auto-rotate after user interaction
  startAutoRotate();
};

// Auto-rotate tabs
const startAutoRotate = () => {
  if (autoRotateInterval) {
    clearInterval(autoRotateInterval);
  }
  
  autoRotateInterval = setInterval(() => {
    activeTab.value = (activeTab.value + 1) % featureCategories.value.length;
    
    // Update rotation to match active tab
    const totalTabs = featureCategories.value.length;
    rotationY.value = -(activeTab.value * (360 / totalTabs));
  }, 5000); // Change tab every 5 seconds
};

// Handle mouse move for 3D effect
const handleMouseMove = (e) => {
  if (!tabsContainer.value) return;
  
  const rect = tabsContainer.value.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  mouseX = e.clientX - centerX;
  mouseY = e.clientY - centerY;
  
  // Calculate rotation based on mouse position
  rotationX.value = -(mouseY / rect.height) * 10;
  rotationY.value = (mouseX / rect.width) * 10 - (activeTab.value * (360 / featureCategories.value.length));
};

// Generate feature highlights dynamically
const getFeatureHighlight = (categoryIndex, highlightIndex) => {
  // Sample highlight data (in a real app, this would come from translations)
  const highlights = [
    [
      { title: "Einfach", desc: "Schnell implementiert" },
      { title: "Intuitiv", desc: "Keine Schulung nötig" }
    ],
    [
      { title: "Flexibel", desc: "Anpassbare Zeiten" },
      { title: "Übersichtlich", desc: "Alle Termine auf einen Blick" }
    ],
    [
      { title: "Motivierend", desc: "Kunden kommen wieder" },
      { title: "Personalisiert", desc: "Individuelle Angebote" }
    ],
    [
      { title: "Datenbasiert", desc: "Fundierte Entscheidungen" },
      { title: "Automatisch", desc: "Ohne Mehraufwand" }
    ],
    [
      { title: "Attraktiv", desc: "Mehr Umsatz" },
      { title: "Flexibel", desc: "Beliebige Rabatte" }
    ],
    [
      { title: "Zeitsparend", desc: "Automatisierte Abläufe" },
      { title: "Effizient", desc: "Optimierte Bestellprozesse" }
    ],
    [
      { title: "Direkt", desc: "Sofortige Infos" },
      { title: "Zielgenau", desc: "Relevante Updates" }
    ],
    [
      { title: "Zuverlässig", desc: "Höchste Standards" },
      { title: "Geschützt", desc: "Daten in Deutschland" }
    ]
  ];
  
  // Return highlight or fallback if not available
  return highlights[categoryIndex]?.[highlightIndex] || { title: "Feature", desc: "Beschreibung" };
};

// SVG icon components
const getIconComponent = (iconName) => {
  // Map each icon name to its corresponding Tabler icon template
  switch (iconName) {
    case 'shopping-cart':
      return {
        template: `
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
          <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
          <path d="M17 17h-11v-14h-2"></path>
          <path d="M6 5l14 1l-1 7h-13"></path>
        `
      };
    case 'calendar':
      return {
        template: `
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z"></path>
          <path d="M16 3v4"></path>
          <path d="M8 3v4"></path>
          <path d="M4 11h16"></path>
          <path d="M11 15h1"></path>
          <path d="M12 15v3"></path>
        `
      };
    case 'star':
      return {
        template: `
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
        `
      };
    case 'bar-chart':
      return {
        template: `
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M3 12m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
          <path d="M9 8m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
          <path d="M15 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
          <path d="M4 20l14 0"></path>
        `
      };
    case 'gift':
      return {
        template: `
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M3 8m0 1a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1z"></path>
          <path d="M12 8l0 13"></path>
          <path d="M19 12v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-7"></path>
          <path d="M7.5 8a2.5 2.5 0 0 1 0 -5a4.8 8 0 0 1 4.5 5a4.8 8 0 0 1 4.5 -5a2.5 2.5 0 0 1 0 5"></path>
        `
      };
    case 'utensils':
      return {
        template: `
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M5 4v16"></path>
          <path d="M17 4v16"></path>
          <path d="M5 8h12"></path>
          <path d="M5 12h12"></path>
          <path d="M5 16h12"></path>
        `
      };
    case 'bell':
      return {
        template: `
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"></path>
          <path d="M9 17v1a3 3 0 0 0 6 0v-1"></path>
        `
      };
    case 'shield':
      return {
        template: `
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3"></path>
        `
      };
    default:
      return {
        template: `
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
        `
      };
  }
};

// Lifecycle hooks
onMounted(() => {
  // Initialize animations
  useAnimations();
  
  // Add event listeners
  window.addEventListener('mousemove', handleMouseMove);
  
  // Start auto-rotation
  startAutoRotate();
});

onUnmounted(() => {
  // Remove event listeners
  window.removeEventListener('mousemove', handleMouseMove);
  
  // Clear intervals
  if (autoRotateInterval) {
    clearInterval(autoRotateInterval);
  }
});
</script>

<style lang="scss" scoped>
.features-section {
  @include section;
  position: relative;
  background-color: rgba($gray-lighter, 0.3);
  overflow: hidden;
  
  .section-header {
    max-width: 700px;
    margin: 0 auto $spacing-10;
    
    h2 {
      color: $dark;
      margin-bottom: $spacing-4;
    }
    
    .section-subtitle {
      font-size: $font-size-lg;
      color: $gray-dark;
    }
  }
  
  // 3D tabs
  .features-tabs {
    max-width: 1200px;
    margin: 0 auto;
    perspective: 1000px;
  }
  
  .tabs-wrapper {
    height: 300px;
    position: relative;
    margin-bottom: $spacing-10;
    
    @media (max-width: $breakpoint-md) {
      display: none; // Hide 3D tabs on mobile - fallback to classic tabs
    }
  }
  
  .tabs-container {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    transform-style: preserve-3d;
    transition: transform 0.5s ease-out;
  }
  
  .tab-button-3d {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    background-color: $white;
    border: none;
    border-radius: $border-radius-lg;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    opacity: 0.6;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    
    &.active {
      opacity: 1;
      background-color: $primary;
      color: $white;
      box-shadow: 0 15px 40px rgba($primary, 0.3);
      transform: translate(-50%, -50%) scale(1.2);
      z-index: 2;
      
      .tab-icon {
        background-color: rgba($white, 0.2);
      }
    }
    
    &.next, &.prev {
      opacity: 0.8;
      z-index: 1;
    }
    
    &:hover:not(.active) {
      opacity: 0.9;
      transform: translate(-50%, -50%) scale(1.1);
    }
    
    .tab-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      margin-bottom: $spacing-3;
      background-color: rgba($primary, 0.1);
      color: currentColor;
      transition: $transition-base;
    }
    
    span {
      font-weight: $font-weight-medium;
      text-align: center;
      font-size: $font-size-sm;
    }
  }
  
  // Tab content
  .tabs-content {
    background-color: $white;
    border-radius: $border-radius-xl;
    box-shadow: $shadow-lg;
    overflow: hidden;
    position: relative;
  }
  
  .tab-panel {
    display: grid;
    grid-template-columns: 1fr;
    
    @media (min-width: $breakpoint-md) {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  // Tab transition animations
  .tab-transition-enter-active,
  .tab-transition-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  
  .tab-transition-enter-from,
  .tab-transition-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
  
  // Feature list
  .feature-list {
    padding: $spacing-6;
    
    .feature-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: $spacing-4;
      opacity: 0;
      transform: translateX(-20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .feature-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background-color: rgba($primary, 0.1);
        color: $primary;
        margin-right: $spacing-3;
        flex-shrink: 0;
      }
      
      span {
        color: $gray-dark;
      }
    }
  }
  
  // Feature image
  .feature-image-wrapper {
    background-color: rgba($primary, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $spacing-6;
    position: relative;
    overflow: hidden;
    min-height: 400px;
  }
  
  .feature-image-container {
    position: relative;
    width: 100%;
    height: 100%;
    transform: translateY(20px);
    opacity: 0;
    transition: transform 0.8s ease, opacity 0.8s ease;
    
    &.animate-in {
      transform: translateY(0);
      opacity: 1;
      
      .feature-highlight {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .feature-image {
      max-width: 100%;
      height: auto;
      border-radius: $border-radius-lg;
      box-shadow: $shadow;
      transition: transform 0.5s ease;
      
      &:hover {
        transform: scale(1.02);
      }
    }
    
    // Highlights
    .feature-highlight {
      position: absolute;
      display: flex;
      align-items: center;
      background-color: $white;
      border-radius: $border-radius;
      padding: $spacing-3 $spacing-4;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      max-width: 200px;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.8s ease, transform 0.8s ease;
      z-index: 1;
      
      &.highlight-1 {
        top: 20px;
        right: 10px;
        transition-delay: 0.3s;
      }
      
      &.highlight-2 {
        bottom: 30px;
        left: 10px;
        transition-delay: 0.5s;
      }
      
      .highlight-dot {
        width: 12px;
        height: 12px;
        background-color: $primary;
        border-radius: 50%;
        margin-right: $spacing-3;
        flex-shrink: 0;
      }
      
      .highlight-content {
        h4 {
          font-size: $font-size-sm;
          color: $primary;
          margin-bottom: $spacing-1;
        }
        
        p {
          font-size: $font-size-xs;
          color: $gray;
          margin: 0;
        }
      }
    }
  }
  
  // Decorative elements
  .decoration-grid {
    position: absolute;
    top: 10%;
    right: -5%;
    width: 30%;
    height: 60%;
    background-image: radial-gradient($gray-lighter 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0.5;
    z-index: -1;
  }

  // Stagger animation for feature items
  .stagger-group .feature-item {
    &:nth-child(1) { transition-delay: 0.1s; }
    &:nth-child(2) { transition-delay: 0.2s; }
    &:nth-child(3) { transition-delay: 0.3s; }
    &:nth-child(4) { transition-delay: 0.4s; }
  }
  
  .tab-panel:global(.animate-in) .feature-item {
    opacity: 1;
    transform: translateX(0);
  }
}

// Mobile fallback (classic tab navigation)
@media (max-width: $breakpoint-md) {
  .features-section {
    .tabs-content {
      margin-top: $spacing-8;
    }
    
    .tabs-nav {
      display: flex;
      overflow-x: auto;
      gap: $spacing-2;
      padding-bottom: $spacing-3;
      margin-bottom: $spacing-6;
      
      &::-webkit-scrollbar {
        height: 4px;
      }
      
      &::-webkit-scrollbar-thumb {
        background-color: rgba($primary, 0.3);
        border-radius: 4px;
      }
      
      .tab-button {
        flex: 0 0 auto;
        padding: $spacing-3;
        background-color: $white;
        border: none;
        border-radius: $border-radius;
        cursor: pointer;
        white-space: nowrap;
        transition: $transition-base;
        
        &.active {
          background-color: $primary;
          color: $white;
        }
      }
    }
  }
}
</style>
