<script setup lang="ts">
import AppButton from "../ui/AppButton.vue";

const props = defineProps<{
  response: string;
  input: string;
  loading: boolean;
  disabled: boolean;
}>();

const emit = defineEmits<{
  send: [value: string];
}>();

const input = ref(props.input);

watch(
  () => props.input,
  (value) => {
    input.value = value;
  },
);

const send = () => {
  const value = input.value.trim();

  if (!value || props.disabled || props.loading) {
    return;
  }

  emit("send", value);

  input.value = "";
};
</script>

<template>
  <div class="flex justify-center">
    <div
      class="relative w-[240px] overflow-hidden rounded-[2.25rem] border-[7px] border-brand-primary bg-brand-primary shadow-2xl"
    >
      <div
        class="absolute left-1/2 top-2 z-10 h-1.5 w-14 -translate-x-1/2 rounded-full bg-brand-ink-muted"
      />

      <div
        class="flex min-h-[440px] flex-col overflow-hidden rounded-[1.8rem] bg-brand-surface"
      >
        <div
          class="flex items-center justify-between px-4 pb-2 pt-6 text-[11px] text-brand-ink-muted"
        >
          <span>USSD</span>

          <div class="flex items-center gap-1.5">
            <Icon name="i-lucide-mail" class="size-3" />
            <Icon name="i-lucide-signal" class="size-3" />
            <Icon name="i-lucide-wifi" class="size-3" />
            <Icon name="i-lucide-battery-medium" class="size-3.5" />
          </div>
        </div>

        <div class="flex flex-1 flex-col px-4 py-4">
          <!-- Loading -->
          <div v-if="loading" class="flex flex-1 items-center justify-center">
            <div class="flex items-center gap-2 text-xs text-brand-ink-muted">
              <Icon
                name="i-lucide-loader-circle"
                class="size-3.5 animate-spin"
              />

              <span>Sending...</span>
            </div>
          </div>

          <div
            v-else-if="response"
            class="whitespace-pre-wrap text-xs leading-5 text-brand-ink"
          >
            {{ response }}
          </div>

          <div
            v-else
            class="flex flex-1 items-center justify-center text-center text-xs text-brand-ink-subtle"
          >
            Start a USSD session
          </div>
        </div>

        <div class="border-t border-brand-border-light p-3">
          <input
            v-model="input"
            type="text"
            inputmode="numeric"
            autocomplete="off"
            placeholder="Enter response"
            :disabled="disabled || loading"
            class="w-full rounded-lg border border-brand-border bg-brand-surface px-3 py-2 text-xs text-brand-ink outline-none transition placeholder:text-brand-ink-subtle focus:border-brand-accent focus:ring-1 focus:ring-brand-accent disabled:cursor-not-allowed disabled:bg-brand-surface-muted"
            @keyup.enter="send"
          />

          <AppButton
            label="Send"
            icon="i-lucide-send"
            variant="primary"
            size="sm"
            icon-position="before"
            custom-class="mt-2 w-full rounded-lg"
            :disabled="disabled || loading || !input.trim()"
            @btn-click="send"
          />
        </div>
      </div>
    </div>
  </div>
</template>
