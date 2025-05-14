<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <NuxtLink to="/" class="logo">
          <img src="~/assets/images/logo.svg" alt="Gastro2Go Logo" width="150" height="40" />
        </NuxtLink>
        
        <div class="nav-links">
          <NuxtLink to="#features" class="nav-link">{{ $t('nav.features') }}</NuxtLink>
          <NuxtLink to="#pricing" class="nav-link">{{ $t('nav.pricing') }}</NuxtLink>
          <NuxtLink to="#contact" class="nav-link">{{ $t('nav.contact') }}</NuxtLink>
        </div>
        
        <div class="nav-actions">
          <LanguageSwitcher class="mr-3" />
          <BaseButton variant="primary" size="md" @click="scrollToContact">
            {{ $t('nav.cta') }}
          </BaseButton>
        </div>

        <button 
          class="mobile-menu-toggle" 
          @click="toggleMobileMenu"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Toggle mobile menu"
        >
          <span class="hamburger" :class="{ 'is-active': isMobileMenuOpen }"></span>
        </button>
      </nav>
    </div>

    <MobileMenu 
      :is-open="isMobileMenuOpen" 
      @close="closeMobileMenu"
    />
  </header>
</template>

<script setup>
import { ref } from 'vue'
import LanguageSwitcher from '~/components/ui/LanguageSwitcher.vue'
import MobileMenu from '~/components/layout/MobileMenu.vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

const scrollToContact = () => {
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  }
  closeMobileMenu()
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $z-index-fixed;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: block;
  z-index: 2;
  
  img {
    height: 40px;
    width: auto;
  }
}

.nav-links {
  display: flex;
  gap: 2rem;
  
  @media (max-width: $breakpoint-md) {
    display: none;
  }
}

.nav-link {
  color: var(--color-text);
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--color-primary);
  }
}

.nav-actions {
  display: flex;
  align-items: center;
  
  @media (max-width: $breakpoint-md) {
    display: none;
  }
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  z-index: 2;
  
  @media (max-width: $breakpoint-md) {
    display: block;
  }
}

.hamburger {
  display: block;
  position: relative;
  width: 24px;
  height: 2px;
  background: var(--color-text);
  transition: all 0.3s ease;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background: var(--color-text);
    transition: all 0.3s ease;
  }
  
  &::before {
    top: -8px;
  }
  
  &::after {
    bottom: -8px;
  }
  
  &.is-active {
    background: transparent;
    
    &::before {
      transform: rotate(45deg);
      top: 0;
    }
    
    &::after {
      transform: rotate(-45deg);
      bottom: 0;
    }
  }
}
</style> 