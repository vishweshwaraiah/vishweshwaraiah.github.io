<style lang="scss" scoped>
// Modal popup styles

.btn {
  &:focus {
    outline: none;
    box-shadow: none;
  }
}

/* The Modal (background) */
.modal {
  position: fixed;
  z-index: 200;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: var(--black-trans);
  @include hideScroll();

  &.small .modal-content {
    width: 30%;
  }

  &.medium .modal-content {
    width: 50%;
  }

  &.large .modal-content {
    width: 80%;
  }

  /* Modal Content */
  &-content {
    position: fixed;
    background-color: var(--bg-color);
    margin: auto;
    padding: 0;
    border: px2rem(1) solid var(--item-color);
    border-radius: var(--radius-default);
    animation-name: animateTop;
    animation-duration: 0.5s;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &-header {
    background-color: transparent;
    color: var(--item-color);
    padding: px2rem(10) 1rem;
    box-shadow: none;
  }

  &-body {
    padding: px2rem(2) 1rem;
  }

  &-footer {
    background-color: transparent;
    color: var(--item-color);
    padding: px2rem(2) 1rem;
    display: flex;
    justify-content: flex-end;
    box-shadow: none;
  }
}
</style>
<template lang="html">
  <button :id="triggerId" :class="triggerBtnClasses" @click="toggleModal">
    <slot name="trigger"></slot>
  </button>
  <Teleport to="body">
    <div :id="modalId" :class="`modal ${size}`" v-if="isShow" @click="toggleModal">
      <div class="modal-content shadow-dark" @click.stop="stopIt">
        <span class="close medium" @click="toggleModal">
          <MasterIcon fillColor="var(--item-color)" size="x-small" svg-name="close-cross" />
        </span>
        <header v-if="headerSlot" class="modal-header">
          <slot name="header"></slot>
        </header>
        <main v-if="defaultSlot" class="modal-body no-gutters">
          <slot></slot>
        </main>
        <footer v-if="footerSlot" class="modal-footer">
          <slot name="footer"></slot>
          <button
            v-if="showAction('confirm')"
            class="btn btn-primary my-2 mr-2"
            @click="confirmAction"
          >
            Confirm
          </button>
          <button v-if="showAction('cancel')" class="btn btn-danger my-2" @click="cancelAction">
            Cancel
          </button>
        </footer>
      </div>
    </div>
  </Teleport>
</template>
<script setup>
import { computed, ref, useSlots } from 'vue'
import MasterIcon from '@/components/MasterIcon.vue'

const props = defineProps({
  triggerId: {
    default: 'myBtn',
    type: String
  },
  modalId: {
    type: String,
    required: true
  },
  modalSize: {
    default: 'medium',
    type: String
  },
  btnClasses: {
    default: '',
    type: String
  },
  footerBtns: {
    default: () => [],
    type: Array
  },
  footerConfirm: {
    default: () => {},
    type: Function
  },
  footerCancel: {
    default: () => {},
    type: Function
  }
})

const showAction = (btnName) => props.footerBtns.includes(btnName)

const slots = useSlots()

const isShow = ref(false)
const size = ref(props.modalSize)
const stopIt = () => false

const toggleModal = () => {
  isShow.value = !isShow.value
}

const headerSlot = computed(() => {
  return !!slots.header
})

const defaultSlot = computed(() => {
  return !!slots.default
})

const footerSlot = computed(() => {
  return !!slots.footer
})

const triggerBtnClasses = computed(() => {
  let defClass = 'btn'
  if (props.btnClasses) {
    defClass = `${defClass} ${props.btnClasses}`
  }
  return defClass
})

const confirmAction = async () => {
  const status = await props.footerConfirm()
  if (status) toggleModal()
}

const cancelAction = async () => {
  await props.footerCancel()
  toggleModal()
}
</script>
