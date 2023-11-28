<script setup>
import { ref, onMounted } from 'vue'
import { IsValidObject } from '@/utils/globals.js'
import MasterPrintBreak from '@/components/MasterPrintBreak.vue'
import DeveloperContact from '@/views/microviews/DeveloperContact.vue'
import DeveloperEducation from '@/views/microviews/DeveloperEducation.vue'
import DeveloperSocials from '@/views/microviews/DeveloperSocials.vue'
import DeveloperSkills from '@/views/microviews/DeveloperSkills.vue'
import DeveloperExpertise from '@/views/microviews/DeveloperExpertise.vue'
import DeveloperReferences from '@/views/microviews/DeveloperReferences.vue'
import DeveloperHobbies from '@/views/microviews/DeveloperHobbies.vue'

const props = defineProps({
  details: {
    default: () => {},
    type: Object
  },
  developerRefs: {
    default: () => [],
    type: Array
  }
})

const devContact = ref([])
const devEducation = ref([])
const devSocials = ref([])
const devSkills = ref([])
const devExpertise = ref([])
const devHobbies = ref([])
const devRefs = ref([])

onMounted(() => {
  if (IsValidObject(props.details)) {
    devContact.value = props.details.contact
    devEducation.value = props.details.education
    devSocials.value = props.details.social
    devSkills.value = props.details.skills
    devExpertise.value = props.details.expertise
    devHobbies.value = props.details.hobbies
    devRefs.value = props.developerRefs
  }
})
</script>

<template>
  <DeveloperContact :devContact="devContact" sectionTitle="Contact" />
  <DeveloperEducation :devEducation="devEducation" sectionTitle="Education" />
  <DeveloperSocials :devSocials="devSocials" sectionTitle="Social Media" />
  <MasterPrintBreak />
  <DeveloperSkills :devSkills="devSkills" sectionTitle="Skills" />
  <DeveloperExpertise :devExpertise="devExpertise" sectionTitle="Expertise" />
  <DeveloperHobbies :devHobbies="devHobbies" sectionTitle="Hobbies" />
  <DeveloperReferences :devRefs="devRefs" sectionTitle="References" />
</template>
