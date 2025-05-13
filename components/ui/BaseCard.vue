<template>
  <div :class="['card', elevated ? 'card-elevated' : '', className]">
    <div v-if="$slots.icon" class="card-icon">
      <slot name="icon"></slot>
    </div>
    <div v-if="$slots.image" class="card-image">
      <slot name="image"></slot>
    </div>
    <div class="card-content">
      <h3 v-if="title" class="card-title">{{ title }}</h3>
      <div class="card-body">
        <slot></slot>
      </div>
      <div v-if="$slots.footer" class="card-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  elevated: {
    type: Boolean,
    default: false
  },
  className: {
    type: String,
    default: ''
  }
});
</script>

<style lang="scss" scoped>
.card {
  background-color: $white;
  border-radius: $border-radius-lg;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: $transition-base;
  border: 1px solid $gray-lighter;
  
  &.card-elevated {
    box-shadow: $shadow;
    border: none;
    
    &:hover {
      @include hover-effect;
    }
  }
  
  .card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    margin: $spacing-5 auto $spacing-4;
    color: $primary;
    
    svg {
      width: 32px;
      height: 32px;
    }
  }
  
  .card-image {
    width: 100%;
    
    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
  }
  
  .card-content {
    padding: $spacing-5;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  
  .card-title {
    margin-bottom: $spacing-3;
    color: $dark;
  }
  
  .card-body {
    margin-bottom: $spacing-4;
    color: $gray-dark;
    flex: 1;
  }
  
  .card-footer {
    margin-top: auto;
  }
}
</style>