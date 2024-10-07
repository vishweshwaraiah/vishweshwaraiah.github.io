import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const useAboutDevStore = defineStore('aboutDev', () => {
  const aboutDev = ref({
    developer_aim:
      'To obtain a position with a progressive web development or software development company with a strong focus on creativity and problem solving. To support a network infrastructure based on multiple operating systems and complex network topologies. To find a position that is challenging, rewarding and provides an opportunity to expand my knowledge and abilities in creating client centric solutions.',
    developer_exp:
      'of experience in software development. Created real-time web applications, complex back-end management systems including content management, e-commerce. The projects based on Node Js, Spring Boot, Vue Js and React JS in conjunction with various other web development technologies. Designed layouts and templates for various small companies and individuals.'
  })

  const getAboutDev = computed(() => aboutDev.value)

  return { getAboutDev }
})

export default useAboutDevStore
