import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const useRentDataStore = defineStore('rent_data', () => {
  const rent_data = ref({
    tenant_name: 'Vishweshwarayya K Janagoud',
    tenant_pan: 'AZIPJ0782H',
    owner_name: 'Somaiah M P',
    owner_pan: 'BKQPS7695G',
    rent_amount: '30000',
    house_number: 'Flat no. 12061',
    address_line_1: '6th Floor, Building 1, Tower 2',
    address_line_2: 'Prestige Jindal City, Manjunath Nagar, Anchepalya',
    city: 'Bengaluru',
    pincode: '560073',
    rent_month: 'November',
    start_date: '01-November-2022',
    end_date: '01-December-2022',
    signed_date: '01-January-2023'
  })

  const getRentData = computed(() => rent_data.value)

  return { getRentData }
})

export default useRentDataStore
