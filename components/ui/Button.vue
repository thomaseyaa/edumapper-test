<template>
  <button :class="buttonClasses" :disabled="disabled" v-bind="$attrs">
    <!-- Left Icon -->
    <Icon v-if="icon && iconPosition === 'left'" :name="icon" />

    <!-- Label Text -->
    {{ label }}

    <!-- Right Icon -->
    <Icon v-if="icon && iconPosition === 'right'" :name="icon" />
  </button>
</template>

<script setup>
defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: "",
  },
  iconPosition: {
    type: String,
    default: "left",
    validator: (value) => ["left", "right"].includes(value),
  },
  variant: {
    type: String,
    default: "primary",
    validator: (value) => ["primary", "secondary", "tertiary"].includes(value),
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const buttonClasses = computed(() => {
  const base = [
    "inline-flex items-center justify-center gap-2",
    "font-medium rounded-full",
    "transition-all duration-200",
    "cursor-pointer",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ];

  // Button Variants
  const variants = {
    primary: [
      "bg-black-900 text-white",
      "border border-black-900",
      "hover:bg-black-800",
    ],
    secondary: [
      "bg-white text-black-900",
      "border border-transparent",
      "hover:bg-gray-50",
    ],
    tertiary: [
      "bg-transparent text-black-900",
      "border border-gray-500",
      "hover:bg-black-50",
    ],
  };

  // Button Sizes
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-4 text-base",
    lg: "px-8 py-5 text-lg",
  };

  return [...base, ...variants[props.variant], sizes[props.size]];
});
</script>
