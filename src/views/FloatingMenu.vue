<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import MasterIcon from '@components/MasterIcon.vue'
import ActionOutside from '@src/utils/ActionOutside.js'

defineProps({
  bodyComponent: {
    default: 'span',
    type: [Object, String]
  },
  classNames: {
    default: '',
    type: String
  },
  top: {
    default: 'auto',
    type: String
  },
  right: {
    default: 'auto',
    type: String
  },
  bottom: {
    default: 'auto',
    type: String
  },
  left: {
    default: 'auto',
    type: String
  }
})

const isVisible = ref(false)
const target = ref(null)

const router = useRouter()

const routes = router.getRoutes().filter((r) => !r.meta?.hidden)

ActionOutside(target, 'click', () => {
  isVisible.value = false
})

const toggleMenu = () => {
  isVisible.value = !isVisible.value
}

const goHome = () => {
  isVisible.value = false
  router.push('/')
}

const closeMenu = () => {
  isVisible.value = false
}

const printPage = () => {
  closeMenu()
  window?.print()
}
</script>

<template>
  <div :class="`floating_box ${classNames}`" ref="target">
    <MasterIcon
      svgName="home"
      size="medium"
      class="home_btn"
      @click="goHome"
      title="Floating Menu"
      fillColor="var(--primary-icon)"
      hoverColor="var(--themed-icon)"
    />
    <MasterIcon
      svgName="menu-bars"
      size="medium"
      class="floating_btn"
      @click="toggleMenu"
      title="Floating Menu"
      fillColor="var(--primary-icon)"
      hoverColor="var(--themed-icon)"
    />
    <div v-if="isVisible" class="floating_menu" @click="closeMenu">
      <header class="menu">
        <nav>
          <RouterLink
            v-for="route in routes"
            :key="route.path"
            class="flex-between"
            :to="route.path"
            @click="closeMenu"
          >
            <span>{{ route.name }}</span>
            <MasterIcon
              v-if="route.meta.print"
              svgName="printer"
              class="has_print"
              @click="printPage"
              size="small"
              title="Print Page"
              fillColor="var(--primary-icon)"
              hoverColor="var(--themed-icon)"
            />
          </RouterLink>
        </nav>
      </header>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.floating_box {
  position: relative;
  z-index: 201;

  .home_btn,
  .floating_btn {
    height: px2rem(60);
    width: px2rem(60);
    border-radius: px2rem(50);
    cursor: pointer;

    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }

  .home_btn {
    @include floatingBox(1rem, auto, auto, 1rem);
  }

  .floating_btn {
    @include floatingBox(6rem, auto, auto, 1rem);
  }

  .floating_menu {
    position: fixed;
    z-index: 200;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: var(--theme-color);
    animation: growCenter 300ms;

    @include hideScroll();

    header {
      box-shadow: none;
    }

    .menu {
      position: fixed;
      margin: auto;
      padding: 0;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 20vw;
      white-space: nowrap;
      z-index: 201;

      nav {
        display: inline-flex;
        flex-direction: column;
        width: 100%;

        a {
          -webkit-app-region: no-drag;
          color: var(--text-default);
          font-weight: bold;
          padding: 0.5rem 1rem;
          height: 100%;
          box-shadow: boxShadow();
          margin-bottom: 1rem;
          border-bottom: px2rem(2) solid;

          &.flex-between {
            gap: 1rem;

            .has_print {
              display: none;
            }
          }

          &:focus {
            outline: none;
          }

          &:hover {
            opacity: 0.7;
            background: var(--black-lt);
            color: var(--glob-light);
          }

          &.router-link-active {
            background-color: var(--glob-dark);
            color: var(--glob-light);
            .has_print {
              display: block;
            }

            &:hover {
              color: var(--glob-light);
            }
          }
        }
      }
    }
  }
}

@include mediaQuery(mobile, tablet) {
  .floating_box .floating_menu .menu {
    width: 50vw;
  }
}

@include mediaQuery(laptop) {
  .floating_box .floating_menu .menu {
    width: 40vw;
  }
}

@include mediaQuery(desktop) {
  .floating_box .floating_menu .menu {
    width: 30vw;
  }
}

@media print {
  .floating_box {
    display: none;
  }
}
</style>
