<script setup>
import MasterIcon from '@components/MasterIcon.vue'
import MasterHrLine from '@components/MasterHrLine.vue'

defineProps({
  devSocials: {
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
  <div class="personal_details dev_social">
    <div class="flex-between">
      <h3 class="section_title">{{ sectionTitle }}</h3>
      <MasterIcon
        svgName="message"
        size="medium"
        fillColor="var(--secondary-icon)"
        hoverColor="var(--themed-icon)"
      />
    </div>
    <MasterHrLine thickness="1px" hrColor="var(--glob-light)" />
    <div class="social_line" v-for="(line, i) in devSocials" :key="i">
      <MasterIcon
        :svgName="line.iconName"
        size="medium"
        :title="line.iName"
        :labelAfter="line.iValue"
        bgColor="var(--theme-color)"
        fillColor="var(--primary-icon)"
        hoverColor="var(--themed-icon)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dev_social .social_line {
  padding: px2rem(10) 0;

  .social_id {
    padding-left: px2rem(10);
  }
}
</style>
