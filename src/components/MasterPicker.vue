<script setup>
import { ref, computed, onMounted } from 'vue'
import MasterIcon from '@components/MasterIcon.vue'
import MasterInput from '@components/MasterInput.vue'
import { fetchMstrMonth, classNames } from '@src/utils/globals'
import { monthObjects, dayStrings } from '@src/utils/DateTime'

const emits = defineEmits(['emitDateTime'])

const props = defineProps({
  inputLabel: {
    default: '',
    type: String
  },
  inputDate: {
    type: [String, Date],
    default: null
  },
  inputPlaceholder: {
    default: 'dd-mmm-yyyy hh:mm a',
    type: String
  },
  inputWidth: {
    default: '100%',
    type: String
  },
  pickerType: {
    default: 'date-time',
    type: String
  },
  isRequired: {
    default: false,
    type: Boolean
  }
})

const dateRef = ref(new Date())
const selectedDate = ref()
const selectedMonth = ref()
const selectedYear = ref()
const stringDate = ref()
const defaultSel = ref()
const dateObj = ref({})
const alignDropdown = ref('bottom')
const isDateTimePicker = ref(true)
const isMonthOnlyPicker = ref(false)
const isDateOnlyPicker = ref(false)

const visibleDays = ref([])

const isVisible = ref(false)
const showDates = ref(true)
const showTimer = ref(false)

const selectedTime = ref({
  hrs:
    dateRef.value.getHours() > 12 ? dateRef.value.getHours() - 12 : dateRef.value.getHours() || 12,
  mins: dateRef.value.getMinutes(),
  type: dateRef.value.getHours() >= 12 ? 'PM' : 'AM'
})

const padZero = (i) => {
  return ('0' + i).slice(-2)
}

const getDayShortStr = (date) => {
  return new Date(date).toLocaleString('default', { weekday: 'short' })
}

const procMonths = computed(() => {
  return monthObjects?.map((i) => {
    if (i.short === selectedMonth.value) {
      i.class = 'selected'
    } else {
      i.class = 'unselected'
    }
    return i
  })
})

const processCalendar = () => {
  visibleDays.value = []

  selectedMonth.value = fetchMstrMonth(dateRef.value, 'current').short

  stringDate.value = dateRef.value.toDateString()

  selectedYear.value = dateRef.value.getFullYear()

  dateRef.value.setDate(1)

  const lastDay = new Date(dateRef.value.getFullYear(), dateRef.value.getMonth() + 1, 0).getDate()

  const prevLastDay = new Date(dateRef.value.getFullYear(), dateRef.value.getMonth(), 0).getDate()

  const firstDayIndex = dateRef.value.getDay()

  const lastDayIndex = new Date(
    dateRef.value.getFullYear(),
    dateRef.value.getMonth() + 1,
    0
  ).getDay()

  const nextDays = 7 - lastDayIndex - 1

  for (let x = firstDayIndex; x > 0; x--) {
    visibleDays.value.push({
      class: 'prev-date',
      date: prevLastDay - x + 1,
      month: fetchMstrMonth(dateRef.value, 'previous').short,
      key: `prev-date-${prevLastDay - x + 1}`
    })
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === defaultSel.value?.getDate() &&
      defaultSel.value?.getMonth() === dateRef.value.getMonth() &&
      defaultSel.value?.getFullYear() === dateRef.value.getFullYear()
    ) {
      visibleDays.value.push({
        class: 'selected-date',
        date: i,
        month: selectedMonth.value,
        key: `selected-date-${i}`,
        shortDay: getDayShortStr(`${i}-${selectedMonth.value}-${selectedYear.value}`),
        fullDate: `${i}-${selectedMonth.value}-${selectedYear.value}`
      })
    } else if (
      i === new Date().getDate() &&
      dateRef.value.getMonth() === new Date().getMonth() &&
      dateRef.value.getFullYear() === new Date().getFullYear()
    ) {
      visibleDays.value.push({
        class: 'current-date',
        date: i,
        month: selectedMonth.value,
        key: `current-date-${i}`,
        shortDay: getDayShortStr(`${i}-${selectedMonth.value}-${selectedYear.value}`),
        fullDate: `${i}-${selectedMonth.value}-${selectedYear.value}`
      })
    } else {
      visibleDays.value.push({
        class: 'month-date',
        date: i,
        month: selectedMonth.value,
        key: `month-date-${i}`,
        shortDay: getDayShortStr(`${i}-${selectedMonth.value}-${selectedYear.value}`),
        fullDate: `${i}-${selectedMonth.value}-${selectedYear.value}`
      })
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    visibleDays.value.push({
      class: 'next-date',
      date: j,
      month: fetchMstrMonth(dateRef.value, 'next').short,
      key: `next-date-${j}`
    })
  }
}

