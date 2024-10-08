<script setup>
import { ref, onMounted } from 'vue'
import { classNames } from '@src/utils/globals.js'
import placeholder from '@assets/images/placeholder.jpg'

const props = defineProps({
  image: {
    default: '',
    type: String
  },
  altText: {
    default: 'Image text',
    type: String
  },
  width: {
    default: 'auto',
    type: String
  },
  height: {
    default: 'auto',
    type: String
  },
  minHeight: {
    default: 'auto',
    type: String
  },
  minWidth: {
    default: 'auto',
    type: String
  },
  classes: {
    default: '',
    type: String
  },
  hasBorder: {
    default: false,
    type: Boolean
  }
})

const uid = new Date().getTime().toString(36)

const picture = ref(placeholder)

const getClasses = () => {
  const classList = ['master_image']

  if (props.hasBorder) {
    classList.push('has_border')
  }

  if (props.classes) {
    classList.push(props.classes)
  }

  return classNames(classList)
}

onMounted(() => {
  if (props.image) {
    picture.value = props.image
  }
})
</script>

<template>
  <div :class="getClasses()">
    <img class="picture" :src="`${picture}?ver=${uid}`" :alt="altText" />
  </div>
</template>

<style lang="scss" scoped>
.master_image {
  display: grid;
  width: v-bind(width);
  height: auto;
  min-width: v-bind(minWidth);
  min-height: v-bind(minHeight);
  z-index: 200;

  img.picture {
    width: 100%;
    height: 100%;
    min-width: v-bind(minWidth);
    min-height: v-bind(minHeight);
  }

  &.has_border .picture {
    border: 1rem solid var(--glob-light);
    border-radius: 25%;
    z-index: 200;
  }
}

@media print {
  .master_image {
    .picture {
      min-height: auto;
    }
  }
}
</style>
