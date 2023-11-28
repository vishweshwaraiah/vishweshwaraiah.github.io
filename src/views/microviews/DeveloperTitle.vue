<script setup>
import { ref, onMounted } from 'vue'
import { dateDiffer } from '@/utils/globals.js'

defineProps({
  title: {
    default: '',
    type: String
  },
  subtitle: {
    default: '',
    type: String
  }
})
const startedDate = new Date('January 2013Z')
const expYears = ref('')

onMounted(() => {
  const diffDate = dateDiffer({ startedDate, format: 'YM' })
  expYears.value = diffDate
})
</script>

<template>
  <div class="master_title section_title">
    <h1 class="title">{{ title }}</h1>
    <h4 class="subtitle">{{ subtitle }}</h4>
    <h4 class="exp_years">From Past {{ expYears }}</h4>
  </div>
</template>

<style lang="scss" scoped>
.master_title {
  position: relative;
  background-color: var(--theme-color);
  padding: 1rem 2rem;
  width: auto;
  border-width: 5px 0 5px 0;
  border-style: double;
  border-color: var(--item-color);
  text-transform: uppercase;
  font-weight: bolder;
  margin: auto auto 2rem auto;

  .title {
    font-size: 5vw;
  }

  .subtitle {
    font-size: 2.5vw;
    padding: 0.625rem 0;
    border-top: 2px solid var(--item-color);
    border-bottom: 2px solid var(--item-color);
  }

  .exp_years {
    margin-top: 0.625rem;
  }

  @include mediaQuery(mobile) {
    .title {
      font-size: 8vw;
    }

    .subtitle {
      font-size: 4vw;
    }
  }
}
</style>
