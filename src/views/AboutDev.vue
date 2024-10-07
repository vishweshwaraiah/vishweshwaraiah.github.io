<script setup>
import DeveloperPicture from '@/subviews/DeveloperPicture.vue'
import RootTemplate from '@/subviews/RootTemplate.vue'

const devName = 'Vishweshwarayya Kj'
</script>

<template>
  <RootTemplate class="about_dev">
    <DeveloperPicture :titleText="devName" width="30vw" :isSvg="true" />
  </RootTemplate>
</template>
