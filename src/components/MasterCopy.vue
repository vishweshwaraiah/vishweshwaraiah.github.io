<script setup>
import { ref } from 'vue'
import MasterIcon from '@components/MasterIcon.vue'

const props = defineProps({
  copyStr: {
    required: true,
    type: String
  }
})

const isCopied = ref(false)
const copyIcon = ref('copy')
const isVisible = ref(false)

const copyText = () => {
  // Copy the text inside the text field
  navigator.clipboard.writeText(props.copyStr)
  isCopied.value = true
  copyIcon.value = 'done-all'
  isVisible.value = true
  setTimeout(() => {
    isVisible.value = false
  }, 2000)
}
</script>

<template lang="html">
  <div class="copy-icon">
    <MasterIcon
      :svgName="copyIcon"
      @click.prevent="copyText()"
      :key="copyIcon"
      size="small"
      fillColor="var(--primary-icon)"
      hoverColor="var(--themed-icon)"
    />
    <span v-if="isVisible" class="copied_note">Copied!</span>
  </div>
</template>

<style lang="scss" scoped>
.copy-icon {
  position: absolute;
  top: px2rem(10);
  right: px2rem(10);
  cursor: pointer;
}

.copied_note {
  position: absolute;
  top: 0;
  right: 0;
  font-size: px2rem(10);
  background-color: var(--item-color);
  color: var(--bg-color);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-default);
}
</style>
