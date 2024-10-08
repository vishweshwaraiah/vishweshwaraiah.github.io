<script setup>
import { useRouter } from 'vue-router'
import MasterIcon from '@components/MasterIcon.vue'
import MasterButton from '@components/MasterButton.vue'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <main class="not_found">
    <div class="not_found_icon">
      <MasterIcon
        svgName="lost_space"
        size="50vh"
        fillColor="var(--primary-icon)"
        hoverColor="var(--themed-icon)"
      />
    </div>
    <div class="not_found_content">
      <h1>404</h1>
      <h2>UH OH! You're lost.</h2>
      <p>
        The page you are looking for does not exist. How you got here is a mystery. But you can
        click the button below to go back to the homepage.
      </p>
      <MasterButton @click="goHome" variant="dark">HOME</MasterButton>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.not_found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--item-color);
  font-size: 1rem;
  height: 100vh;
  background-color: var(--theme-color);
  padding: 5vw;
}
</style>
