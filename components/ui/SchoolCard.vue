<template>
  <div
    class="bg-white rounded-3xl w-full bg-cover bg-center bg-no-repeat relative overflow-hidden"
    style="background-image: url('/img/bg-card.svg')"
  >
    <div class="p-6">
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
      >
        <!-- Content section -->
        <div class="flex flex-col gap-2">
          <h3 class="text-xl font-bold text-white">
            {{ schoolName }}
          </h3>
          <div class="flex items-center gap-4 text-white">
            <div
              v-for="item in items"
              :key="item.label"
              class="flex items-center gap-1"
            >
              <Icon :name="item.icon" :size="12" />
              <span class="text-sm">{{ item.label }}</span>
            </div>
          </div>
        </div>

        <!-- Actions section -->
        <div class="flex-shrink-0 self-start">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { SchoolCardItem } from "~/types/school";

defineProps({
  schoolName: {
    type: String,
    required: true,
  },
  items: {
    type: Array as PropType<SchoolCardItem[]>,
    required: true,
  },
});
</script>
