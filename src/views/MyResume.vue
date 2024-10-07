<script setup>
import { ref } from 'vue'
import { findWindowSize } from '@/utils/globals.js'
import useExperiencesStore from '@/stores/experiences.js'
import useAboutDevStore from '@/stores/aboutdev.js'
import DeveloperTitle from '@/subviews/DeveloperTitle.vue'
import MasterTemplate from '@/subviews/MasterTemplate.vue'
import WorkExperience from '@/subviews/WorkExperience.vue'
import DeveloperPicture from '@/subviews/DeveloperPicture.vue'
import AboutDeveloper from '@/subviews/AboutDeveloper.vue'
import PersonalDetails from '@/subviews/PersonalDetails.vue'
import DutyRoles from '@/subviews/DutyRoles.vue'

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
