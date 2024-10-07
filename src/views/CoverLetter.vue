<script setup>
import { ref } from 'vue'
import { findWindowSize } from '@src/utils/globals.js'
import DeveloperTitle from '@src/subviews/DeveloperTitle.vue'
import MasterTemplate from '@src/subviews/MasterTemplate.vue'
import DeveloperPicture from '@src/subviews/DeveloperPicture.vue'
import DeveloperContact from '@src/subviews/DeveloperContact.vue'
import DeveloperLetter from '@src/subviews/DeveloperLetter.vue'
import useContactStore from '@src/stores/contact.js'

const contact = useContactStore()
const devContact = contact.getContact

const subTitle = 'Senior Fullstack Developer'
const devTitle = 'Vishweshwarayya K J'

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
  <MasterTemplate class="cover_letter">
    <template #sidebar>
      <DeveloperPicture :hasTriangle="true" :isSvg="true" :width="devPicWidth" />
      <DeveloperContact :devContact="devContact" sectionTitle="Contact" />
    </template>
    <template #content>
      <DeveloperTitle :title="devTitle" :subtitle="subTitle" />
      <DeveloperLetter />
    </template>
  </MasterTemplate>
</template>

<style>
.cover_letter {
  display: block;
}
</style>
