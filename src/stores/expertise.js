import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const useExpertiseStore = defineStore('expertise', () => {
  const expertise = ref([
    'Web Developement',
    'JavaScript',
    'Recat.js / Vue.js',
    'OOPS Concepts',
    'Cascading Style Sheets',
    'Project Management'
  ])

  const getExpertise = computed(() => expertise.value)

  return { getExpertise }
})

export default useExpertiseStore
