<script setup>
import { computed } from 'vue'
import { classNames } from '@src/utils/globals'

const props = defineProps({
  type: {
    type: String,
    default: 'button'
  },
  href: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'small'
  },
  width: {
    type: String,
    default: 'auto'
  }
})

const buttonWrapper = computed(() => {
  const classList = ['btn']
  classList.push(`btn-${props.size}`)
  classList.push(`btn-${props.variant}`)

  return classNames(classList)
})
</script>

<template lang="html">
  <a v-if="href" :href="href" :class="buttonWrapper" :style="{ width: width }">
    <slot>Button Link</slot>
  </a>
  <button v-else :type="type" :class="buttonWrapper" :style="{ width: width }">
    <slot>Button</slot>
  </button>
</template>

<style lang="scss">
.master-btn {
  display: initial;
  padding: px2rem(8);
  border-radius: var(--radius-medium);

  &__large {
    width: 2rem;
    height: 2rem;
    font-size: var(--large);
  }
}
</style>
