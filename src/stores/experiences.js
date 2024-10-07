import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const useExperiencesStore = defineStore('experiences', () => {
  const experiences = ref([
    {
      exp_details: {
        from: 'Oct 2021',
        to: 'Present',
        type: 'Full-Time'
      },
      job_title: 'Sr. Associate',
      job_company: 'J P Morgan Chase & Co.',
      job_location: 'Bengaluru, Karnataka',
      work_description:
        "Working on a Design system project that solves and minimizes design issues throughout the firm. I'm also responsible to mentor junior developers and interns.",
      print_break: false,
      print_margin: false,
      projects_list: [
        {
          project_name: 'Tuxedo Design System',
          project_description:
            "It's a Design system project that solves and minimizes design issues throughout the firm.",
          work_skills: [
            'ReactJS',
            'VueJs',
            'JavaScript',
            'TypeScript',
            'HTML5',
            'CSS3',
            'Spring Boot',
            'NodeJS'
          ],
          project_link: 'internal',
          isProject: true
        }
      ]
    },
    {
      exp_details: {
        from: 'Oct 2019',
        to: 'Oct 2021',
        type: 'Full-Time'
      },
      job_title: 'Sr. Associate',
      job_company: 'Cognizant Technologies Solutions',
      job_location: 'Bengaluru, Karnataka',
      work_description:
        "I was Responsible to Lead a team of 6 developers and to Write Best, Efficient, Testable Code Using Standard Software development practices. Worked on Projects like Macy's and KFC India.",
      print_break: false,
      print_margin: false,
      projects_list: [
        {
          project_name: 'KFC @ Cognizant',
          project_description: 'A project for fast food restaurant chain that sells food online.',
          work_skills: [
            'ReactJS',
            'Redux',
            'JavaScript',
            'TypeScript',
            'HTML5',
            'CSS3',
            'Spring Boot',
            'JPA',
            'NodeJS',
            'Team Lead',
            'AWS'
          ],
          project_link: 'https://online.kfc.co.in/',
          isProject: true
        },
        {
          project_name: 'Macys @ Cognizant',
          project_description:
            'An online clothing and accessories modern department store project.',
          work_skills: [
            'ReactJS',
            'Redux',
            'AWS',
            'TypeScript',
            'VueJS',
            'Vuex',
            'JavaScript',
            'HTML5',
            'CSS3',
            'NodeJS',
            'Micro-frontends'
          ],
          project_link: 'https://www.macys.com/',
          isProject: true
        }
      ]
    },
    {
      exp_details: {
        from: 'Apr 2018',
        to: 'Aug 2019',
        type: 'Full-Time'
      },
      job_title: 'Sr. Software Developer',
      job_company: 'Kalpavruksh Systems Ltd',
      job_location: 'Bengaluru, Karnataka',
      work_description:
        'Worked with clients on an online surveying and reporting project like google survey and forms. I was Responsible to Write Best, Efficient, Testable Code Using Standard Software development practices.',
      print_break: true,
      print_margin: false,
      projects_list: [
        {
          project_name: 'Decipher @ Kalpavruksh',
          project_description:
            "It's an online surveying and reporting project like google survey and forms.",
          work_skills: [
            'ReactJS',
            'Redux',
            'JQuery',
            'NodeJS',
            'JavaScript',
            'HTML5',
            'CSS3',
            'Micro-frontends'
          ],
          project_link: 'https://www.forsta.com/company/legacy-brands/',
          isProject: true
        }
      ]
    },
    {
      exp_details: {
        from: 'Jan 2017',
        to: 'Mar 2018',
        type: 'Full-Time'
      },
      job_title: 'Sr. System Engineer',
      job_company: 'IBM India Private Ltd',
      job_location: 'Bengaluru, Karnataka',
      work_description:
        'I was Responsible to Write Best, Efficient, Testable Code Using Standard Software development practices. Worked on an online Financial Crimes Due Diligence project with IBM Watson.',
      print_break: false,
      print_margin: true, // bcz we need a page break after previous item
      projects_list: [
        {
          project_name: 'FCDD @ IBM',
          project_description:
            "It's an online Financial Crimes Due Diligence project with IBM Watson.",
          work_skills: [
            'ReactJS',
            'VueJs',
            'Redux',
            'Vuex',
            'NodeJS',
            'JavaScript',
            'HTML5',
            'CSS3',
            'Core-Java',
            'D3JS'
          ],
          project_link: 'internal',
          isProject: true
        }
      ]
    },
    {
      exp_details: {
        from: 'Jun 2014',
        to: 'Nov 2016',
        type: 'Full-Time'
      },
      job_title: 'Software Engineer',
      job_company: 'Capricoast Home Solutions Pvt Ltd',
      job_location: 'Bengaluru, Karnataka',
      work_description:
        'Worked on an online shopping project that sells modular-kitchens, wardrobes and other home utils. I was Responsible to Write Best, Efficient, Testable Code Using Standard Software development practices.',
      print_break: false,
      print_margin: false,
      projects_list: [
        {
          project_name: 'Capricoast',
          project_description:
            "It's an online shopping project that sells modular-kitchens, wardrobes and other home utils.",
          work_skills: [
            'JQuery',
            'JavaScript',
            'PHP',
            'MySQL',
            'HTML5',
            'CSS3',
            'Spring MVC',
            'Hibernate'
          ],
          project_link: 'https://www.homelane.com/',
          isProject: true
        }
      ]
    },
    {
      exp_details: {
        from: 'Jan 2013',
        to: 'Feb 2014',
        type: 'Full-Time'
      },
      job_title: 'Web Developer',
      job_company: 'Ind-Global Consultancy Solutions Pvt Ltd',
      job_location: 'Bengaluru, Karnataka',
      work_description:
        'I was Responsible to Write Best, Efficient, Testable Code Using Standard Software development practices. Worked on multiple small scale projects.',
      print_break: false,
      print_margin: false,
      projects_list: [
        {
          project_name: 'Ind-Global',
          project_description:
            "It's a company website, a content management system framework used to develop this website.",
          work_skills: [
            'JavaScript',
            'HTML',
            'CSS',
            'SCSS',
            'PHP',
            'WordPress',
            'Magento',
            'OpenCart',
            'jQuery'
          ],
          project_link: 'https://www.homelane.com/',
          isProject: false
        }
      ]
    }
  ])

  const getExperiences = computed(() => experiences.value)

  return { getExperiences }
})

export default useExperiencesStore
