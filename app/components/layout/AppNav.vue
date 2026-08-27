<script setup lang="ts">
const navItems = [
  {
    label: "Emulator",
    href: "/",
    icon: "i-lucide-smartphone",
  },
  {
    label: "Guide",
    href: "/guide",
    icon: "i-lucide-book-open",
  },
];
</script>

<template>
  <header class="sticky top-0 z-50 px-2 pt-2 sm:px-6 sm:pt-3">
    <div
      class="mx-auto flex max-w-4xl items-center justify-between rounded-xl border border-brand-border bg-brand-surface/95 px-2 py-1.5 shadow-sm backdrop-blur-md sm:rounded-2xl sm:px-4 sm:py-2"
    >
      <NuxtLink to="/" class="group flex min-w-0 items-center gap-2">
        <span
          class="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-primary transition-transform duration-200 group-hover:scale-105 sm:size-8 sm:rounded-xl"
        >
          <Icon
            name="i-lucide-terminal"
            class="size-3.5 text-white sm:size-4"
          />
        </span>

        <span
          class="truncate text-xs font-semibold tracking-tight text-brand-ink sm:text-sm"
        >
          USSD Emulator
        </span>
      </NuxtLink>

      <nav
        aria-label="Main navigation"
        class="flex items-center gap-0.5 rounded-lg bg-brand-surface-muted p-0.5 sm:gap-1 sm:rounded-xl sm:p-1"
      >
        <NuxtLink
          v-for="item in navItems"
          :key="item.href"
          :to="item.href"
          class="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[10px] font-medium text-brand-ink-muted transition-all duration-200 hover:bg-brand-surface hover:text-brand-ink sm:gap-2 sm:rounded-lg sm:px-3 sm:py-2 sm:text-xs"
          active-class="bg-brand-surface text-brand-ink shadow-sm"
        >
          <Icon :name="item.icon" class="size-3 sm:size-3.5" />

          <span>
            {{ item.label }}
          </span>
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
