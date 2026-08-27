<script setup lang="ts">
import AppButton from "~/components/ui/AppButton.vue";

const emit = defineEmits<{
  reset: [];
}>();
</script>

<template>
  <div
    class="mt-4 flex flex-col gap-3 rounded-lg border border-brand-border bg-brand-surface px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between mb-4"
  >
    <div class="flex min-w-0 items-center gap-2.5">
      <div
        class="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-success-soft"
      >
        <Icon name="i-lucide-check" class="size-3.5 text-brand-success" />
      </div>

      <div class="min-w-0">
        <p class="text-xs font-medium text-brand-ink">Session ended</p>

        <p class="text-[11px] leading-4 text-brand-ink-muted">
          Start a new session to test again.
        </p>
      </div>
    </div>

    <AppButton
      label="Reset"
      size="sm"
      icon="i-lucide-play"
      icon-position="before"
      custom-class="w-full rounded-lg sm:w-auto"
      @btn-click="emit('reset')"
    />
  </div>
</template>
