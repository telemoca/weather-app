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
  selected_temp.value = meteoStore.hourly_temp.slice(index * 24, index * 24 + 25)
  selected_weather_code.value = meteoStore.hourly_weather_code.slice(index * 24, index * 24 + 25)
}

watch(
  () => meteoStore.isFetchingWeather,
  async (isFetchingWeather) => {
    if (!isFetchingWeather) {
      updateWeather(0)
    }
  },
)
// max-h-115
</script>

<template>
  <div class="bg-neutral-800 p-5 rounded-2xl flex flex-col justify-between">
    <div class="flex justify-between items-center mb-2 max-xl:mb-5 text-neutral-0 font-dm font-semibold">
      <p>Hourly forecast</p>
      <DropdownDay @day-selected="updateWeather" />
    </div>
    <div
      v-if="meteoStore.isReadyToDisplay"
      class="flex flex-col overflow-y-auto max-h-[calc(18vw+15.5em)] max-xl:max-h-full max-xl:overflow-y-visible"
    >
      <HourlyWidget
        v-for="index in 24"
        :key="index"
        :hour="index - 1"
        :temperature="selected_temp[index - 1]!"
        :weather_code="selected_weather_code[index - 1]!"
      />
    </div>
    <div
      v-else
      class="flex flex-col overflow-y-auto max-h-113 max-xl:max-h-full max-xl:overflow-y-visible"
    >
      <SkeletonHourlyWidget v-for="index in 24" :key="index" />
    </div>
  </div>
</template>
