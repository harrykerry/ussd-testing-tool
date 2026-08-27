<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    icon?: string;
  }>(),
  {
    icon: "i-lucide-info",
  },
);
</script>

<template>
  <div
    class="rounded-xl border border-brand-accent-soft bg-brand-accent-soft p-3.5 mb-4"
  >
    <div class="flex items-start gap-2.5">
      <Icon :name="icon" class="mt-0.5 size-4 shrink-0 text-brand-accent" />

      <div class="min-w-0">
        <p class="text-xs font-semibold text-brand-ink">
          {{ title }}
        </p>

        <div class="mt-1 text-xs leading-5 text-brand-ink-muted">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
