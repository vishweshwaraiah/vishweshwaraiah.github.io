<script setup>
import { ref, computed, watchEffect, onMounted } from 'vue'
import { RemoveMultiSpaces } from '@src/utils/globals'
import MasterIcon from '@components/MasterIcon.vue'

const emits = defineEmits(['emitSelected'])

const props = defineProps({
  selectWidth: {
    default: '20rem',
    type: String
  },
  selectLabel: {
    default: '',
    type: String
  },
  selectPlaceholder: {
    default: '',
    type: String
  },
  selectOptions: {
    default: () => [],
    type: Array,
    required: true
  },
  singleSelect: {
    default: false,
    type: Boolean
  },
  inputRequired: {
    default: false,
    type: Boolean
  },
  inputErrMessage: {
    default: 'This is a required field',
    type: String
  },
  resetTrue: {
    default: false,
    type: Boolean
  },
  defaultSelects: {
    default: () => [],
    type: Array
  },
  selectText: {
    default: true,
    type: Boolean
  },
  labelPos: {
    default: 'top',
    type: String
  },
  allSelectable: {
    default: false,
    type: Boolean
  }
})

const checkedValues = ref([])
const selectBoxWidth = ref(props.selectWidth ?? undefined)
const isSingleSelect = ref(props.singleSelect)
const errMessage = ref(props.inputErrMessage)
const validInput = ref(true)
const isRequired = ref(props.inputRequired)
const isVisible = ref(false)
const isIntermediate = ref(false)
const alignDropdown = ref('bottom')

const propOptions = computed(() => {
  if (props.allSelectable) {
    return [
      {
        id: 'select_all',
        optValue: 'select_all',
        optName: 'Select All',
        checked: false
      },
      ...props.selectOptions
    ]
  }
  return props.selectOptions
})

const toggleVisibility = (action) => {
  if (action === 'open') {
    isVisible.value = true
  } else if (action === 'close') {
    isVisible.value = false
  } else {
    isVisible.value = !isVisible.value
  }
}

const getFullObject = (key, values) => {
  const returnObject = values?.map((value) => {
    const x = propOptions.value?.find((i) => {
      return i[key] === value
    })
    return x
  })
  return returnObject
}

let renderCount = 0

watchEffect(() => {
  renderCount = renderCount + 1
  const validInputs = checkedValues.value?.length
  const selectedValues = checkedValues.value?.filter((i) => i !== 'select_all')
  const returnObj = getFullObject('optValue', selectedValues)
  if (validInputs && returnObj) {
    emits('emitSelected', returnObj)
  }
  if (renderCount > 1) validInput.value = validInputs
})

onMounted(() => {
  if (props.defaultSelects?.length) {
    checkedValues.value = props.defaultSelects.map((i) => i.optValue)
  }
  if (props.resetTrue) {
    isRequired.value = false
    checkedValues.value = []
  }
})

const isCheckedItem = (current) => {
  if (current === 'select_all' && checkedValues.value?.length) {
    return true
  }
  return checkedValues.value.includes(current)
}

const getSvgName = (current) => {
  const opts = propOptions.value?.length
  const selects = checkedValues.value?.length
  if (current === 'select_all' && selects) {
    if (selects === opts) {
      return 'checked-round'
    } else {
      return 'intermediate-round'
    }
  } else {
    return checkedValues.value.includes(current) ? 'checked-round' : 'unchecked-round'
  }
}

const dropDown = (e, action) => {
  toggleVisibility(action)

  const posTop = window.innerHeight - e.clientY
  if (posTop < 150) alignDropdown.value = 'top'

  const collection = document.querySelectorAll('.multiselect')
  for (const elm of collection) {
    elm.classList.remove('active')
    elm.classList.add('inactive')
  }

  if (isVisible.value && (action === 'open' || action === 'toggle')) {
    e.target.closest('.multiselect').classList.add('active')
    e.target.closest('.multiselect').classList.remove('inactive')
  }
}

const filterData = (e) => {
  const targetValue = e?.target?.value
  const targetChecked = e?.target?.checked
  if (isSingleSelect.value) {
    checkedValues.value = [targetValue]
  }
  if (targetValue === 'select_all') {
    const allValues = propOptions.value?.map((i) => i.optValue)
    checkedValues.value = targetChecked ? allValues : []
  } else {
    isIntermediate.value = true
  }
}

