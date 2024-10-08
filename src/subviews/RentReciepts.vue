<script setup>
import { ref } from 'vue'
import { toUTCDate, fetchMstrMonth } from '@src/utils/globals.js'
import { monthObjects } from '@src/utils/DateTime.js'
import MasterInput from '@components/MasterInput.vue'
import MasterPicker from '@components/MasterPicker.vue'
import MasterButton from '@components/MasterButton.vue'
import MasterNotifier from '@components/MasterNotifier.vue'
import MasterPrintBreak from '@components/MasterPrintBreak.vue'

defineProps({
  rentData: {
    default: () => {},
    type: Object
  }
})

const arraysList = ref([])
const toastMsgs = ref({})
const toastKey = ref(0)
const dateSelected = ref(null)
const recieptCount = ref(6)

const getDateTime = (dateTime) => {
  dateSelected.value = dateTime
}

const calcRange = () => {
  const numCount = recieptCount.value
  const startDate = dateSelected.value
  if (startDate && numCount) {
    const selectedMonth = toUTCDate(startDate).getUTCMonth() + 1
    const selectedYear = toUTCDate(startDate).getUTCFullYear()
    const dates = []
    for (let i = 0; i < numCount; i++) {
      dates.push(selectedMonth + i)
    }

    const fetchMonths = dates.map((date) => {
      const modMonth = date % 12 === 0 ? 12 : date % 12
      const yearNext = Math.floor((date - 1) / 12)
      const current_month = monthObjects.find((i) => i.id === modMonth).long
      const year = selectedYear + yearNext
      const full_date = current_month + ' ' + year
      const next_month = fetchMstrMonth(full_date, 'next').long

      return {
        current_month,
        next_month,
        year,
        full_date
      }
    })
    arraysList.value = fetchMonths
  }
}
</script>

<template lang="html">
  <div class="container rentals-box">
    <MasterNotifier v-if="toastMsgs.message" :key="toastKey" :dataObj="toastMsgs" />
    <div class="generate_btn flex-between gap-2 mt-2">
      <MasterPicker
        pickerType="month-only"
        inputPlaceholder="Select a from month"
        v-model:inputDate="dateSelected"
        inputWidth="45%"
        @emitDateTime="getDateTime"
        :isClearable="true"
      />
      <MasterInput
        inputName="counts"
        v-model:inputValue="recieptCount"
        inputType="number"
        inputWidth="45%"
        inputPlaceholder="Enter number of reciepts"
      />
      <MasterButton size="medium" width="10%" @click="calcRange"> Generate! </MasterButton>
    </div>
    <div class="arrays_list rent_reciept" v-for="(date, idx) in arraysList" :key="idx">
      <div class="container-bg shadow-dark">
        <div class="receipt-header">
          <div class="receipt-title">
            <h5>RENT RECEIPT</h5>
            <h6>of the month {{ date.current_month }}</h6>
          </div>
          <div class="header-details">
            <span>Receipt No: {{ idx + 1 }}</span>
            <span>Date: {{ date.current_month + ' ' + date.year }}</span>
          </div>
        </div>
        <div class="receipt-body">
          Received sum of INR
          <strong>Rs.{{ rentData.rent_amount }}</strong> from
          <strong>{{ rentData.tenant_name }}</strong> towards the rent of property located at
          <div class="house-address">
            <span>{{ rentData.house_number }}</span>
            <span>{{ rentData.address_line_1 }}</span>
            <span>{{ rentData.address_line_2 }}</span>
            <span>{{ rentData.city }}-{{ rentData.pincode }}</span>
          </div>
          for the period from <strong>{{ date.current_month }}</strong> to
          <strong>{{ date.next_month }}</strong>
        </div>
        <div class="receipt-footer">
          <span>{{ rentData.owner_name }}</span>
          <span>(Landlord)</span>
          <span> Pan: {{ rentData.owner_pan }} </span>
        </div>
      </div>
      <MasterPrintBreak v-if="(idx + 1) % 4 === 0" action="break_after" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rentals-box {
  display: block;
  color: var(--item-color);

  .rent_reciept {
    .container-bg {
      margin: 2rem 0;
      padding: 1rem;
      text-align: left;
      background-color: var(--light-gray);
    }
  }

  .receipt-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 1rem;

    .receipt-title,
    .header-details {
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
    }

    .header-details {
      align-items: flex-end;
    }
  }

  .receipt-body {
    margin-bottom: 2rem;

    .house-address {
      font-weight: bolder;
      display: inline;

      span:not(:last-child)::after {
        content: ', ';
      }
    }
  }

  .receipt-footer {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    flex-direction: column;
  }
}

@media print {
  .generate_btn {
    display: none;
  }
}
</style>
