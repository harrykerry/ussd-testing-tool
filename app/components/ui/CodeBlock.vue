<script setup lang="ts">
withDefaults(
  defineProps<{
    filename?: string;
    type?: string;
    maxHeight?: string;
  }>(),
  {
    filename: "code",
    type: "TEXT",
    maxHeight: "max-h-80",
  },
);
</script>

<template>
  <div
    class="overflow-hidden rounded-xl border border-brand-border bg-brand-surface-muted"
  >
    <div
      class="flex items-center justify-between border-b border-brand-border px-3 py-2"
    >
      <span class="font-brand-mono text-[10px] text-brand-ink-muted">
        {{ filename }}
      </span>

      <span class="font-brand-mono text-[10px] text-brand-ink-subtle">
        {{ type }}
      </span>
    </div>

    <pre
      class="max-h-80 overflow-auto p-4 font-brand-mono text-[11px] leading-5 text-brand-ink"
      :class="maxHeight"
    ><code><slot /></code></pre>
  </div>
</template>
