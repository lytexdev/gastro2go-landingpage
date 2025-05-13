<template>
  <div class="base-input">
    <label v-if="label" :for="id" class="base-input__label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      class="base-input__field"
      :class="{ 'is-invalid': error }"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div v-if="error" class="base-input__error">{{ error }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  }
});

defineEmits(['update:modelValue']);

const id = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`);
</script>

<style lang="scss" scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  
  &__label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text);
  }
  
  &__field {
    padding: 0.75rem 1rem;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: all 0.2s ease-in-out;
    background-color: white;
    
    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.1);
    }
    
    &:disabled {
      background-color: var(--color-gray-100);
      cursor: not-allowed;
    }
    
    &.is-invalid {
      border-color: var(--color-error);
      
      &:focus {
        box-shadow: 0 0 0 2px rgba(var(--color-error-rgb), 0.1);
      }
    }
  }
  
  &__error {
    font-size: 0.75rem;
    color: var(--color-error);
  }
}
</style>