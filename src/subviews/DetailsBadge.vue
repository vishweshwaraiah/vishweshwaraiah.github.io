<script setup>
import { ref, computed, onMounted } from 'vue'
import MasterIcon from '@components/MasterIcon.vue'
import { classNames } from '@src/utils/globals.js'

const props = defineProps({
  content: {
    type: [Object, String],
    required: true
  },
  textColor: {
    default: '',
    type: String
  },
  bgColor: {
    default: '',
    type: String
  },
  class: {
    default: '',
    type: String
  },
  svgName: {
    default: '',
    type: String
  },
  position: {
    default: 'relative',
    type: String
  },
  isFantasy: {
    default: false,
    type: Boolean
  }
})

const contentType = ref('object')

onMounted(() => {
  if (typeof props.content === 'string') {
    contentType.value = 'string'
  }
})

const theme = {
  color: props.textColor || 'var(--glob-light)',
  bgColor: props.bgColor || 'var(--bg-color)'
}

const cardWrapper = computed(() => {
  const defClass = ['item-card']

  defClass.push(props.position)

  if (props.class) {
    defClass.push(props.class)
  }

  if (props.isFantasy) {
    defClass.push('is_fantasy')
  }

  return classNames(defClass)
})
</script>

<template lang="html">
  <div :class="cardWrapper">
    <div class="flex-center no-space" v-if="svgName">
      <MasterIcon
        :svgName="svgName"
        size="small"
        fillColor="var(--secondary-icon)"
        hoverColor="var(--themed-icon)"
      />
    </div>
    <div v-if="contentType === 'string'" class="flex-column">
      <span class="custom_str" v-if="content">{{ content }}</span>
    </div>
    <div v-else class="flex-column">
      <span v-for="(item, key) in content" :key="key" class="work_details" :class="key">
        {{ item }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item-card {
  color: v-bind('theme.color');
  background: v-bind('theme.bgColor');
  width: auto;
  height: auto;
  padding: px2rem(4) px2rem(8);
  display: inline-block;
  border-radius: px2rem(4) px2rem(16);
  font-weight: bolder;

  &.absolute {
    position: absolute;
  }

  &.relative {
    position: relative;
  }

  .work_details {
    white-space: nowrap;

    &.type {
      background-color: var(--item-color);
      color: var(--bg-color);
      padding: px2rem(5);
      border-radius: px2rem(5);
    }
  }

  &.is_fantasy * {
    font-family: var(--secondary-font-family);
    text-transform: uppercase;
    font-weight: 100;
  }
}
</style>
