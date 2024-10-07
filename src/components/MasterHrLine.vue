<script setup>
import { ref } from 'vue'

const props = defineProps({
  thickness: {
    default: '1px',
    type: String
  },
  marginTop: {
    default: '1rem',
    type: String
  },
  marginBottom: {
    default: '1rem',
    type: String
  },
  hrColor: {
    default: 'var(--item-color)',
    type: String
  },
  styleType: {
    default: 'solid',
    type: String
  }
})

const thick_value = ref(props.thickness)
</script>

<template>
  <div class="hr_line"></div>
</template>

<style lang="scss" scoped>
.hr_line {
  border: v-bind(thick_value) v-bind(styleType) v-bind(hrColor);
  margin-top: v-bind(marginTop);
  margin-bottom: v-bind(marginBottom);
}
</style>
