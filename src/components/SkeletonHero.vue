<script setup lang="ts">
import { motion } from 'motion-v'
</script>

<template>
  <div class="relative w-full">
    <div class="w-full bg-neutral-800 rounded-lg aspect-800/286 max-sm:aspect-343/286">
      <div class="absolute top-1/2 left-1/2 -translate-1/2 flex justify-between gap-2">
        <motion.div
          v-for="index in 3"
          :key="index"
          class="w-3 h-3 rounded-full bg-neutral-400"
          :initial="{ y: 0 }"
          :animate="{ y: [0, -10, 0] }"
          :transition="{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.15,
          }"
        ></motion.div>
        <p
          class="absolute left-1/2 -translate-x-1/2 top-full mt-2 font-dm text-nowrap text-neutral-400"
        >
          Loading...
        </p>
      </div>
    </div>
  </div>
</template>
