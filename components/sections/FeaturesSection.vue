<template>
  <section id="features" class="features-section">
    <div class="container">
      <div class="section-header text-center" v-animate="{ animation: 'fadeInUp', delay: 0 }">
        <h2 class="title-split" v-animate="{ animation: 'fadeInUp', delay: 200 }">
          {{ $t('features.title') }}
        </h2>
        <p class="section-subtitle" v-animate="{ animation: 'fadeInUp', delay: 400 }">
          {{ $t('features.subtitle') }}
        </p>
      </div>
      
      <div class="features-tabs" v-animate="{ animation: 'fadeInUp', delay: 300 }">
        <div 
          v-for="(tab, index) in tabs" 
          :key="index"
          class="tab-item"
          :class="{ 'active': activeTab === index }"
          @click="activeTab = index"
          v-animate="{ animation: 'fadeInUp', delay: 400 + (index * 100) }"
        >
          <div class="tab-icon">
            <component :is="tab.icon" />
          </div>
          <span class="tab-label">{{ tab.label }}</span>
        </div>
      </div>
      
      <div class="features-content">
        <div 
          v-for="(tab, index) in tabs" 
          :key="index"
          class="feature-panel"
          :class="{ 'active': activeTab === index }"
          v-animate="{ animation: 'fadeInUp', delay: 500 + (index * 100) }"
        >
          <div class="feature-grid">
            <div class="feature-text">
              <h3 class="feature-title" v-animate="{ animation: 'fadeInLeft', delay: 600 + (index * 100) }">
                {{ tab.title }}
              </h3>
              <p class="feature-description" v-animate="{ animation: 'fadeInLeft', delay: 700 + (index * 100) }">
                {{ tab.description }}
              </p>
              
              <div class="feature-list">
                <div 
                  v-for="(item, itemIndex) in tab.items" 
                  :key="itemIndex"
                  class="feature-item"
                  v-animate="{ animation: 'fadeInLeft', delay: 800 + (itemIndex * 100) }"
                >
                  <div class="feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M5 12l5 5l10 -10"></path>
                    </svg>
                  </div>
                  <span>{{ item }}</span>
                </div>
              </div>
            </div>
            
            <div class="feature-image" v-animate="{ animation: 'fadeInRight', delay: 600 + (index * 100) }">
              <div class="image-wrapper">
                <img 
                  :src="tab.image" 
                  :alt="tab.title"
                  loading="lazy"
                  width="500"
                  height="300"
                  v-animate="{ animation: 'zoomIn', delay: 800 + (index * 100) }"
                />
                
                <div class="image-overlay"></div>
                
                <div class="floating-elements">
                  <div class="element element-1" v-animate="{ animation: 'float', delay: 900 + (index * 100), duration: 4000, iterationCount: 'infinite' }">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  </div>
                  
                  <div class="element element-2" v-animate="{ animation: 'float', delay: 1000 + (index * 100), duration: 5000, iterationCount: 'infinite' }">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
import { useI18n } from 'vue-i18n';
import useScrollAnimation from '~/composables/useScrollAnimation';

const { t } = useI18n();
const activeTab = ref(0);

const tabs = computed(() => [
  {
    icon: 'IconOrder',
    label: t('features.tabs.order'),
    title: t('features.order.title'),
    description: t('features.order.description'),
    items: [
      t('features.order.items.0'),
      t('features.order.items.1'),
      t('features.order.items.2'),
      t('features.order.items.3')
    ],
    image: '/images/features/order.webp'
  },
  {
    icon: 'IconMenu',
    label: t('features.tabs.menu'),
    title: t('features.menu.title'),
    description: t('features.menu.description'),
    items: [
      t('features.menu.items.0'),
      t('features.menu.items.1'),
      t('features.menu.items.2'),
      t('features.menu.items.3')
    ],
    image: '/images/features/menu.webp'
  },
  {
    icon: 'IconAnalytics',
    label: t('features.tabs.analytics'),
    title: t('features.analytics.title'),
    description: t('features.analytics.description'),
    items: [
      t('features.analytics.items.0'),
      t('features.analytics.items.1'),
      t('features.analytics.items.2'),
      t('features.analytics.items.3')
    ],
    image: '/images/features/analytics.webp'
  }
]);

const tabsContainer = ref(null);
const rotationX = ref(0);
const rotationY = ref(0);
let autoRotateInterval = null;
let mouseX = 0;
let mouseY = 0;

