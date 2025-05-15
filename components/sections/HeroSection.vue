<template>
  <section class="hero-section">
    <!-- Interactive particle background -->
    <ParticleSystem 
      color="rgba(76, 175, 80, 0.4)" 
      :density="50" 
      :speed="0.3" 
      :interactive="true"
    />
    
    <div class="container">
      <div class="hero-content">
        <!-- Text container with enhanced animations -->
        <div class="hero-text" data-aos="fade-up">
          <h1 class="hero-title" data-text-split="words">
            {{ $t('hero.title') }}
          </h1>
          
          <p class="hero-subtitle">
            {{ $t('hero.subtitle') }}
          </p>
          
          <div class="typewriter-container">
            <TypeWriter 
              staticText=""
              :texts="typewriterTexts"
              :speed="70"
              :erasePause="2000"
              :startPause="500"
            />
          </div>
          
          <div class="hero-cta stagger-group" data-stagger-delay="0.1">
            <BaseButton 
              variant="primary" 
              size="lg"
              withIcon
              @click="scrollToContact"
              class="magnetic stagger-item"
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
              class="demo-btn magnetic stagger-item"
              data-power="20"
              @click="scrollToDemo"
            >
              {{ $t('hero.demo') }}
            </BaseButton>
          </div>
          
          <div class="hero-features stagger-group" data-stagger-delay="0.15">
            <div class="feature-item stagger-item">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 12l5 5l10 -10"></path>
              </svg>
              <span>0% Provisionen</span>
            </div>
            <div class="feature-item stagger-item">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 12l5 5l10 -10"></path>
              </svg>
              <span>DSGVO-konform</span>
            </div>
            <div class="feature-item stagger-item">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 12l5 5l10 -10"></path>
              </svg>
              <span>Hosting in DE</span>
            </div>
          </div>
        </div>
        
        <!-- Animated device image with parallax effects -->
        <div class="hero-image">
          <div 
            class="image-wrapper float"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <img 
              src="/images/hero-device.webp" 
              alt="Gastro2Go.io App"
              loading="eager"
              width="600"
              height="400"
              class="main-image"
            />
            
            <!-- Floating UI elements that orbit around the main image -->
            <div class="floating-elements">
              <div 
                class="element element-1" 
                data-aos="fade-up"
                data-aos-delay="700"
                data-aos-duration="1000"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </div>
              
              <div 
                class="element element-2" 
                data-aos="fade-up"
                data-aos-delay="900"
                data-aos-duration="1000"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3l-4.03 2.42Z"></path>
                  <path d="m7 16.5-4.74-2.85"></path>
                  <path d="m7 16.5 5-3"></path>
                  <path d="M7 16.5V19"></path>
                  <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"></path>
                  <path d="m17 16.5-5-3"></path>
                  <path d="m17 16.5 4.74-2.85"></path>
                  <path d="M17 16.5V19"></path>
                  <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"></path>
                  <path d="M12 8 7.26 5.15"></path>
                  <path d="m12 8 4.74-2.85"></path>
                  <path d="M12 13V8"></path>
                </svg>
              </div>
              
              <div 
                class="element element-3"
                data-aos="fade-up"
                data-aos-delay="1100"
                data-aos-duration="1000"
              >
                <span class="count-up" data-counter="100" data-suffix="%" data-duration="2000">0%</span>
              </div>
              
              <div class="notification-popup">
                <div class="notification-content">
                  <div class="notification-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M8.56 2.9A7 7 0 0 1 19 9v4"></path>
                      <path d="M17 16v2"></path>
                      <path d="M12 19h10"></path>
                      <path d="M8 19a7 7 0 0 1-7-7V8h3v4a4 4 0 0 0 4 4Z"></path>
                    </svg>
                  </div>
                  <div class="notification-message">
                    <div class="notification-title">Neue Bestellung</div>
                    <div class="notification-text">Tisch 12 - Burger & Pommes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Decorative blobs/shapes in the background -->
          <div class="decorative-shape shape-1"></div>
          <div class="decorative-shape shape-2"></div>
        </div>
      </div>
    </div>
    
    <!-- Animated scroll indicator -->
    <div class="scroll-indicator">
      <div class="scroll-mouse">
        <div class="scroll-wheel"></div>
      </div>
      <div class="scroll-arrows">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import TypeWriter from '../effects/TypeWriter.vue';
import ParticleSystem from '../effects/ParticleSystem.vue';
import BaseButton from '../ui/BaseButton.vue';
import useMotionSystem from '~/composables/useMotionSystem';

const { t } = useI18n();
const motionSystem = useMotionSystem();

// TypeWriter text options
const typewriterTexts = computed(() => t('hero.typewriter') as string[]);

// Helper functions for smooth scrolling
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

