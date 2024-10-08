<script setup>
import useContactStore from '@src/stores/contact.js'
import useEducationStore from '@src/stores/education.js'
import useSocialsStore from '@src/stores/socials.js'
import useSkillsStore from '@src/stores/skills.js'
import useExpertiseStore from '@src/stores/expertise.js'
import useHobbiesStore from '@src/stores/hobbies.js'
import useRefsStore from '@src/stores/references.js'
import MasterPrintBreak from '@components/MasterPrintBreak.vue'
import DeveloperContact from '@src/subviews/DeveloperContact.vue'
import DeveloperEducation from '@src/subviews/DeveloperEducation.vue'
import DeveloperSocials from '@src/subviews/DeveloperSocials.vue'
import DeveloperSkills from '@src/subviews/DeveloperSkills.vue'
import DeveloperExpertise from '@src/subviews/DeveloperExpertise.vue'
import DeveloperHobbies from '@src/subviews/DeveloperHobbies.vue'
import DeveloperReferences from '@src/subviews/DeveloperReferences.vue'

const contact = useContactStore()
const education = useEducationStore()
const skills = useSkillsStore()
const expertise = useExpertiseStore()
const socials = useSocialsStore()
const hobbies = useHobbiesStore()
const references = useRefsStore()

const devContact = contact.getContact
const devEducation = education.getEducation
const devSocials = socials.getSocials
const devSkills = skills.getSkills
const devExpertise = expertise.getExpertise
const devHobbies = hobbies.getHobbies
const devRefs = references.getReferences
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