// Dynamically position tabs in 3D space
const getTabPosition = (index) => {
  const totalTabs = tabs.value.length;
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
  const totalTabs = tabs.value.length;
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
    activeTab.value = (activeTab.value + 1) % tabs.value.length;
    
    // Update rotation to match active tab
    const totalTabs = tabs.value.length;
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
  rotationY.value = (mouseX / rect.width) * 10 - (activeTab.value * (360 / tabs.value.length));
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
  useScrollAnimation();
  
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
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba($primary, 0.02) 0%, rgba($secondary, 0.02) 100%);
    z-index: -1;
  }
  
  .section-header {
    max-width: 700px;
    margin: 0 auto $spacing-10;
    
    h2 {
      color: $dark;
      margin-bottom: $spacing-4;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 4px;
        background-color: $primary;
        transition: width 0.8s ease-in-out;
      }
      
      &:hover::after {
        width: 100px;
      }
    }
    
    .section-subtitle {
      font-size: $font-size-lg;
      color: $gray-dark;
    }
  }
  
  .features-tabs {
    display: flex;
    justify-content: center;
    gap: $spacing-4;
    margin-bottom: $spacing-8;
    flex-wrap: wrap;
    
    .tab-item {
      display: flex;
      align-items: center;
      gap: $spacing-2;
      padding: $spacing-3 $spacing-4;
      border-radius: $border-radius-lg;
      background-color: $white;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: $shadow-sm;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: $shadow-md;
      }
      
      &.active {
        background-color: $primary;
        color: $white;
        box-shadow: $shadow-lg;
        
        .tab-icon {
          background-color: rgba($white, 0.2);
          color: $white;
        }
      }
      
      .tab-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: $border-radius-lg;
        background-color: rgba($primary, 0.1);
        color: $primary;
        transition: all 0.3s ease;
      }
      
      .tab-label {
        font-weight: $font-weight-medium;
      }
    }
  }
  
  .features-content {
    position: relative;
    
    .feature-panel {
      display: none;
      
      &.active {
        display: block;
        animation: fadeIn 0.5s ease forwards;
      }
    }
    
    .feature-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: $spacing-10;
      align-items: center;
      
      @media (min-width: $breakpoint-lg) {
        grid-template-columns: 1fr 1fr;
      }
    }
    
    .feature-text {
      .feature-title {
        font-size: $font-size-2xl;
        font-weight: 700;
        color: $dark;
        margin-bottom: $spacing-4;
      }
      
      .feature-description {
        font-size: $font-size-lg;
        color: $gray-dark;
        margin-bottom: $spacing-6;
        line-height: 1.6;
      }
      
      .feature-list {
        .feature-item {
          display: flex;
          align-items: center;
          margin-bottom: $spacing-4;
          
          &:last-child {
            margin-bottom: 0;
          }
          
          .feature-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background-color: rgba($primary, 0.1);
            color: $primary;
            margin-right: $spacing-3;
            flex-shrink: 0;
            transition: all 0.3s ease;
          }
          
          span {
            color: $gray-dark;
            font-size: $font-size-base;
          }
          
          &:hover {
            .feature-icon {
              transform: scale(1.1) rotate(5deg);
              background-color: $primary;
              color: $white;
            }
          }
        }
      }
    }
    
    .feature-image {
      position: relative;
      
      .image-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: $border-radius-xl;
        overflow: hidden;
        box-shadow: $shadow-xl;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
          
          &:hover {
            transform: scale(1.05);
          }
        }
        
        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba($primary, 0.1) 0%, rgba($secondary, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        &:hover {
          .image-overlay {
            opacity: 1;
          }
        }
      }
      
      .floating-elements {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        
        .element {
          position: absolute;
          background-color: $white;
          border-radius: 50%;
          box-shadow: $shadow-lg;
          display: flex;
          align-items: center;
          justify-content: center;
          color: $primary;
          
          &.element-1 {
            top: 10%;
            right: 10%;
            width: 60px;
            height: 60px;
          }
          
          &.element-2 {
            bottom: 20%;
            left: 5%;
            width: 70px;
            height: 70px;
          }
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
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

// Mobile fallback (classic tab navigation)
@media (max-width: $breakpoint-md) {
  .features-section {
    .features-content {
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
