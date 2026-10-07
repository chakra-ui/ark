<script setup lang="ts">
import { NumberFlow } from '@ark-ui/vue/number-flow'
import { onMounted, onUnmounted, ref } from 'vue'
import styles from 'styles/number-flow.module.css'

const throughput = ref(1280)
const latency = ref(42)

let id: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  id = setInterval(() => {
    throughput.value = Math.round(900 + Math.random() * 900)
    latency.value = Math.round(20 + Math.random() * 60)
  }, 2000)
})

onUnmounted(() => clearInterval(id))
</script>

<template>
  <div :class="styles.Grid">
    <div :class="styles.Stat">
      <span :class="styles.Label">Throughput</span>
      <NumberFlow.Root v-model="throughput" prefix="~" suffix=" req/s" :class="styles.Root">
        <NumberFlow.Segments />
        <NumberFlow.HiddenValueText />
      </NumberFlow.Root>
    </div>
    <div :class="styles.Stat">
      <span :class="styles.Label">p95 latency</span>
      <NumberFlow.Root v-model="latency" suffix=" ms" :class="styles.Root">
        <NumberFlow.Segments />
        <NumberFlow.HiddenValueText />
      </NumberFlow.Root>
    </div>
  </div>
</template>
