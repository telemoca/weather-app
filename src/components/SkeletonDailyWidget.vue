<script setup lang="ts">
import AdaptativeWeatherIcon from './AdaptativeWeatherIcon.vue'
</script>

<template>
  <div
    class="flex flex-col grow justify-between bg-neutral-800 border rounded-lg border-neutral-600 w-fit max-md:w-full p-3 text-neutral-0 font-dm"
  >
    <p class="mb-2 text-xs text-center font-medium select-none opacity-0">text</p>
    <AdaptativeWeatherIcon :weather_code="0" class="w-20 h-20 mx-auto select-none opacity-0" />
    <div class="flex justify-between items-center gap-2 select-none opacity-0">
      <p class="text-sm select-none opacity-0">0</p>
      <p class="text-sm select-none opacity-0">0</p>
    </div>
  </div>
</template>
