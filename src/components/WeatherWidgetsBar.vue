<script setup lang="ts">
import { computed } from 'vue'
import WeatherWidget from './WeatherWidget.vue'
import { useMeteoStore } from '@/stores/meteo-store'
import { useUserSettingsStore } from '@/stores/user-settings-store'
import SkeletonWidget from './SkeletonWidget.vue'

const meteoStore = useMeteoStore()
const userSettingsStore = useUserSettingsStore()

const formattedTemperature = computed(() => {
  return Math.round(meteoStore.today_apparent_temperature)
})

const formattedWindSpeed = computed(() => {
  return Math.round(meteoStore.today_wind_speed_10m)
})
</script>

<template>
  <div
    class="flex w-full gap-4 mb-10 max-md:grid max-md:grid-cols-2 max-md:gap-3"
    v-if="meteoStore.isReadyToDisplay"
  >
    <WeatherWidget :title="'Feels Like'" :value="formattedTemperature" :unit="'°'" />
    <WeatherWidget :title="'Humidity'" :value="meteoStore.today_relative_humidity_2m" :unit="'%'" />
    <WeatherWidget
      :title="'Wind'"
      :value="formattedWindSpeed"
      :unit="userSettingsStore.speed_unit === 'kmph' ? 'km/h' : 'mph'"
    />
    <WeatherWidget
      :title="'Precipitation'"
      :value="meteoStore.today_precipitation"
      :unit="userSettingsStore.length_unit === 'mm' ? 'mm' : 'in'"
    />
  </div>
  <div class="flex w-full gap-4 mb-10 max-md:grid max-md:grid-cols-2 max-md:gap-3" v-else>
    <SkeletonWidget :title="'Feels Like'" />
    <SkeletonWidget :title="'Humidity'" />
    <SkeletonWidget :title="'Wind'" />
    <SkeletonWidget :title="'Precipitation'" />
  </div>
</template>
