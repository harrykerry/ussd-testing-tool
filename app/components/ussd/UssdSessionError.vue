<script setup lang="ts">
defineProps<{
  error?: string | null;
}>();
</script>

<template>
  <div
    v-if="error"
    class="mt-4 rounded-lg border border-brand-danger-soft bg-brand-danger-soft px-3 py-2.5 mb-4"
  >
    <div class="flex items-start gap-2">
      <Icon
        name="i-lucide-circle-alert"
        class="mt-0.5 size-4 shrink-0 text-brand-danger"
      />

      <div class="min-w-0">
        <p class="text-xs font-semibold text-brand-danger">Request failed</p>

        <p class="mt-0.5 break-words text-[11px] leading-4 text-brand-danger">
          {{ error }}
        </p>
      </div>
    </div>
  </div>
</template>
