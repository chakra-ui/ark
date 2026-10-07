<script setup lang="ts">
import { Meter } from '@ark-ui/vue/meter'
import { onMounted, onUnmounted, ref } from 'vue'
import styles from 'styles/meter.module.css'

const channels = ['L', 'R', 'C', 'Sub']

const sample = () => channels.map(() => Math.round(20 + Math.random() * 80))

const levels = ref(channels.map(() => 50))

let id: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  id = setInterval(() => {
    levels.value = sample()
  }, 600)
})

onUnmounted(() => clearInterval(id))
</script>

<template>
  <div :class="styles.Levels">
    <Meter.Root
      v-for="(channel, index) in channels"
      :key="channel"
      :class="[styles.Root, styles.Graded]"
      orientation="vertical"
      :modelValue="levels[index]"
      :low="60"
      :high="85"
      :optimum="30"
    >
      <Meter.Track :class="styles.Track">
        <Meter.Indicator :class="styles.Indicator" />
      </Meter.Track>
      <Meter.Label :class="styles.Label">{{ channel }}</Meter.Label>
    </Meter.Root>
  </div>
</template>
