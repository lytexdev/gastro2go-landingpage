<template>
  <span class="typewriter-text">{{ displayText }}</span>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  texts: {
    type: Array,
    required: true
  },
  speed: {
    type: Number,
    default: 100
  },
  erasePause: {
    type: Number,
    default: 2000
  },
  infinite: {
    type: Boolean,
    default: true
  }
});

const displayText = ref('');
const currentIndex = ref(0);
const isDeleting = ref(false);
const typingSpeed = ref(props.speed);

const type = () => {
  const current = props.texts[currentIndex.value];
  
  if (isDeleting.value) {
    displayText.value = current.substring(0, displayText.value.length - 1);
  } else {
    displayText.value = current.substring(0, displayText.value.length + 1);
  }

  let typeSpeed = isDeleting.value ? props.speed / 2 : props.speed;

  if (!isDeleting.value && displayText.value === current) {
    isDeleting.value = true;
    typeSpeed = props.erasePause;
  } else if (isDeleting.value && displayText.value === '') {
    isDeleting.value = false;
    currentIndex.value = (currentIndex.value + 1) % props.texts.length;
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
};

onMounted(() => {
  type();
});

watch(() => props.texts, () => {
  currentIndex.value = 0;
  isDeleting.value = false;
  displayText.value = '';
  type();
});
</script>

<style lang="scss" scoped>
.typewriter-text {
  display: inline-block;
  min-height: 1.5em;
  color: $primary;
  font-weight: 600;
  border-right: 2px solid $primary;
  animation: blink 0.7s infinite;
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}
</style>
