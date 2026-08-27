<script setup lang="ts">
import AppButton from "~/components/ui/AppButton.vue";

interface UssdSession {
  sessionId: string;
  status: "active" | "ended" | string;
}

defineProps<{
  callbackUrl?: string | null;
  session?: UssdSession | null;
  loading: boolean;
}>();

const emit = defineEmits<{
  start: [];
  reset: [];
  "set-callback": [];
}>();
</script>

<template>
  <div class="rounded-xl border border-brand-border bg-brand-surface p-4">
    <div
      class="rounded-lg border border-brand-border bg-brand-surface-muted px-3 py-2.5"
    >
      <p class="text-[10px] font-semibold tracking-wider text-brand-ink-subtle">
        Callback
      </p>

      <p
        v-if="callbackUrl"
        class="mt-1 truncate text-[11px] text-brand-ink"
        :title="callbackUrl"
      >
        {{ callbackUrl }}
      </p>

      <p v-else class="mt-1 text-xs text-brand-ink-muted">
        No callback configured
      </p>
    </div>

    <div
      v-if="session"
      class="mt-3 rounded-lg border border-brand-border bg-brand-surface-muted px-3 py-2.5"
    >
      <div class="flex items-center justify-between gap-3">
        <span class="text-xs text-brand-ink-muted"> Session </span>

        <span
          class="rounded-full px-2 py-1 text-[10px] font-semibold"
          :class="
            session.status === 'active'
              ? 'bg-brand-success-soft text-brand-success'
              : session.status === 'ended'
                ? 'bg-brand-surface text-brand-ink-muted'
                : 'bg-brand-danger-soft text-brand-danger'
          "
        >
          {{ session.status }}
        </span>
      </div>

      <p
        class="mt-1.5 truncate text-[10px] text-brand-ink"
        :title="session.sessionId"
      >
        {{ session.sessionId }}
      </p>
    </div>

    <AppButton
      v-if="!session && !callbackUrl"
      label="Set Callback"
      icon="i-lucide-settings-2"
      variant="primary"
      icon-position="before"
      custom-class="mt-4 w-full rounded-xl"
      @btn-click="emit('set-callback')"
    />

    <AppButton
      v-else-if="!session"
      :label="loading ? 'Starting...' : 'Start Session'"
      :icon="loading ? 'i-lucide-loader-circle' : 'i-lucide-play'"
      :loading="loading"
      variant="primary"
      icon-position="before"
      custom-class="mt-4 w-full rounded-xl"
      @btn-click="emit('start')"
    />

    <AppButton
      v-else
      label="Reset Session"
      icon="i-lucide-rotate-ccw"
      variant="outline"
      icon-position="before"
      custom-class="mt-4 w-full rounded-xl"
      @btn-click="emit('reset')"
    />
  </div>
</template>
