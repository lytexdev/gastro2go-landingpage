<template>
  <div 
    class="tilt-card"
    :class="{ 
      'hover-enabled': interactive, 
      [`tilt-card--${variant}`]: true,
      'has-image': !!image
    }"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    ref="cardRef"
  >
    <div class="tilt-card__content" :style="contentStyle">
      <div class="tilt-card__icon" v-if="$slots.icon">
        <slot name="icon"></slot>
      </div>
      
      <div class="tilt-card__text">
        <h3 class="tilt-card__title" v-if="title">{{ title }}</h3>
        <div class="tilt-card__description">
          <slot></slot>
        </div>
      </div>
      
      <div class="tilt-card__image" v-if="image">
        <img :src="image" :alt="imageAlt || title" />
      </div>
      
      <div class="tilt-card__footer" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
    
    <!-- Gloss/reflective effect overlay -->
    <div 
      class="tilt-card__gloss" 
      :style="glossStyle"
      v-if="gloss && interactive"
    ></div>
    
    <!-- Background elements -->
    <div class="tilt-card__bg" :style="bgStyle">
      <div class="tilt-card__bg-shape shape-1"></div>
      <div class="tilt-card__bg-shape shape-2"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// Define props with type annotation
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  imageAlt: {
    type: String,
    default: ''
  },
  tiltFactor: {
    type: Number,
    default: 15 // Maximum tilt in degrees
  },
  gloss: {
    type: Boolean,
    default: true
  },
  perspective: {
    type: Number,
    default: 1000
  },
  interactive: {
    type: Boolean,
    default: true
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value: string) => ['default', 'primary', 'secondary', 'subtle'].includes(value)
  },
  depth: {
    type: Number,
    default: 10 // In pixels
  }
})

// Refs
const cardRef = ref<HTMLElement | null>(null)
const mousePosition = ref({ x: 0, y: 0 })
const tiltX = ref(0)
const tiltY = ref(0)
const glossPosition = ref({ x: 0, y: 0 })
const isHovering = ref(false)

// Computed styles
const contentStyle = computed(() => {
  return {
    transform: isHovering.value ? 
      `perspective(${props.perspective}px) rotateX(${tiltY.value}deg) rotateY(${-tiltX.value}deg) translateZ(${props.depth}px)` : 
      'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)'
  }
})

const glossStyle = computed(() => {
  if (!isHovering.value) return {}
  
  return {
    opacity: isHovering.value ? 0.2 : 0,
    background: `radial-gradient(circle at ${glossPosition.value.x}% ${glossPosition.value.y}%, rgba(255, 255, 255, 0.7), transparent 60%)`,
    transform: `translateX(${tiltX.value * 1.5}px) translateY(${tiltY.value * 1.5}px)`
  }
})

const bgStyle = computed(() => {
  return {
    transform: isHovering.value ? 
      `perspective(${props.perspective}px) rotateX(${tiltY.value * 0.5}deg) rotateY(${-tiltX.value * 0.5}deg) translateZ(-${props.depth}px)` : 
      'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)'
  }
})

// Mouse event handlers
const handleMouseMove = (e: MouseEvent) => {
  if (!props.interactive || !cardRef.value) return
  
  isHovering.value = true
  
  // Get card dimensions
  const rect = cardRef.value.getBoundingClientRect()
  
  // Calculate mouse position relative to card center (from -1 to 1)
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const mouseX = e.clientX - centerX
  const mouseY = e.clientY - centerY
  
  // Calculate tilt angles based on mouse position
  tiltX.value = (mouseX / (rect.width / 2)) * props.tiltFactor
  tiltY.value = (mouseY / (rect.height / 2)) * props.tiltFactor
  
  // Calculate gloss position (0-100%)
  glossPosition.value = {
    x: ((e.clientX - rect.left) / rect.width) * 100,
    y: ((e.clientY - rect.top) / rect.height) * 100
  }
}

const handleMouseLeave = () => {
  if (!props.interactive) return
  
  isHovering.value = false
  
  // Reset tilt to neutral position
  tiltX.value = 0
  tiltY.value = 0
  glossPosition.value = { x: 50, y: 50 }
}

// Handle device orientation for mobile devices
const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
  if (!props.interactive || !cardRef.value) return
  
  // Skip if motion data is unavailable
  if (e.beta === null || e.gamma === null) return
  
  // Convert orientation to tilt (limit to approximately -10 to 10 degrees)
  tiltX.value = (e.gamma || 0) / 3
  tiltY.value = (e.beta || 0) / 4
  
  // Limit tilt range
  tiltX.value = Math.max(-10, Math.min(10, tiltX.value))
  tiltY.value = Math.max(-10, Math.min(10, tiltY.value))
  
  // Set gloss position to center
  glossPosition.value = { x: 50, y: 50 }
  
  isHovering.value = true
}

// Lifecycle hooks
onMounted(() => {
  // Add device orientation listener for mobile experience
  if (props.interactive && window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', handleDeviceOrientation)
  }
})

onBeforeUnmount(() => {
  // Clean up event listener
  if (window.DeviceOrientationEvent) {
    window.removeEventListener('deviceorientation', handleDeviceOrientation)
  }
})
</script>

