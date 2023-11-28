<script setup>
import MasterIcon from '@/components/MasterIcon.vue'
import MasterHrLine from '@/components/MasterHrLine.vue'

defineProps({
  devContact: {
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
  <div class="personal_details dev_contact">
    <div class="flex-between">
      <h3 class="section_title">{{ sectionTitle }}</h3>
      <MasterIcon
        svgName="contact"
        size="medium"
        fillColor="var(--bg-color)"
        :hoverInverse="true"
      />
    </div>
    <MasterHrLine thickness="1px" hrColor="var(--glob-light)" />
    <span class="contact_line" v-for="(line, i) in devContact" :key="i">
      <MasterIcon
        :svgName="line.iconName"
        size="small"
        fillColor="var(--glob-dark)"
        :hoverInverse="true"
        roundSpace="5px"
        bgColor="var(--theme-color)"
        :title="line.iName"
      />
      <span class="line_name" :title="line.iName">{{ line.iValue }}</span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.dev_contact .contact_line {
  display: flex;
  align-items: center;
  padding: 0.5rem;

  .line_name {
    padding-left: px2rem(10);
  }
}
</style>
