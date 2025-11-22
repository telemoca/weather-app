<script setup lang="ts">
import { onMounted, watch } from 'vue'
import DailyForecast from './components/DailyForecast.vue'
import HourlyForecast from './components/HourlyForecast.vue'
import SearchBar from './components/SearchBar.vue'
import DropdownUnits from './components/DropdownUnits.vue'
import WeatherHero from './components/WeatherHero.vue'
import WeatherWidgetsBar from './components/WeatherWidgetsBar.vue'
import { useMeteoStore } from './stores/meteo-store'
import { useLocationStore } from './stores/location-store'
import SkeletonHero from './components/SkeletonHero.vue'
import { useUserSettingsStore } from './stores/user-settings-store'
import ApiError from './components/ApiError.vue'
import NoSearchResults from './components/NoSearchResults.vue'

const meteoStore = useMeteoStore()
const locationStore = useLocationStore()
const userSettingsStore = useUserSettingsStore()

onMounted(async () => {
  const status: { ok: boolean } = await locationStore.getLocation()

  if (status.ok) {
    meteoStore.updateCity()
  } else {
    locationStore.latitude = 40.73061
    locationStore.longitude = -73.935242
    meteoStore.updateCity()
  }
})

watch(
  () => [
    meteoStore.hasCity,
    locationStore.latitude,
    locationStore.longitude,
    userSettingsStore.temp_unit,
    userSettingsStore.speed_unit,
    userSettingsStore.length_unit,
  ],
  async () => {
    if (meteoStore.hasCity) {
      meteoStore.updateEveryWeather()
    }
  },
)
</script>

<template>
  <header class="flex justify-between">
    <img src="/logo.svg" alt="Weather Now's Logo" class="max-sm:w-40 max-[25rem]:w-1/2" />
    <DropdownUnits />
  </header>
  <div v-if="meteoStore.isAPIWorking">
    <h1
      class="text-4xl text-neutral-0 font-grotesque font-bold text-center my-15"
      v-text="'How\'s the sky looking today?'"
    ></h1>
    <SearchBar class="mx-auto mb-12" />
    <!--  big container -->
    <div v-if="!meteoStore.noCityFound" class="flex gap-7 w-full mx-auto max-xl:flex-col">
      <!-- left container -->
      <div class="flex-2">
        <WeatherHero v-if="meteoStore.isReadyToDisplay" class="mb-7 max-md:mb-4" />
        <SkeletonHero v-else class="mb-7 max-md:mb-4" />
        <WeatherWidgetsBar />
        <h2 class="text-neutral-0 font-dm font-semibold mb-5">Daily Forecast</h2>
        <DailyForecast />
      </div>
      <!-- right container -->
      <HourlyForecast class="flex-1" />
    </div>
    <NoSearchResults v-else />
  </div>
  <ApiError v-else />
</template>
