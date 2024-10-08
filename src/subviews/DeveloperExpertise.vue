<script setup>
import MasterIcon from '@components/MasterIcon.vue'
import MasterHrLine from '@components/MasterHrLine.vue'

defineProps({
  devExpertise: {
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
  <div class="personal_details dev_expertise">
    <div class="flex-between">
      <h3 class="section_title">{{ sectionTitle }}</h3>
      <MasterIcon
        svgName="expert"
        size="medium"
        fillColor="var(--secondary-icon)"
        hoverColor="var(--themed-icon)"
      />
    </div>
    <MasterHrLine thickness="1px" hrColor="var(--glob-light)" />
    <div class="expertise_line">
      <span v-for="(line, i) in devExpertise" :key="i" class="expertise_name">
        {{ i + 1 + '. ' + line }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dev_expertise .expertise_line {
  padding: 0.25rem;

  .expertise_name {
    display: block;
    padding: px2rem(10) 0;
    text-transform: uppercase;
    font-weight: bolder;
  }
}
</style>
