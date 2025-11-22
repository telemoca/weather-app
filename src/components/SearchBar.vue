<script setup lang="ts">
import { getCorrespondingCities, type CityData } from '@/api/geocoding-search'
import { useLocationStore } from '@/stores/location-store'
import { useMeteoStore } from '@/stores/meteo-store'
import { onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'

const locationStore = useLocationStore()
const meteoStore = useMeteoStore()

const isOpen = ref(false)
const user_research = ref('')
const input = ref()
const results = ref<CityData[]>([])
const isMobile = ref(window.innerWidth < 639)

const showDropdown = () => {
  isOpen.value = true
}

const hideDropdown = () => {
  isOpen.value = false
}

const focusInput = () => {
  input.value.focus()
}

const resetSearch = () => {
  if (isOpen.value === false) {
    user_research.value = ''
  }
}

const updateResults = async () => {
  results.value = await getCorrespondingCities(
    user_research.value,
    navigator.language.slice(0, 2) || 'en',
    4,
  )
  if (results.value.length > 0) {
    showDropdown()
  } else {
    hideDropdown()
  }
}

const selectCity = async (index: number) => {
  if (results.value[index] === undefined) {
    meteoStore.noCityFound = true
  } else {
    meteoStore.noCityFound = false
    user_research.value = `${results.value[index]?.name}, ${results.value[index]?.country}`
    hideDropdown()
    if (results.value[index]?.latitude && results.value[index]?.longitude) {
      locationStore.latitude = results.value[index]?.latitude
      locationStore.longitude = results.value[index]?.longitude
      meteoStore.updateEveryWeather()
    }
  }
}

const search = async () => {
  selectCity(0)
}

const handleSubmit = () => {
  if (isMobile.value) {
    updateResults()
  } else {
    search()
  }
}

const button = useTemplateRef('searchbar')

const closeOnOutsideClick = (evt: Event) => {
  if (button.value && !button.value.contains(evt.target as Node)) {
    hideDropdown()
  }
}

watch(isOpen, (open) => {
  if (open) {
    document.addEventListener('click', closeOnOutsideClick)
  } else {
    document.removeEventListener('click', closeOnOutsideClick)
  }
})

onMounted(() => {
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  document.removeEventListener('click', closeOnOutsideClick)
  window.removeEventListener('resize', updateWidth)
})

function updateWidth() {
  isMobile.value = window.innerWidth < 639
}
</script>

<template>
  <form
    ref="searchbar"
    @submit.prevent="handleSubmit"
    class="flex justify-center gap-3 font-dm font-medium max-sm:flex-col"
  >
    <div class="relative text-neutral-950 bg-neutral-800 w-1/2 rounded-lg max-lg:w-full">
      <input
        v-model="user_research"
        ref="input"
        type="text"
        class="p-3 pl-12 w-full rounded-lg text-neutral-200 placeholder-neutral-200 cursor-pointer focus:outline-2 outline-offset-3 outline-neutral-0"
        placeholder="Search for a place..."
        @click="resetSearch"
        @input="!isMobile && updateResults()"
      />
      <img
        src="/utilities-icons/icon-search.svg"
        class="absolute left-4 top-0 bottom-0 my-auto outline-none cursor-pointer"
        @click="focusInput"
      />
      <div
        v-if="isOpen"
        class="absolute top-full mt-2 flex flex-col bg-neutral-800 border border-neutral-600 p-2 rounded-lg text-neutral-0 z-10 left-0 right-0"
      >
        <button
          v-for="(result, index) in results"
          :key="index"
          @click="selectCity(index)"
          class="rounded-md border border-neutral-800 hover:bg-neutral-700 hover:border-neutral-600 focus:z-10 py-1 px-2 font-normal text-left cursor-pointer focus:outline-2 outline-neutral-0"
        >
          {{ result.name }}, {{ result.admin2 ? `${result.admin2}, ` : "" }}{{ result.country }}
        </button>
      </div>
    </div>
    <button
      type="submit"
      class="text-neutral-0 bg-blue-500 hover:bg-blue-700 hover:outline-blue-700 transition duration-300 ease-in-out motion-reduce:transition-none rounded-lg px-6 cursor-pointer max-sm:py-2 focus:outline-2 outline-offset-3 outline-blue-500"
    >
      Search
    </button>
  </form>
</template>
