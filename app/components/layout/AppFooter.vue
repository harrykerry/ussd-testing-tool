<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer
    class="fixed inset-x-0 bottom-0 z-40 border-t border-brand-border bg-brand-surface/95 backdrop-blur supports-[backdrop-filter]:bg-brand-surface/80 sm:static sm:z-auto sm:bg-brand-surface sm:backdrop-blur-none"
  >
    <div
      class="mx-auto flex max-w-7xl items-center justify-center px-4 pb-[calc(0.625rem+env(safe-area-inset-bottom))] pt-2.5 sm:px-6 sm:py-4 sm:pb-4"
    >
      <p class="text-center text-xs text-brand-ink-muted sm:text-sm">
        Built by
        <a
          href="https://www.haroldkerry.co.ke"
          target="_blank"
          rel="noopener noreferrer"
          class="font-medium text-brand-ink underline-offset-4 transition-colors hover:text-brand-accent hover:underline"
        >
          haroldkerry.co.ke
        </a>
      </p>
    </div>
  </footer>
</template>