<script setup>
import { computed } from 'vue'

const props = defineProps({
  action: {
    default: 'always',
    type: String
  }
})

const breakClass = computed(() => {
  if (props.action === 'avoid') {
    return 'avoid_break'
  } else if (props.action === 'break_before') {
    return 'break_before'
  } else if (props.action === 'break_after') {
    return 'break_after'
  } else {
    return 'page_break'
  }
})
</script>

<template lang="html">
  <div :class="breakClass"></div>
</template>

<style lang="scss" scoped>
@media print {
  .page_break {
    page-break-after: always;
    margin-bottom: 2rem;
  }

  .avoid_break {
    page-break-inside: avoid;
    page-break-after: avoid;
    page-break-before: avoid;
  }

  .break_before {
    break-before: always;
    page-break-before: always;
  }

  .break_after {
    break-after: always;
    page-break-after: always;
  }
}
</style>
