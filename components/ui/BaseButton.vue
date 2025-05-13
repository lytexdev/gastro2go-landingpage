<template>
  <button
    :type="type"
    :class="[
      'base-button',
      `base-button--${variant}`,
      `base-button--${size}`,
      { 'base-button--block': block }
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  block: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

defineEmits(['click']);
</script>

<style lang="scss" scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  border: none;
  outline: none;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  &--primary {
    background-color: var(--color-primary);
    color: white;
    
    &:hover:not(:disabled) {
      background-color: var(--color-primary-dark);
    }
  }
  
  &--secondary {
    background-color: var(--color-secondary);
    color: white;
    
    &:hover:not(:disabled) {
      background-color: var(--color-secondary-dark);
    }
  }
  
  &--outline {
    background-color: transparent;
    border: 2px solid var(--color-primary);
    color: var(--color-primary);
    
    &:hover:not(:disabled) {
      background-color: var(--color-primary);
      color: white;
    }
  }
  
  &--sm {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
  
  &--md {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
  
  &--lg {
    padding: 1rem 2rem;
    font-size: 1.125rem;
  }
  
  &--block {
    width: 100%;
  }
}
</style>