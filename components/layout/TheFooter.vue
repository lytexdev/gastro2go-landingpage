<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-info">
          <div class="footer-logo">
            <img src="~/assets/images/lytex-logo.svg" alt="Gastro2Go.io" class="logo-image" />
            <span class="logo-text">Gastro2Go<span class="text-primary">.io</span></span>
          </div>
          <p class="footer-tagline">{{ $t('hero.subtitle') }}</p>
          <div class="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"></path>
                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                <path d="M16.5 7.5l0 .01"></path>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M8 11l0 5"></path>
                <path d="M8 8l0 .01"></path>
                <path d="M12 16l0 -5"></path>
                <path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
              </svg>
            </a>
          </div>
        </div>
        
        <div class="footer-links">
          <div class="links-group">
            <h4 class="links-title">{{ $t('nav.features') }}</h4>
            <ul class="links-list">
              <li><a href="#features" class="footer-link">{{ $t('features.categories.0.name') }}</a></li>
              <li><a href="#features" class="footer-link">{{ $t('features.categories.1.name') }}</a></li>
              <li><a href="#features" class="footer-link">{{ $t('features.categories.2.name') }}</a></li>
              <li><a href="#features" class="footer-link">{{ $t('features.categories.3.name') }}</a></li>
            </ul>
          </div>
          
          <div class="links-group">
            <h4 class="links-title">{{ $t('nav.contact') }}</h4>
            <ul class="links-list">
              <li><a href="#contact" class="footer-link">{{ $t('nav.contact') }}</a></li>
              <li><a href="#demo" class="footer-link">{{ $t('nav.demo') }}</a></li>
              <li><a href="#about" class="footer-link">{{ $t('nav.about') }}</a></li>
              <li><a href="mailto:info@gastro2go.io" class="footer-link">info@gastro2go.io</a></li>
            </ul>
          </div>
          
          <div class="links-group">
            <h4 class="links-title">{{ $t('footer.links.imprint') }}</h4>
            <ul class="links-list">
              <li><a href="/imprint" class="footer-link">{{ $t('footer.links.imprint') }}</a></li>
              <li><a href="/privacy" class="footer-link">{{ $t('footer.links.privacy') }}</a></li>
              <li><a href="/terms" class="footer-link">{{ $t('footer.links.terms') }}</a></li>
              <li>
                <div class="language-selector">
                  <LanguageSwitcher />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p class="copyright">{{ $t('footer.company') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import LanguageSwitcher from '../ui/LanguageSwitcher.vue';
</script>

<style lang="scss" scoped>
.site-footer {
  background-color: $gray-lighter;
  padding: $spacing-8 0 $spacing-6;
  margin-top: $spacing-16;
  
  .footer-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-8;
    
    @media (min-width: $breakpoint-md) {
      grid-template-columns: 1fr 2fr;
    }
  }
  
  .footer-info {
    .footer-logo {
      display: flex;
      align-items: center;
      margin-bottom: $spacing-4;
      
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
    
    .footer-tagline {
      color: $gray-dark;
      margin-bottom: $spacing-5;
    }
    
    .footer-social {
      display: flex;
      gap: $spacing-4;
      
      .social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background-color: $white;
        color: $gray-dark;
        transition: all 0.2s ease;
        
        &:hover {
          background-color: $primary;
          color: $white;
          transform: translateY(-3px);
        }
      }
    }
  }
  
  .footer-links {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: $spacing-6;
    
    @media (min-width: $breakpoint-sm) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (min-width: $breakpoint-md) {
      grid-template-columns: repeat(3, 1fr);
    }
    
    .links-title {
      color: $dark;
      font-weight: $font-weight-semibold;
      font-size: $font-size-lg;
      margin-bottom: $spacing-4;
    }
    
    .links-list {
      list-style: none;
      padding: 0;
      margin: 0;
      
      li {
        margin-bottom: $spacing-3;
        
        &:last-child {
          margin-bottom: 0;
        }
      }
      
      .footer-link {
        color: $gray-dark;
        text-decoration: none;
        transition: color 0.2s ease;
        
        &:hover {
          color: $primary;
          text-decoration: none;
        }
      }
    }
    
    .language-selector {
      margin-top: $spacing-2;
    }
  }
  
  .footer-bottom {
    margin-top: $spacing-8;
    padding-top: $spacing-6;
    border-top: 1px solid rgba($gray, 0.2);
    text-align: center;
    
    .copyright {
      color: $gray;
      font-size: $font-size-sm;
    }
  }
}
</style>
