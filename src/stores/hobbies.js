import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const useHobbiesStore = defineStore('hobbies', () => {
  const hobbies = ref([
    { iName: 'Gaming', iValue: 'gaming', iconName: 'gaming' },
    { iName: 'Cinema', iValue: 'cinema', iconName: 'cinema-round' },
    { iName: 'Music', iValue: 'music', iconName: 'music' },
    { iName: 'Travelling', iValue: 'travelling', iconName: 'holidays-travel' },
    { iName: 'Exercise', iValue: 'exercise', iconName: 'exercise' },
    { iName: 'Browsing', iValue: 'browsing', iconName: 'website' }
  ])

  const getHobbies = computed(() => hobbies.value)

  return { getHobbies }
})

export default useHobbiesStore
