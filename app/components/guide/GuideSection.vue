<script setup lang="ts">
defineProps<{
  id: string;
  title: string;
}>();
</script>

<template>
  <section
    :id="id"
    class="mt-4 scroll-mt-6"
  >
    <h2 class="text-xl font-semibold text-brand-ink">
      {{ title }}
    </h2>

    <div class="mt-3">
      <slot />
    </div>
  </section>
</template>