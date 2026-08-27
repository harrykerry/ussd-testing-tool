<script setup lang="ts">
defineProps<{
  activeTab: "config" | "emulator" | "logs";
  logsCount: number;
}>();

const emit = defineEmits<{
  "update:activeTab": [value: "config" | "emulator" | "logs"];
}>();

const tabs = [
  {
    value: "config",
    label: "Config",
    icon: "i-lucide-settings-2",
  },
  {
    value: "emulator",
    label: "Emulator",
    icon: "i-lucide-smartphone",
  },
  {
    value: "logs",
    label: "Logs",
    icon: "i-lucide-scroll-text",
  },
] as const;
</script>

<template>
  <div class="mb-6 flex justify-center">
    <div
      class="flex items-center gap-1 rounded-xl border border-brand-border bg-brand-surface-muted p-1"
    >
      <button
        v-for="tab in tabs"
        :key="tab.value"
        type="button"
        class="flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium transition-all duration-200"
        :class="
          activeTab === tab.value
            ? 'bg-brand-surface text-brand-ink shadow-sm'
            : 'text-brand-ink-muted hover:bg-brand-surface hover:text-brand-ink'
        "
        @click="emit('update:activeTab', tab.value)"
      >
        <Icon
          :name="tab.icon"
          class="size-4"
          :class="
            activeTab === tab.value
              ? 'text-brand-accent'
              : 'text-brand-ink-muted'
          "
        />

        <span>{{ tab.label }}</span>

        <span
          v-if="tab.value === 'logs' && logsCount"
          class="rounded-full bg-brand-surface-muted px-1.5 py-0.5 font-brand-mono text-[10px] font-semibold text-brand-ink-muted"
          :class="
            activeTab === 'logs' ? 'bg-brand-accent-soft text-brand-accent' : ''
          "
        >
          {{ logsCount }}
        </span>
      </button>
    </div>
  </div>
</template>
