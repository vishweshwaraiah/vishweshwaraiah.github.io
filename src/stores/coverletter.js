import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const useCoverLetterStore = defineStore('coverletter', () => {
  const coverletter = ref({
    hirerName: 'Hiring Manager',
    addrLine1: 'Flat 12061, Building 1, Tower 2',
    addrLine2: 'Prestige Jindal City, Anchepalya',
    addrLine3: 'Near Parle Toll',
    addrLine4: 'Bengaluru - 560073',
    intro_desc:
      'I am writing to express my interest in the Full-stack Developer position at your company.',

    experience_desc:
      'work experience in developing and maintaining web applications using various technologies and frameworks.',

    expertise_desc:
      'As a full stack developer, I have expertise in both front-end and back-end development, as well as database management and deployment. Some of the skills and tools that I use include HTML5, CSS3, JavaScript, React.js, Vue.js, Node.js, Java, Spring-Boot, MySQL, AWS, Git, and Agile methodologies. I have successfully delivered several projects for clients across different domains and industries, such as e-commerce, education, healthcare, and social media.',

    recent_projects:
      'One of my recent projects was a web application for an online e-commerce platform that sells and delivers food. I was responsible for designing and implementing the entire application, from the user interface to the RESTful API and the database. I used React for the front-end, Java and Spring-boot for the back-end, Hibernate(JPA) with MySQL for the database, and AWS for the hosting and deployment. The application features a responsive design, a secure authentication system, a payment gateway integration, and a dashboard for tracking the progress and performance of the users. The project was completed on time and within budget, and received positive feedback from the client and the users.',

    passion_desc:
      'I am passionate about creating user-friendly, scalable, and reliable web applications that meet the needs and expectations of the customers. I am always eager to learn new technologies and best practices, and I enjoy working in a collaborative and agile environment. I believe that I can be a valuable asset to your team and contribute to the success of your projects.',

    final_words:
      'I would love to discuss this opportunity further with you and demonstrate some of my work samples. Please let me know if you are available for an interview. You can reach me at +91-7353333573 / +91-7353203573 or k.vishu@outlook.com. Thank you for your consideration.',

    from_developer: 'Vishweshwarayya K J'
  })

  const letterContent = computed(() => coverletter.value)

  return {
    letterContent
  }
})

export default useCoverLetterStore
