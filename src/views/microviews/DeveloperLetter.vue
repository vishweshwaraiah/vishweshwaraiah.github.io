<script setup>
import { ref, onMounted } from 'vue'
import MasterHrLine from '@/components/MasterHrLine.vue'
import MasterIcon from '@/components/MasterIcon.vue'

const props = defineProps({
  sectionTitle: {
    default: 'Cover Letter',
    type: String
  },
  letterContent: {
    default: () => {},
    type: Object
  }
})

const toAddress = ref('')
const introDesc = ref('')
const expertiseDesc = ref('')
const recentProjects = ref('')
const passionDesc = ref('')
const finalWords = ref('')
const fromDeveloper = ref('')

onMounted(() => {
  toAddress.value = props.letterContent.to_address
  introDesc.value = props.letterContent.intro_desc
  expertiseDesc.value = props.letterContent.expertise_desc
  recentProjects.value = props.letterContent.recent_projects
  passionDesc.value = props.letterContent.passion_desc
  finalWords.value = props.letterContent.final_words
  fromDeveloper.value = props.letterContent.from_developer
})
</script>

<template>
  <div class="cover_letter">
    <div class="flex-between">
      <h1 class="section_title">{{ props.sectionTitle }}</h1>
      <MasterIcon svgName="user" size="medium" fillColor="var(--item-color)" :hoverInverse="true" />
    </div>
    <MasterHrLine thickness="2px" />
    <div class="letter_content">
      <div class="letter_header">
        <div class="strong mb-2">To,</div>
        <input class="strong dear_name mb-2" type="text" v-model.trim="toAddress.to_name" />
        <span class="d-block thin-text" v-for="(item, i) in toAddress.addr_lines" :key="i"
          >{{ item }},</span
        >
        <p class="mt-2 strong dear_name">Dear Mr/Mrs {{ toAddress.to_name }},</p>
      </div>
      <div class="letter_body">
        <div class="intro_desc mt-3 mb-2">{{ introDesc }}</div>
        <div class="expertise_desc mt-3 mb-2">{{ expertiseDesc }}</div>
        <div class="recent_projects mt-3 mb-2">{{ recentProjects }}</div>
        <div class="passion_desc mt-3 mb-2">{{ passionDesc }}</div>
        <div class="final_words mt-3 mb-2">{{ finalWords }}</div>
      </div>
      <div class="letter_footer from_developer mt-4 mb-2">{{ fromDeveloper }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cover_letter {
  padding: 0 2rem;

  .dear_name {
    text-transform: uppercase;
    padding: 0;
    background-color: transparent;
  }
}
</style>
