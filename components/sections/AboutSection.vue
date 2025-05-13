<template>
  <section id="about" class="about-section">
    <div class="container">
      <div class="section-header text-center">
        <h2 class="fade-in">{{ $t('about.title') }}</h2>
        <p class="section-subtitle fade-in">{{ $t('about.subtitle') }}</p>
      </div>
      
      <div class="about-content">
        <div class="about-text fade-in">
          <p class="about-description">{{ $t('about.text') }}</p>
          
          <div class="approach-wrapper">
            <h3>{{ $t('about.approach.title') }}</h3>
            <ul class="approach-list">
              <li 
                v-for="(item, index) in approachItems" 
                :key="index"
                class="approach-item"
              >
                <div class="approach-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                </div>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="about-image fade-in">
          <div class="image-wrapper">
            <img 
              src="~/assets/images/restaurant-1.webp" 
              alt="LYTEX MEDIA Team"
              class="main-image"
              loading="lazy"
              width="400"
              height="300"
            />
            
            <img 
              src="~/assets/images/restaurant-2.webp" 
              alt="Our Office"
              class="secondary-image"
              loading="lazy"
              width="240"
              height="180"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';

const { t } = useI18n();

const approachItems = computed(() => t('about.approach.items'));

useScrollAnimation();
</script>

<style lang="scss" scoped>
.about-section {
  @include section;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba($primary, 0.02), transparent);
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
  
  .about-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-10;
    
    @media (min-width: $breakpoint-lg) {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
  }
  
  .about-text {
    .about-description {
      font-size: $font-size-lg;
      color: $gray-dark;
      margin-bottom: $spacing-6;
      line-height: 1.8;
    }
    
    .approach-wrapper {
      h3 {
        margin-bottom: $spacing-4;
        color: $dark;
      }
    }
    
    .approach-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .approach-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: $spacing-4;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .approach-icon {
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
        font-size: $font-size-base;
      }
    }
  }
  
  .about-image {
    .image-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
    }
    
    .main-image {
      width: 100%;
      max-width: 500px;
      height: auto;
      border-radius: $border-radius-lg;
      box-shadow: $shadow-lg;
      z-index: 2;
    }
    
    .secondary-image {
      position: absolute;
      bottom: -$spacing-6;
      right: 0;
      width: 60%;
      max-width: 300px;
      height: auto;
      border-radius: $border-radius-lg;
      box-shadow: $shadow-xl;
      z-index: 3;
      border: 6px solid $white;
      
      @media (min-width: $breakpoint-md) {
        right: $spacing-6;
      }
    }
  }
}
</style>
