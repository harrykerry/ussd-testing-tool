<script setup lang="ts">
import type { UssdLog } from "~/interfaces/ussd.interface";
import CopyButton from "../ui/CopyButton.vue";
import CodeBlock from "../ui/CodeBlock.vue";
import { STATUS_PILL_CLASSES } from "~/constants/styles.ts";

const props = defineProps<{
  log: UssdLog | null;
}>();

const emit = defineEmits<{
  close: [];
}>();

const requestBody = computed(() => {
  if (!props.log?.request.body) {
    return "";
  }

  if (typeof props.log.request.body === "string") {
    return props.log.request.body;
  }

  return JSON.stringify(props.log.request.body, null, 2);
});

const requestHeaders = computed(() => {
  if (!props.log) {
    return "";
  }

  return JSON.stringify(props.log.request.headers, null, 2);
});

const responseHeaders = computed(() => {
  if (!props.log?.response) {
    return "";
  }

  return JSON.stringify(props.log.response.headers, null, 2);
});

const isSuccess = computed(() => {
  if (!props.log?.response) {
    return false;
  }

  return props.log.response.status >= 200 && props.log.response.status < 300;
});

const statusLabel = computed(() => {
  if (!props.log?.response) {
    return "Error";
  }

  return isSuccess.value ? "Success" : "Error";
});
</script>

<template>
  <section
    v-if="log"
    class="overflow-hidden rounded-2xl border border-brand-border bg-brand-surface shadow-sm mb-6"
  >
    <header
      class="flex items-start justify-between gap-4 border-b border-brand-border px-5 py-4"
    >
      <div class="flex min-w-0 items-center gap-3">
        <div class="min-w-0">
          <div class="flex flex-wrap items-center gap-2">
            <h2 class="text-sm font-semibold text-brand-ink">Request</h2>

            <span
              class="inline-flex items-center rounded-full bg-brand-surface-muted px-2 py-0.5 text-[10px] font-semibold text-brand-ink-muted ring-1 ring-brand-border"
            >
              {{ log.request.method }}
            </span>

            <span
              v-if="log.response"
              :class="
                isSuccess
                  ? STATUS_PILL_CLASSES.success
                  : STATUS_PILL_CLASSES.danger
              "
            >
              {{ log.response.status }}
            </span>

            <span
              :class="
                isSuccess
                  ? STATUS_PILL_CLASSES.success
                  : STATUS_PILL_CLASSES.danger
              "
            >
              {{ statusLabel }}
            </span>
          </div>

          <div
            class="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-brand-ink-muted"
          >
            <span>
              {{ new Date(log.timestamp).toLocaleString() }}
            </span>

            <span
              v-if="log.duration"
              class="text-brand-ink-subtle"
              aria-hidden="true"
            >
              ·
            </span>

            <span v-if="log.duration"> {{ log.duration }}ms </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        class="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-brand-ink-subtle transition hover:bg-brand-surface-muted hover:text-brand-ink"
        @click="emit('close')"
      >
        <Icon name="i-lucide-x" class="size-4" />
      </button>
    </header>

    <div class="p-5">
      <div
        v-if="log.error"
        class="mx-auto mb-6 mt-2 w-full max-w-lg rounded-xl p-5 text-center"
        style="background-color: var(--color-brand-danger)"
      >
        <div class="flex flex-col items-center">
          <Icon name="i-lucide-circle-alert" class="size-6 text-white" />

          <p class="mt-2 text-sm text-white">Request failed</p>

          <p
            class="mt-1 max-h-32 overflow-y-auto text-xs leading-5 text-white break-words"
          >
            {{ log.error }}
          </p>
        </div>
      </div>
      <div class="grid gap-5 lg:grid-cols-2">
        <div class="min-w-0 space-y-4">
          <h3 class="text-xs font-semibold text-brand-ink">Request</h3>

          <div>
            <div
              class="mb-1.5 text-[10px] font-semibold tracking-wider text-brand-ink-subtle"
            >
              URL
            </div>

            <div
              class="flex items-start gap-2 rounded-lg border border-brand-border bg-brand-surface-muted px-3 py-2.5"
            >
              <code
                class="min-w-0 flex-1 break-all text-[11px] leading-5 text-brand-ink"
              >
                {{ log.request.url }}
              </code>

              <CopyButton :value="log.request.url" class="shrink-0" />
            </div>
          </div>

          <div>
            <div class="mb-1.5 flex items-center justify-between">
              <span
                class="text-[10px] font-semibold tracking-wider text-brand-ink-subtle"
              >
                Headers
              </span>

              <CopyButton :value="requestHeaders" />
            </div>

            <CodeBlock filename="headers.json" type="JSON">
              {{ requestHeaders }}
            </CodeBlock>
          </div>

          <div>
            <div class="mb-1.5 flex items-center justify-between">
              <span
                class="text-[10px] font-semibold tracking-wider text-brand-ink-subtle"
              >
                Body
              </span>

              <CopyButton v-if="requestBody" :value="requestBody" />
            </div>

            <CodeBlock
              v-if="requestBody"
              :filename="
                typeof log.request.body === 'string'
                  ? 'request.txt'
                  : 'request.json'
              "
              :type="typeof log.request.body === 'string' ? 'TEXT' : 'JSON'"
            >
              {{ requestBody }}
            </CodeBlock>

            <div
              v-else
              class="rounded-xl border border-dashed border-brand-border bg-brand-surface-muted px-4 py-8 text-center"
            >
              <Icon
                name="i-lucide-file-json"
                class="mx-auto size-5 text-brand-ink-subtle"
              />

              <p class="mt-2 text-xs text-brand-ink-muted">No request body</p>
            </div>
          </div>
        </div>

        <div class="min-w-0 mt-6">
          <div class="mb-2.5 flex items-center gap-2 mb-4">
            <h3 class="text-xs font-semibold text-brand-ink">Response</h3>

            <span
              v-if="log.response"
              :class="
                isSuccess
                  ? STATUS_PILL_CLASSES.success
                  : STATUS_PILL_CLASSES.danger
              "
            >
              {{ statusLabel }}
            </span>
          </div>

          <div v-if="log.response" class="space-y-4">
            <div>
              <div class="mb-1.5 flex items-center justify-between">
                <span
                  class="text-[10px] font-semibold tracking-wider text-brand-ink-subtle"
                >
                  Body
                </span>

                <CopyButton :value="log.response.body" />
              </div>

              <CodeBlock
                filename="response.txt"
                type="TEXT"
                max-height="max-h-[360px]"
                wrap
              >
                {{ log.response.body }}
              </CodeBlock>
            </div>

            <div>
              <div class="mb-1.5 flex items-center justify-between">
                <span
                  class="text-[10px] font-semibold tracking-wider text-brand-ink-subtle"
                >
                  Headers
                </span>

                <CopyButton :value="responseHeaders" />
              </div>

              <CodeBlock filename="headers.json" type="JSON">
                {{ responseHeaders }}
              </CodeBlock>
            </div>
          </div>

          <div
            v-else
            class="flex min-h-[300px] py-8 items-center justify-center rounded-xl border border-dashed border-brand-border bg-brand-surface-muted"
          >
            <div class="text-center">
              <div
                class="mx-auto flex size-10 items-center justify-center rounded-xl"
              >
                <Icon
                  name="i-lucide-circle-alert"
                  class="size-5 text-brand-accent"
                />
              </div>

              <p class="mt-3 text-xs font-medium text-brand-ink">
                No response received
              </p>

              <p class="mt-1 text-[11px] text-brand-ink-muted">
                The callback did not return a response.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
