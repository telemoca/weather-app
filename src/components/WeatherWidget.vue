<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  value: number
  unit: string
}>()

const formattedValue = computed(() => {
  if (['°', '%'].includes(props.unit)) {
    return `${props.value}${props.unit}`
  } else {
    return `${props.value} ${props.unit}`
  }
})
</script>

<template>
  <div
    class="bg-neutral-800 border rounded-lg border-neutral-600 w-full p-3 pb-2 text-neutral-0 font-dm"
  >
    <p class="mb-2 opacity-70 text-xs font-medium">{{ props.title }}</p>
    <p class="text-lg">{{ formattedValue }}</p>
  </div>
</template>
