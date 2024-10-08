<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { openLink } from '@src/utils/globals.js'
import { linkedIn, github, themesList } from '@src/utils/constants.js'
import useSkillsStore from '@src/stores/skills.js'
import DeveloperPicture from '@src/subviews/DeveloperPicture.vue'
import RootTemplate from '@src/subviews/RootTemplate.vue'
import MasterButton from '@components/MasterButton.vue'
import MasterAnimate from '@components/MasterAnimate.vue'
import MasterIcon from '@components/MasterIcon.vue'

const currentTheme = ref('default')
const isOpen = ref(false)

const showThemes = () => {
  isOpen.value = !isOpen.value
}

const changeTheme = (theme) => {
  // update theme attribute on HTML to switch theme in CSS
  const domRoot = document.querySelector('html')
  domRoot.setAttribute('data-theme', theme)
  currentTheme.value = domRoot.getAttribute('data-theme')
  isOpen.value = !isOpen.value
}

const devName = 'Vishweshwarayya'

const router = useRouter()
const skills = useSkillsStore()

const devSkills = skills.getSkills

const hlText = ref(['frontend', 'full-stack'])

const toProfile = () => {
  router.push('/profile')
}

const toProjects = () => {
  router.push('/projects')
}

const toContact = () => {
  router.push('/contact')
}

const skillsContent = () => {
  const aboutContent =
    "I'm a Frontend heavy full-stack developer based in Bengaluru. I'm passionate about creating cutting-edge, pixel-perfect, beautiful user interfaces."

  const text = 'Some of my skills includes'

  const skillsText = devSkills.reduce((acc, skill, idx) => {
    if (idx !== 0) {
      acc += ', ' + skill
    } else {
      acc += skill
    }
    return acc
  })

  return aboutContent + ' ' + text + ' ' + skillsText
}

const goTo = (type) => {
  if (type === 'github') {
    openLink(github)
  } else {
    openLink(linkedIn)
  }
}
</script>

<template>
  <div class="theme_changer">
    <MasterButton @click="showThemes" variant="secondary" size="medium" width="5rem" class="mb-1">
      {{ currentTheme.toCapitalized() }}
    </MasterButton>
    <div class="themes" v-if="isOpen">
      <MasterButton
        v-for="theme in themesList"
        :key="theme"
        @click="() => changeTheme(theme.toLowerCase())"
        variant="tertiary"
        size="medium"
        width="5rem"
        class="mb-1"
      >
        {{ theme }}
      </MasterButton>
    </div>
  </div>
  <RootTemplate class="my_portfolio">
    <DeveloperPicture class="dev_pic" width="30vw" :isSvg="true" />
    <div class="dev_details">
      <div class="dev_title wobble mb-3">
        <span class="dev_greet">Hello, I'm</span>
        <h1 class="dev_name">{{ devName }}</h1>
        <h3>A Web Developer</h3>
      </div>
      <div class="dev_brief">
        <div class="dev_desc mb-3">
          <MasterAnimate :textContent="skillsContent()" :highlights="hlText" />
        </div>
        <MasterButton @click="toProfile" class="mr-2" variant="tertiary" size="medium">
          Profile
        </MasterButton>
        <MasterButton @click="toProjects" class="mx-2" variant="dark" size="medium">
          Projects
        </MasterButton>
        <MasterButton @click="toContact" class="ml-2" variant="light" size="medium">
          Contact
        </MasterButton>
      </div>
      <div class="social_links pt-3">
        <MasterIcon
          svgName="github"
          size="large"
          @click="goTo('github')"
          fillColor="var(--primary-icon)"
          hoverColor="var(--themed-icon)"
        />
        <MasterIcon
          svgName="linkedin"
          size="large"
          @click="goTo('linkedin')"
          fillColor="var(--primary-icon)"
          hoverColor="var(--themed-icon)"
        />
      </div>
    </div>
  </RootTemplate>
</template>

<style lang="scss" scoped>
.theme_changer {
  position: absolute;
  right: 1rem;
  top: 1rem;
  display: flex;
  flex-direction: column;

  .themes {
    display: flex;
    flex-direction: column;
  }
}

.my_portfolio {
  > * {
    text-align: center;
  }

  .dev_pic {
    width: 40%;
  }

  .dev_details {
    width: 60%;

    .dev_brief {
      font-size: px2rem(18);
    }

    .social_links {
      display: flex;
      justify-content: center;
      gap: 2vw;
      align-items: center;
      align-self: center;

      * {
        cursor: pointer;
      }
    }
  }

  .dev_title {
    * {
      font-family: 'Courier';
      font-weight: bold;
    }
    .dev_greet {
      font-size: px2rem(35);
    }
    .dev_name {
      font-size: px2rem(70);
    }
  }
}

@include mediaQuery(tablet, laptop) {
  .my_portfolio {
    flex-direction: column;
    padding: 2%;
    padding-bottom: 2rem;

    .dev_pic {
      width: 60%;
      margin: auto;
    }

    .dev_details {
      width: 80%;
    }

    .dev_title {
      .dev_greet {
        font-size: px2rem(24);
      }
      .dev_name {
        font-size: px2rem(48);
      }
    }
  }
}

@include mediaQuery(mobile) {
  .my_portfolio {
    flex-direction: column;
    padding: 1%;
    padding-bottom: 2rem;

    .dev_pic,
    .dev_details {
      width: 80%;
    }

    .dev_title {
      .dev_greet {
        font-size: px2rem(16);
      }
      .dev_name {
        font-size: px2rem(32);
      }
    }
  }
}
</style>
