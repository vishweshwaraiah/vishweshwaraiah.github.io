<style lang="scss" scoped>
.master-popover {
  .popover {
    &-trigger {
      align-items: center;
      color: var(--item-color);
      display: inline-flex;
      justify-content: center;
      margin: auto;
      padding: 0;
    }
    &-description {
      position: fixed;
      background: var(--item-color);
      color: var(--bg-color);
      top: 50%;
      left: 50%;
      padding: 2rem;
      z-index: 203;
      transform: translate(-50%, -50%);
      box-shadow: boxShadow(dark);
      border: px2rem(5) solid var(--bg-color);
    }
  }
}
</style>
<template lang="html">
  <div class="master-popover">
    <button class="btn popover-trigger" @click.stop="(e) => togglePopover(e, 'open')">
      {{ trigger }}
    </button>
    <div v-if="isVisible" class="backDrop" @click.stop="(e) => togglePopover(e, 'close')"></div>
    <div v-if="currDesc" class="popover-description">
      <MasterIcon
        @click.stop="(e) => togglePopover(e, 'close')"
        svgName="close-filled"
        size="small"
        class="close small"
        fillColor="var(--primary-icon)"
        hoverColor="var(--themed-icon)"
      />
      {{ currDesc }}
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import MasterIcon from '@components/MasterIcon.vue'
const props = defineProps({
  description: {
    default: '',
    type: String
  },
  trigger: {
    default: '',
    type: String
  }
})

const currDesc = ref('')
const isVisible = ref(false)
const popoverPos = ref('center')
const stateClass = ref('close')

const toggleVisibility = (action) => {
  if (action === 'open') {
    isVisible.value = true
  } else if (action === 'close') {
    isVisible.value = false
  } else {
    isVisible.value = !isVisible.value
  }
}

const togglePopover = (e, action) => {
  toggleVisibility(action)

  const posTop = window.innerHeight - e.clientY
  if (posTop < 150) popoverPos.value = 'center'

  if (isVisible.value && (action === 'open' || action === 'toggle')) {
    stateClass.value = 'open'
    currDesc.value = props.description
  } else {
    stateClass.value = 'close'
    currDesc.value = ''
  }
}
</script>
