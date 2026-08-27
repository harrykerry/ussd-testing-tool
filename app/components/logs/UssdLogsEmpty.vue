<template>
  <section
    class="relative flex min-h-[400px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-brand-border shadow-sm px-8 py-12 text-center"
  >
    <div
      class="pointer-events-none absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent-soft opacity-50 blur-3xl"
    />

    <div class="floating relative">
      <div class="flex items-center justify-center rounded-full">
        <Icon
          name="i-lucide-activity"
          style="width: 56px; height: 56px"
          class="text-brand-accent"
        />
      </div>
    </div>

    <h3 class="relative mt-6 text-lg font-semibold text-brand-ink">
      No requests yet
    </h3>

    <p class="relative mt-2 max-w-sm text-sm leading-6 text-brand-ink-muted">
      Your callback is waiting for its first request.
    </p>
  </section>
</template>

<style scoped>
.floating {
  animation: floating 3.5s ease-in-out infinite;
}

@keyframes floating {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-12px);
  }
}
</style>