const selectedCountText = computed(() => {
  const validData = checkedValues.value?.filter((i) => i !== 'select_all')
  const optionsObj = getFullObject('optValue', validData)
  if (isSingleSelect.value && validData.length) {
    return props.selectText ? `${optionsObj[0]?.optName} is selected.` : optionsObj[0]?.optName
  } else if (validData.length) {
    return `${optionsObj.length} item(s) are selected.`
  } else {
    return false
  }
})

const mainWrapper = computed(() => {
  const defClasses = 'input-group'
  const labelPos = `label-${props.labelPos}`
  const combined = `${defClasses} ${labelPos}`
  return RemoveMultiSpaces(combined)
})

const inputWrapper = computed(() => {
  const defClasses = 'input-span form-control multiselect'
  const isValid = !validInput.value && isRequired.value
  const errClass = isValid ? 'err' : ''
  const activeClass = isVisible.value ? 'active' : 'inactive'
  const combined = `${defClasses} ${errClass} ${activeClass}`
  return RemoveMultiSpaces(combined)
})
</script>

<template lang="html">
  <div :class="mainWrapper">
    <label v-if="selectLabel" class="input-label">
      {{ selectLabel }}
    </label>
    <div v-show="isVisible" class="backDrop" @click.stop="(e) => dropDown(e, 'close')"></div>
    <div :class="inputWrapper" @mouseleave.stop="(e) => dropDown(e, 'close')">
      <button class="menu-btn" type="button" @click.stop="(e) => dropDown(e, 'open')">
        {{ selectedCountText || selectPlaceholder }}
        <span class="dropdown-arrow">
          <span class="down-arrow" />
        </span>
      </button>
      <div v-show="isVisible" :class="`optionsBox animate ${alignDropdown}`">
        <span
          v-for="opt in propOptions"
          :key="opt.id"
          class="d-flex menu-option"
          :class="isCheckedItem(opt.optValue) && `selected-bg`"
        >
          <input
            :id="opt.optValue"
            type="checkbox"
            class="select-input"
            :value="opt.optValue"
            v-model="checkedValues"
            @click="filterData"
          />
          <label :for="opt.optValue">
            <MasterIcon
              :size="`small`"
              :class="`check-box`"
              :key="getSvgName(opt.optValue)"
              :svgName="getSvgName(opt.optValue)"
              fillColor="var(--primary-icon)"
              hoverColor="var(--themed-icon)"
            />
            {{ opt.optName }}
          </label>
        </span>
      </div>
    </div>
    <span class="err small" v-if="!validInput && isRequired">
      {{ errMessage }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.input-group {
  width: v-bind(selectBoxWidth);

  .multiselect {
    position: relative;
    width: 100%;
    box-shadow: boxShadow();

    .dropdown-arrow {
      position: absolute;
      top: 0;
      right: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: px2rem(45);
    }

    &.active,
    &.err {
      .dropdown-arrow {
        transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
      }
    }

    &.active,
    &.active.err {
      button.menu-btn {
        z-index: 201;
      }
    }

    &.inactive {
      .dropdown-arrow {
        transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
      }
    }

    .menu-btn {
      padding: px2rem(2) px2rem(10);
      background: var(--input-bg-color);
      width: 100%;
      text-align: left;
      color: var(--item-color);
      border: 0;
    }

    .optionsBox {
      position: absolute;
      width: 100%;
      left: 0;
      z-index: 200;
      margin-top: 0.25rem;
      background-color: var(--bg-color);
      color: var(--item-color);
      max-height: 20rem;
      overflow: auto;

      @include hideScroll();

      &.top {
        bottom: px2rem(34);
        box-shadow: boxShadow(top);
      }

      &.bottom {
        top: px2rem(34);
        box-shadow: boxShadow(bottom);
      }

      .menu-option {
        align-items: center;
        margin: px2rem(5);

        &.selected-bg {
          background-color: var(--input-selected);
        }

        label {
          margin-top: 0.5rem;
          display: flex;
          justify-content: flex-start;
          width: 100%;
          align-items: center;
          cursor: pointer;

          .check-box {
            margin-right: 1rem;
            margin-left: 1rem;
          }
        }

        input {
          display: none;
        }
      }

      .select-input {
        display: inline-block;
        margin-bottom: 0.5rem;
        margin-right: 1rem;

        &[type='checkbox'] {
          width: auto;
          margin-left: 1rem;
        }
      }
    }
  }
}
</style>
