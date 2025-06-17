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
            <UiButton
              label="Modifier"
              variant="secondary"
              size="sm"
              @click="navigateToEdumapper"
            />
          </template>
        </UiSchoolCard>
      </div>

      <!-- Form Components Loop -->
      <UiForm
        v-for="form in formsConfig"
        :key="form.id"
        v-model="formsData[form.id]"
        :title="form.title"
        :main="form.main"
        :secondary="form.secondary"
        @confirm="(value) => handleFormConfirm(form.id, value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SchoolCardContent } from "~/types/school";
import type { FormConfig, FormValue } from "~/types/form";

/*
 * School Card Content
 */
const cardContent: SchoolCardContent = {
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

/*
 * Forms Data and Configuration
 */
const formsData = ref<Record<string, FormValue>>({
  classe: {},
  specialite: {},
  notes: {},
});

const formsConfig: (FormConfig & { id: string })[] = [
  {
    id: "classe",
    title: "Classe",
    main: {
      editTitle: "En quelle classe es-tu ?",
      options: [
        { label: "Seconde", value: "seconde" },
        { label: "Première", value: "premiere" },
        { label: "Terminale", value: "terminale" },
      ],
    },
    secondary: {
      editTitle: "Type de bac",
      options: [
        { label: "Général", value: "general" },
        { label: "Technologique", value: "technologique" },
        { label: "Professionnel", value: "professionnel" },
      ],
    },
  },
  {
    id: "specialite",
    title: "Spécialité",
    main: {
      editTitle: "Quelle est ta spécialité principale ?",
      options: [
        { label: "Mathématiques", value: "mathematiques" },
        { label: "Physique-Chimie", value: "physique-chimie" },
        { label: "Sciences de la Vie et de la Terre", value: "svt" },
        { label: "Sciences Économiques et Sociales", value: "ses" },
        { label: "Histoire-Géographie", value: "histoire-geo" },
        { label: "Langues", value: "langues" },
      ],
    },
    secondary: {
      editTitle: "Spécialité secondaire",
      options: [
        { label: "Mathématiques", value: "mathematiques" },
        { label: "Physique-Chimie", value: "physique-chimie" },
        { label: "Sciences de la Vie et de la Terre", value: "svt" },
        { label: "Sciences Économiques et Sociales", value: "ses" },
        { label: "Histoire-Géographie", value: "histoire-geo" },
        { label: "Langues", value: "langues" },
        { label: "Arts", value: "arts" },
        { label: "Philosophie", value: "philosophie" },
      ],
    },
  },
  {
    id: "notes",
    title: "Notes",
    main: {
      editTitle: "Quelle est ta moyenne générale ?",
      options: [
        { label: "Moins de 10", value: "moins-10" },
        { label: "10 - 12", value: "10-12" },
        { label: "12 - 14", value: "12-14" },
        { label: "14 - 16", value: "14-16" },
        { label: "16 - 18", value: "16-18" },
        { label: "Plus de 18", value: "plus-18" },
      ],
    },
  },
];

/*
 * Event Handlers
 */
const navigateToEdumapper = () => {
  window.open("https://www.edumapper.com/auth/signin", "_blank");
};

const handleFormConfirm = (formId: string, value: FormValue) => {
  console.log(`${formId} confirmé:`, value);
};
</script>
