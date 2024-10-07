<script setup>
import RootTemplate from '@src/subviews/RootTemplate.vue'
import RentReciepts from '@src/subviews/RentReciepts.vue'
import useRentDataStore from '@src/stores/rentreciepts.js'

const rent_data = useRentDataStore()
const rentData = rent_data.getRentData
</script>

<template>
  <RootTemplate class="rent_reciepts">
    <RentReciepts :rentData="rentData" />
  </RootTemplate>
</template>
