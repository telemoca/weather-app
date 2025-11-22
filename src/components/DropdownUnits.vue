<script setup lang="ts">
import { onUnmounted, ref, useTemplateRef, watch } from 'vue'
import UnitButton from './UnitButton.vue'
import { useUserSettingsStore } from '@/stores/user-settings-store'

const userSettingsStore = useUserSettingsStore()

const isOpen = ref(false)

const switchTo = ref('Imperial')

const isCelcSelected = ref(true)
const isKmphSelected = ref(true)
const isMmSelected = ref(true)

const switchToImperial = () => {
  hideDropdown()
  if (switchTo.value === 'Imperial') {
    switchTo.value = 'Metric'
    userSettingsStore.temp_unit = 'fahr'
    userSettingsStore.speed_unit = 'mph'
    userSettingsStore.length_unit = 'in'
    isCelcSelected.value = false
    isKmphSelected.value = false
    isMmSelected.value = false
  } else if (switchTo.value === 'Metric') {
    switchTo.value = 'Imperial'
    userSettingsStore.temp_unit = 'celc'
    userSettingsStore.speed_unit = 'kmph'
    userSettingsStore.length_unit = 'mm'
    isCelcSelected.value = true
    isKmphSelected.value = true
    isMmSelected.value = true
  }
}

watch([isCelcSelected, isKmphSelected, isMmSelected], ([newTemp, newSpeed, newLength]) => {
  if (newTemp === true && newSpeed === true && newLength === true) {
    switchTo.value = 'Imperial'
  } else if (newTemp === false && newSpeed === false && newLength === false) {
    switchTo.value = 'Metric'
  }
})

const changeTempUnit = (unit: string) => {
  userSettingsStore.temp_unit = unit
  isCelcSelected.value = !isCelcSelected.value
}

const changeSpeedUnit = (unit: string) => {
  userSettingsStore.speed_unit = unit
  isKmphSelected.value = !isKmphSelected.value
}

const changeLengthUnit = (unit: string) => {
  userSettingsStore.length_unit = unit
  isMmSelected.value = !isMmSelected.value
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const hideDropdown = () => {
  isOpen.value = false
}

const button = useTemplateRef('button')

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

onUnmounted(() => {
  document.removeEventListener('click', closeOnOutsideClick)
})
</script>

<template>
  <div class="relative" ref="button" @keydown.esc="isOpen = false">
    <button
      class="flex justify-center items-center bg-neutral-800 rounded-lg py-2 px-3 select-none cursor-pointer focus:outline-2 outline-offset-2 outline-neutral-0"
      @click="toggleDropdown"
    >
      <img src="/utilities-icons/icon-units.svg" />
      <p class="font-dm text-neutral-0 mx-2 text-sm font-medium">Units</p>
      <img src="/utilities-icons/icon-dropdown.svg" />
    </button>
    <div
      v-if="isOpen"
      class="absolute top-full mt-2 right-0 bg-neutral-800 border border-neutral-600 p-3 rounded-lg font-dm text-neutral-0 text-sm text-left z-10 w-max min-w-50"
    >
      <button
        class="rounded hover:bg-neutral-700 focus:bg-neutral-700 py-1 px-2 w-full text-left cursor-pointer focus:outline-2 outline-neutral-0"
        @click="switchToImperial"
      >
        Switch to {{ switchTo }}
      </button>
      <div class="border-b border-b-neutral-600 pb-1">
        <p class="text-xs opacity-70 py-0.5 px-2">Temperature</p>
        <UnitButton
          @click="changeTempUnit('celc')"
          :text="'Celsius (°C)'"
          :is-selected="isCelcSelected"
          class="rounded hover:bg-neutral-700 py-1 px-2 cursor-pointer"
        />
        <UnitButton
          @click="changeTempUnit('fahr')"
          :text="'Fahrenheit (°F)'"
          :is-selected="!isCelcSelected"
          class="rounded hover:bg-neutral-700 py-1 px-2 cursor-pointer"
        />
      </div>
      <div class="border-b border-b-neutral-600 pt-1 pb-1">
        <p class="text-xs opacity-70 py-0.5 px-2">Wind Speed</p>
        <UnitButton
          @click="changeSpeedUnit('kmph')"
          :text="'km/h'"
          :is-selected="isKmphSelected"
          class="rounded hover:bg-neutral-700 py-1 px-2 cursor-pointer"
        />
        <UnitButton
          @click="changeSpeedUnit('mph')"
          :text="'mph'"
          :is-selected="!isKmphSelected"
          class="rounded hover:bg-neutral-700 py-1 px-2 cursor-pointer"
        />
      </div>
      <div class="pt-1">
        <p class="text-xs opacity-70 py-0.5 px-2">Precipitation</p>
        <UnitButton
          @click="changeLengthUnit('mm')"
          :text="'Millimeters (mm)'"
          :is-selected="isMmSelected"
          class="rounded hover:bg-neutral-700 py-1 px-2 cursor-pointer"
        />
        <UnitButton
          @click="changeLengthUnit('in')"
          :text="'Inches (in)'"
          :is-selected="!isMmSelected"
          class="rounded hover:bg-neutral-700 py-1 px-2 cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>
