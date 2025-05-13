<template>
  <header class="site-header" :class="{ 'is-scrolled': isScrolled }">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <NuxtLink to="/" class="logo-link">
            <img src="~/assets/images/lytex-logo.svg" alt="Gastro2Go.io" class="logo-image" />
            <span class="logo-text">Gastro2Go<span class="text-primary">.io</span></span>
          </NuxtLink>
        </div>
        
        <nav class="main-nav" :class="{ 'is-active': isMenuOpen }">
          <ul class="nav-list">
            <li class="nav-item">
              <a href="#benefits" class="nav-link">{{ $t('nav.benefits') }}</a>
            </li>
            <li class="nav-item">
              <a href="#demo" class="nav-link">{{ $t('nav.demo') }}</a>
            </li>
            <li class="nav-item">
              <a href="#pricing" class="nav-link">{{ $t('nav.pricing') }}</a>
            </li>
            <li class="nav-item">
              <a href="#features" class="nav-link">{{ $t('nav.features') }}</a>
            </li>
            <li class="nav-item">
              <a href="#about" class="nav-link">{{ $t('nav.about') }}</a>
            </li>
            <li class="nav-item">
              <a href="#contact" class="nav-link">{{ $t('nav.contact') }}</a>
            </li>
          </ul>
          
          <div class="nav-actions">
            <div class="language-switcher">
              <button 
                class="language-btn" 
                :class="{ 'active': $i18n.locale === 'de' }" 
                @click="switchLanguage('de')"
              >
                DE
              </button>
              <span class="language-separator">|</span>
              <button 
                class="language-btn" 
                :class="{ 'active': $i18n.locale === 'en' }" 
                @click="switchLanguage('en')"
              >
                EN
              </button>
            </div>
            <BaseButton 
              variant="primary"
              size="sm"
              class="nav-cta"
              @click="scrollToContact"
            >
              {{ $t('nav.register') }}
            </BaseButton>
          </div>
        </nav>
        
        <div class="mobile-actions">
          <div class="language-switcher">
            <button 
              class="language-btn" 
              :class="{ 'active': $i18n.locale === 'de' }" 
              @click="switchLanguage('de')"
            >
              DE
            </button>
            <span class="language-separator">|</span>
            <button 
              class="language-btn" 
              :class="{ 'active': $i18n.locale === 'en' }" 
              @click="switchLanguage('en')"
            >
              EN
            </button>
          </div>
          
          <button 
            class="menu-toggle" 
            :class="{ 'is-active': isMenuOpen }" 
            @click="toggleMenu"
            aria-label="Toggle Menu"
          >
            <span class="menu-bar"></span>
            <span class="menu-bar"></span>
            <span class="menu-bar"></span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isMenuOpen = ref(false);
const isScrolled = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  
  // Prevent scrolling when menu is open
  if (isMenuOpen.value) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
};

const closeMenu = () => {
  if (isMenuOpen.value) {
    isMenuOpen.value = false;
    document.body.classList.remove('no-scroll');
  }
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

const switchLanguage = (locale) => {
  const { locale: currentLocale, setLocale } = useI18n();
  
  if (currentLocale.value !== locale) {
    setLocale(locale);
  }
};

const scrollToContact = () => {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
  closeMenu();
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial scroll position
  
  // Close menu when clicking on nav links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  
  // Clean up event listeners
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.removeEventListener('click', closeMenu);
  });
});
</script>

<style lang="scss" scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: $z-index-fixed;
  padding: $spacing-4 0;
  background-color: rgba($white, 0.95);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  
  &.is-scrolled {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    padding: $spacing-3 0;
  }
  
  .header-content {
    @include flex-between;
  }
  
  .logo {
    display: flex;
    align-items: center;
    
    .logo-link {
      display: flex;
      align-items: center;
      text-decoration: none;
      
      &:hover {
        text-decoration: none;
      }
    }
    
    .logo-image {
      height: 40px;
      width: auto;
      margin-right: $spacing-2;
    }
    
    .logo-text {
      font-family: $font-family-heading;
      font-weight: $font-weight-bold;
      font-size: $font-size-xl;
      color: $dark;
    }
  }
  
  .main-nav {
    @include flex-between;
    flex: 1;
    margin-left: $spacing-8;
    
    .nav-list {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    
    .nav-item {
      margin-right: $spacing-5;
      
      &:last-child {
        margin-right: 0;
      }
    }
    
    .nav-link {
      color: $gray-dark;
      font-weight: $font-weight-medium;
      transition: color 0.2s ease;
      text-decoration: none;
      padding: $spacing-2 0;
      position: relative;
      
      &:hover {
        color: $primary;
        text-decoration: none;
        
        &::after {
          width: 100%;
        }
      }
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background-color: $primary;
        transition: width 0.3s ease;
      }
    }
    
    .nav-actions {
      display: flex;
      align-items: center;
    }
    
    .language-switcher {
      margin-right: $spacing-4;
      display: flex;
      align-items: center;
    }
  }
  
  .language-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-weight: $font-weight-medium;
    color: $gray;
    padding: $spacing-1 $spacing-2;
    transition: color 0.2s ease;
    
    &:hover, &.active {
      color: $primary;
    }
  }
  
  .language-separator {
    color: $gray-light;
    margin: 0 $spacing-1;
  }
  
  .mobile-actions {
    display: none;
    align-items: center;
  }
  
  .menu-toggle {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 28px;
    height: 20px;
    background: none;
    border: none;
    cursor: pointer;
    margin-left: $spacing-4;
    
    .menu-bar {
      width: 100%;
      height: 2px;
      background-color: $gray-dark;
      transition: all 0.3s ease;
    }
    
    &.is-active {
      .menu-bar {
        &:nth-child(1) {
          transform: translateY(9px) rotate(45deg);
        }
        
        &:nth-child(2) {
          opacity: 0;
        }
        
        &:nth-child(3) {
          transform: translateY(-9px) rotate(-45deg);
        }
      }
    }
  }
  
  @media (max-width: $breakpoint-lg) {
    .main-nav {
      position: fixed;
      top: 0;
      right: -100%;
      width: 100%;
      max-width: 400px;
      height: 100vh;
      background-color: $white;
      flex-direction: column;
      justify-content: flex-start;
      padding: 100px $spacing-6 $spacing-6;
      box-shadow: -5px 0 30px rgba(0, 0, 0, 0.1);
      transition: right 0.3s ease;
      z-index: $z-index-fixed - 1;
      margin-left: 0;
      
      &.is-active {
        right: 0;
      }
      
      .nav-list {
        flex-direction: column;
        width: 100%;
      }
      
      .nav-item {
        margin-right: 0;
        margin-bottom: $spacing-5;
        width: 100%;
      }
      
      .nav-link {
        display: block;
        font-size: $font-size-lg;
        padding: $spacing-2;
        width: 100%;
        
        &::after {
          display: none;
        }
      }
      
      .nav-actions {
        flex-direction: column;
        align-items: flex-start;
        margin-top: $spacing-6;
        width: 100%;
        
        .language-switcher {
          margin-right: 0;
          margin-bottom: $spacing-5;
        }
        
        .nav-cta {
          width: 100%;
        }
      }
    }
    
    .mobile-actions {
      display: flex;
    }
  }
}

// Make room for fixed header
body {
  padding-top: 80px;
  
  &.no-scroll {
    overflow: hidden;
  }
}

@media (max-width: $breakpoint-lg) {
  body {
    padding-top: 72px;
  }
}
</style>