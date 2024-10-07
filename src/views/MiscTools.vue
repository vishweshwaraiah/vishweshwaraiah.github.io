<script setup>
import RootTemplate from '@/subviews/RootTemplate.vue'
import RentReciepts from '@/subviews/RentReciepts.vue'
import useRentDataStore from '@/stores/rentreciepts.js'

const rent_data = useRentDataStore()
const rentData = rent_data.getRentData
</script>

<template>
  <RootTemplate class="rent_reciepts">
    <RentReciepts :rentData="rentData" />
  </RootTemplate>
</template>
