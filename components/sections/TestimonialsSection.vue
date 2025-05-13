<template>
  <section id="testimonials" class="testimonials-section">
    <div class="container">
      <div class="section-header text-center">
        <h2 class="fade-in">{{ $t('testimonials.title') }}</h2>
        <p class="section-subtitle fade-in">{{ $t('testimonials.subtitle') }}</p>
      </div>
      
      <div class="testimonials-slider">
        <div class="testimonials-track" :style="trackStyle">
          <div v-for="(testimonial, index) in testimonials" :key="index" class="testimonial-slide fade-in">
            <BaseTestimonial
              :quote="testimonial.quote"
              :author="testimonial.author"
              :title="testimonial.restaurant"
              :featured="index === 0"
            />
          </div>
        </div>
        
        <div class="slider-controls">
          <button 
            class="slider-arrow prev" 
            @click="prevSlide"
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M15 6l-6 6l6 6"></path>
            </svg>
          </button>
          
          <div class="slider-dots">
            <button 
              v-for="(_, index) in testimonials" 
              :key="index"
              class="slider-dot"
              :class="{ 'active': activeSlide === index }"
              @click="goToSlide(index)"
              :aria-label="`Go to testimonial ${index + 1}`"
            ></button>
          </div>
          
          <button 
            class="slider-arrow next" 
            @click="nextSlide"
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M9 6l6 6l-6 6"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const { t } = useI18n();

const testimonials = computed(() => t('testimonials.items'));
const activeSlide = ref(0);
let autoplayInterval;

const trackStyle = computed(() => {
  return {
    transform: `translateX(-${activeSlide.value * 100}%)`
  };
});

const prevSlide = () => {
  activeSlide.value = (activeSlide.value - 1 + testimonials.value.length) % testimonials.value.length;
  resetAutoplay();
};

const nextSlide = () => {
  activeSlide.value = (activeSlide.value + 1) % testimonials.value.length;
  resetAutoplay();
};

const goToSlide = (index) => {
  activeSlide.value = index;
  resetAutoplay();
};

const startAutoplay = () => {
  autoplayInterval = setInterval(() => {
    nextSlide();
  }, 5000);
};

const resetAutoplay = () => {
  clearInterval(autoplayInterval);
  startAutoplay();
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  clearInterval(autoplayInterval);
});

useScrollAnimation();
</script>

<style lang="scss" scoped>
.testimonials-section {
  @include section;
  
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
  
  .testimonials-slider {
    max-width: 900px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }
  
  .testimonials-track {
    display: flex;
    transition: transform 0.5s ease;
  }
  
  .testimonial-slide {
    min-width: 100%;
    padding: 0 $spacing-3;
  }
  
  .slider-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: $spacing-8;
  }
  
  .slider-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background-color: $white;
    color: $gray-dark;
    cursor: pointer;
    transition: $transition-base;
    box-shadow: $shadow;
    
    &:hover {
      background-color: $primary;
      color: $white;
      box-shadow: 0 4px 10px rgba($primary, 0.3);
    }
    
    &.prev {
      margin-right: $spacing-4;
    }
    
    &.next {
      margin-left: $spacing-4;
    }
  }
  
  .slider-dots {
    display: flex;
    align-items: center;
  }
  
  .slider-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: $gray-lighter;
    border: none;
    margin: 0 $spacing-2;
    cursor: pointer;
    transition: $transition-base;
    
    &.active {
      background-color: $primary;
      transform: scale(1.2);
    }
    
    &:hover:not(.active) {
      background-color: $gray-light;
    }
  }
}
</style>
