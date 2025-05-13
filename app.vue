<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
useHead({
  titleTemplate: '%s | Gastro2Go.io',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  htmlAttrs: {
    lang: 'de'
  },
})

// View Transitions API Support
onMounted(() => {
  if (document.startViewTransition) {
    document.documentElement.classList.add('view-transitions-enabled')
  }
})
</script>

<style>
/* Basis-Animationen */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* View Transitions API Styles */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root) {
  z-index: 1;
}

::view-transition-new(root) {
  z-index: 2;
}

/* Verbesserte Animation für mobile Geräte */
@media (max-width: 768px) {
  .page-enter-from,
  .page-leave-to {
    transform: translateY(10px);
  }
}
</style>