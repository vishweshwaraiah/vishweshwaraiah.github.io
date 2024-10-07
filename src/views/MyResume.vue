<script setup>
import { ref } from 'vue'
import { findWindowSize } from '@src/utils/globals.js'
import useExperiencesStore from '@src/stores/experiences.js'
import useAboutDevStore from '@src/stores/aboutdev.js'
import DeveloperTitle from '@src/subviews/DeveloperTitle.vue'
import MasterTemplate from '@src/subviews/MasterTemplate.vue'
import WorkExperience from '@src/subviews/WorkExperience.vue'
import DeveloperPicture from '@src/subviews/DeveloperPicture.vue'
import AboutDeveloper from '@src/subviews/AboutDeveloper.vue'
import PersonalDetails from '@src/subviews/PersonalDetails.vue'
import DutyRoles from '@src/subviews/DutyRoles.vue'

const aboutDev = useAboutDevStore()
const aboutDevData = aboutDev.getAboutDev

const experiences = useExperiencesStore()
const experiencesData = experiences.getExperiences

const subTitle = 'Senior Fullstack Developer'
const devTitle = 'Vishweshwarayya K J'
const sectionTitle = 'Work Experience'

const devPicWidth = ref('')
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
  <MasterTemplate class="my_resume">
    <template #sidebar>
      <DeveloperPicture :hasTriangle="true" :isSvg="true" :width="devPicWidth" />
      <PersonalDetails />
    </template>
    <template #content>
      <AboutDeveloper :content="aboutDevData" />
      <DeveloperTitle :title="devTitle" :subtitle="subTitle" />
      <WorkExperience :sectionTitle="sectionTitle" :workExpList="experiencesData" />
      <DutyRoles />
    </template>
  </MasterTemplate>
</template>
