<template>
  <div class="px-4 py-8 sm:px-6 sm:py-10">
    <div class="max-w-[720px] mx-auto space-y-4">
      <!-- School Card -->
      <div class="flex justify-center">
        <UiSchoolCard
          :school-name="cardContent.schoolName"
          :items="cardContent.items"
        >
          <template #actions>
            <UiButton label="Modifier" variant="secondary" size="sm" />
          </template>
        </UiSchoolCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/*
 * School Card Content
 */
const cardContent = {
  schoolName: "Lycée Gaston Berger",
  items: [
    {
      label: "Lille",
      icon: "line-md:map-marker",
    },
    {
      label: "Lycée Public",
      icon: "line-md:home",
    },
  ],
};
</script>
