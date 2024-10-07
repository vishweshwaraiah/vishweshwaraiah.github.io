import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const useContactStore = defineStore('contact', () => {
  const contact = ref([
    {
      iName: 'mobile',
      iValue: '+91-7353203573',
      iconName: 'cellphone'
    },
    {
      iName: 'alternate',
      iValue: '+91-7353333573',
      iconName: 'cellphone-o'
    },
    {
      iName: 'email',
      iValue: 'k.vishu@outlook.com',
      iconName: 'email'
    },
    {
      iName: 'website',
      iValue: 'vishweshwaraiah.github.io',
      iconName: 'website'
    },
    {
      iName: 'location',
      iValue: 'Bengaluru, Karnataka',
      iconName: 'location'
    }
  ])

  const getContact = computed(() => contact.value)

  return { getContact }
})

export default useContactStore
