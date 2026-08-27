<script setup lang="ts">
import type { UssdConfig } from "~/interfaces/ussd.interface";
import AppButton from "../ui/AppButton.vue";

const props = defineProps<{
  modelValue: UssdConfig;
  activeSession?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: UssdConfig];
  start: [];
}>();

const config = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const isValidCallbackUrl = computed(() => {
  const url = config.value.callbackUrl?.trim();

  if (!url) {
    return false;
  }

  try {
    const parsed = new URL(url);

    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
});

const callbackUrlError = computed(() => {
  const url = config.value.callbackUrl?.trim();

  if (!url) {
    return "";
  }

  return isValidCallbackUrl.value ? "" : "Enter a valid HTTP or HTTPS URL.";
});

const updateConfig = <K extends keyof UssdConfig>(
  key: K,
  value: UssdConfig[K],
) => {
  emit("update:modelValue", {
    ...props.modelValue,
    [key]: value,
  });
};
</script>

<template>
  <section
    class="rounded-2xl border border-brand-border-light bg-brand-surface p-3 shadow-sm"
  >
    <div
      class="mb-5 flex items-center gap-3 rounded-lg bg-brand-surface-muted px-3.5 py-3"
    >
      <Icon
        name="i-lucide-lightbulb"
        class="size-4 shrink-0 text-brand-accent"
      />

      <p class="text-xs leading-5 text-brand-ink-muted">
        Configure the endpoint that receives your USSD requests. Supports both
        local and live endpoints; if using a local endpoint, enable CORS if
        needed.
      </p>
    </div>

    <div class="space-y-4">
      <div>
        <label
          for="callback-url"
          class="mb-1.5 block text-xs font-medium text-brand-ink"
        >
          Callback URL
        </label>

        <input
          id="callback-url"
          :value="config.callbackUrl"
          type="url"
          placeholder="http://localhost/api/ussd"
          :disabled="activeSession"
          class="w-full rounded-lg border bg-brand-surface px-3 py-2 text-sm text-brand-ink outline-none transition placeholder:text-brand-ink-subtle focus:ring-1 disabled:cursor-not-allowed disabled:bg-brand-surface-muted disabled:opacity-60"
          :class="
            config.callbackUrl && !isValidCallbackUrl
              ? 'border-brand-danger focus:border-brand-danger focus:ring-brand-danger'
              : 'border-brand-border focus:border-brand-accent focus:ring-brand-accent'
          "
          @input="
            updateConfig(
              'callbackUrl',
              ($event.target as HTMLInputElement).value,
            )
          "
        />

        <p
          v-if="activeSession"
          class="mt-1.5 flex items-center gap-1 text-[11px] text-brand-ink-muted"
        >
          <Icon name="i-lucide-lock" class="size-3" />

          Callback URL cannot be changed while a session is active.
        </p>

        <p
          v-else-if="callbackUrlError"
          class="mt-1.5 text-[11px] text-brand-danger"
        >
          {{ callbackUrlError }}
        </p>
      </div>

      <div>
        <label
          for="http-method"
          class="mb-1.5 block text-xs font-medium text-brand-ink"
        >
          HTTP Method
        </label>

        <select
          id="http-method"
          :value="config.method"
          class="w-full rounded-lg border border-brand-border bg-brand-surface px-3 py-2 text-sm text-brand-ink outline-none transition focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
          @change="
            updateConfig(
              'method',
              ($event.target as HTMLSelectElement).value as 'GET' | 'POST',
            )
          "
        >
          <option value="POST">POST</option>
          <option value="GET">GET</option>
        </select>
      </div>

      <div>
        <label
          for="service-code"
          class="mb-1.5 block text-xs font-medium text-brand-ink"
        >
          Service Code
        </label>

        <input
          id="service-code"
          :value="config.serviceCode"
          type="text"
          placeholder="*123#"
          class="w-full rounded-lg border border-brand-border bg-brand-surface px-3 py-2 text-sm text-brand-ink outline-none transition placeholder:text-brand-ink-subtle focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
          @input="
            updateConfig(
              'serviceCode',
              ($event.target as HTMLInputElement).value,
            )
          "
        />
      </div>

      <div>
        <label
          for="phone-number"
          class="mb-1.5 block text-xs font-medium text-brand-ink"
        >
          Phone Number
        </label>

        <input
          id="phone-number"
          :value="config.phoneNumber"
          type="text"
          inputmode="tel"
          placeholder="254700000000"
          class="w-full rounded-lg border border-brand-border bg-brand-surface px-3 py-2 text-sm text-brand-ink outline-none transition placeholder:text-brand-ink-subtle focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
          @input="
            updateConfig(
              'phoneNumber',
              ($event.target as HTMLInputElement).value,
            )
          "
        />
      </div>
    </div>

    <div class="mt-5">
      <div
        v-if="activeSession"
        class="flex items-start gap-2.5 rounded-lg border border-brand-border bg-brand-surface-muted px-3 py-2.5"
      >
        <Icon
          name="i-lucide-info"
          class="mt-0.5 size-4 shrink-0 text-brand-accent"
        />

        <p class="text-[11px] leading-4 text-brand-ink-muted">
          A session is currently active. Reset the session before changing the
          callback URL.
        </p>
      </div>

      <AppButton
        v-else
        label="Start Session"
        size="md"
        icon="i-lucide-play"
        icon-position="before"
        :disabled="!isValidCallbackUrl"
        custom-class="w-full rounded-lg"
        @btn-click="emit('start')"
      />
    </div>
  </section>
</template>
