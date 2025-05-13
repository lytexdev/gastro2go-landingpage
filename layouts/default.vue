<template>
  <div class="layout">
    <Header />
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
import Header from '~/components/layout/Header.vue';
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  padding-top: 80px; // Abstand für den fixierten Header
}
</style>