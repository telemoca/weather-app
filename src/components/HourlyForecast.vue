<script setup lang="ts">
import DropdownDay from './DropdownDay.vue'
import HourlyWidget from './HourlyWidget.vue'
import { ref, watch } from 'vue'
import { useMeteoStore } from '@/stores/meteo-store'
import SkeletonHourlyWidget from './SkeletonHourlyWidget.vue'

const meteoStore = useMeteoStore()

const selected_temp = ref<number[]>([])
const selected_weather_code = ref<number[]>([])

const updateWeather = (index: number) => {
  selected_temp.value = meteoStore.hourly_temp.slice(15 + index * 24, 24 + index * 24)
  selected_weather_code.value = meteoStore.hourly_weather_code.slice(
    15 + index * 24,
    24 + index * 24,
  )
}

watch(
  () => meteoStore.isFetchingWeather,
  async (isFetchingWeather) => {
    if (!isFetchingWeather) {
      updateWeather(0)
    }
  },
)
</script>

<template>
  <div class="bg-neutral-800 p-5 rounded-2xl flex flex-col justify-between">
    <div class="flex justify-between items-center mb-4 text-neutral-0 font-dm font-semibold">
      <p>Hourly forecast</p>
      <DropdownDay @day-selected="updateWeather" />
    </div>
    <div v-if="meteoStore.isReadyToDisplay" class="flex flex-col justify-between h-full">
      <HourlyWidget
        v-for="index in 8"
        :key="index"
        :hour="index + 2"
        :temperature="selected_temp[index]!"
        :weather_code="selected_weather_code[index]!"
      />
    </div>
    <div v-else class="flex flex-col justify-between h-full">
      <SkeletonHourlyWidget v-for="index in 8" :key="index" />
    </div>
  </div>
</template>
