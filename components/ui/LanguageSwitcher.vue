<template>
  <div class="language-switcher">
    <NuxtLink
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
      :class="{ 'active': currentLocale === locale.code }"
      :aria-label="$t('language.switch', { lang: locale.name })"
    >
      {{ locale.code.toUpperCase() }}
    </NuxtLink>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSwitchLocalePath } from '#i18n'

const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const currentLocale = computed(() => locale.value)
const availableLocales = computed(() => [
  { code: 'de', name: 'Deutsch' },
  { code: 'en', name: 'English' }
])
</script>

<style lang="scss" scoped>
.language-switcher {
  display: flex;
  align-items: center;
  gap: $spacing-2;
  padding: $spacing-2;
  background: rgba($white, 0.9);
  border-radius: $border-radius;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba($gray-light, 0.2);
}

a {
  background: none;
  border: none;
  cursor: pointer;
  font-weight: $font-weight-medium;
  color: $gray;
  padding: $spacing-1 $spacing-2;
  transition: all 0.2s ease;
  position: relative;
  min-width: 40px;
  text-align: center;
  font-size: 0.875rem;
  text-decoration: none;
  
  &:not(:last-child)::after {
    content: '|';
    position: absolute;
    right: -2px;
    color: $gray-light;
  }
  
  &:hover:not(:disabled) {
    color: $primary;
    transform: translateY(-1px);
  }
  
  &.active {
    color: $primary;
    font-weight: $font-weight-semibold;
  }

  &:focus-visible {
    outline: 2px solid $primary;
    outline-offset: 2px;
    border-radius: $border-radius;
  }
}

@media (max-width: $breakpoint-md) {
  .language-switcher {
    padding: $spacing-1;
    background: transparent;
    box-shadow: none;
    border: none;
  }
  
  a {
    padding: $spacing-1;
    min-width: 35px;
    font-size: 0.8125rem;
  }
}
</style>
