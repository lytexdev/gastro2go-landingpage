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
          <BaseButton variant="primary" size="md" @click="scrollToContact">
            {{ $t('nav.cta') }}
          </BaseButton>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
const scrollToContact = () => {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};
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
  @media (max-width: $breakpoint-md) {
    display: none;
  }
}
</style> 