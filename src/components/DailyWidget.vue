<script setup lang="ts">
import { computed } from 'vue'
import AdaptativeWeatherIcon from './AdaptativeWeatherIcon.vue'

const props = defineProps<{
  day: string
  weather_code: number
  max_temperature: number
  min_temperature: number
}>()

const formattedMaxTemperature = computed(() => {
  return `${Math.round(props.max_temperature)}°`
})

const formattedMinTemperature = computed(() => {
  return `${Math.round(props.min_temperature)}°`
})
</script>

<template>
  <div
    class="flex flex-col grow justify-between bg-neutral-800 border rounded-lg border-neutral-600 w-fit max-md:w-full p-3 text-neutral-0 font-dm"
  >
    <p class="mb-2 text-xs text-center font-medium">{{ props.day }}</p>
    <AdaptativeWeatherIcon :weather_code="props.weather_code" class="w-20 h-20 mx-auto" />
    <div class="flex justify-between items-center gap-2">
      <p class="text-sm">{{ formattedMaxTemperature }}</p>
      <p class="text-sm opacity-70">{{ formattedMinTemperature }}</p>
    </div>
  </div>
</template>
