<script setup lang="ts">
import AppFooter from "~/components/layout/AppFooter.vue";
import AppNav from "~/components/layout/AppNav.vue";
</script>

<template>
  <div class="flex min-h-screen flex-col bg-brand-background">
    <AppNav />

    <main class="flex-1">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>
