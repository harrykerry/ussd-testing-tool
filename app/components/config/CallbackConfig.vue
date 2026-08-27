<script setup lang="ts">
import type { UssdConfig } from "~/interfaces/ussd.interface";

import { USSD_GATEWAYS } from "~/constants/gatewayoptions.ts";
import { AFRICAS_TALKING_NETWORK_CODES } from "~/constants/networkCodes.ts";

import AppButton from "../ui/AppButton.vue";

const props = defineProps<{
  modelValue: UssdConfig;
  activeSession?: boolean;
  configLoading?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: UssdConfig];
  start: [];
  reset: [];
}>();

const config = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const selectedGateway = computed(() => {
  return USSD_GATEWAYS.find(
    (gateway) => gateway.value === config.value.gateway,
  );
});

const requiresNetworkCode = computed(() => {
  return selectedGateway.value?.requiresNetworkCode ?? false;
});

const fixedMethod = computed(() => {
  return selectedGateway.value?.method ?? null;
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

const isValidConfig = computed(() => {
  if (!isValidCallbackUrl.value) {
    return false;
  }

  if (requiresNetworkCode.value && !config.value.networkCode) {
    return false;
  }

  return true;
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

const updateGateway = (gateway: string) => {
  const selected = USSD_GATEWAYS.find((item) => item.value === gateway);

  if (!selected) {
    return;
  }

  emit("update:modelValue", {
    ...props.modelValue,
    gateway,
    method: selected.method ?? props.modelValue.method,
    networkCode: selected.requiresNetworkCode
      ? (props.modelValue.networkCode ?? "")
      : undefined,
  });
};
</script>

<template>
  <section
    class="rounded-2xl border border-brand-border-light bg-brand-surface p-4 shadow-sm"
  >
    <div
      v-if="configLoading"
      class="flex min-h-[520px] items-center justify-center"
    >
      <span
        class="size-6 animate-spin rounded-full border-2 border-brand-border border-t-brand-accent"
      ></span>
    </div>

    <div v-else>
      <div
        class="mb-5 flex items-center gap-3 rounded-lg bg-brand-surface-muted px-3.5 py-3"
        v-if="!activeSession"
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
            for="gateway"
            class="mb-1.5 block text-xs font-medium text-brand-ink"
          >
            USSD Provider
          </label>

          <select
            id="gateway"
            :value="config.gateway"
            :disabled="activeSession"
            class="w-full rounded-lg border border-brand-border bg-brand-surface px-3 py-2 text-sm text-brand-ink outline-none transition focus:border-brand-accent focus:ring-1 focus:ring-brand-accent disabled:cursor-not-allowed disabled:bg-brand-surface-muted disabled:opacity-60"
            @change="updateGateway(($event.target as HTMLSelectElement).value)"
          >
            <option value="" disabled>--Select a provider--</option>

            <option
              v-for="gateway in USSD_GATEWAYS"
              :key="gateway.value"
              :value="gateway.value"
            >
              {{ gateway.label }}
            </option>
          </select>

          <p
            v-if="selectedGateway?.description"
            class="mt-1.5 text-[11px] leading-4 text-brand-ink-muted"
          >
            {{ selectedGateway.description }}
          </p>
        </div>

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
            v-if="callbackUrlError"
            class="mt-1.5 text-[11px] text-brand-danger"
          >
            {{ callbackUrlError }}
          </p>
        </div>

        <div v-if="requiresNetworkCode">
          <label
            for="network-code"
            class="mb-1.5 block text-xs font-medium text-brand-ink"
          >
            Network Code
          </label>

          <select
            id="network-code"
            :value="config.networkCode"
            :disabled="activeSession"
            class="w-full rounded-lg border border-brand-border bg-brand-surface px-3 py-2 text-sm text-brand-ink outline-none transition focus:border-brand-accent focus:ring-1 focus:ring-brand-accent disabled:cursor-not-allowed disabled:bg-brand-surface-muted disabled:opacity-60"
            @change="
              updateConfig(
                'networkCode',
                ($event.target as HTMLSelectElement).value,
              )
            "
          >
            <option value="" disabled>Select a network</option>

            <option
              v-for="network in AFRICAS_TALKING_NETWORK_CODES"
              :key="network.value"
              :value="network.value"
            >
              {{ network.label }}
            </option>
          </select>

          <p class="mt-1.5 text-[11px] leading-4 text-brand-ink-muted">
            Select the mobile network associated with the phone number used for
            this USSD session.
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
            v-if="!fixedMethod"
            id="http-method"
            :value="config.method"
            :disabled="activeSession"
            class="w-full rounded-lg border border-brand-border bg-brand-surface px-3 py-2 text-sm text-brand-ink outline-none transition focus:border-brand-accent focus:ring-1 focus:ring-brand-accent disabled:cursor-not-allowed disabled:bg-brand-surface-muted disabled:opacity-60"
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

          <div
            v-else
            class="flex items-center justify-between rounded-lg border border-brand-border bg-brand-surface-muted px-3 py-2"
          >
            <span class="text-sm text-brand-ink">
              {{ fixedMethod }}
            </span>

            <span
              class="rounded-full bg-brand-surface px-2 py-0.5 text-[10px] font-medium text-brand-ink-muted"
            >
              Required
            </span>
          </div>

          <p
            v-if="fixedMethod"
            class="mt-1.5 text-[11px] leading-4 text-brand-ink-muted"
          >
            This gateway requires HTTP {{ fixedMethod }} requests.
          </p>
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
        <div v-if="activeSession" class="space-y-3">
          <div
            class="flex items-start gap-2.5 rounded-lg border border-brand-border bg-brand-surface-muted px-3 py-2.5"
          >
            <Icon
              name="i-lucide-info"
              class="mt-0.5 size-4 shrink-0 text-brand-accent"
            />

            <p class="text-[11px] leading-4 text-brand-ink-muted">
              A session is currently active. Reset the session before changing
              the gateway or callback URL.
            </p>
          </div>

          <AppButton
            label="Reset Session"
            size="md"
            icon="i-lucide-rotate-ccw"
            icon-position="before"
            custom-class="w-full rounded-lg"
            @btn-click="emit('reset')"
          />
        </div>

        <AppButton
          v-else
          label="Start Session"
          size="md"
          icon="i-lucide-play"
          icon-position="before"
          :disabled="!isValidConfig"
          custom-class="w-full rounded-lg"
          @btn-click="emit('start')"
        />
      </div>
    </div>
  </section>
</template>
