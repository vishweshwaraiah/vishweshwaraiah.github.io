<script setup>
import { computed, ref } from 'vue'
import MasterIcon from '@components/MasterIcon.vue'
import { classNames } from '@src/utils/globals'

const emits = defineEmits(['update:inputValue', 'onFocus', 'onBlur', 'onInputClear'])

const props = defineProps({
  inputWidth: {
    default: 'auto',
    type: String
  },
  inputId: {
    default: '',
    type: String
  },
  inputLabel: {
    default: '',
    type: String
  },
  inputType: {
    default: 'text',
    type: String
  },
  inputValue: {
    type: [String, Date, Number, Boolean],
    default: null
  },
  inputName: {
    default: '',
    type: String
  },
  inputPlaceholder: {
    default: 'Type something',
    type: String
  },
  inputRequired: {
    default: false,
    type: Boolean
  },
  inputErrMessage: {
    default: 'This is a required field',
    type: String
  },
  leftIcon: {
    default: '',
    type: String
  },
  rightIcon: {
    default: '',
    type: String
  },
  isPadded: {
    default: false,
    type: Boolean
  },
  labelPos: {
    default: 'top',
    type: String
  },
  isClearable: {
    default: true,
    type: Boolean
  },
  isReadOnly: {
    default: false,
    type: Boolean
  },
  inputRows: {
    default: 5,
    type: [String, Number]
  }
})

const errMessage = ref(props.inputErrMessage)
const validInput = ref(true)

const clearTrue = computed(() => {
  const excludeTypes = props.inputType === 'checkbox' || props.inputType === 'radio'
  return props.inputValue && !excludeTypes && props.isClearable
})

const inputWrapper = computed(() => {
  const classList = ['form-control', 'input-span', props.inputType]

  if (!validInput.value && props.inputRequired) {
    classList.push('err')
  }

  if (props.isPadded) {
    classList.push('input-pad')
  }

  return classNames(classList)
})

const mainWrapper = computed(() => {
  const classList = ['input-group']
  classList.push(`label-${props.labelPos}`)

  return classNames(classList)
})

const updateInput = (e) => {
  const inputData = e.target.value
  const inputType = e.target.type
  validInput.value = inputData
  if (inputType === 'checkbox' || inputType === 'radio') {
    const checkedStatus = e.target.checked
    emits('update:inputValue', checkedStatus)
  } else {
    emits('update:inputValue', inputData)
  }
}

const clearInput = (e) => {
  validInput.value = false
  emits('update:inputValue', '')
  emits('onInputClear', e)
}
const onFocus = (e) => emits('onFocus', e)
const onBlur = (e) => emits('onBlur', e)
const readOnlyInput = (e) => {
  if (props.isReadOnly) e.preventDefault()
}
</script>

<template lang="html">
  <div :class="mainWrapper">
    <label v-if="inputLabel" :for="inputId" class="input-label">
      {{ inputLabel }}
    </label>
    <span :class="inputWrapper">
      <MasterIcon
        v-if="leftIcon"
        :svgName="leftIcon"
        size="small"
        class="left-icon"
        fillColor="var(--primary-icon)"
        hoverColor="var(--themed-icon)"
      />
      <MasterIcon
        @click="clearInput"
        v-if="clearTrue && inputValue"
        size="small"
        svgName="close-border"
        class="clear-icon"
        fillColor="var(--primary-icon)"
        hoverColor="var(--themed-icon)"
      />
      <MasterIcon
        v-if="rightIcon && !inputValue"
        :svgName="rightIcon"
        size="small"
        class="right-icon"
        fillColor="var(--primary-icon)"
        hoverColor="var(--themed-icon)"
      />
      <textarea
        v-if="inputType === 'textarea'"
        :class="`master-input`"
        :id="inputId"
        :name="inputName"
        :rows="inputRows"
        :placeholder="inputPlaceholder"
        :value="inputValue"
        :required="inputRequired"
        :readonly="isReadOnly"
        @input="updateInput"
        @focus="onFocus"
        @blur="onBlur"
        @keypress="readOnlyInput"
      >
      </textarea>
      <input
        v-else
        :class="`master-input`"
        :id="inputId"
        :type="inputType"
        :name="inputName"
        :value="inputValue"
        :checked="inputValue"
        :placeholder="inputPlaceholder"
        :required="inputRequired"
        :readonly="isReadOnly"
        @input="updateInput"
        @focus="onFocus"
        @blur="onBlur"
        @keypress="readOnlyInput"
      />
    </span>
    <span class="err small" v-if="!validInput && inputRequired">
      {{ errMessage }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.input-group {
  width: v-bind(inputWidth);

  &.label-left {
    display: inline-flex;
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

  .input-span {
    position: relative;

    .clear-icon ~ .master-input,
    .right-icon ~ .master-input {
      padding-right: px2rem(45);
    }

    .left-icon ~ .master-input {
      padding-left: px2rem(45);
    }

    &.textarea {
      .clear-icon {
        height: auto;
      }

      textarea {
        resize: none;
        @include hideScroll;
      }
    }

    .left-icon,
    .clear-icon,
    .right-icon {
      position: absolute;
      padding: 1rem;
      cursor: pointer;
      width: px2rem(45);
      height: 100%;
      z-index: 202;
    }

    .left-icon {
      left: 0;
    }
    .clear-icon,
    .right-icon {
      right: 0;
    }
  }
}
</style>
