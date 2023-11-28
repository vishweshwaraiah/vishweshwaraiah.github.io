<script setup>
const props = defineProps({
  action: {
    default: 'always',
    type: String
  }
})

const breakClass = () => {
  if (props.action === 'always') {
    return 'page_break'
  } else if (props.action === 'break_before') {
    return 'break_before'
  } else if (props.action === 'break_after') {
    return 'break_after'
  } else {
    return 'avoid_break'
  }
}
</script>

<template lang="html">
  <div :class="breakClass()"></div>
</template>

<style lang="scss" scoped>
@media print {
  .page_break {
    page-break-after: always;
    margin-bottom: 2rem;
  }

  .avoid_break {
    page-break-inside: avoid;
  }

  .break_before {
    page-break-before: always;
  }

  .break_after {
    break-after: page;
  }
}
</style>
