<template>
  <section id="demo" class="demo-section">
    <div class="container">
      <div class="section-header text-center">
        <h2 class="fade-in">{{ $t('demo.title') }}</h2>
        <p class="section-subtitle fade-in">{{ $t('demo.subtitle') }}</p>
      </div>
      
      <div class="demo-content">
        <div class="demo-screens fade-in">
          <div class="device-wrapper">
            <div class="device-frame">
              <img 
                src="~/assets/images/demo-app.webp" 
                alt="Gastro2Go.io App Demo"
                class="device-screen"
                loading="lazy"
                width="300"
                height="600"
              />
            </div>
            <div class="device-shadow"></div>
          </div>
        </div>
        
        <div class="demo-info">
          <div class="steps-wrapper">
            <div 
              v-for="(step, index) in demoSteps" 
              :key="index"
              class="demo-step fade-in"
              :class="{ 'active': activeStep === index }"
              @click="activeStep = index"
            >
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-content">
                <p class="step-text">{{ step }}</p>
              </div>
            </div>
          </div>
          
          <div class="demo-cta fade-in">
            <BaseButton 
              variant="primary" 
              size="lg"
              withIcon
              @click="openDemo"
            >
              {{ $t('demo.try') }}
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5"></path>
                <path d="M10 14l10 -10"></path>
                <path d="M15 4l5 0l0 5"></path>
              </svg>
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const { t } = useI18n();

const demoSteps = computed(() => [
  t('demo.screens.0'),
  t('demo.screens.1'),
  t('demo.screens.2'),
  t('demo.screens.3')
]);

const activeStep = ref(0);
let stepInterval;

const startStepInterval = () => {
  stepInterval = setInterval(() => {
    activeStep.value = (activeStep.value + 1) % demoSteps.value.length;
  }, 4000);
};

const openDemo = () => {
  window.open('https://demo.gastro2go.io', '_blank');
};

onMounted(() => {
  startStepInterval();
});

onUnmounted(() => {
  clearInterval(stepInterval);
});

useScrollAnimation();
</script>

<style lang="scss" scoped>
.demo-section {
  @include section;
  position: relative;
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
  
  .demo-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-10;
    
    @media (min-width: $breakpoint-lg) {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
  }
  
  .demo-screens {
    display: flex;
    justify-content: center;
    
    .device-wrapper {
      position: relative;
      width: 320px;
      height: 650px;
    }
    
    .device-frame {
      position: relative;
      z-index: 2;
      width: 100%;
      height: 100%;
      background-color: $dark;
      border-radius: 40px;
      padding: 20px 10px;
      box-shadow: inset 0 0 0 2px rgba($white, 0.1),
                  0 0 0 2px rgba($dark, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        height: 30px;
        width: 150px;
        background-color: $dark;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        z-index: 2;
      }
    }
    
    .device-screen {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 20px;
    }
    
    .device-shadow {
      position: absolute;
      bottom: -30px;
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
      height: 40px;
      background: rgba($dark, 0.1);
      border-radius: 50%;
      filter: blur(15px);
      z-index: 1;
    }
  }
  
  .demo-info {
    display: flex;
    flex-direction: column;
    gap: $spacing-8;
  }
  
  .steps-wrapper {
    display: flex;
    flex-direction: column;
    gap: $spacing-4;
  }
  
  .demo-step {
    display: flex;
    align-items: flex-start;
    padding: $spacing-4;
    border-radius: $border-radius-lg;
    background-color: $white;
    cursor: pointer;
    transition: $transition-base;
    box-shadow: $shadow-sm;
    
    &.active {
      box-shadow: $shadow-lg;
      transform: translateX($spacing-2);
      border-left: 4px solid $primary;
      
      .step-number {
        background-color: $primary;
        color: $white;
      }
      
      .step-text {
        font-weight: $font-weight-semibold;
      }
    }
    
    &:hover:not(.active) {
      box-shadow: $shadow;
      transform: translateY(-2px);
    }
    
    .step-number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: rgba($primary, 0.1);
      color: $primary;
      font-weight: $font-weight-bold;
      flex-shrink: 0;
      margin-right: $spacing-4;
      transition: $transition-base;
    }
    
    .step-content {
      flex: 1;
    }
    
    .step-text {
      margin: 0;
      color: $gray-dark;
      font-size: $font-size-base;
      transition: $transition-base;
    }
  }
  
  .demo-cta {
    display: flex;
    justify-content: center;
    
    @media (min-width: $breakpoint-lg) {
      justify-content: flex-start;
    }
  }
  
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
