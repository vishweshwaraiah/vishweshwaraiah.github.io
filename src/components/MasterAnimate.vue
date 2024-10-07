<script setup>
import { ref, onMounted } from 'vue'
import { classNames } from '@src/utils/globals.js'

const props = defineProps({
  textContent: {
    default: '',
    type: String
  },
  highlights: {
    default: () => [],
    type: Array
  }
})

const textArray = ref([])

const styleObject = (idx) => ({
  animationDelay: 0.75 + idx / 25 + 's'
})

const spanClasses = (word) => {
  const clsList = ['sub_text']
  word = word.toLowerCase()
  if (props.highlights.includes(word)) {
    clsList.push('highlighted')
  }

  return classNames(clsList)
}

onMounted(() => {
  if (props.textContent) {
    textArray.value = props.textContent.split(' ')
  }
})
</script>

<template>
  <div class="animated_text">
    <span
      v-for="(word, idx) in textArray"
      :style="styleObject(idx)"
      :key="`${word}-${idx}`"
      :class="spanClasses(word)"
    >
      {{ word }}&nbsp;
    </span>
  </div>
</template>

<style lang="scss" scoped>
.animated_text {
  line-height: 2;

  > span {
    opacity: 0.2;
    position: relative;
    animation: moveText 0.75s forwards;
  }

  .sub_text {
    display: inline-block;
  }

  .highlighted {
    font-weight: bold;
    color: var(--dark-blue);
    font-style: italic;
  }
}
</style>
