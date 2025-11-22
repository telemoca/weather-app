<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <div
    class="bg-neutral-800 border rounded-lg border-neutral-600 w-full p-3 pb-2 text-neutral-0 font-dm"
  >
    <p class="mb-2 opacity-70 text-xs font-medium">{{ props.title }}</p>
    <p class="text-lg">—</p>
  </div>
</template>
