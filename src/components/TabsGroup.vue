<style lang="scss">
ul {
  &.tabs__header {
    display: block;
    list-style: none;
    margin: auto;
    padding: 0;

    > li {
      padding: px2rem(10);
      margin: 0;
      display: inline-block;
      margin-right: px2rem(5);
      cursor: pointer;
      border-top-right-radius: var(--radius-default);
      border-top-left-radius: var(--radius-default);
      background-color: var(--item-color);
      color: var(--bg-color);
      border: px2rem(10) solid var(--item-color);

      &.tab__selected {
        background-color: var(--bg-color);
        color: var(--item-color);
        font-weight: bold;
        border-bottom: px2rem(5) solid transparent;
      }
    }
  }
}

.tab {
  display: block;
  padding: px2rem(10);
  margin-bottom: 1rem;
  background-color: var(--item-color);
  color: var(--bg-color);
  border-bottom-right-radius: var(--radius-default);
  border-bottom-left-radius: var(--radius-default);
  border: px2rem(10) solid var(--item-color);
}
</style>
<template lang="html">
  <div>
    <ul class="tabs__header">
      <li
        v-for="tab in tabs"
        :key="tab.props.title"
        @click="selectTab(tab.props.tabId)"
        :class="{ tab__selected: tab.props.tabId == selectedId }"
      >
        {{ tab.props.title }}
      </li>
    </ul>
    <slot></slot>
  </div>
</template>
<script setup>
import { onMounted, ref, useSlots } from 'vue'
const selectedId = ref('tab_one')

const slots = useSlots()
const emits = defineEmits(['emitStatus'])

const tabs = slots.default().filter((i) => i.type.__name === 'TabsItem')

const selectTab = (id) => {
  selectedId.value = id
  emits('emitStatus', id)
}

onMounted(() => {
  selectTab('tab_one')
})
</script>
