<template>
  <section id="benefits" class="benefits-section">
    <div class="container">
      <div class="section-header text-center" v-animate="{ animation: 'fadeInUp', delay: 0 }">
        <h2 class="title-split" v-animate="{ animation: 'fadeInUp', delay: 200 }">
          {{ $t('benefits.title') }}
        </h2>
        <p class="section-subtitle" v-animate="{ animation: 'fadeInUp', delay: 400 }">
          {{ $t('benefits.subtitle') }}
        </p>
      </div>
      
      <div class="benefits-grid">
        <div 
          v-for="(benefit, index) in benefits" 
          :key="index"
          class="benefit-card"
          v-animate="{ animation: 'fadeInUp', delay: 200 + (index * 100) }"
        >
          <div class="benefit-icon-wrapper" v-animate="{ animation: 'zoomIn', delay: 300 + (index * 100) }">
            <div class="benefit-icon">
              <component :is="benefit.icon" />
            </div>
            <div class="icon-background"></div>
          </div>
          <h3 class="benefit-title" v-animate="{ animation: 'fadeInUp', delay: 400 + (index * 100) }">
            {{ benefit.title }}
          </h3>
          <p class="benefit-description" v-animate="{ animation: 'fadeInUp', delay: 500 + (index * 100) }">
            {{ benefit.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import useScrollAnimation from '~/composables/useScrollAnimation';

const { t } = useI18n();

const benefits = computed(() => [
  {
    icon: 'IconNoFees',
    title: t('benefits.items.noFees.title'),
    description: t('benefits.items.noFees.description')
  },
  {
    icon: 'IconOwnBranding',
    title: t('benefits.items.ownBranding.title'),
    description: t('benefits.items.ownBranding.description')
  },
  {
    icon: 'IconCustomerData',
    title: t('benefits.items.customerData.title'),
    description: t('benefits.items.customerData.description')
  },
  {
    icon: 'IconMarketing',
    title: t('benefits.items.marketing.title'),
    description: t('benefits.items.marketing.description')
  },
  {
    icon: 'IconAnalytics',
    title: t('benefits.items.analytics.title'),
    description: t('benefits.items.analytics.description')
  },
  {
    icon: 'IconSupport',
    title: t('benefits.items.support.title'),
    description: t('benefits.items.support.description')
  }
]);

onMounted(() => {
  useScrollAnimation();
});
</script>

<style lang="scss" scoped>
$spacing-2: 0.5rem;
$spacing-3: 0.75rem;
$spacing-4: 1rem;
$spacing-6: 1.5rem;
$spacing-8: 2rem;
$spacing-10: 2.5rem;
$font-size-base: 1rem;
$font-size-lg: 1.125rem;
$font-size-2xl: 1.5rem;
$font-weight-medium: 500;
$border-radius: 0.375rem;
$border-radius-lg: 0.5rem;
$border-radius-xl: 0.75rem;
$shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
$shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
$shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
$breakpoint-lg: 1024px;
$breakpoint-md: 768px;

.benefits-section {
  @include section;
  position: relative;
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
  
  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: $spacing-6;
    
    @media (min-width: $breakpoint-lg) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  .benefit-card {
    background-color: $white;
    border-radius: $border-radius-lg;
    padding: $spacing-6;
    box-shadow: $shadow-md;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba($primary, 0.05) 0%, rgba($secondary, 0.05) 100%);
      opacity: 0;
      transition: opacity 0.4s ease;
    }
    
    &:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: $shadow-xl;
      
      &::before {
        opacity: 1;
      }
      
      .benefit-icon-wrapper {
        transform: scale(1.1) rotate(5deg);
        
        .benefit-icon {
          background: linear-gradient(135deg, $primary 0%, $secondary 100%);
          
          svg {
            color: $white;
            transform: scale(1.1);
          }
        }
        
        .icon-background {
          transform: scale(1.2);
          opacity: 0.1;
        }
      }
    }
    
    .benefit-icon-wrapper {
      position: relative;
      width: 64px;
      height: 64px;
      margin-bottom: $spacing-4;
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      
      .benefit-icon {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: $border-radius-lg;
        background-color: rgba($primary, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 2;
        
        svg {
          width: 32px;
          height: 32px;
          color: $primary;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
      }
      
      .icon-background {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba($primary, 0.2) 0%, transparent 70%);
        border-radius: $border-radius-lg;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1;
      }
    }
    
    .benefit-title {
      font-size: $font-size-xl;
      font-weight: 600;
      color: $dark;
      margin-bottom: $spacing-3;
      transition: color 0.3s ease;
    }
    
    .benefit-description {
      font-size: $font-size-base;
      color: $gray-dark;
      line-height: 1.6;
      transition: color 0.3s ease;
    }
  }
}

// Animation keyframes
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.3;
  }
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
}
</style>
