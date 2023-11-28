<script setup>
import DeveloperPicture from '@/views/microviews/DeveloperPicture.vue'

const devName = 'Vishweshwarayya Kj'
</script>

<template>
  <div class="about_dev">
    <DeveloperPicture :titleText="devName" />
  </div>
</template>

<style lang="scss" scoped>
.about_dev {
  display: flex;
  width: 100%;
  flex: 1;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: var(--item-color);
  background-color: var(--theme-color);
}
</style>
