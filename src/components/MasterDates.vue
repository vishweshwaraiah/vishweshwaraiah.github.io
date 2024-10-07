<style lang="scss">
.date-badge {
  background-color: v-bind(bgColor);
  white-space: nowrap;

  .year {
    &::after {
      content: ' - ';
    }
  }

  .month {
    &::after {
      content: ' ';
    }
  }

  .hours {
    &::after {
      content: ':';
    }
  }

  .date {
    &::after {
      content: ' ';
    }
  }

  .am-pm {
    color: var(--gray);
    font-weight: bolder;
    margin-left: px2rem(3);
  }
}
</style>
<template lang="html">
  <div class="date-badge">
    <span v-if="format === 'YYYY-MM'">
      <span class="year">{{ fullYear }}</span>
      <span class="month">{{ digitsMonth }}</span>
    </span>
    <span v-if="format === 'YYYY-MM-DD HH:MM'">
      <span class="date">{{ digitsDate }}</span>
      <span class="month"> {{ stringMonth.short }}</span>
      <span class="year">{{ fullYear }}</span>
      <span class="hours">{{ hours12 }}</span>
      <span class="minutes">{{ minutes }}</span>
      <sup class="am-pm">{{ amPm }}</sup>
    </span>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { monthObjects } from '@src/constants/DateTime'

const props = defineProps({
  format: {
    default: '',
    type: String
  },
  dateStr: {
    default: '',
    type: String
  },
  bgColor: {
    default: 'transparent',
    type: String
  }
})
const dateObj = ref(new Date())
if (props.dateStr) {
  dateObj.value = new Date(props.dateStr)
}
const fullYear = dateObj.value.getFullYear()
const month = dateObj.value.getMonth() + 1
const date = dateObj.value.getDate()
const hours = dateObj.value.getHours()
let minutes = dateObj.value.getMinutes()

const digitsMonth = ('0' + month).slice(-2)
const stringMonth = monthObjects.find((i) => i.id === month)

const digitsDate = ('0' + date).slice(-2)
const hours24 = ('0' + hours).slice(-2)
minutes = ('0' + minutes).slice(-2)
const amPm = hours24 >= 12 ? 'PM' : 'AM'
let hours12 = hours24 % 12
hours12 = hours12 || 12
</script>
