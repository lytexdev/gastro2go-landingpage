<template>
  <section id="demo" class="demo-section">
    <div class="container">
      <div class="section-header text-center" v-animate="{ animation: 'fadeInUp', delay: 0 }">
        <h2 class="title-split" v-animate="{ animation: 'fadeInUp', delay: 200 }">
          {{ $t('demo.title') }}
        </h2>
        <p class="section-subtitle" v-animate="{ animation: 'fadeInUp', delay: 400 }">
          {{ $t('demo.subtitle') }}
        </p>
      </div>
      
      <div class="demo-content">
        <div class="demo-text" v-animate="{ animation: 'fadeInLeft', delay: 300 }">
          <div class="feature-list">
            <div 
              v-for="(feature, index) in features" 
              :key="index"
              class="feature-item"
              v-animate="{ animation: 'fadeInLeft', delay: 500 + (index * 100) }"
            >
              <div class="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
              </div>
              <span>{{ feature }}</span>
            </div>
          </div>
          
          <div class="demo-cta" v-animate="{ animation: 'fadeInUp', delay: 1000 }">
            <BaseButton 
              variant="primary" 
              size="lg"
              @click="scrollToContact"
              v-animate="{ animation: 'pulse', delay: 1200, duration: 2000, iterationCount: 'infinite' }"
            >
              {{ $t('demo.cta') }}
            </BaseButton>
          </div>
        </div>
        
        <div class="demo-device" v-animate="{ animation: 'fadeInRight', delay: 400 }">
          <div class="device-frame" v-animate="{ animation: 'float', delay: 600, duration: 6000, iterationCount: 'infinite' }">
            <div class="device-screen">
              <img 
                src="~/assets/images/demo-app.webp" 
                alt="Gastro2Go.io App Demo"
                loading="lazy"
                width="300"
                height="600"
                v-animate="{ animation: 'zoomIn', delay: 800 }"
              />
        </div>
        
            <div class="device-notch"></div>
            <div class="device-buttons">
              <div class="button button-left"></div>
              <div class="button button-right"></div>
            </div>
          </div>
          
          <div class="floating-elements">
            <div class="element element-1" v-animate="{ animation: 'float', delay: 700, duration: 4000, iterationCount: 'infinite' }">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
            </div>
            
            <div class="element element-2" v-animate="{ animation: 'float', delay: 800, duration: 5000, iterationCount: 'infinite' }">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            
            <div class="element element-3" v-animate="{ animation: 'float', delay: 900, duration: 4500, iterationCount: 'infinite' }">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 0 1-3 0 2.704 2.704 0 0 0-3 0 2.704 2.704 0 0 1-3 0 2.704 2.704 0 0 0-3 0 2.701 2.701 0 0 0-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v7h18zm-3-9v-2a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2h12z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import BaseButton from '../ui/BaseButton.vue';
import useScrollAnimation from '~/composables/useScrollAnimation';

const { t } = useI18n();

const features = computed(() => [
  t('demo.features.0'),
  t('demo.features.1'),
  t('demo.features.2'),
  t('demo.features.3')
]);

const scrollToContact = () => {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};

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

.demo-section {
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
  
  .demo-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-10;
    align-items: center;
    
    @media (min-width: $breakpoint-lg) {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  .demo-text {
    .feature-list {
      margin-bottom: $spacing-8;
      
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
          font-size: $font-size-lg;
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
  
  .demo-device {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .device-frame {
      position: relative;
      width: 300px;
      height: 600px;
      background-color: $dark;
      border-radius: 40px;
      padding: 10px;
      box-shadow: $shadow-2xl;
      transition: transform 0.3s ease;
      
      &:hover {
        transform: translateY(-10px) rotate(2deg);
      }
      
      .device-screen {
        width: 100%;
        height: 100%;
        background-color: $white;
        border-radius: 30px;
      overflow: hidden;
      
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
          
          &:hover {
            transform: scale(1.05);
          }
        }
      }
      
      .device-notch {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 150px;
        height: 30px;
        background-color: $dark;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        z-index: 2;
      }
    
      .device-buttons {
      position: absolute;
        top: 100px;
        right: -3px;
        height: 100px;
    display: flex;
    flex-direction: column;
        justify-content: space-between;
        
        .button {
          width: 3px;
          height: 40px;
          background-color: $gray-light;
          border-radius: 2px;
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
        
        &.element-3 {
          top: 25%;
          left: 10%;
          width: 80px;
          height: 80px;
    }
  }
    }
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

@keyframes pulse {
  0% {
    transform: scale(1);
    }
  50% {
    transform: scale(1.05);
    }
  100% {
    transform: scale(1);
  }
}
</style>
