<script setup lang="ts">
import { useMeteoStore } from '@/stores/meteo-store'
import { onUnmounted, ref, useTemplateRef, watch } from 'vue'

const emits = defineEmits(['day-selected'])
const meteoStore = useMeteoStore()

const daysOfTheWeek = () => {
  const userLang = navigator.language ?? 'en-US'
  const formatter = new Intl.DateTimeFormat(userLang, { weekday: 'long' })

  const days = []
  for (let i = 0; i < 7; i++) {
    const date = new Date()
    days.push(formatter.format(date.setDate(date.getDate() + i)))
  }
  const capitalizeDays = days.map((day) => day.charAt(0).toLocaleUpperCase() + day.slice(1))
  return capitalizeDays
}

const isOpen = ref(false)
const selectedDay = ref(daysOfTheWeek()[0])

const toggleDropdown = () => {
  if (meteoStore.isReadyToDisplay) {
    isOpen.value = !isOpen.value
  }
}

const hideDropdown = () => {
  isOpen.value = false
}

const choseDay = (day: string, index: number) => {
  selectedDay.value = day
  emits('day-selected', index)
  hideDropdown()
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
      class="flex justify-between bg-neutral-600 rounded-md py-1 cursor-pointer select-none focus:outline-2 outline-offset-2 outline-neutral-0"
      @click="toggleDropdown"
    >
      <p class="text-sm font-normal mx-3">{{ meteoStore.isReadyToDisplay ? selectedDay : '—' }}</p>
      <img src="/utilities-icons/icon-dropdown.svg" class="mr-3" />
    </button>
    <div
      v-if="isOpen"
      class="absolute top-full mt-2 right-0 bg-neutral-800 border border-neutral-600 rounded-lg p-2 cursor-pointer"
    >
      <button
        v-for="(day, index) in daysOfTheWeek()"
        :key="day"
        @click="choseDay(day, index)"
        class="w-full text-sm font-normal text-left select-none rounded p-1 pl-2 pr-10 mb-0.5 last:mb-0 hover:bg-neutral-700 focus:outline-2 outline-neutral-0"
      >
        {{ day }}
      </button>
    </div>
  </div>
</template>
