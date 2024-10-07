<style lang="scss" scoped>
.loader-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-size: px2rem(30);
  padding: px2rem(16);
  margin-bottom: 0.25rem;
  transition:
    0.3s color,
    0.3s border,
    0.3s transform,
    0.3s opacity;
  background: v-bind('backDropColor');

  &.fixed-true {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}

.loader {
  width: v-bind('loaderSize');
  height: v-bind('loaderSize');
  color: inherit;
  pointer-events: none;
  transform: rotateZ(45deg);
  perspective: px2rem(1000);
  border-radius: 50%;
  background-color: transparent;

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    animation: 1s spin linear infinite;
  }
  &:before {
    transform: rotateX(70deg);
  }
  &:after {
    transform: rotateY(70deg);
    animation-delay: 0.4s;
  }
}
</style>
<template lang="html">
  <div :class="mainWrapper">
    <span class="loader shadow-dark"></span>
    <label class="mt-2">{{ titleText }}</label>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { RemoveMultiSpaces } from '@src/utils/globals'
const props = defineProps({
  titleText: {
    default: 'Loading...',
    type: String
  },
  size: {
    default: 'medium',
    type: String
  },
  noBg: {
    default: false,
    type: Boolean
  },
  isFixed: {
    default: true,
    type: Boolean
  }
})

const loaderSize = computed(() => {
  if (props.size === 'small') {
    return '2rem'
  } else if (props.size === 'large') {
    return '6rem'
  } else {
    return '4rem'
  }
})

const backDropColor = computed(() => {
  if (props.noBg) {
    return 'transparent'
  } else {
    return `radial-gradient(
      ellipse farthest-corner at center bottom,
      var(--light-blue) 0%,
      var(--dark-blue) 100%
    )
    center bottom / 100% fixed`
  }
})

const mainWrapper = computed(() => {
  const defClasses = 'loader-container'
  const fixedClass = `fixed-${props.isFixed}`
  const combined = `${defClasses} ${fixedClass}`
  return RemoveMultiSpaces(combined)
})
</script>
