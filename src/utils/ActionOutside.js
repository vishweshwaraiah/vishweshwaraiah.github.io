/**
 * @param {*} elTargetRef
 * @param {*} callbackFn
 * @returns
 */

import { onBeforeUnmount, onMounted } from 'vue'

const ActionOutside = (elTargetRef, actionType, callbackFn) => {
  if (!elTargetRef) return

  const listener = (e) => {
    const includesTarget = e.composedPath().includes(elTargetRef.value)
    if (e.target === elTargetRef.value || includesTarget) {
      return
    }
    if (typeof callbackFn === 'function') {
      callbackFn(e)
    }
  }

  onMounted(() => {
    window.addEventListener(actionType, listener)
  })

  onBeforeUnmount(() => {
    window.removeEventListener(actionType, listener)
  })

  return {
    listener
  }
}

export default ActionOutside
