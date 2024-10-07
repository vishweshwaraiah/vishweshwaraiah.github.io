import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const useSocialsStore = defineStore('socials', () => {
  const socials = ref([
    {
      iValue: 'vishweshwaraiah',
      iName: 'facebook',
      iconName: 'fb-round'
    },
    {
      iValue: 'vishweshwaraiah',
      iName: 'linkedIn',
      iconName: 'lkdin-round'
    },
    {
      iValue: 'vj_vishmaster',
      iName: 'instagram',
      iconName: 'insta-round'
    },
    {
      iValue: 'vishweshwaraiah',
      iName: 'twitter',
      iconName: 'tweet-round'
    }
  ])

  const getSocials = computed(() => socials.value)

  return { getSocials }
})

export default useSocialsStore
