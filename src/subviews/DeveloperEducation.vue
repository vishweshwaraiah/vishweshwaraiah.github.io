<script setup>
import MasterIcon from '@components/MasterIcon.vue'
import MasterHrLine from '@components/MasterHrLine.vue'
import DetailsBadge from '@src/subviews/DetailsBadge.vue'

defineProps({
  devEducation: {
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
  <div class="personal_details dev_education">
    <div class="flex-between">
      <h3 class="section_title">{{ sectionTitle }}</h3>
      <MasterIcon
        svgName="degree"
        size="medium"
        fillColor="var(--secondary-icon)"
        hoverColor="var(--themed-icon)"
      />
    </div>
    <MasterHrLine thickness="1px" hrColor="var(--glob-light)" />
    <div class="education_line" v-for="(line, i) in devEducation" :key="i">
      <label class="passed_year">
        <DetailsBadge
          class="year"
          :content="line.year"
          textColor="var(--bg-color)"
          bgColor="var(--secondary)"
          svgName="school-college"
        />
      </label>
      <div class="strong education-name">{{ line.name }}</div>
      <div class="strong x-small-text italic institute-name">
        <MasterIcon
          svgName="school-college"
          size="x-small"
          fillColor="var(--secondary-icon)"
          hoverColor="var(--themed-icon)"
        />
        {{ line.institute }}
      </div>
      <div class="strong x-small-text italic mb-2 institute-location">
        <MasterIcon
          svgName="location"
          size="x-small"
          fillColor="var(--secondary-icon)"
          hoverColor="var(--themed-icon)"
        />
        {{ line.location }}
      </div>
      <MasterHrLine thickness="1px" hrColor="var(--glob-light)" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dev_education .education_line {
  padding-left: px2rem(5);

  .education-name {
    margin-bottom: px2rem(10);
  }

  .institute-location,
  .institute-name {
    display: flex;
    gap: px2rem(10);
    margin-bottom: px2rem(5);
  }
  .passed_year {
    display: block;

    .year {
      display: inline-flex;
      gap: px2rem(10);
      align-items: baseline;
      justify-content: flex-start;
    }
  }
}
</style>
