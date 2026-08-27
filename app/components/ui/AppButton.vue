<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    variant?: "primary" | "outline" | "white" | "ghost";
    size?: "sm" | "md" | "lg";
    icon?: string;
    iconPosition?: "before" | "after";
    iconSize?: "sm" | "md" | "lg";
    disabled?: boolean;
    loading?: boolean;
    customClass?: string;
  }>(),
  {
    variant: "primary",
    size: "md",
    iconPosition: "after",
    iconSize: "md",
    disabled: false,
    loading: false,
    customClass: "",
  },
);

const emit = defineEmits<{
  btnClick: [];
}>();

const baseClasses =
  "group inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full font-brand-body font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-background disabled:cursor-not-allowed disabled:opacity-50";

const sizeClasses = {
  sm: "px-4 py-2.5 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3.5 text-base",
};

const iconSizeClasses = {
  sm: "size-3",
  md: "size-4",
  lg: "size-5",
};

const variantClasses = {
  primary: "bg-brand-accent text-white hover:bg-brand-accent-hover",

  outline:
    "border border-brand-border bg-white text-brand-ink hover:border-brand-accent hover:text-brand-accent",

  white: "bg-white text-brand-ink hover:bg-brand-surface-muted",

  ghost:
    "bg-transparent text-brand-ink-muted hover:bg-brand-surface-muted hover:text-brand-ink",
};
</script>

<template>
  <button
    type="button"
    :class="[
      baseClasses,
      sizeClasses[size],
      variantClasses[variant],
      customClass,
    ]"
    :disabled="disabled || loading"
    @click="emit('btnClick')"
  >
    <!-- Loading -->
    <Icon
      v-if="loading"
      name="i-lucide-loader-circle"
      :class="[iconSizeClasses[iconSize], 'animate-spin']"
    />

    <!-- Before icon -->
    <Icon
      v-else-if="icon && iconPosition === 'before'"
      :name="icon"
      :class="iconSizeClasses[iconSize]"
    />

    <!-- Label -->
    <span v-if="label">
      {{ label }}
    </span>

    <!-- After icon -->
    <Icon
      v-if="!loading && icon && iconPosition === 'after'"
      :name="icon"
      :class="[
        iconSizeClasses[iconSize],
        'transition-transform duration-300 group-hover:scale-110',
      ]"
    />
  </button>
</template>
