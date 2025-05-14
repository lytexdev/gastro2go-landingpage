<template>
  <section class="hero-section">
    <ParticleBackground 
      color="rgba(76, 175, 80, 0.6)" 
      :density="40" 
      :speed="0.3" 
      :interactive="true"
    />
    
    <div class="container">
      <div class="hero-content">
        <!-- Enhanced text container with animations -->
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="text-split" data-split-by="word" data-animation-type="fadeUp">
              {{ $t('hero.title') }}
            </span>
          </h1>
          
          <p class="hero-subtitle">
            <TypeWriter 
              :texts="[$t('hero.subtitle'), 'Digitalisiere dein Restaurant ohne Provisionen', 'Mehr Umsatz, mehr Kundenbindung']"
              :speed="40"
              :erase-pause="3000"
              :infinite="true"
            />
          </p>
          
          <div v-animate="'fadeInUp'" class="hero-actions" style="--delay: 0.3s;">
            <BaseButton 
              variant="primary" 
              size="lg"
              withIcon
              @click="scrollToContact"
              class="magnetic"
              data-power="20"
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
              class="demo-btn magnetic"
              data-power="20"
              @click="scrollToDemo"
            >
              {{ $t('hero.demo') }}
            </BaseButton>
          </div>
          
          <div v-animate="'fadeInUp'" class="hero-features" style="--delay: 0.5s;">
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
        
        <!-- Animated image with parallax effect -->
        <ParallaxWrapper
          :speed="0.05"
          direction="up"
          :max-offset="50"
          class="hero-image"
        >
          <img 
            src="~/assets/images/hero-bg.webp" 
            alt="Gastro2Go.io App"
            loading="eager"
            width="600"
            height="400"
            class="animate-on-scroll fade-in"
          />
          
          <!-- Floating elements for visual interest -->
          <div class="floating-element element-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
              <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"></path>
            </svg>
          </div>
          
          <div class="floating-element element-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
              <path d="M3 7l9 6l9 -6"></path>
            </svg>
          </div>
          
          <div class="floating-element element-3">
            <span class="count-up" data-target="100" data-suffix="%" data-duration="2000">0%</span>
          </div>
        </ParallaxWrapper>
      </div>
    </div>
    
    <!-- Scroll indicator -->
    <div class="scroll-indicator">
      <div class="scroll-arrow"></div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import ParticleBackground from '../effects/ParticleBackground.vue';
import TypeWriter from '../effects/TypeWriter.vue';
import ParallaxWrapper from '../effects/ParallaxWrapper.vue';
import useAnimations from '~/composables/useAnimations';
import useScrollReveal from '~/composables/useScrollReveal';

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

onMounted(() => {
  // Initialize animations
  useAnimations();
  useScrollReveal();

  // Initialize text split animations (handled in useAnimations)
  setTimeout(() => {
    const textElements = document.querySelectorAll('.text-split');
    textElements.forEach(element => {
      const spans = element.querySelectorAll('span');
      spans.forEach(span => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      });
    });
  }, 500);
});
</script>

<style lang="scss" scoped>
.hero-section {
  position: relative;
  padding: $spacing-10 0 $spacing-16;
  background: linear-gradient(to bottom, rgba($white, 0.7), $white), 
              url('~/assets/images/hero-bg.webp') no-repeat center/cover;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 150px;
    background: linear-gradient(to top, $white, rgba($white, 0));
    z-index: 1;
  }
  
  .hero-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-8;
    position: relative;
    z-index: 2;
    
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
      position: relative;
      
      @media (min-width: $breakpoint-md) {
        font-size: $font-size-4xl;
      }
      
      &::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 60px;
        height: 4px;
        background-color: $primary;
        transition: width 0.8s ease-in-out;
      }
      
      &:hover::after {
        width: 100px;
      }
    }
    
    .hero-subtitle {
      font-size: $font-size-xl;
      color: $gray-dark;
      margin-bottom: $spacing-6;
      
      @media (min-width: $breakpoint-md) {
        font-size: $font-size-2xl;
      }
    }
    
    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: $spacing-3;
      margin-bottom: $spacing-6;
      
      .demo-btn {
        @media (max-width: $breakpoint-sm) {
          width: 100%;
          margin-top: $spacing-2;
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
      transition: transform 0.5s ease, box-shadow 0.5s ease;
      
      &:hover {
        transform: translateY(-10px);
        box-shadow: 0 25px 50px rgba($dark, 0.2);
      }
      
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
    
    .floating-element {
      position: absolute;
      background-color: white;
      border-radius: 50%;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: $primary;
      z-index: 2;
    }
    
    .element-1 {
      top: 10%;
      right: 10%;
      width: 60px;
      height: 60px;
      animation: float 4s ease-in-out infinite;
    }
    
    .element-2 {
      bottom: 20%;
      left: 5%;
      width: 70px;
      height: 70px;
      animation: float 5s ease-in-out infinite 1s;
    }
    
    .element-3 {
      top: 25%;
      left: 10%;
      width: 80px;
      height: 80px;
      font-weight: bold;
      font-size: 1.5rem;
      animation: float 6s ease-in-out infinite 2s;
    }
  }
  
  .scroll-indicator {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    animation: bounceUpDown 2s infinite;
    
    .scroll-arrow {
      width: 30px;
      height: 50px;
      border: 2px solid rgba($primary, 0.5);
      border-radius: 15px;
      position: relative;
      
      &::before {
        content: '';
        position: absolute;
        top: 10px;
        left: 50%;
        width: 6px;
        height: 6px;
        background-color: $primary;
        border-radius: 50%;
        transform: translateX(-50%);
        animation: scrollDown 2s infinite;
      }
    }
  }
}

// Animation keyframes
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes scrollDown {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
}

@keyframes bounceUpDown {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-10px);
  }
}

// Text split animation styles
.text-split span {
  opacity: 0;
  transform: translateY(20px);
  display: inline-block;
  transition: opacity 0.5s ease, transform 0.5s ease;
}
</style>
