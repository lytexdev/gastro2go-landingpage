<template>
  <section class="hero-section">
    <div class="container">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title fade-in">{{ $t('hero.title') }}</h1>
          <p class="hero-subtitle fade-in">{{ $t('hero.subtitle') }}</p>
          <div class="hero-actions fade-in">
            <BaseButton 
              variant="primary" 
              size="lg"
              withIcon
              @click="scrollToContact"
            >
              {{ $t('hero.cta') }}
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 12l14 0"></path>
                <path d="M15 16l4 -4"></path>
                <path d="M15 8l4 4"></path>
              </svg>
            </BaseButton>
            <BaseButton 
              variant="secondary" 
              size="lg"
              class="demo-btn"
              @click="scrollToDemo"
            >
              {{ $t('hero.demo') }}
            </BaseButton>
          </div>
          <div class="hero-features fade-in">
            <div class="feature-item">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 12l5 5l10 -10"></path>
              </svg>
              <span>0% Provisionen</span>
            </div>
            <div class="feature-item">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 12l5 5l10 -10"></path>
              </svg>
              <span>DSGVO-konform</span>
            </div>
            <div class="feature-item">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 12l5 5l10 -10"></path>
              </svg>
              <span>Hosting in DE</span>
            </div>
          </div>
        </div>
        <div class="hero-image fade-in">
          <img 
            src="~/assets/images/hero-bg.webp" 
            alt="Gastro2Go.io App"
            loading="eager"
            width="600"
            height="400"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const scrollToContact = () => {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const scrollToDemo = () => {
  const demoSection = document.getElementById('demo');
  if (demoSection) {
    demoSection.scrollIntoView({ behavior: 'smooth' });
  }
};

// Scroll Animation initialisieren
import useScrollAnimation from '~/composables/useScrollAnimation';
</script>

<style lang="scss" scoped>
.hero-section {
  position: relative;
  padding: $spacing-10 0 $spacing-16;
  background: linear-gradient(to bottom, rgba($white, 0.7), $white), 
              url('~/assets/images/hero-bg.webp') no-repeat center/cover;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 150px;
    background: linear-gradient(to top, $white, rgba($white, 0));
  }
  
  .hero-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-8;
    position: relative;
    z-index: 1;
    
    @media (min-width: $breakpoint-lg) {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
  }
  
  .hero-text {
    max-width: 600px;
    
    .hero-title {
      font-size: $font-size-3xl;
      margin-bottom: $spacing-4;
      color: $dark;
      
      @media (min-width: $breakpoint-md) {
        font-size: $font-size-4xl;
      }
    }
    
    .hero-subtitle {
      font-size: $font-size-xl;
      color: $gray-dark;
      margin-bottom: $spacing-6;
    }
    
    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: $spacing-3;
      margin-bottom: $spacing-6;
      
      .demo-btn {
        @media (max-width: $breakpoint-sm) {
          width: 100%;
        }
      }
    }
    
    .hero-features {
      display: flex;
      flex-wrap: wrap;
      gap: $spacing-4 $spacing-6;
      margin-top: $spacing-6;
      
      .feature-item {
        display: flex;
        align-items: center;
        gap: $spacing-2;
        color: $gray-dark;
        font-weight: $font-weight-medium;
        
        .icon {
          color: $primary;
        }
      }
    }
  }
  
  .hero-image {
    position: relative;
    display: flex;
    justify-content: center;
    
    img {
      max-width: 100%;
      height: auto;
      border-radius: $border-radius-lg;
      box-shadow: $shadow-xl;
      z-index: 1;
      
      @media (min-width: $breakpoint-lg) {
        transform: translateY(-$spacing-6);
      }
    }
    
    &::before {
      content: '';
      position: absolute;
      top: $spacing-6;
      right: -$spacing-4;
      width: 200px;
      height: 200px;
      background-color: rgba($primary, 0.1);
      border-radius: 50%;
      z-index: 0;
      
      @media (min-width: $breakpoint-md) {
        width: 300px;
        height: 300px;
      }
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: $spacing-6;
      left: -$spacing-4;
      width: 150px;
      height: 150px;
      background-color: rgba($primary, 0.05);
      border-radius: 50%;
      z-index: 0;
      
      @media (min-width: $breakpoint-md) {
        width: 200px;
        height: 200px;
      }
    }
  }
  
  // Fade-in animations
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
    
    &.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
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
  }
}
</style>
