<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  weather_code: number | undefined
}>()

type WeatherIcon =
  | 'sunny'
  | 'partly-cloudy'
  | 'overcast'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'storm'

const WEATHER_CODE_MAP: Record<WeatherIcon, number[]> = {
  sunny: [0, 1],
  'partly-cloudy': [2],
  overcast: [3],
  fog: [45, 48],
  drizzle: [51, 53, 55, 56, 57],
  rain: [61, 63, 65, 66, 67, 80, 81, 82],
  snow: [71, 73, 75, 77, 85, 86],
  storm: [95, 96, 99],
}

const iconName = computed((): WeatherIcon | undefined => {
  let weather_code = -1
  if (props.weather_code !== undefined) {
    weather_code = props.weather_code
  }
  const entries = Object.entries(WEATHER_CODE_MAP)
  const corresponding_entry = entries.find(([, values]) => values.includes(weather_code))
  if (corresponding_entry === undefined) {
    return undefined
  } else {
    return corresponding_entry[0] as WeatherIcon
  }
})
</script>

<template>
  <img
    :src="`/weather-icons/icon-${iconName}.webp`"
    alt="weather icon"
    class="object-contain"
  />
</template>
