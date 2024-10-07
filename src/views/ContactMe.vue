<script setup>
import DeveloperPicture from '@src/subviews/DeveloperPicture.vue'
import RootTemplate from '@src/subviews/RootTemplate.vue'

const contact = '+91-7353333573'
</script>

<template>
  <RootTemplate class="contact_me">
    <DeveloperPicture :titleText="devName" width="20vw" :isSvg="true" />
    <h4 class="mb-3">Call me on</h4>
    <h1>{{ contact }}</h1>
  </RootTemplate>
</template>

<style lang="scss" scoped>
.contact_me {
  flex-direction: column;
  justify-content: center;

  > * {
    text-align: left;
  }
}
</style>
