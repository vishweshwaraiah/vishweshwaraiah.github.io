import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const useResponsibilitiesStore = defineStore('responsibilities', () => {
  const responsibilities = ref([
    'Develop, test and implement any software programs.',
    'Communicate with management and technical support colleagues well.',
    'Work with experienced team members to conduct a root cause analysis of issues.',
    'Identify ideas to improve system performance and impact availability.',
    'Resolve complex technical design issues.',
    'Analyze user requirements and convert requirements to designs.',
    'Managing the complete software development process from conception to deployment.',
    'Multi-task and change from one task to another without loss of efficiency or composure.',
    'Front-end website architecture development, Ensuring application responsiveness.',
    'Testing and fixing bugs as well as other programming issues.'
  ])

  const getResponsibilities = computed(() => responsibilities.value)

  return { getResponsibilities }
})

export default useResponsibilitiesStore
