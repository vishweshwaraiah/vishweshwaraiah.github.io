<script setup>
import { ref } from 'vue'
import { findWindowSize } from '@/utils/globals.js'
import DeveloperTitle from '@/subviews/DeveloperTitle.vue'
import MasterTemplate from '@/subviews/MasterTemplate.vue'
import DeveloperPicture from '@/subviews/DeveloperPicture.vue'
import DeveloperContact from '@/subviews/DeveloperContact.vue'
import ProjectsGrid from '@/subviews//ProjectsGrid.vue'
import useContactStore from '@/stores/contact.js'
import useExperiencesStore from '@/stores/experiences'

const contact = useContactStore()
const devContact = contact.getContact

const experiences = useExperiencesStore()
const orgsList = experiences.getExperiences

const subTitle = 'Senior Fullstack Developer'
const devTitle = 'Vishweshwarayya K J'
const sectionTitle = 'Projects'

let devPicWidth = ref('')
const device = findWindowSize()
if (device === 'mobile') {
  devPicWidth.value = '50vw'
} else if (device === 'tablet') {
  devPicWidth.value = '25vw'
} else if (device === 'laptop') {
  devPicWidth.value = '20vw'
} else {
  devPicWidth.value = '15vw'
}
</script>

<template>
  <MasterTemplate class="worked_projects">
    <template #sidebar>
      <DeveloperPicture :hasTriangle="true" :isSvg="true" :width="devPicWidth" />
      <DeveloperContact :devContact="devContact" sectionTitle="Contact" />
    </template>
    <template #content>
      <DeveloperTitle :title="devTitle" :subtitle="subTitle" />
      <ProjectsGrid :orgsList="orgsList" :sectionTitle="sectionTitle" />
    </template>
  </MasterTemplate>
</template>

<style>
.worked_projects {
  display: block;
}
</style>
