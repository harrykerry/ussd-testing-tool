<script setup lang="ts">
import type { UssdLog } from "~/interfaces/ussd.interface";

import CallbackConfig from "~/components/config/CallbackConfig.vue";
import UssdLogDetails from "~/components/logs/UssdLogDetails.vue";
import UssdLogs from "~/components/logs/UssdLogs.vue";
import UssdLogsEmpty from "~/components/logs/UssdLogsEmpty.vue";

import UssdTabs from "~/components/ussd/UssdTabs.vue";
import UssdSessionControls from "~/components/ussd/UssdSessionControls.vue";
import UssdSessionError from "~/components/ussd/UssdSessionError.vue";
import UssdSessionEnded from "~/components/ussd/UssdSessionEnded.vue";

const {
  config,
  configLoading,
  session,
  logs,
  loading,
  error,
  startSession,
  sendInput,
  resetSession,
} = useUssd();

const activeTab = ref<"config" | "emulator" | "logs">("config");

const selectedLog = ref<UssdLog | null>(null);

const showLogDetails = ref(false);

const sessionEnded = computed(() => {
  return session.value?.status === "ended";
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const selectLatestLog = () => {
  const latestLog = logs.value.at(-1);

  if (latestLog) {
    selectedLog.value = latestLog;
  }
};

const selectLog = (log: UssdLog) => {
  selectedLog.value = log;
  showLogDetails.value = true;

  scrollToTop();
};

const backToLogs = () => {
  showLogDetails.value = false;

  scrollToTop();
};

const closeLogDetails = () => {
  selectedLog.value = null;
  showLogDetails.value = false;

  scrollToTop();
};

const changeTab = (tab: "config" | "emulator" | "logs") => {
  activeTab.value = tab;

  scrollToTop();
};

/**
 * This opens the failed request automatically when an error occurs.
 */
watch(error, (value) => {
  if (!value) {
    return;
  }

  activeTab.value = "logs";

  const latestLog = logs.value.at(-1);

  if (latestLog) {
    selectedLog.value = latestLog;
    showLogDetails.value = true;
  }

  scrollToTop();
});

watch(activeTab, (tab) => {
  if (tab === "logs" && !showLogDetails.value) {
    selectLatestLog();
  }

  scrollToTop();
});

watch(
  logs,
  () => {
    if (activeTab.value === "logs" && !showLogDetails.value) {
      selectLatestLog();
    }
  },
  {
    deep: true,
  },
);

const start = async () => {
  selectedLog.value = null;
  showLogDetails.value = false;

  await startSession();

  if (!error.value) {
    activeTab.value = "emulator";
    scrollToTop();
  }
};

const reset = () => {
  selectedLog.value = null;
  showLogDetails.value = false;

  resetSession();

  config.value.callbackUrl = "";

  scrollToTop();
};
</script>

<template>
  <main class="min-h-screen bg-brand-background">
    <div class="mx-auto max-w-7xl px-6 py-8">
      <UssdTabs
        :active-tab="activeTab"
        :logs-count="logs.length"
        @update:active-tab="changeTab"
      />

      <div v-if="activeTab === 'config'" class="mx-auto max-w-2xl">
        <CallbackConfig
          v-model="config"
          :config-loading="configLoading"
          @start="start"
          @reset="resetSession"
          :active-session="session?.status === 'active'"
        />
      </div>

      <div v-else-if="activeTab === 'emulator'">
        <div class="grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
          <div
            :class="
              session?.status === 'active'
                ? 'order-2 lg:order-1'
                : 'order-1 lg:order-1'
            "
          >
            <UssdSessionControls
              :callback-url="config.callbackUrl"
              :session="session"
              :loading="loading"
              @set-callback="changeTab('config')"
              @start="start"
              @reset="reset"
            />

            <div v-if="error || sessionEnded" class="mx-auto max-w-3xl">
              <UssdSessionError :error="error" />

              <UssdSessionEnded v-if="sessionEnded" @reset="reset" />
            </div>
          </div>

          <div
            :class="
              session?.status === 'active'
                ? 'order-1 lg:order-2'
                : 'order-2 lg:order-2'
            "
            class="min-w-0"
          >
            <div
              class="flex min-h-[500px] items-center justify-center rounded-2xl border border-dashed border-brand-border p-5 shadow-sm"
            >
              <UssdPhone
                :response="session?.response ?? ''"
                :input="''"
                :loading="loading"
                :disabled="!session || session.status !== 'active'"
                @send="sendInput"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <UssdLogsEmpty v-if="!logs.length" class="min-h-[400px]" />

        <div v-else-if="showLogDetails && selectedLog" class="min-w-0">
          <button
            type="button"
            class="mb-4 inline-flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-brand-ink-muted transition hover:bg-brand-surface hover:text-brand-ink"
            @click="backToLogs"
          >
            <Icon name="i-lucide-arrow-left" class="size-4" />

            <span>Back to logs</span>
          </button>

          <UssdLogDetails :log="selectedLog" @close="closeLogDetails" />
        </div>

        <div v-else class="min-w-0">
          <UssdLogs
            :logs="logs"
            :selected-id="selectedLog?.id"
            @select="selectLog"
          />
        </div>
      </div>
    </div>
  </main>
</template>
