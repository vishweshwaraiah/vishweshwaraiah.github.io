import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const useRefsStore = defineStore('references', () => {
  const references = ref([
    {
      ref_name: 'Sunny Kukkar',
      ref_role: 'Technical Manager',
      ref_company: 'J P Morgan Chase & Co.',
      ref_mobile: '+91-9900451870',
      ref_email: 'sunny.kukkar@gmail.com'
    },
    {
      ref_name: 'Tanvi Jhamb',
      ref_role: 'Software Developer',
      ref_company: 'Cognizant Technologies Solutions',
      ref_mobile: '+91-8708762274',
      ref_email: 'tanvijhamb88@gmail.com'
    }
  ])

  const getReferences = computed(() => references.value)

  return { getReferences }
})

export default useRefsStore
