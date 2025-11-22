<script setup lang="ts">
import AdaptativeWeatherIcon from './AdaptativeWeatherIcon.vue';

</script>



<template>
  <div
    class="bg-neutral-700 border rounded-lg border-neutral-600 w-full p-1 pr-4 mb-2 last:mb-0 text-neutral-0 font-dm flex justify-between items-center"
  >
    <div class="flex items-center">
      <AdaptativeWeatherIcon :weather_code="0" class="w-10 h-10 select-none opacity-0" />
      <p class="text-nowrap select-none opacity-0">0 PM</p>
    </div>
    <p class="text-sm text-right w-8 select-none opacity-0">0</p>
  </div>
</template>
