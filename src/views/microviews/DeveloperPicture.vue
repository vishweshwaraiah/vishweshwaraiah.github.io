<script setup>
import { classNames } from '@/utils/globals.js'
import DevPic from '@/assets/Vishu.png'

const props = defineProps({
  titleText: {
    default: '',
    type: String
  },
  hasTriangle: {
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
    <img :src="DevPic" alt="Vishweshwarayya Kj" />
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

  img {
    width: 50%;
    height: auto;
    border: 1rem solid var(--glob-light);
    border-radius: 25%;
    z-index: 200;
  }

  &.has_title {
    flex-direction: column;

    img {
      width: 25%;
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