<style lang="scss">
.tilt-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  transform-style: preserve-3d;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  background-color: var(--card-bg, white);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  
  &.hover-enabled {
    cursor: pointer;
    
    &:hover {
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
    }
  }
  
  // Variants
  &--default {
    --card-bg: white;
    --card-color: var(--color-text, #333);
    --card-accent: var(--color-primary, #4CAF50);
  }
  
  &--primary {
    --card-bg: var(--color-primary, #4CAF50);
    --card-color: white;
    --card-accent: rgba(255, 255, 255, 0.9);
    
    .tilt-card__description {
      color: rgba(255, 255, 255, 0.9);
    }
  }
  
  &--secondary {
    --card-bg: var(--color-secondary, #2196F3);
    --card-color: white;
    --card-accent: rgba(255, 255, 255, 0.9);
    
    .tilt-card__description {
      color: rgba(255, 255, 255, 0.9);
    }
  }
  
  &--subtle {
    --card-bg: rgba(var(--color-primary-rgb, 76, 175, 80), 0.05);
    --card-color: var(--color-text, #333);
    --card-accent: var(--color-primary, #4CAF50);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
    
    &:hover {
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.07);
    }
  }
  
  // Content container
  &__content {
    position: relative;
    z-index: 2;
    padding: 2rem;
    transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    transform-style: preserve-3d;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  // Icon styling
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: rgba(var(--color-primary-rgb, 76, 175, 80), 0.1);
    color: var(--card-accent);
    margin-bottom: 1.5rem;
    transition: transform 0.3s ease, background-color 0.3s ease;
    transform-style: preserve-3d;
    transform: translateZ(30px);
    
    svg {
      width: 30px;
      height: 30px;
      transform: translateZ(5px);
    }
    
    .hover-enabled:hover & {
      transform: translateZ(40px) scale(1.05);
      background-color: rgba(var(--color-primary-rgb, 76, 175, 80), 0.15);
    }
  }
  
  // Text styling
  &__text {
    flex: 1;
    transform-style: preserve-3d;
  }
  
  &__title {
    color: var(--card-color);
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    transform: translateZ(20px);
    transition: transform 0.3s ease;
    
    .hover-enabled:hover & {
      transform: translateZ(25px);
    }
  }
  
  &__description {
    color: var(--card-color, rgba(0, 0, 0, 0.7));
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    transform: translateZ(15px);
    transition: transform 0.3s ease;
    
    .hover-enabled:hover & {
      transform: translateZ(20px);
    }
  }
  
  // Image styling
  &.has-image {
    .tilt-card__content {
      padding-bottom: 0;
    }
  }
  
  &__image {
    margin: 0 -2rem;
    margin-top: auto;
    overflow: hidden;
    transform: translateZ(10px);
    transition: transform 0.3s ease;
    
    img {
      width: 100%;
      height: auto;
      display: block;
      transition: transform 0.5s ease;
      
      .hover-enabled:hover & {
        transform: scale(1.05);
      }
    }
    
    .hover-enabled:hover & {
      transform: translateZ(15px);
    }
  }
  
  // Footer styling
  &__footer {
    margin-top: auto;
    padding-top: 1.5rem;
    transform: translateZ(10px);
    transition: transform 0.3s ease;
    
    .hover-enabled:hover & {
      transform: translateZ(15px);
    }
  }
  
  // Gloss effect
  &__gloss {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    pointer-events: none;
  }
  
  // Background elements
  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    transform-style: preserve-3d;
    
    .tilt-card__bg-shape {
      position: absolute;
      border-radius: 50%;
      opacity: 0.5;
      background: linear-gradient(135deg, 
        rgba(var(--color-primary-rgb, 76, 175, 80), 0.1),
        rgba(var(--color-primary-rgb, 76, 175, 80), 0.05)
      );
      transition: transform 0.3s ease;
      
      &.shape-1 {
        top: -10%;
        right: -10%;
        width: 150px;
        height: 150px;
        
        .hover-enabled:hover & {
          transform: translateZ(-20px) scale(1.1);
        }
      }
      
      &.shape-2 {
        bottom: -5%;
        left: -10%;
        width: 120px;
        height: 120px;
        opacity: 0.3;
        
        .hover-enabled:hover & {
          transform: translateZ(-15px) scale(1.1);
        }
      }
    }
  }
}

// Media query for mobile devices
@media (max-width: 768px) {
  .tilt-card {
    &__content {
      padding: 1.5rem;
    }
    
    &__icon {
      width: 50px;
      height: 50px;
      margin-bottom: 1rem;
      
      svg {
        width: 24px;
        height: 24px;
      }
    }
    
    &__title {
      font-size: 1.25rem;
      margin-bottom: 0.75rem;
    }
    
    &__description {
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }
    
    &.has-image {
      .tilt-card__image {
        margin: 0 -1.5rem;
      }
    }
  }
}

// Reduced motion preferences
@media (prefers-reduced-motion: reduce) {
  .tilt-card {
    &__content,
    &__gloss,
    &__bg,
    &__icon,
    &__title,
    &__description,
    &__image,
    &__footer,
    .tilt-card__bg-shape {
      transition: none !important;
      transform: none !important;
    }
  }
}
</style>
