<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  bg_color: {
    default: '',
    type: String
  }
})

const bgColor = ref('')

onMounted(() => {
  if (props.bg_color === 'light') {
    bgColor.value = 'var(--white)'
  } else {
    bgColor.value = 'var(--theme-color)'
  }
})
</script>

<template>
  <main class="root_template">
    <slot></slot>
  </main>
</template>

<style lang="scss" scoped>
.root_template {
  display: flex;
  width: 100vw;
  text-align: center;
  align-items: center;
  justify-content: space-around;
  min-height: 100vh;
  height: 100%;
  color: var(--item-color);
  background-color: v-bind(bgColor);
  padding: 0 10%;
  gap: 5%;
}
</style>
