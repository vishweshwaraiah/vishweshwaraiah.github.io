<script setup>
import { RouterView } from 'vue-router'
import FloatingMenu from '@src/views/FloatingMenu.vue'
import MasterScrollto from '@components/MasterScrollto.vue'
</script>

<template>
  <FloatingMenu classNames="main_menu" />
  <RouterView />
  <MasterScrollto />
</template>
