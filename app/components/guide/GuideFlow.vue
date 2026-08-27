<template>
  <div
    class="my-5 overflow-x-auto rounded-lg border border-brand-border-light bg-brand-surface-muted px-4 py-3"
  >
    <div
      class="flex min-w-max items-center justify-center gap-4 text-[10px] font-medium"
    >
      <div class="flex min-w-[60px] flex-col items-center gap-1">
        <Icon name="i-lucide-user-round" class="size-4 text-brand-accent" />

        <span class="text-brand-ink">User</span>
      </div>

      <Icon
        name="i-lucide-arrow-right"
        class="size-3.5 shrink-0 text-brand-ink-subtle"
      />

      <div class="flex min-w-[80px] flex-col items-center gap-1">
        <Icon name="i-lucide-radio-tower" class="size-4 text-brand-accent" />

        <span class="text-brand-ink">USSD Gateway</span>
      </div>

      <Icon
        name="i-lucide-arrow-right"
        class="size-3.5 shrink-0 text-brand-ink-subtle"
      />

      <div class="flex min-w-[70px] flex-col items-center gap-1">
        <Icon name="i-lucide-server" class="size-4 text-brand-accent" />

        <span class="text-brand-ink">Your Backend</span>
      </div>
    </div>
  </div>
</template>
