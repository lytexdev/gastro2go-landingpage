<template>
  <div class="testimonial" :class="{ 'testimonial-featured': featured }">
    <div class="testimonial-content">
      <div class="testimonial-quote">
        <svg class="quote-icon" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M10 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5"></path>
          <path d="M19 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5"></path>
        </svg>
        <p class="quote">{{ quote }}</p>
      </div>
      <div class="testimonial-author">
        <div v-if="image" class="author-image">
          <img :src="image" :alt="author" />
        </div>
        <div class="author-info">
          <div class="author-name">{{ author }}</div>
          <div class="author-title">{{ title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  quote: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="scss" scoped>
.testimonial {
  background-color: $white;
  border-radius: $border-radius-lg;
  padding: $spacing-6;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: $shadow;
  transition: $transition-base;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: $shadow-lg;
  }
  
  &.testimonial-featured {
    border-left: 4px solid $primary;
  }
  
  .testimonial-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .testimonial-quote {
    margin-bottom: $spacing-5;
    flex: 1;
    position: relative;
    
    .quote-icon {
      color: $primary;
      opacity: 0.2;
      position: absolute;
      top: -$spacing-4;
      left: -$spacing-4;
      width: 48px;
      height: 48px;
    }
    
    .quote {
      position: relative;
      font-style: italic;
      line-height: 1.6;
      color: $gray-dark;
      margin: 0;
    }
  }
  
  .testimonial-author {
    display: flex;
    align-items: center;
    margin-top: auto;
    
    .author-image {
      width: 48px;
      height: 48px;
      margin-right: $spacing-3;
      border-radius: 50%;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    .author-info {
      .author-name {
        font-weight: $font-weight-semibold;
        color: $dark;
      }
      
      .author-title {
        font-size: $font-size-sm;
        color: $gray;
        margin-top: $spacing-1;
      }
    }
  }
}
</style>