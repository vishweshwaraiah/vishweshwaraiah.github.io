<script setup>
import { ref } from 'vue'
import MasterIcon from '@components/MasterIcon.vue'

const props = defineProps({
  scrollTo: {
    default: 'top',
    type: String
  }
})

const svgName = ref('arrow-up')
const vHeight = ref(window.innerHeight)
const displayStyle = ref('none')

if (props.scrollTo === 'bottom') {
  svgName.value = 'arrow-down'
}

const goTop = () => {
  const opts = {
    top: 0,
    behavior: 'smooth'
  }
  if (props.scrollTo === 'bottom') {
    opts.top = document.body.scrollHeight
  }
  window.scrollTo(opts)
}

// toggle 'scroll to top' based on scroll position
window.addEventListener('scroll', (e) => {
  displayStyle.value = window.scrollY > vHeight.value ? 'block' : 'none'
  e.preventDefault()
})
</script>

<template lang="html">
  <div class="master-scroller">
    <button class="to_top btn" @click="goTop">
      <MasterIcon
        :svgName="svgName"
        size="medium"
        fillColor="var(--primary-icon)"
        hoverColor="var(--themed-icon)"
      />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.to_top {
  display: v-bind('displayStyle');
  position: fixed;
  width: px2rem(60);
  height: px2rem(60);
  bottom: px2rem(40);
  right: px2rem(40);
  background-color: var(--bg-color);
  border: px2rem(3) solid var(--item-color);
  border-radius: px2rem(50);
  text-align: center;
  box-shadow: boxShadow();
  z-index: 100;
  padding: 0;

  @include transformContainer(1.1);
}

@media print {
  .master-scroller {
    display: none;
  }
}
</style>