// Animation for notification to appear
onMounted(() => {
  // Add staggered animation to the notification after a delay
  setTimeout(() => {
    const notification = document.querySelector('.notification-popup');
    if (notification) {
      notification.classList.add('show');
    }
  }, 3000);
  
  // Animate split text elements
  const textElements = document.querySelectorAll('[data-text-split]');
  textElements.forEach(element => {
    motionSystem.animateElement(element as HTMLElement);
  });

  // Add 3D tilt effect to the image wrapper
  const imageWrapper = document.querySelector('.image-wrapper') as HTMLElement;
  const secondaryImage = document.querySelector('.secondary-image-wrapper') as HTMLElement;
  
  if (imageWrapper && window.innerWidth > 768) {
    imageWrapper.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = imageWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate mouse position
      const xPercent = (x / rect.width - 0.5) * 2; // -1 to 1
      const yPercent = (y / rect.height - 0.5) * 2; // -1 to 1
      
      // Apply subtle rotation to main image
      imageWrapper.style.transform = `perspective(1000px) rotateY(${xPercent * 3}deg) rotateX(${-yPercent * 3}deg)`;
      
      // Apply more pronounced rotation to secondary image
      if (secondaryImage) {
        secondaryImage.style.transform = `translateY(${-yPercent * 10}px) translateX(${xPercent * 10}px) rotateY(${-15 + xPercent * 5}deg) rotateX(${5 + -yPercent * 5}deg)`;
      }
    });
    
    // Reset on mouse leave
    imageWrapper.addEventListener('mouseleave', () => {
      imageWrapper.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
      
      if (secondaryImage) {
        secondaryImage.style.transform = 'rotateY(-15deg) rotateX(5deg)';
      }
    });
  }
});
</script>

