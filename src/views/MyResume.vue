<script setup>
import DeveloperTitle from '@/views/microviews/DeveloperTitle.vue'
import MasterTemplate from '@/views/microviews/MasterTemplate.vue'
import WorkExperience from '@/views/microviews/WorkExperience.vue'
import DeveloperPicture from '@/views/microviews/DeveloperPicture.vue'
import AboutDeveloper from '@/views/microviews/AboutDeveloper.vue'
import PersonalDetails from '@/views/microviews/PersonalDetails.vue'
import WorkExpList from '@/stores/data/WorkExperience.js'
import AboutDev from '@/stores/data/AboutDeveloper.js'
import PersonalData from '@/stores/data/PersonalDetails.js'
import References from '@/stores/data/ReferenceDetails.js'
import Responsibilities from '@/views/microviews/Responsibilities.vue'

const subTitle = 'Senior Fullstack Developer'
const devTitle = 'Vishweshwarayya K J'
const sectionTitle = 'Work Experience'
</script>

<template>
  <MasterTemplate class="my_resume">
    <template #sidebar>
      <DeveloperPicture :hasTriangle="true" />
      <PersonalDetails :details="PersonalData" :developerRefs="References" />
    </template>
    <template #content>
      <AboutDeveloper :content="AboutDev" />
      <DeveloperTitle :title="devTitle" :subtitle="subTitle" />
      <WorkExperience :sectionTitle="sectionTitle" :workExpList="WorkExpList" />
      <Responsibilities />
    </template>
  </MasterTemplate>
</template>
