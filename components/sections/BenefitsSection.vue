<template>
  <section id="benefits" class="benefits-section">
    <div class="container">
      <div class="section-header text-center">
        <h2 class="fade-in">{{ $t('benefits.title') }}</h2>
        <p class="section-subtitle fade-in">{{ $t('benefits.subtitle') }}</p>
      </div>
      
      <div class="benefits-grid">
        <BaseCard 
          v-for="(benefit, index) in benefits" 
          :key="index"
          :title="benefit.title"
          elevated
          class="benefit-card fade-in"
        >
          <template #icon>
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <component :is="getIconComponent(index)" />
              </svg>
            </div>
          </template>
          
          <p>{{ benefit.description }}</p>
        </BaseCard>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import useScrollAnimation from '~/composables/useScrollAnimation';

const { t } = useI18n();

const benefits = computed(() => [
  {
    title: t('benefits.cards.0.title'),
    description: t('benefits.cards.0.description'),
    icon: 'wrench'
  },
  {
    title: t('benefits.cards.1.title'),
    description: t('benefits.cards.1.description'),
    icon: 'shield'
  },
  {
    title: t('benefits.cards.2.title'),
    description: t('benefits.cards.2.description'),
    icon: 'star'
  },
  {
    title: t('benefits.cards.3.title'),
    description: t('benefits.cards.3.description'),
    icon: 'qrcode'
  }
]);

const getIconComponent = (index) => {
  // Map each benefit to a specific icon template
  switch (index) {
    case 0:
      return {
        // Wrench icon
        template: `
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M7 10h3v-3l-3.5 -3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1 -3 3l-6 -6a6 6 0 0 1 -8 -8l3.5 3.5"></path>
        `
      };
    case 1:
      return {
        // Shield Check icon
        template: `
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M9 12l2 2l4 -4"></path>
          <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3"></path>
        `
      };
    case 2:
      return {
        // Star icon
        template: `
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
        `
      };
    case 3:
      return {
        // QR Code icon
        template: `
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
          <path d="M7 17l0 .01"></path>
          <path d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
          <path d="M7 7l0 .01"></path>
          <path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
          <path d="M17 7l0 .01"></path>
          <path d="M14 14l3 0"></path>
          <path d="M20 14l0 .01"></path>
          <path d="M14 14l0 3"></path>
          <path d="M14 20l3 0"></path>
          <path d="M17 17l3 0"></path>
          <path d="M20 17l0 3"></path>
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

// Animation initialisieren
useScrollAnimation();
</script>

<style lang="scss" scoped>
.benefits-section {
  @include section;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom right, rgba($primary, 0.03), transparent);
    z-index: -1;
  }
  
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
  
  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: $spacing-6;
    
    @media (min-width: $breakpoint-sm) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (min-width: $breakpoint-lg) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  .benefit-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    
    .card-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 64px;
      height: 64px;
      margin-bottom: $spacing-4;
      color: $primary;
      background-color: rgba($primary, 0.1);
      border-radius: 50%;
      
      svg {
        width: 28px;
        height: 28px;
      }
    }
  }
  
  // Fade-in animations with cascading delays
  .fade-in {
    &:nth-child(1) {
      transition-delay: 0.1s;
    }
    
    &:nth-child(2) {
      transition-delay: 0.2s;
    }
    
    &:nth-child(3) {
      transition-delay: 0.3s;
    }
    
    &:nth-child(4) {
      transition-delay: 0.4s;
    }
    
    &:nth-child(5) {
      transition-delay: 0.5s;
    }
    
    &:nth-child(6) {
      transition-delay: 0.6s;
    }
  }
}
</style>
