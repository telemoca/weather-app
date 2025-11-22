<script setup lang="ts">
const props = defineProps<{
  text: string
  isSelected: boolean
}>()
</script>

<template>
  <button class="flex justify-between items-center w-full gap-5 focus:outline-2 outline-neutral-0">
    <p class="whitespace-nowrap">{{ props.text }}</p>
    <img v-if="isSelected" src="/utilities-icons/icon-checkmark.svg" />
  </button>
</template>