const toggleVisibility = (action) => {
  if (action === 'open') {
    isVisible.value = true
  } else if (action === 'close') {
    isVisible.value = false
  } else {
    isVisible.value = !isVisible.value
  }
  dateOrTime('date')
}

const toggleCalendar = (e, action) => {
  toggleVisibility(action)

  const posTop = window.innerHeight - e.clientY
  if (posTop < 150) alignDropdown.value = 'top'

  const collection = document.querySelectorAll('.master-calendar')
  for (const elm of collection) {
    elm.classList.remove('active')
    elm.classList.add('inactive')
  }

  if (isVisible.value && (action === 'open' || action === 'toggle')) {
    e.target.closest('.master-calendar')?.classList.add('active')
    e.target.closest('.master-calendar')?.classList.remove('inactive')
  }
}

const dateOrTime = (type) => {
  if (type === 'date') {
    showDates.value = true
    showTimer.value = false
  } else if (type === 'time') {
    showDates.value = false
    showTimer.value = true
  }
}

const prevMonth = () => {
  const prevMonthNum = dateRef.value.getMonth() - 1
  dateRef.value.setMonth(prevMonthNum)
  processCalendar()
  dateOrTime('date')
}

const nextMonth = () => {
  const nextMonthNum = dateRef.value.getMonth() + 1
  dateRef.value.setMonth(nextMonthNum)
  processCalendar()
  dateOrTime('date')
}

const prevYear = () => {
  const prevYearNum = dateRef.value.getFullYear() - 1
  dateRef.value.setYear(prevYearNum)
  processCalendar()
}

const nextYear = () => {
  const nextYearNum = dateRef.value.getFullYear() + 1
  dateRef.value.setYear(nextYearNum)
  processCalendar()
}

onMounted(() => {
  if (props.pickerType === 'month-only') {
    isMonthOnlyPicker.value = true
    isDateTimePicker.value = false
    isDateOnlyPicker.value = false
  }

  if (props.pickerType === 'date-only') {
    isDateOnlyPicker.value = true
    isMonthOnlyPicker.value = false
    isDateTimePicker.value = false
  }

  if (props.inputDate) {
    selectedDate.value = props.inputDate
    dateRef.value = new Date(props.inputDate)
    defaultSel.value = new Date(props.inputDate)
  }
  processCalendar()
})

const onInputClear = (e) => {
  e.preventDefault()
  e.stopPropagation()
  dateRef.value = new Date()
  selectedDate.value = ''
  emits('emitDateTime', '')
  processCalendar()
}

const selectHours = (hr) => {
  selectedTime.value.hrs = hr
}

const selectMinutes = (mn) => {
  selectedTime.value.mins = mn
}

const selectType = (type) => {
  selectedTime.value.type = type
}

const selectDate = (event, date) => {
  if (date.class === 'next-date' || date.class === 'prev-date') {
    return false
  }
  dateObj.value = date
  if (isDateTimePicker.value) {
    dateOrTime('time')
  } else {
    dateOrTime('date')
    updateInputStr(event)
  }
}

const updateInputStr = (e) => {
  const hrs = padZero(selectedTime.value.hrs)
  const mins = padZero(selectedTime.value.mins)
  const type = selectedTime.value.type
  let finalDateTime = ''
  const withoutTime = `${dateObj.value?.fullDate}`
  if (isDateTimePicker.value) {
    finalDateTime = `${withoutTime} ${hrs}:${mins} ${type}`
  } else {
    finalDateTime = `${withoutTime} 12:00 AM`
  }
  selectedDate.value = finalDateTime
  dateRef.value = new Date(finalDateTime)
  defaultSel.value = new Date(finalDateTime)
  emits('emitDateTime', finalDateTime)
  processCalendar()
  toggleCalendar(e, 'close')
}

const selectMonthYear = (e, month) => {
  const fullYear = dateRef.value?.getFullYear()
  const yearMonth = `${fullYear}-${padZero(month)}`
  const shortMonth = fetchMstrMonth(yearMonth, 'current').short
  const longMonth = fetchMstrMonth(yearMonth, 'current').long
  const finalValue = `${longMonth} ${fullYear}`
  selectedMonth.value = shortMonth
  selectedDate.value = finalValue
  emits('emitDateTime', finalValue)
  toggleCalendar(e, 'close')
}

const mainWrapper = computed(() => {
  const classList = ['picker-container']
  classList.push(alignDropdown.value)
  return classNames(classList)
})

