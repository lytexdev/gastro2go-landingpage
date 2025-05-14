<template>
  <div class="mobile-menu" :class="{ 'is-open': isOpen }">
    <div class="menu-overlay" @click="close"></div>
    <div class="menu-drawer">
      <div class="menu-header">
        <div class="menu-logo">
          <img src="~/assets/images/lytex-logo.svg" alt="Gastro2Go.io" class="logo-image" />
          <span class="logo-text">Gastro2Go<span class="text-primary">.io</span></span>
        </div>
        <button class="close-button" @click="close" aria-label="Close Menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M18 6l-12 12"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <nav class="menu-nav">
        <ul class="menu-list">
          <li class="menu-item" v-for="(item, index) in menuItems" :key="index">
            <a :href="item.url" class="menu-link" @click="close">
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>
      
      <div class="menu-footer">
        <div class="language-switcher-container">
          <LanguageSwitcher />
        </div>
        
        <BaseButton 
          variant="primary"
          block
          @click="registerAction"
        >
          {{ $t('nav.register') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import LanguageSwitcher from '../ui/LanguageSwitcher.vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};

const menuItems = computed(() => [
  { label: useI18n().t('nav.benefits'), url: '#benefits' },
  { label: useI18n().t('nav.demo'), url: '#demo' },
  { label: useI18n().t('nav.pricing'), url: '#pricing' },
  { label: useI18n().t('nav.features'), url: '#features' },
  { label: useI18n().t('nav.about'), url: '#about' },
  { label: useI18n().t('nav.contact'), url: '#contact' }
]);

const registerAction = () => {
  close();
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};

// Prevent body scrolling when menu is open
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
});
</script>

<style lang="scss" scoped>
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: $z-index-modal;
  pointer-events: none;
  
  &.is-open {
    pointer-events: auto;
    
    .menu-overlay {
      opacity: 1;
    }
    
    .menu-drawer {
      transform: translateX(0);
    }
  }
  
  .menu-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($dark, 0.5);
    backdrop-filter: blur(4px);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .menu-drawer {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    max-width: 320px;
    height: 100%;
    background-color: $white;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
  
  .menu-header {
    @include flex-between;
    padding: $spacing-4;
    border-bottom: 1px solid $gray-lighter;
    
    .menu-logo {
      display: flex;
      align-items: center;
      
      .logo-image {
        height: 30px;
        width: auto;
        margin-right: $spacing-2;
      }
      
      .logo-text {
        font-family: $font-family-heading;
        font-weight: $font-weight-bold;
        font-size: $font-size-lg;
        color: $dark;
      }
    }
    
    .close-button {
      background: none;
      border: none;
      cursor: pointer;
      color: $gray;
      padding: $spacing-2;
      transition: color 0.2s ease;
      
      &:hover {
        color: $primary;
      }
    }
  }
  
  .menu-nav {
    flex: 1;
    padding: $spacing-6 $spacing-4;
    overflow-y: auto;
    
    .menu-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    
    .menu-item {
      margin-bottom: $spacing-4;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
    
    .menu-link {
      display: block;
      font-weight: $font-weight-medium;
      font-size: $font-size-lg;
      color: $gray-dark;
      text-decoration: none;
      padding: $spacing-2 0;
      transition: color 0.2s ease;
      
      &:hover {
        color: $primary;
      }
    }
  }
  
  .menu-footer {
    padding: $spacing-6 $spacing-4;
    border-top: 1px solid $gray-lighter;
    
    .language-switcher-container {
      display: flex;
      justify-content: center;
      margin-bottom: $spacing-4;
    }
  }
}
</style>
