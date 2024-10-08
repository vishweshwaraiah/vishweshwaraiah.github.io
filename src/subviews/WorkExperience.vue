<script setup>
import { dateDiffer, toUTCDate } from '@src/utils/globals.js'
import DetailsBadge from '@src/subviews/DetailsBadge.vue'
import MasterIcon from '@components/MasterIcon.vue'
import MasterHrLine from '@components/MasterHrLine.vue'
import MasterPrintBreak from '@components/MasterPrintBreak.vue'

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

const getSkills = (exp) => {
  const projects = exp.projects_list
  let skills = []
  if (projects?.length) {
    projects.forEach((element) => {
      skills = element.work_skills
    })
  }

  return skills
}

const getDateDifference = (exp_details) => {
  const { from, to } = exp_details
  const fromDate = toUTCDate(from)
  const toDate = toUTCDate(to)

  return dateDiffer({ from: fromDate, to: toDate, format: 'YM' })
}
</script>
<template>
  <div class="work_experience">
    <div class="flex-between">
      <h1 class="section_title">{{ props.sectionTitle }}</h1>
      <MasterIcon
        svgName="company"
        size="medium"
        fillColor="var(--primary-icon)"
        hoverColor="var(--themed-icon)"
      />
    </div>
    <MasterHrLine thickness="2px" />
    <div class="experience_item" v-for="(item, i) in workExpList" :key="i">
      <span :class="item.print_margin ? 'print_margin' : ''"></span>
      <div class="work_header">
        <DetailsBadge
          class="work_duration"
          :content="item.exp_details"
          textColor="var(--glob-dark)"
          bgColor="var(--theme-color)"
          :isFantasy="true"
        />
        <div class="work_designation">
          <div class="job_title">
            <h4>{{ item.job_title }}</h4>
            <span class="exp_badge">
              For
              {{ getDateDifference(item.exp_details) }}
            </span>
          </div>
          <span class="job_company">
            <MasterIcon
              svgName="company"
              size="x-small"
              fillColor="var(--primary-icon)"
              hoverColor="var(--themed-icon)"
            />
            <span class="px-2">{{ item.job_company }}</span>
          </span>
          <span class="job_location">
            <MasterIcon
              svgName="family-house"
              size="x-small"
              fillColor="var(--primary-icon)"
              hoverColor="var(--themed-icon)"
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
            v-for="(skill, idx) in getSkills(item)"
            class="skill_name"
            :content="skill"
            :key="idx"
            textColor="var(--bg-color)"
            bgColor="var(--secondary)"
          />
        </div>
      </div>
      <MasterHrLine margin-bottom="2.25rem" />
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
        display: flex;
        text-transform: uppercase;
        font-family: var(--secondary-font-family);
        align-items: baseline;

        .exp_badge {
          display: inline-block;
          margin-left: 0.5rem;
          margin-bottom: 0.25rem;
        }
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

@include mediaQuery(mobile, tablet, laptop) {
  .work_experience .work_header .work_designation .job_title {
    flex-direction: column;
    margin-bottom: 0;
  }
}
</style>
