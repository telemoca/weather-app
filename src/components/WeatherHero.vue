<script setup lang="ts">
import { useMeteoStore } from '@/stores/meteo-store'
import AdaptativeWeatherIcon from './AdaptativeWeatherIcon.vue'
import { computed } from 'vue'

const meteoStore = useMeteoStore()

const formattedDate = computed(() => {
  if (!meteoStore.time) {
    return ' '
  }
  return new Date(meteoStore.time).toLocaleDateString(navigator.language || 'en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
})

const formattedTodayTemp = computed(() => {
  return `${Math.round(meteoStore.today_temperature_2m)}°`
})
</script>

<template>
  <div class="relative w-full">
    <picture>
      <source media="(max-width:639px)" srcset="/bg-today-small.svg" />
      <img src="/bg-today-large.svg" class="-z-10 w-full" />
    </picture>
    <div
      class="absolute flex justify-between items-center max-sm:flex-col max-sm:justify-around inset-0 p-8 max-xl:p-12 max-lg:p-8 font-dm text-neutral-0"
    >
      <div class="font-dm font-semibold text-neutral-0 max-sm:mt-3">
        <p class="font-semibold text-xl max-sm:text-[8vw] pb-1">
          {{
            meteoStore.city
              ? `${meteoStore.city}, `
              : meteoStore.county
                ? `${meteoStore.county}, `
                : ''
          }}{{ meteoStore.country }}
        </p>
        <p class="font-normal text-sm max-sm:text-[3.5vw] opacity-70 pt-1">{{ formattedDate }}</p>
      </div>
      <div class="flex items-center">
        <AdaptativeWeatherIcon
          :weather_code="meteoStore.today_weather_code"
          class="w-20 max-sm:w-[25vw]"
        />
        <p class="font-bold italic text-7xl max-sm:text-[20vw] ml-10">{{ formattedTodayTemp }}</p>
      </div>
    </div>
  </div>
</template>