<style lang="scss">
.hero-section {
  position: relative;
  padding: 10rem 0 6rem;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  
  // Subtle gradient background
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(243, 250, 243, 0.95) 100%
  );
  
  .container {
    position: relative;
    z-index: 2;
  }
  
  .hero-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 4rem;
    position: relative;
    
    @media (min-width: 1024px) {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 2rem;
    }
  }
  
  .hero-text {
    max-width: 600px;
    
    .hero-title {
      font-size: clamp(2.5rem, 8vw, 4rem);
      font-weight: 800;
      margin-bottom: 1.5rem;
      line-height: 1.1;
      color: var(--color-text-dark);
      position: relative;
      
      // Modern underline effect
      &::after {
        content: '';
        position: absolute;
        bottom: -0.5rem;
        left: 0;
        width: 80px;
        height: 4px;
        background: linear-gradient(to right, var(--color-primary), var(--color-primary-light));
        border-radius: 2px;
        transition: width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      
      &:hover::after {
        width: 120px;
      }
    }
    
    .hero-subtitle {
      font-size: clamp(1.2rem, 4vw, 1.5rem);
      color: var(--color-text);
      margin-bottom: 1.5rem;
      font-weight: 400;
    }
    
    .typewriter-container {
      font-size: clamp(1.1rem, 3vw, 1.25rem);
      min-height: 3rem;
      margin-bottom: 2.5rem;
      color: var(--color-text);
    }
    
    .hero-cta {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 3rem;
      
      .demo-btn {
        @media (max-width: 480px) {
          width: 100%;
        }
      }
    }
    
    .hero-features {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      margin-top: 2.5rem;
      
      .feature-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--color-text);
        font-weight: 500;
        background-color: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        padding: 0.5rem 0.75rem;
        border-radius: 100px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                    box-shadow 0.3s ease;
        
        .icon {
          color: var(--color-primary);
        }
        
        &:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }
      }
    }
  }
  
  .hero-image {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .image-wrapper {
      position: relative;
      z-index: 2;
      
      .main-image {
        width: 100%;
        max-width: 500px;
        height: auto;
        border-radius: 24px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1),
                    box-shadow 0.8s ease;
        z-index: 2;
        position: relative;
        
        &:hover {
          transform: translateY(-10px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
        }
      }
      
      .secondary-image-wrapper {
        position: absolute;
        right: -40px;
        bottom: -60px;
        z-index: 1;
        perspective: 1000px;
        transform-style: preserve-3d;
        
        .secondary-image {
          width: 240px;
          height: auto;
          border-radius: 16px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
          transform: rotateY(-15deg) rotateX(5deg);
          transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.8s ease;
          border: 5px solid white;
          z-index: 2;
          
          &:hover {
            transform: rotateY(-5deg) rotateX(2deg) translateY(-10px);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
          }
        }
        
        .image-frame {
          position: absolute;
          top: -10px;
          left: -10px;
          right: 10px;
          bottom: 10px;
          border: 2px dashed rgba(var(--color-primary-rgb), 0.3);
          border-radius: 20px;
          z-index: 1;
          transform: rotateY(-15deg) rotateX(5deg) translateZ(-10px);
          transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
          
          &::before {
            content: '';
            position: absolute;
            top: 10px;
            left: 10px;
            right: -10px;
            bottom: -10px;
            background: linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.1), rgba(var(--color-primary-light-rgb), 0.05));
            border-radius: 20px;
            z-index: -1;
          }
        }
        
        @media (max-width: 1200px) {
          right: -20px;
          bottom: -40px;
          
          .secondary-image {
            width: 200px;
          }
        }
        
        @media (max-width: 767px) {
          position: relative;
          right: 0;
          bottom: -30px;
          margin: 0 auto;
          width: 75%;
          
          .secondary-image {
            width: 100%;
            transform: rotateY(-8deg) rotateX(3deg);
          }
          
          .image-frame {
            transform: rotateY(-8deg) rotateX(3deg) translateZ(-5px);
          }
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
        background-color: white;
        border-radius: 50%;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-primary);
        
        &.element-1 {
          top: 5%;
          right: 5%;
          width: 60px;
          height: 60px;
          animation: float 8s ease-in-out infinite;
        }
        
        &.element-2 {
          bottom: 15%;
          left: 0%;
          width: 70px;
          height: 70px;
          animation: float 6s ease-in-out infinite 1s;
        }
        
        &.element-3 {
          top: 20%;
          left: 5%;
          width: 80px;
          height: 80px;
          font-weight: bold;
          font-size: 1.5rem;
          animation: float 7s ease-in-out infinite 0.5s;
        }
      }
      
      .notification-popup {
        position: absolute;
        right: -20px;
        top: 35%;
        background-color: white;
        border-radius: 12px;
        padding: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        transform: translateX(120%);
        opacity: 0;
        transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
                    opacity 0.6s ease;
        
        &.show {
          transform: translateX(0);
          opacity: 1;
        }
        
        .notification-content {
          display: flex;
          align-items: center;
          gap: 12px;
          
          .notification-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: rgba(var(--color-primary-rgb), 0.1);
            color: var(--color-primary);
          }
          
          .notification-message {
            .notification-title {
              font-weight: 600;
              font-size: 0.875rem;
              margin-bottom: 2px;
            }
            
            .notification-text {
              font-size: 0.75rem;
              color: var(--color-text-light);
            }
          }
        }
      }
    }
    
    .decorative-shape {
      position: absolute;
      border-radius: 50%;
      background: linear-gradient(
        135deg,
        rgba(var(--color-primary-rgb), 0.15) 0%,
        rgba(var(--color-primary-rgb), 0.02) 100%
      );
      
      &.shape-1 {
        top: -10%;
        right: -10%;
        width: 300px;
        height: 300px;
        z-index: 1;
      }
      
      &.shape-2 {
        bottom: 10%;
        left: -15%;
        width: 250px;
        height: 250px;
        z-index: 1;
        opacity: 0.7;
      }
    }
  }
  
  // Animated scroll indicator
  .scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 10;
    
    .scroll-mouse {
      width: 30px;
      height: 50px;
      border: 2px solid rgba(var(--color-primary-rgb), 0.3);
      border-radius: 20px;
      position: relative;
      margin-bottom: 10px;
      
      .scroll-wheel {
        position: absolute;
        top: 10px;
        left: 50%;
        width: 4px;
        height: 8px;
        background-color: var(--color-primary);
        margin-left: -2px;
        border-radius: 4px;
        animation: scroll 2s ease infinite;
      }
    }
    
    .scroll-arrows {
      display: flex;
      flex-direction: column;
      align-items: center;
      
      span {
        display: block;
        width: 10px;
        height: 10px;
        border-bottom: 2px solid rgba(var(--color-primary-rgb), 0.4);
        border-right: 2px solid rgba(var(--color-primary-rgb), 0.4);
        transform: rotate(45deg);
        margin: -4px;
        animation: scrollArrow 2s infinite;
        
        &:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        &:nth-child(3) {
          animation-delay: 0.4s;
        }
      }
    }
  }
}

// Animations
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes scroll {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(20px);
  }
}

@keyframes scrollArrow {
  0% {
    opacity: 0;
    transform: rotate(45deg) translate(-5px, -5px);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(45deg) translate(5px, 5px);
  }
}

// Responsive adjustments
@media (max-width: 767px) {
  .hero-section {
    padding: 8rem 0 6rem;
    
    .hero-content {
      text-align: center;
      
      .hero-title::after {
        left: 50%;
        transform: translateX(-50%);
      }
      
      .hero-features {
        justify-content: center;
      }
      
      .hero-cta {
        justify-content: center;
      }
    }
    
    .hero-image {
      .decorative-shape {
        display: none;
      }
      
      .image-wrapper {
        max-width: 90%;
        margin: 0 auto;
        
        .secondary-image-wrapper {
          margin-top: 20px;
          transform: translateY(20px);
        }
      }
    }
    
    .scroll-indicator {
      display: none;
    }
  }
}

// Reduced motion preferences
@media (prefers-reduced-motion: reduce) {
  .hero-section {
    .floating-elements .element,
    .scroll-indicator .scroll-wheel,
    .scroll-indicator .scroll-arrows span {
      animation: none !important;
    }
    
    .notification-popup.show {
      transition: none;
      transform: none;
      opacity: 1;
    }
  }
}
</style>
