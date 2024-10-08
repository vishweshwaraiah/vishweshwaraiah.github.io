<script setup>
import { classNames } from '@src/utils/globals.js'
import MasterIcon from '@components/MasterIcon.vue'
import MasterImage from '@components/MasterImage.vue'
import DevPic from '@assets/images/vishu.png'

const props = defineProps({
  titleText: {
    default: '',
    type: String
  },
  hasTriangle: {
    default: false,
    type: Boolean
  },
  width: {
    default: '50%',
    type: String
  },
  isSvg: {
    default: false,
    type: Boolean
  }
})

const getClasses = () => {
  const classList = ['dev-picture']

  if (props.titleText) {
    classList.push('has_title')
  }

  if (props.hasTriangle) {
    classList.push('has_triangle')
  }

  return classNames(classList)
}
</script>

<template>
  <div :class="getClasses()">
    <span class="triangle"></span>
    <MasterIcon
      v-if="isSvg"
      class="dev_pic"
      svgName="vishu"
      :size="width"
      title="Vishweshwarayya Kj"
      fillColor="var(--primary-icon)"
      hoverColor="var(--themed-icon)"
    />
    <MasterImage
      v-else
      class="dev_pic"
      hasBorder
      :image="DevPic"
      :width="width"
      altText="Vishweshwarayya Kj"
    />
    <h1>{{ titleText }}</h1>
  </div>
</template>

<style lang="scss" scoped>
.dev-picture {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  padding: 2rem 0;

  &.has_title {
    flex-direction: column;

    .dev_pic {
      margin-bottom: 2rem;
    }
  }

  &.has_triangle > span.triangle {
    position: absolute;
    width: 100%;
    height: 100%;
    clip-path: polygon(100% 0%, 0% 100%, 0% 0%);
    background: var(--theme-color);
    top: 0;
    left: 0;
    z-index: 100;
  }
}
</style>
