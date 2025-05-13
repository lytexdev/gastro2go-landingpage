<template>
  <section id="features" class="features-section">
    <div class="container">
      <div class="section-header text-center">
        <h2 class="fade-in">{{ $t('features.title') }}</h2>
        <p class="section-subtitle fade-in">{{ $t('features.subtitle') }}</p>
      </div>
      
      <div class="features-tabs">
        <div class="tabs-nav fade-in">
          <button 
            v-for="(category, index) in featureCategories" 
            :key="index"
            class="tab-button"
            :class="{ 'active': activeTab === index }"
            @click="activeTab = index"
          >
            <div class="tab-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <component :is="getIconComponent(category.icon)" />
              </svg>
            </div>
            <span>{{ category.name }}</span>
          </button>
        </div>
        
        <div class="tabs-content fade-in">
          <div 
            v-for="(category, index) in featureCategories" 
            :key="index"
            class="tab-panel"
            :class="{ 'active': activeTab === index }"
          >
            <div class="feature-list">
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
            
            <div class="feature-image">
              <img 
                :src="`/images/features/${category.icon}.webp`" 
                :alt="category.name"
                loading="lazy"
                width="400"
                height="300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const { t } = useI18n();

const featureCategories = computed(() => {
  // Direkter Zugriff auf die Übersetzungsstruktur
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
          <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"></path>
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

// Initialize scroll animations
useScrollAnimation();
</script>

<style lang="scss" scoped>
.features-section {
  @include section;
  background-color: rgba($gray-lighter, 0.3);
  
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
  
  .features-tabs {
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .tabs-nav {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-3;
    margin-bottom: $spacing-8;
    
    @media (min-width: $breakpoint-md) {
      grid-template-columns: repeat(4, 1fr);
    }
    
    @media (min-width: $breakpoint-lg) {
      grid-template-columns: repeat(8, 1fr);
    }
    
    .tab-button {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: $white;
      border: none;
      padding: $spacing-4 $spacing-2;
      border-radius: $border-radius-lg;
      cursor: pointer;
      transition: $transition-base;
      box-shadow: $shadow-sm;
      height: 100%;
      font-size: $font-size-sm;
      text-align: center;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: $shadow;
      }
      
      &.active {
        background-color: $primary;
        color: $white;
        box-shadow: 0 5px 15px rgba($primary, 0.3);
        
        .tab-icon {
          background-color: rgba($white, 0.2);
        }
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
      }
    }
  }
  
  .tabs-content {
    background-color: $white;
    border-radius: $border-radius-xl;
    box-shadow: $shadow-lg;
    overflow: hidden;
  }
  
  .tab-panel {
    display: none;
    
    &.active {
      display: grid;
      grid-template-columns: 1fr;
      
      @media (min-width: $breakpoint-md) {
        grid-template-columns: 1fr 1fr;
      }
    }
  }
  
  .feature-list {
    padding: $spacing-6;
    background-color: $white;
    
    .feature-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: $spacing-4;
      
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
  
  .feature-image {
    background-color: rgba($primary, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $spacing-6;
    
    img {
      max-width: 100%;
      height: auto;
      border-radius: $border-radius-lg;
      box-shadow: $shadow;
    }
  }
}
</style>
