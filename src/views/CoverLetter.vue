<script setup>
import { ref, onMounted } from 'vue'
import { IsValidObject } from '@/utils/globals.js'
import DeveloperTitle from '@/views/microviews/DeveloperTitle.vue'
import MasterTemplate from '@/views/microviews/MasterTemplate.vue'
import DeveloperPicture from '@/views/microviews/DeveloperPicture.vue'
import DeveloperContact from '@/views/microviews/DeveloperContact.vue'
import DeveloperLetter from '@/views/microviews/DeveloperLetter.vue'
import PersonalData from '@/stores/data/PersonalDetails.js'
import CoverLetter from '@/stores/data/CoverLetter.js'

const devContact = ref([])

onMounted(() => {
  if (IsValidObject(PersonalData)) {
    devContact.value = PersonalData.contact
  }
})

const subTitle = 'Senior Fullstack Developer'
const devTitle = 'Vishweshwarayya K J'
const sectionTitle = 'Cover Letter'
</script>

<template>
  <MasterTemplate class="cover_letter">
    <template #sidebar>
      <DeveloperPicture :hasTriangle="true" />
      <DeveloperContact :devContact="devContact" sectionTitle="Contact" />
    </template>
    <template #content>
      <DeveloperTitle :title="devTitle" :subtitle="subTitle" />
      <DeveloperLetter :letterContent="CoverLetter" :sectionTitle="sectionTitle" />
    </template>
  </MasterTemplate>
</template>

<style></style>
