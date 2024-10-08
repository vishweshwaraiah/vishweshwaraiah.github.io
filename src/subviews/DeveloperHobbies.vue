<script setup>
import MasterIcon from '@components/MasterIcon.vue'
import MasterHrLine from '@components/MasterHrLine.vue'

defineProps({
  devHobbies: {
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
  <div class="personal_details dev_hobbies">
    <div class="flex-between">
      <h3 class="section_title">Hobbies</h3>
      <MasterIcon
        svgName="support"
        size="medium"
        fillColor="var(--secondary-icon)"
        hoverColor="var(--themed-icon)"
      />
    </div>
    <MasterHrLine thickness="1px" hrColor="var(--glob-light)" />
    <div class="hobbies_line">
      <span v-for="(line, i) in devHobbies" :key="i" class="hobbies_name">
        <MasterIcon
          :svgName="line.iconName"
          size="x-large"
          roundSpace="20%"
          :title="line.iName"
          bgColor="var(--theme-color)"
          fillColor="var(--primary-icon)"
          hoverColor="var(--themed-icon)"
        />
        <label>{{ line.iName }}</label>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dev_hobbies .hobbies_line {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: px2rem(8);

  .hobbies_name {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    label {
      margin-top: px2rem(8);
    }
  }
}
</style>
