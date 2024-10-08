<template lang="html">
  <div v-if="isVisible" :class="`notification ${type} ${position}`" @click="hideNotifier">
    <header>
      <h5>{{ type.Capitalize() }}</h5>
      <span class="close small" @click="hideNotifier">
        <MasterIcon
          size="small"
          svgName="close-filled"
          fillColor="var(--primary-icon)"
          hoverColor="var(--themed-icon)"
        />
      </span>
    </header>
    <main>
      <p class="message">{{ message }}</p>
    </main>
  </div>
</template>
<script setup>
import { ref, watchEffect, onMounted } from 'vue'
import MasterIcon from '@components/MasterIcon.vue'

const props = defineProps({
  dataObj: {
    default: () => {},
    type: Object
  }
})

const isVisible = ref(true)
const type = ref('info')
const message = ref('Information')
const position = ref('top-right')
const timeout = ref(5000)
const filePath = ref('')

const hideNotifier = () => {
  isVisible.value = false
}

watchEffect(() => {
  if (props.dataObj.type) {
    type.value = props.dataObj.type
  }

  if (props.dataObj.message) {
    message.value = props.dataObj.message
  }

  if (props.dataObj.position) {
    position.value = props.dataObj.position
  }

  if (props.dataObj.timeout) {
    timeout.value = props.dataObj.timeout
  }

  if (props.dataObj.path) {
    filePath.value = props.dataObj.path
  }
})

const closeToast = () => {
  setTimeout(() => {
    isVisible.value = false
  }, timeout.value)
}

onMounted(() => {
  closeToast()
})
</script>
