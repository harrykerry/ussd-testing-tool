<script setup lang="ts">
defineProps<{
  error?: string | null;
}>();
</script>

<template>
  <div
    v-if="error"
    class="mx-auto mb-4 mt-4 w-full max-w-md rounded-lg px-4 py-3 text-center"
    style="background-color: var(--color-brand-danger)"
  >
    <div class="flex flex-col items-center">
      <Icon name="i-lucide-circle-alert" class="size-5 text-white" />

      <p class="mt-1.5 text-xs font-semibold text-white">Request failed</p>

      <p
        class="mt-0.5 max-h-24 overflow-y-auto break-words text-[11px] leading-4 text-white"
      >
        {{ error }}
      </p>
    </div>
  </div>
</template>
