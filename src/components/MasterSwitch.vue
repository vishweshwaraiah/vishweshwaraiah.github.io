<script setup>
import { computed, ref } from 'vue'
import { RemoveMultiSpaces } from '@src/utils/globals'
import MasterIcon from '@components/MasterIcon.vue'

const emits = defineEmits(['update:inputValue'])

const props = defineProps({
  trueIcon: {
    default: 'switch-on',
    type: String
  },
  falseIcon: {
    default: 'switch-off',
    type: String
  },
  inputWidth: {
    default: 'auto',
    type: String
  },
  inputLabel: {
    default: '',
    type: String
  },
  inputValue: {
    default: false,
    type: Boolean
  },
  inputRequired: {
    default: false,
    type: Boolean
  },
  inputDisabled: {
    default: false,
    type: Boolean
  },
  inputErrMessage: {
    default: 'This is a required field',
    type: String
  },
  isPadded: {
    default: false,
    type: Boolean
  },
  labelPos: {
    default: 'top',
    type: String
  }
})

const errMessage = ref(props.inputErrMessage)
const validInput = ref(true)
const switchStatus = ref(props.inputValue)

const inputWrapper = computed(() => {
  const defClasses = 'input-span'
  const isInvalid = !validInput.value && props.inputRequired
  const errClass = isInvalid ? 'err' : ''
  const padClass = props.isPadded ? 'input-pad' : ''
  const combined = `${defClasses} ${errClass} ${padClass}`
  return RemoveMultiSpaces(combined)
})

const mainWrapper = computed(() => {
  const defClasses = 'input-group master-switch'
  let labelPos = ''
  if (props.inputLabel) {
    labelPos = `label-${props.labelPos}`
  }
  const combined = `${defClasses} ${labelPos}`
  return RemoveMultiSpaces(combined)
})

const updateStatus = () => {
  const checkedStatus = !switchStatus.value
  if (props.inputDisabled) {
    switchStatus.value = false
  } else {
    switchStatus.value = checkedStatus
  }

  if (!props.inputDisabled) {
    emits('update:inputValue', checkedStatus)
  }
}

const iconSvg = computed(() => {
  return switchStatus.value ? props.trueIcon : props.falseIcon
})
</script>
<template lang="html">
  <div :class="mainWrapper">
    <label v-if="inputLabel" class="input-label">
      {{ inputLabel }}
    </label>
    <span :class="inputWrapper">
      <MasterIcon
        :svgName="iconSvg"
        :key="iconSvg"
        size="100%"
        @click="updateStatus"
        fillColor="var(--primary-icon)"
        hoverColor="var(--themed-icon)"
      />
    </span>
    <span class="err small" v-if="!validInput && inputRequired">
      {{ errMessage }}
    </span>
    <div @click="updateStatus">
      <slot />
    </div>
  </div>
</template>
<style lang="scss">
$box-size: v-bind(inputWidth);

.input-group.master-switch {
  justify-content: space-between;

  .input-span {
    width: $box-size;
    height: $box-size;
    box-shadow: none;
    position: relative;
    white-space: nowrap;
    cursor: pointer;

    .svg-holder {
      width: 100%;
    }
  }

  &.label-left {
    position: relative;
    white-space: nowrap;

    .input-label {
      margin: auto;
      margin-right: px2rem(10);

      &:after {
        content: ':';
      }
    }
  }

  .input-pad {
    padding: px2rem(5);
  }
}
</style>
