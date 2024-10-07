<script setup>
import useExperiencesStore from '@src/stores/experiences.js'
import { getYearsFromDateList } from '@src/utils/globals.js'

defineProps({
  prepend: {
    default: '',
    type: String
  },
  append: {
    default: '',
    type: String
  }
})

const devExperience = useExperiencesStore()
const exps = devExperience.getExperiences

const filterDates = exps.map((exp) => {
  return {
    from: exp.exp_details.from,
    to: exp.exp_details.to
  }
})

const ExpInYears = getYearsFromDateList(filterDates)
</script>

<template>
  <span class="exp_years">
    <span v-if="prepend">{{ prepend }}</span>
    {{ ExpInYears }}
    <span v-if="append">{{ append }}</span>
  </span>
</template>

<style lang="scss" scoped>
.exp_years {
  display: inline;
}
</style>
