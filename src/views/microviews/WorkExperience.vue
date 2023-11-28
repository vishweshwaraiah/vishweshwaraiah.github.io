<script setup>
import DetailsBadge from '@/views/microviews/DetailsBadge.vue'
import MasterIcon from '@/components/MasterIcon.vue'
import MasterHrLine from '@/components/MasterHrLine.vue'
import MasterPrintBreak from '@/components/MasterPrintBreak.vue'

const props = defineProps({
  sectionTitle: {
    default: 'Work Experience',
    type: String
  },
  workExpList: {
    default: () => [],
    type: Array
  }
})
</script>
<template>
  <div class="work_experience">
    <div class="flex-between">
      <h1 class="section_title">{{ props.sectionTitle }}</h1>
      <MasterIcon
        svgName="company"
        size="medium"
        fillColor="var(--item-color)"
        :hoverInverse="true"
      />
    </div>
    <MasterHrLine thickness="2px" />
    <div class="experience_item" v-for="(item, i) in workExpList" :key="i">
      <span :class="item.print_margin ? 'print_margin' : ''"></span>
      <div class="work_header">
        <DetailsBadge
          class="work_duration"
          :content="item.badge_content"
          textColor="var(--glob-dark)"
          bgColor="var(--theme-color)"
          :isFantasy="true"
        />
        <div class="work_designation">
          <h3 class="job_title">{{ item.job_title }}</h3>
          <span class="job_company">
            <MasterIcon
              svgName="company"
              size="small"
              fillColor="var(--item-color)"
              :hoverInverse="true"
            />
            <span class="px-2">{{ item.job_company }}</span>
          </span>
          <span class="job_location">
            <MasterIcon
              svgName="family-house"
              size="small"
              fillColor="var(--item-color)"
              :hoverInverse="true"
            />
            <span class="px-2">{{ item.job_location }}</span>
          </span>
        </div>
      </div>
      <div class="work_content">
        <p class="work_desc">
          {{ item.work_description }}
        </p>

        <div class="work_skills">
          <DetailsBadge
            v-for="(skill, idx) in item.work_skills"
            class="skill_name"
            :content="skill"
            :key="idx"
            textColor="var(--bg-color)"
            bgColor="var(--secondary)"
          />
        </div>
      </div>
      <MasterHrLine margin-bottom="3rem" />
      <MasterPrintBreak v-if="item.print_break" />
      <MasterPrintBreak v-else action="avoid" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.work_experience {
  display: flex;
  flex-direction: column;
  padding: 0 2rem;

  .work_header {
    display: flex;
    align-items: center;
    justify-content: start;

    .work_duration {
      min-width: 5rem;
      width: auto;
    }

    .work_designation {
      padding-left: 2%;
      min-width: 80%;

      .job_title {
        text-transform: uppercase;
        font-family: var(--secondary-font-family);
        margin-bottom: 1rem;
      }

      .job_company,
      .job_location {
        display: flex;
        align-items: baseline;
        margin-bottom: px2rem(2);
      }
    }
  }

  .work_content {
    .work_desc {
      padding: 1rem 0;
    }
    .work_skills .skill_name {
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }
}
</style>
