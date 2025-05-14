<template>
  <span :class="['typewriter', { 'typewriter-done': done }]">
    {{ displayText }}<span class="typewriter-cursor" :class="{ 'blink': cursorBlink }">|</span>
  </span>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  startDelay: {
    type: Number,
    default: 200
  },
  speed: {
    type: Number,
    default: 50 // ms per character
  },
  blinkCursor: {
    type: Boolean,
    default: true
  },
  erasePause: {
    type: Number,
    default: 2000 // ms to pause before erasing
  },
  eraseSpeed: {
    type: Number,
    default: 30 // ms per character during erasing
  },
  infinite: {
    type: Boolean,
    default: false // Whether to repeat indefinitely
  },
  texts: {
    type: Array,
    default: () => [] // Array of strings to cycle through
  }
});

const displayText = ref('');
const cursorBlink = ref(false);
const done = ref(false);
let currentTextIndex = 0;
let typingTimeout = null;

// Get current text to display
const getCurrentText = () => {
  if (props.texts.length > 0) {
    return props.texts[currentTextIndex];
  }
  return props.text;
};

// Start typing animation
const startTyping = () => {
  const textToType = getCurrentText();
  let charIndex = 0;
  displayText.value = '';
  cursorBlink.value = false;
  
  const typeNextChar = () => {
    if (charIndex < textToType.length) {
      displayText.value += textToType.charAt(charIndex);
      charIndex++;
      typingTimeout = setTimeout(typeNextChar, props.speed);
    } else {
      cursorBlink.value = props.blinkCursor;
      
      // If we should erase and continue
      if (props.infinite || props.texts.length > 1) {
        setTimeout(startErasing, props.erasePause);
      } else {
        done.value = true;
      }
    }
  };
  
  typingTimeout = setTimeout(typeNextChar, props.startDelay);
};

// Start erasing animation
const startErasing = () => {
  cursorBlink.value = false;
  
  const eraseNextChar = () => {
    if (displayText.value.length > 0) {
      displayText.value = displayText.value.slice(0, -1);
      typingTimeout = setTimeout(eraseNextChar, props.eraseSpeed);
    } else {
      // Move to next text
      if (props.texts.length > 0) {
        currentTextIndex = (currentTextIndex + 1) % props.texts.length;
      }
      
      // Start typing the next text
      setTimeout(startTyping, props.startDelay);
    }
  };
  
  typingTimeout = setTimeout(eraseNextChar, props.eraseSpeed);
};

// Start the animation when component is mounted
onMounted(() => {
  startTyping();
});

// Watch for text changes
watch(() => props.text, () => {
  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }
  
  startTyping();
});

// Watch for texts array changes
watch(() => props.texts, () => {
  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }
  
  currentTextIndex = 0;
  startTyping();
}, { deep: true });
</script>

<style scoped>
.typewriter {
  display: inline-block;
}

.typewriter-cursor {
  display: inline-block;
  font-weight: 400;
  color: currentColor;
  position: relative;
  margin-left: 2px;
}

.typewriter-cursor.blink {
  animation: cursor-blink 1s step-end infinite;
}

@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
