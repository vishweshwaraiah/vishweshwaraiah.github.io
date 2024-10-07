import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const useEducationStore = defineStore('education', () => {
  const education = ref([
    {
      year: '2005-2006',
      institute: 'Sangolli Rayanna MR School',
      location: 'Nandagad',
      name: 'Secondary School'
    },
    {
      year: '2006-2008',
      institute: 'Basaveshwar Science College',
      location: 'Bagalkote',
      name: 'Pre-University College'
    },
    {
      year: '2008-2012',
      institute: 'KNS Institute of Technology',
      location: 'Bengaluru',
      name: 'Bachelors of Engineering'
    }
  ])

  const getEducation = computed(() => education.value)

  return { getEducation }
})

export default useEducationStore
