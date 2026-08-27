<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value: string;
    label?: string;
  }>(),
  {
    label: "Copy",
  },
);

const copied = ref(false);

const copy = async () => {
  await navigator.clipboard.writeText(props.value);

  copied.value = true;

  setTimeout(() => {
    copied.value = false;
  }, 1500);
};
</script>

<template>
  <button
    type="button"
    class="flex cursor-pointer items-center gap-1 text-[10px] font-medium text-brand-ink-muted transition hover:text-brand-accent"
    @click="copy"
  >
    <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="size-3.5" />

    {{ copied ? "Copied" : label }}
  </button>
</template>
