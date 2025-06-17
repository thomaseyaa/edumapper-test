<template>
  <div :class="checkedClasses">
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "default",
    validator: (value) => ["default", "active"].includes(value),
  },
});

const checkedClasses = computed(() => {
  const base = ["inline-flex px-4 py-2 items-start rounded-3xl cursor-pointer"];

  const variants = {
    default: "bg-beige-500 border border-beige-500",
    active: "bg-white border border-black-900",
  };

  return [base, variants[props.variant]];
});
</script>
