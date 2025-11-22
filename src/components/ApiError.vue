<script setup lang="ts">
import { useMeteoStore } from '@/stores/meteo-store'

const meteoStore = useMeteoStore()
</script>

<template>
  <div class="font-dm flex flex-col items-center mt-20">
    <img src="/utilities-icons/icon-error.svg" class="w-8" />
    <h1 class="text-neutral-0 font-grotesque text-4xl font-semibold mt-5">Something went wrong</h1>
    <p class="mt-5 text-neutral-200 text-center">
      We couldn't connect to the server (API error). Please try <br />
      again in a few moments.
    </p>

    <button
      class="flex gap-2 py-1.5 px-3 mt-5 text-neutral-0 bg-neutral-800 rounded hover:cursor-pointer hover:scale-115 transition duration-300 ease-in-out"
      @click="((meteoStore.isAPIWorking = true), (meteoStore.noCityFound = true))"
    >
      <img src="/utilities-icons/icon-retry.svg" class="w-4" />
      Retry
    </button>
  </div>
</template>
