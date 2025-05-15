<template>
  <span class="typewriter">
    <span class="typewriter-static">{{ staticText }}</span>
    <span class="typewriter-text" :class="{ 'typewriter-text--blink': isBlinking }">{{ displayText }}</span>
  </span>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';

const props = defineProps({
  texts: {
    type: Array as () => string[],
    required: true
  },
  staticText: {
    type: String,
    default: ''
  },
  speed: {
    type: Number,
    default: 80 // Speed in milliseconds per character
  },
  eraseSpeed: {
    type: Number,
    default: 50 // Speed for erasing (usually faster than typing)
  },
  erasePause: {
    type: Number,
    default: 2000 // Pause time after typing before erasing
  },
  startPause: {
    type: Number,
    default: 500 // Pause time after erasing before typing new text
  },
  infinite: {
    type: Boolean,
    default: true
  },
  cursor: {
    type: Boolean,
    default: true
  },
  cursorChar: {
    type: String,
    default: '|'
  }
});

const displayText = ref('');
const currentIndex = ref(0);
const isDeleting = ref(false);
const isBlinking = ref(false);
const isPaused = ref(false);
let timeout: number | null = null;

// Computed property for the current text to type
const currentText = computed(() => props.texts[currentIndex.value]);

const type = () => {
  // Clear any existing timeout
  if (timeout !== null) {
    clearTimeout(timeout);
  }

  if (isPaused.value) {
    isBlinking.value = true;
    timeout = window.setTimeout(() => {
      isPaused.value = false;
      isBlinking.value = false;
      type();
    }, isDeleting.value ? props.startPause : props.erasePause);
    return;
  }

  isBlinking.value = false;
  const currentFullText = currentText.value;
  
  if (isDeleting.value) {
    // Deleting text
    displayText.value = currentFullText.substring(0, displayText.value.length - 1);
    
    if (displayText.value === '') {
      isDeleting.value = false;
      currentIndex.value = (currentIndex.value + 1) % props.texts.length;
      
      // If we've gone through all texts and infinite is false, stop
      if (!props.infinite && currentIndex.value === 0) {
        return;
      }
      
      // Pause before typing new text
      isPaused.value = true;
      type();
      return;
    }
  } else {
    // Typing text
    displayText.value = currentFullText.substring(0, displayText.value.length + 1);
    
    // If we're done typing this text
    if (displayText.value === currentFullText) {
      if (!props.infinite && currentIndex.value === props.texts.length - 1) {
        // If this is the last text and we're not looping, just stop
        return;
      }
      
      isDeleting.value = true;
      isPaused.value = true;
      type();
      return;
    }
  }

  // Schedule the next typing or deleting action
  const typeSpeed = isDeleting.value ? props.eraseSpeed : props.speed;
  timeout = window.setTimeout(type, typeSpeed);
};

// Start typing animation
onMounted(() => {
  type();
});

// Clean up on unmount
onUnmounted(() => {
  if (timeout !== null) {
    clearTimeout(timeout);
  }
});

// Watch for texts changes to restart typing
watch(() => props.texts, () => {
  currentIndex.value = 0;
  isDeleting.value = false;
  isPaused.value = false;
  displayText.value = '';
  type();
}, { deep: true });
</script>

<style lang="scss" scoped>
.typewriter {
  position: relative;
  display: inline-block;
  
  .typewriter-static {
    font-weight: inherit;
    color: inherit;
  }
  
  .typewriter-text {
    display: inline-block;
    min-height: 1.2em;
    position: relative;
    font-weight: 600;
    color: var(--color-primary, #4CAF50);
    
    &--blink {
      &::after {
        opacity: 0;
      }
    }
    
    &::after {
      content: '|';
      position: absolute;
      right: -4px;
      color: var(--color-primary, #4CAF50);
      animation: blink 0.85s infinite;
    }
  }
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .typewriter .typewriter-text {
    min-height: 1em;
    word-break: break-word;
  }
}
</style>
