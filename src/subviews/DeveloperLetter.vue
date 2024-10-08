<script setup>
import { ref } from 'vue'
import MasterHrLine from '@components/MasterHrLine.vue'
import MasterIcon from '@components/MasterIcon.vue'
import MasterPrintBreak from '@components/MasterPrintBreak.vue'
import TotalExperience from '@src/subviews/TotalExperience.vue'
import useCoverLetterStore from '@src/stores/coverletter.js'

const sectionTitle = 'Cover Letter'

const coverletter = useCoverLetterStore()
const letterContent = coverletter.letterContent

const toName = ref('')

const hirerName = letterContent.hirerName
toName.value = hirerName

const addrLine1 = letterContent.addrLine1
const addrLine2 = letterContent.addrLine2
const addrLine3 = letterContent.addrLine3
const addrLine4 = letterContent.addrLine4
const introDesc = letterContent.intro_desc
const experienceDesc = letterContent.experience_desc
const expertiseDesc = letterContent.expertise_desc
const recentProjects = letterContent.recent_projects
const passionDesc = letterContent.passion_desc
const finalWords = letterContent.final_words
const fromDeveloper = letterContent.from_developer
</script>

<template>
  <div class="cover_letter">
    <div class="flex-between">
      <h1 class="section_title">{{ sectionTitle }}</h1>
      <MasterIcon
        svgName="user"
        size="medium"
        fillColor="var(--primary-icon)"
        hoverColor="var(--themed-icon)"
      />
    </div>
    <MasterHrLine thickness="2px" />
    <div class="letter_content">
      <div class="letter_header">
        <div class="to strong mb-2">To,</div>
        <input class="strong dear_name mb-2" type="text" v-model.trim="toName" />

        <span class="d-block addr_name mb-1" contenteditable="true">
          {{ addrLine1 }}
        </span>
        <span class="d-block addr_name mb-1" contenteditable="true">
          {{ addrLine2 }}
        </span>
        <span class="d-block addr_name mb-1" contenteditable="true">
          {{ addrLine3 }}
        </span>
        <span class="d-block addr_name mb-2" contenteditable="true">
          {{ addrLine4 }}
        </span>
        <p class="mt-2 strong dear_name">Dear Mr/Mrs. {{ toName }},</p>
      </div>
      <div class="letter_body">
        <div class="intro_desc mt-3 mb-2" contenteditable="true">
          {{ introDesc }} <TotalExperience prepend="I have" append="of" />
          {{ experienceDesc }}
        </div>
        <div class="expertise_desc mt-3 mb-2" contenteditable="true">
          {{ expertiseDesc }}
        </div>
        <div class="recent_projects mt-3 mb-2" contenteditable="true">
          {{ recentProjects }}
        </div>
        <div class="passion_desc mt-3 mb-2" contenteditable="true">
          {{ passionDesc }}
        </div>
        <div class="final_words mt-3 mb-2" contenteditable="true">
          {{ finalWords }}
        </div>
      </div>
      <div class="letter_footer from_developer mt-3 mb-1" contenteditable="true">
        {{ fromDeveloper }}
      </div>
    </div>
  </div>
  <MasterPrintBreak />
</template>

<style lang="scss" scoped>
.cover_letter {
  padding: 0 2rem;

  *[contenteditable='true'] {
    outline: none;
    cursor: text;
  }

  .dear_name,
  .addr_name {
    padding: 0;
    background-color: transparent;
    font-weight: 100;

    &:focus-visible {
      cursor: text;
      outline: none;
    }
  }

  .dear_name,
  .from_developer {
    text-transform: uppercase;
    font-size: calc(1vw + 5px);
    font-weight: bold;
  }

  @include mediaQuery(mobile) {
    .dear_name,
    .from_developer {
      font-size: calc(3vw + 5px);
    }
  }

  @include mediaQuery(tablet) {
    .dear_name,
    .from_developer {
      font-size: calc(2.5vw + 5px);
    }
  }

  @include mediaQuery(laptop) {
    .dear_name,
    .from_developer {
      font-size: calc(2vw + 5px);
    }
  }

  .letter_body {
    .intro_desc,
    .expertise_desc,
    .recent_projects,
    .passion_desc,
    .final_words {
      font-weight: 100;
    }
  }
}
</style>
