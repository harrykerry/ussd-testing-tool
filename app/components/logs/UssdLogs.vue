<script setup lang="ts">
import { STATUS_PILL_CLASSES } from "~/constants/styles";
import type { UssdLog } from "~/interfaces/ussd.interface";

const emit = defineEmits<{
  select: [log: UssdLog];
}>();

const props = defineProps<{
  logs: UssdLog[];
  selectedId?: string | number | null;
}>();

const sortedLogs = computed(() => {
  return [...props.logs].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
});

const formatTime = (timestamp: string) =>
  new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

const isOk = (status?: number) => !!status && status >= 200 && status < 300;

const durationTone = (duration?: number) => {
  if (!duration) return "text-brand-ink-subtle";
  if (duration < 300) return "text-brand-success";
  if (duration < 800) return "text-brand-warning";
  return "text-brand-danger";
};
</script>

<template>
  <section
    class="mx-auto flex max-h-[70vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-brand-border bg-brand-surface shadow-sm"
  >
    <header
      class="flex shrink-0 items-center justify-between border-b border-brand-border px-4 py-3.5"
    >
      <div class="min-w-0">
        <h2 class="text-sm font-semibold text-brand-ink">Request logs</h2>

        <p class="mt-0.5 text-xs text-brand-ink-subtle">
          {{ logs.length ? "Callback activity" : "No activity yet" }}
        </p>
      </div>

      <span
        v-if="logs.length"
        class="inline-flex min-w-6 shrink-0 items-center justify-center rounded-full bg-brand-surface-muted px-2 py-1 text-xs font-semibold tabular-nums text-brand-ink-muted ring-1 ring-brand-border-light"
      >
        {{ logs.length }}
      </span>
    </header>

    <div
      v-if="!logs.length"
      class="flex flex-1 flex-col items-center justify-center px-6 py-14 text-center"
    >
      <div
        class="flex size-12 items-center justify-center rounded-2xl bg-brand-accent-soft"
      >
        <Icon name="i-lucide-inbox" class="size-6 text-brand-accent" />
      </div>

      <h3 class="mt-4 text-sm font-semibold text-brand-ink">
        Waiting for requests
      </h3>

      <p class="mt-1.5 max-w-[230px] text-xs leading-5 text-brand-ink-muted">
        Start a USSD session and callback requests will appear here.
      </p>
    </div>

    <ul
      v-else
      class="min-h-0 flex-1 divide-y divide-brand-border-light overflow-y-auto"
    >
      <li
        v-for="log in sortedLogs"
        :key="log.id"
        class="group cursor-pointer outline-none transition-colors"
        :class="
          selectedId === log.id
            ? 'bg-brand-accent-soft/50'
            : 'hover:bg-brand-surface-muted'
        "
        tabindex="0"
        role="button"
        :aria-current="selectedId === log.id"
        :aria-label="`View log ${log.request.method} ${log.response?.status ?? 'error'}`"
        @click="emit('select', log)"
        @keydown.enter="emit('select', log)"
        @keydown.space.prevent="emit('select', log)"
      >
        <div class="px-4 py-3.5">
          <div class="flex min-w-0 items-center gap-2.5">
            <span
              class="inline-flex shrink-0 items-center rounded-md bg-brand-surface-muted px-2 py-1 text-[10px] font-bold tracking-wide text-brand-ink-muted ring-1 ring-brand-border-light"
            >
              {{ log.request.method }}
            </span>

            <p
              class="min-w-0 flex-1 truncate text-sm font-medium text-brand-ink"
              :class="{
                'italic text-brand-ink-subtle': !log.request.body?.text,
              }"
            >
              {{ log.request.body?.text || "Initial request" }}
            </p>

            <span
              v-if="log.response"
              class="shrink-0"
              :class="
                STATUS_PILL_CLASSES[
                  isOk(log.response.status) ? 'success' : 'danger'
                ]
              "
            >
              {{ log.response.status }}
            </span>

            <span v-else class="shrink-0" :class="STATUS_PILL_CLASSES.danger">
              ERR
            </span>

            <span
              v-if="log.duration"
              class="hidden shrink-0 text-xs font-medium tabular-nums md:inline"
              :class="durationTone(log.duration)"
            >
              {{ log.duration }}ms
            </span>

            <span
              class="hidden shrink-0 text-xs tabular-nums text-brand-ink-subtle md:inline"
            >
              {{ formatTime(log.timestamp) }}
            </span>

            <Icon
              name="i-lucide-chevron-right"
              class="size-4 shrink-0 transition-all"
              :class="
                selectedId === log.id
                  ? 'translate-x-0.5 text-brand-accent'
                  : 'text-brand-ink-subtle group-hover:translate-x-0.5 group-hover:text-brand-accent'
              "
            />
          </div>

          <div class="mt-2 flex items-center gap-3 pl-0 text-[11px] md:hidden">
            <span
              v-if="log.duration"
              class="inline-flex items-center gap-1 font-medium"
              :class="durationTone(log.duration)"
            >
              <Icon name="i-lucide-timer" class="size-3" />

              <span>{{ log.duration }}ms</span>
            </span>

            <span v-if="log.duration" class="text-brand-border"> • </span>

            <span
              class="inline-flex items-center gap-1 tabular-nums text-brand-ink-subtle"
            >
              <Icon name="i-lucide-clock-3" class="size-3" />

              <span>{{ formatTime(log.timestamp) }}</span>
            </span>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>
