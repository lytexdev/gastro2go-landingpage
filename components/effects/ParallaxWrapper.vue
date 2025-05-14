<template>
  <div 
    class="parallax-wrapper"
    :style="wrapperStyles"
    :class="{ 'parallax-active': isInView }"
    ref="wrapper"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  speed: {
    type: Number,
    default: 0.1 // Movement factor
  },
  direction: {
    type: String,
    default: 'up', // 'up', 'down', 'left', 'right'
    validator: (value) => ['up', 'down', 'left', 'right'].includes(value)
  },
  maxOffset: {
    type: Number,
    default: 100 // Maximum movement in pixels
  },
  threshold: {
    type: Number,
    default: 0 // Intersection observer threshold
  },
  disabled: {
    type: Boolean,
    default: false // Disable parallax on mobile etc.
  }
});

const wrapper = ref(null);
const isInView = ref(false);
const scrollY = ref(0);
const elementOffsetTop = ref(0);

// Calculate transform values based on scroll position
const transform = computed(() => {
  if (!isInView.value || props.disabled) return 'translate3d(0, 0, 0)';
  
  const viewportHeight = window.innerHeight;
  const elementHeight = wrapper.value?.offsetHeight || 0;
  
  // Calculate how far element is from center of viewport (in percentage)
  const elementCenter = elementOffsetTop.value + elementHeight / 2;
  const viewportCenter = scrollY.value + viewportHeight / 2;
  const distanceFromCenter = elementCenter - viewportCenter;
  
  // Calculate movement factor as percentage of viewport height
  const factor = (distanceFromCenter / viewportHeight) * props.maxOffset * props.speed;
  
  // Apply direction to transform
  let x = 0;
  let y = 0;
  
  switch (props.direction) {
    case 'up':
      y = -factor;
      break;
    case 'down':
      y = factor;
      break;
    case 'left':
      x = -factor;
      break;
    case 'right':
      x = factor;
      break;
  }
  
  return `translate3d(${x}px, ${y}px, 0)`;
});

const wrapperStyles = computed(() => {
  return {
    transform: transform.value,
    willChange: isInView.value ? 'transform' : 'auto'
  };
});

// Update scroll position and element offset
const handleScroll = () => {
  scrollY.value = window.scrollY;
  
  // Check if wrapper exists before getting its position
  if (wrapper.value) {
    const rect = wrapper.value.getBoundingClientRect();
    elementOffsetTop.value = rect.top + scrollY.value;
  }
};

// Setup intersection observer
const setupObserver = () => {
  if (!wrapper.value) return;
  
  const options = {
    root: null,
    rootMargin: '100px 0px',
    threshold: props.threshold
  };
  
  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    isInView.value = entry.isIntersecting;
    
    // If element is in view, recalculate its position
    if (isInView.value) {
      handleScroll();
    }
  }, options);
  
  observer.observe(wrapper.value);
  
  return observer;
};

let observer = null;
let scrollHandler = null;

onMounted(() => {
  // Check if we should enable parallax
  if (props.disabled) return;
  
  // Set up the observer
  observer = setupObserver();
  
  // Add scroll event listener with throttling for performance
  let ticking = false;
  scrollHandler = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', scrollHandler, { passive: true });
  window.addEventListener('resize', handleScroll, { passive: true });
  
  // Initial calculation
  handleScroll();
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
  }
  
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler);
    window.removeEventListener('resize', handleScroll);
  }
});
</script>

<style scoped>
.parallax-wrapper {
  position: relative;
  will-change: transform;
  transition: transform 0.1s linear;
  perspective: 1000px;
  backface-visibility: hidden;
}

@media (max-width: 768px), (prefers-reduced-motion: reduce) {
  .parallax-wrapper {
    transform: none !important;
    transition: none !important;
  }
}
</style>
