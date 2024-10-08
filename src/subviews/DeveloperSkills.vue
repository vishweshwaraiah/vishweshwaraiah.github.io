<script setup>
import MasterIcon from '@components/MasterIcon.vue'
import MasterHrLine from '@components/MasterHrLine.vue'
import DetailsBadge from '@src/subviews/DetailsBadge.vue'

defineProps({
  devSkills: {
    default: () => [],
    type: Array
  },
  sectionTitle: {
    default: '',
    type: String
  }
})
</script>

<template>
  <div class="personal_details dev_skills">
    <span class="print_margin"></span>
    <div class="flex-between">
      <h3 class="section_title">{{ sectionTitle }}</h3>
      <MasterIcon
        svgName="skills"
        size="medium"
        fillColor="var(--secondary-icon)"
        hoverColor="var(--themed-icon)"
      />
    </div>
    <MasterHrLine thickness="1px" hrColor="var(--glob-light)" />
    <div class="skills_line">
      <DetailsBadge
        v-for="(line, i) in devSkills"
        :key="i"
        class="skill_name"
        :content="line"
        textColor="var(--item-color)"
        bgColor="var(--theme-color)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dev_skills .skills_line {
  padding: 0.25rem;

  .skill_name {
    display: inline-block;
    margin: 0 px2rem(5) px2rem(5) 0;
  }
}
</style>