onMounted(() => {
  const currentDate = new Date()
  const fullYear = currentDate.getFullYear()
  const monthNum = currentDate.getMonth()
  const yearMonth = `${fullYear}-${padZero(monthNum + 1)}`
  const shortMonth = fetchMstrMonth(yearMonth, 'current').short
  const longMonth = fetchMstrMonth(yearMonth, 'current').long
  const finalValue = `${longMonth} ${fullYear}`
  selectedMonth.value = shortMonth
  selectedDate.value = finalValue
  emits('emitDateTime', finalValue)
})
</script>

<template lang="html">
  <div :class="mainWrapper">
    <label v-if="inputLabel" class="input-label">
      {{ inputLabel }}
    </label>
    <div v-if="isVisible" class="backDrop" @click.stop="(e) => toggleCalendar(e, 'close')"></div>
    <div
      :class="`master-calendar ${pickerType}`"
      @mouseleave.stop="(e) => toggleCalendar(e, 'close')"
    >
      <MasterInput
        :inputPlaceholder="inputPlaceholder"
        :inputRequired="isRequired"
        inputId="datePicker"
        inputName="date-picker"
        inputType="text"
        rightIcon="calendar"
        v-model:inputValue="selectedDate"
        @onInputClear="onInputClear"
        :isReadOnly="true"
        @click.stop="(e) => toggleCalendar(e, 'open')"
        inputWidth="100%"
      />
      <div v-if="isVisible" :class="`calendar-box animate ${alignDropdown}`">
        <div class="selected-details">
          <div class="actions">
            <div class="prev-actions">
              <MasterIcon
                size="x-small"
                svg-name="first"
                @click="prevYear"
                tabIndex="-1"
                fillColor="var(--primary-icon)"
                hoverColor="var(--themed-icon)"
              />
              <MasterIcon
                size="x-small"
                svg-name="previous"
                @click="prevMonth"
                tabIndex="-1"
                fillColor="var(--primary-icon)"
                hoverColor="var(--themed-icon)"
              />
            </div>
            <div class="details">
              <p>{{ `${selectedMonth} ${selectedYear}` }}</p>
            </div>
            <div class="next-actions">
              <MasterIcon
                size="x-small"
                svg-name="next"
                @click="nextMonth"
                tabIndex="-1"
                fillColor="var(--primary-icon)"
                hoverColor="var(--themed-icon)"
              />
              <MasterIcon
                size="x-small"
                svg-name="last"
                @click="nextYear"
                tabIndex="-1"
                fillColor="var(--primary-icon)"
                hoverColor="var(--themed-icon)"
              />
            </div>
          </div>
          <div class="selected-str">
            <p>{{ stringDate }}</p>
          </div>
        </div>
        <div v-if="isMonthOnlyPicker" class="months-box">
          <div class="visible-months">
            <div
              v-for="month in procMonths"
              :key="month.id"
              :class="`date-str ${month.class}`"
              @click.stop="(e) => selectMonthYear(e, month.id)"
            >
              {{ month.short }}
            </div>
          </div>
        </div>
        <div class="dates-box" v-if="isDateOnlyPicker || isDateTimePicker">
          <div class="weekdays" v-if="showDates">
            <div v-for="day in dayStrings" :key="day">
              {{ day }}
            </div>
          </div>
          <div class="visible-days" v-if="showDates">
            <div
              v-for="i in visibleDays"
              :key="i.key"
              :class="i.class"
              @click.stop="(e) => selectDate(e, i)"
            >
              {{ i.date }}
            </div>
          </div>
        </div>
        <div class="time-box" v-if="isDateTimePicker">
          <div v-if="showTimer" class="time-container input-group">
            <div class="selected-time">
              <span>{{ padZero(selectedTime.hrs) }}</span>
              <span>{{ padZero(selectedTime.mins) }}</span>
              <span>{{ selectedTime.type }}</span>
            </div>
            <div class="time-picker">
              <div class="drop-box">
                <span class="hours-list" v-for="i in 12" :key="i" @click.stop="selectHours(i)">
                  <label v-if="selectedTime.hrs === i" class="is-selected" id="selected_hr">
                    {{ padZero(i) }}
                  </label>
                  <label v-else class="un-selected">
                    {{ padZero(i) }}
                  </label>
                </span>
              </div>
              <div class="drop-box">
                <span
                  class="minutes-list"
                  v-for="i in 60"
                  :key="i"
                  @click.stop="selectMinutes(i - 1)"
                >
                  <label v-if="selectedTime.mins === i - 1" class="is-selected" id="selected_mn">
                    {{ padZero(i - 1) }}
                  </label>
                  <label v-else class="un-selected">
                    {{ padZero(i - 1) }}
                  </label>
                </span>
              </div>
              <div class="drop-box">
                <span class="am-pm" @click="selectType('AM')">
                  <label :class="`${selectedTime.type === 'AM' && 'is-selected'}`"> AM </label>
                </span>
                <span class="am-pm" @click="selectType('PM')">
                  <label :class="`${selectedTime.type === 'PM' && 'is-selected'}`"> PM </label>
                </span>
                <span class="toggler" @click="dateOrTime('date')">
                  <label class="toggle-cal">
                    <MasterIcon
                      svgName="calendar"
                      size="small"
                      fillColor="var(--primary-icon)"
                      hoverColor="var(--themed-icon)"
                    />
                  </label>
                </span>
                <span class="update-data" @click="(e) => updateInputStr(e)">
                  <label class="update-date-time">
                    <MasterIcon
                      svgName="checked-square"
                      size="medium"
                      fillColor="var(--primary-icon)"
                      hoverColor="var(--themed-icon)"
                    />
                  </label>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.picker-container {
  width: v-bind(inputWidth);
}

