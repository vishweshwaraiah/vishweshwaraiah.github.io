<template lang="html">
  <div class="tab" v-show="active">
    <slot></slot>
  </div>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  isActive: {
    default: 'tab_one',
    type: String
  },
  tabId: {
    default: 'tab_one',
    type: String
  }
})

const active = computed(() => {
  return props.isActive === props.tabId
})
</script>
