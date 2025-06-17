<template>
  <div
    class="rounded-2xl p-4 w-full"
    :class="{
      'bg-white': isCompleted || isEditing,
      'bg-white/60 border border-white': !isCompleted && !isEditing,
    }"
  >
    <!-- Initial or Completed State -->
    <div v-if="!isEditing" class="flex justify-between" @click="startEditing">
      <div>
        <h3
          class="mb-1"
          :class="
            isCompleted
              ? 'text-sm text-gray-500'
              : 'text-base font-semibold text-black-900'
          "
        >
          {{ title }}
        </h3>
        <p
          :class="
            isCompleted
              ? 'text-medium font-semibold text-black-900'
              : 'text-sm text-gray-500'
          "
        >
          {{ isCompleted ? selectedAnswer : placeholder }}
        </p>
      </div>

      <Icon name="line-md:edit" :size="16" @click="startEditing" />
    </div>

    <!-- Editing State -->
    <div v-else>
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-base font-bold text-black-900">
          {{ main.editTitle }}
        </h3>
        <Icon name="line-md:close" :size="16" @click="cancelEditing" />
      </div>

      <!-- Main Section -->
      <div v-if="main.options?.length" class="mb-6">
        <div class="flex flex-wrap gap-3 mb-6">
          <UiChecked
            v-for="option in main.options"
            :key="option.value"
            :variant="
              selectedMainOption === option.value ? 'active' : 'default'
            "
            @click="selectMainOption(option.value)"
          >
            {{ option.label }}
          </UiChecked>
        </div>
        <hr
          v-if="secondary && secondary.options?.length"
          class="border-gray-200"
        />
      </div>

      <!-- Secondary Section -->
      <div v-if="secondary && secondary.options?.length" class="mb-6">
        <h4 v-if="secondary.editTitle" class="font-medium text-black-900 mb-4">
          {{ secondary.editTitle }}
        </h4>
        <div class="flex flex-wrap gap-3">
          <UiChecked
            v-for="option in secondary.options"
            :key="option.value"
            :variant="
              selectedSecondaryOption === option.value ? 'active' : 'default'
            "
            @click="selectSecondaryOption(option.value)"
          >
            {{ option.label }}
          </UiChecked>
        </div>
      </div>

      <!-- Confirm Button -->
      <UiButton
        label="Confirmer"
        :variant="!canConfirm ? 'tertiary' : 'primary'"
        size="md"
        class="w-full"
        :disabled="!canConfirm"
        @click="confirmSelection"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormSection, FormValue } from "~/types/form";

/*
 * Props & Emits
 */
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "À compléter",
  },
  main: {
    type: Object as PropType<FormSection>,
    required: true,
  },
  secondary: {
    type: Object as PropType<FormSection>,
    required: false,
    default: undefined,
  },
  modelValue: {
    type: Object as PropType<FormValue>,
    default: () => ({}),
  },
});

const emit = defineEmits<{
  "update:modelValue": [value: FormValue];
  confirm: [value: FormValue];
}>();

/*
 * Reactive State
 */
const isEditing = ref(false);
const selectedMainOption = ref(props.modelValue?.main || "");
const selectedSecondaryOption = ref(props.modelValue?.secondary || "");

/*
 * Computed Properties
 */
const isCompleted = computed(() => {
  const hasMainSelection = selectedMainOption.value;
  const hasSecondarySelection = props.secondary
    ? selectedSecondaryOption.value
    : true;
  return hasMainSelection && hasSecondarySelection;
});

const selectedAnswer = computed(() => {
  if (!selectedMainOption.value) return "";

  const mainLabel =
    props.main.options.find((opt) => opt.value === selectedMainOption.value)
      ?.label || "";

  if (!props.secondary || !selectedSecondaryOption.value) {
    return mainLabel;
  }

  const secondaryLabel =
    props.secondary.options.find(
      (opt) => opt.value === selectedSecondaryOption.value
    )?.label || "";

  return `${mainLabel} ${secondaryLabel}`;
});

const canConfirm = computed(() => {
  const hasMainSelection = selectedMainOption.value;
  const hasSecondarySelection = props.secondary
    ? selectedSecondaryOption.value
    : true;
  return hasMainSelection && hasSecondarySelection;
});

/*
 * Methods
 */
const startEditing = () => {
  isEditing.value = true;
};

const cancelEditing = () => {
  isEditing.value = false;
  // Reset to previous values
  selectedMainOption.value = props.modelValue?.main || "";
  selectedSecondaryOption.value = props.modelValue?.secondary || "";
};

const selectMainOption = (value: string) => {
  selectedMainOption.value = value;
};

const selectSecondaryOption = (value: string) => {
  selectedSecondaryOption.value = value;
};

const confirmSelection = () => {
  if (!canConfirm.value) return;

  const value: FormValue = {
    main: selectedMainOption.value,
  };

  if (props.secondary && selectedSecondaryOption.value) {
    value.secondary = selectedSecondaryOption.value;
  }

  emit("update:modelValue", value);
  emit("confirm", value);
  isEditing.value = false;
};

/*
 * Watchers
 */

// Watcher to sync with modelValue
watch(
  () => props.modelValue,
  (newValue) => {
    selectedMainOption.value = newValue?.main || "";
    selectedSecondaryOption.value = newValue?.secondary || "";
  },
  { immediate: true }
);
</script>