.master-calendar {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  .clear-icon,
  &.active,
  &.active .input-group {
    z-index: 202;
  }

  .date-str.month-year {
    cursor: pointer;
  }

  .calendar-box {
    position: absolute;
    width: 100%;
    height: auto;
    background-color: var(--bg-color);
    color: var(--glob-light);
    box-shadow: boxShadow(dark);
    margin-top: 0.25rem;
    overflow: visible;

    @include hideScroll();

    &.top {
      bottom: calc(100% - px2rem(5));
      box-shadow: boxShadow(top);
      z-index: 201;
    }

    &.bottom {
      top: calc(100% - px2rem(5));
      box-shadow: boxShadow(bottom);
      z-index: 201;
    }

    .selected-details {
      padding-top: px2rem(5);
      background-color: var(--picker-header);

      .actions,
      .selected-str {
        width: 100%;
        height: 20%;
        display: flex;
        align-items: center;
        padding: 0 0.625rem;
        text-align: center;
        text-shadow: boxShadow(text);

        p {
          font-size: 1rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: px2rem(1);
          margin: 0.625rem auto;
        }

        .svg-holder {
          cursor: pointer;
          margin: 0 px2rem(5);

          &:focus {
            @include transformSvg(0.8);
          }
        }
      }

      .actions {
        justify-content: space-between;

        .prev-actions,
        .next-actions {
          display: flex;
        }
      }

      .selected-str {
        justify-content: center;
      }
    }

    .dates-box,
    .months-box {
      border: 0.25rem solid var(--glob-dark);
    }

    .weekdays,
    .visible-days {
      @include pickerGrid(7, 1fr);
    }

    .visible-months {
      @include pickerGrid(4, 1fr);

      div {
        padding: 1rem 0;
      }
    }

    .weekdays {
      height: 10%;

      div {
        background-color: var(--picker-weekdays);
      }
    }

    .visible-days,
    .visible-months {
      height: 70%;

      div {
        background-color: var(--picker-items);
      }

      .current-date {
        background-color: var(--secondary);
      }

      .selected-date,
      .selected {
        background-color: var(--primary);
      }
    }

    .visible-days,
    .visible-months,
    .unselected {
      div:hover {
        background-color: var(--secondary);
        cursor: pointer;
      }
    }

    .prev-date,
    .next-date {
      opacity: 0.5;
    }

    .time-container {
      height: 70%;
      flex-direction: column;

      span,
      div {
        flex: 1;
        width: 100%;
      }

      .selected-time {
        display: flex;
        cursor: pointer;

        span {
          background-color: var(--picker-selected);
          color: var(--glob-light);
          height: px2rem(40);
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: px2rem(2);

          &:last-child {
            margin: 0;
          }
        }
      }

      .time-picker {
        display: flex;

        span input {
          background-color: var(--glob-dark);
        }

        .drop-box {
          height: 15rem;
          overflow: auto;
          background-color: var(--glob-dark);
          flex: 1;

          @include hideScroll();
        }

        .hours-list,
        .minutes-list,
        .am-pm,
        .toggler,
        .update-data {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          height: px2rem(40);
          width: 75%;
          margin: px2rem(5) auto;
          text-align: center;
          align-items: center;
          text-shadow: boxShadow(text);

          &:hover {
            background-color: var(--gray);
          }
        }

        label {
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: auto;
          cursor: pointer;
          color: var(--glob-light);

          &.is-selected {
            background-color: var(--picker-selected);
            color: var(--glob-light);
          }
        }
      }
    }
  }
}
</style>
