<script setup lang="ts">
import DailyWidget from './DailyWidget.vue'
import { computed } from 'vue'
import { useMeteoStore } from '@/stores/meteo-store'
import SkeletonDailyWidget from './SkeletonDailyWidget.vue'

const meteoStore = useMeteoStore()

const daysOfTheWeek = computed(() => {
  const userLang = navigator.language || 'en-US'
  const formatter = new Intl.DateTimeFormat(userLang, { weekday: 'long' })

  const days: string[] = []
  for (let i = 0; i < 7; i++) {
    if (meteoStore.daily_time[i]) {
      days.push(formatter.format(new Date(meteoStore.daily_time[i]!)))
    }
  }
  const capitalizedDays3Letters = days.map(
    (day) => day.charAt(0).toLocaleUpperCase() + day.slice(1, 3),
  )
  return capitalizedDays3Letters
})

</script>

<template>
  <div
    class="flex gap-3 max-md:grid max-md:grid-cols-3 max-md:gap-3"
    v-if="
      meteoStore.daily_temp_max.length >= 7 &&
      meteoStore.daily_temp_min.length >= 7 &&
      meteoStore.daily_weather_code.length >= 7 &&
      meteoStore.isReadyToDisplay
    "
  >
    <DailyWidget
      v-for="index in 7"
      :key="index"
      :day="daysOfTheWeek[index - 1]!"
      :max_temperature="meteoStore.daily_temp_max[index - 1]!"
      :min_temperature="meteoStore.daily_temp_min[index - 1]!"
      :weather_code="meteoStore.daily_weather_code[index - 1]!"
    />
  </div>
  <div v-else class="flex gap-3 max-md:grid max-md:grid-cols-3 max-md:gap-3">
    <SkeletonDailyWidget v-for="index in 7" :key="index" />
  </div>
</template>
