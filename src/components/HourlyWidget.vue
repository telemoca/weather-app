<script setup lang="ts">
import { computed } from 'vue'
import AdaptativeWeatherIcon from './AdaptativeWeatherIcon.vue'

const props = defineProps<{
  hour: number
  weather_code: number
  temperature: number
}>()

const formattedHour = computed(() => {
  return `${props.hour} PM`
})

const formattedTemperature = computed(() => {
  return `${Math.round(props.temperature)}°`
})
</script>

<template>
  <div
    class="bg-neutral-700 border rounded-lg border-neutral-600 w-full p-1 pr-4 mb-2 last:mb-0 text-neutral-0 font-dm flex justify-between items-center"
  >
    <div class="flex items-center">
      <AdaptativeWeatherIcon :weather_code="props.weather_code" class="w-10 h-10" />
      <p class="text-nowrap">{{ formattedHour }}</p>
    </div>
    <p class="text-sm text-right w-8">{{ formattedTemperature }}</p>
  </div>
</template>
