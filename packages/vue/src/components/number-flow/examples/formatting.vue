<script setup lang="ts">
import { NumberFlow } from '@ark-ui/vue/number-flow'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

const random = (min: number, max: number) => Math.random() * (max - min) + min

const revenue = ref(48250.75)
const growth = ref(0.124)
const visitors = ref(1_284_000)

const shuffle = () => {
  revenue.value = random(20_000, 90_000)
  growth.value = random(-0.2, 0.4)
  visitors.value = random(200_000, 9_000_000)
}
</script>

<template>
  <div class="stack">
    <div :class="styles.Grid">
      <div :class="styles.Stat">
        <span :class="styles.Label">Revenue</span>
        <NumberFlow.Root
          v-model="revenue"
          :format-options="{ style: 'currency', currency: 'USD' }"
          :class="styles.Root"
        >
          <NumberFlow.Segments />
          <NumberFlow.HiddenValueText />
        </NumberFlow.Root>
      </div>
      <div :class="styles.Stat">
        <span :class="styles.Label">Growth</span>
        <NumberFlow.Root
          v-model="growth"
          :format-options="{ style: 'percent', maximumFractionDigits: 1, signDisplay: 'exceptZero' }"
          :class="[styles.Root, styles.Trend]"
        >
          <NumberFlow.Segments />
          <NumberFlow.HiddenValueText />
        </NumberFlow.Root>
      </div>
      <div :class="styles.Stat">
        <span :class="styles.Label">Visitors</span>
        <NumberFlow.Root
          v-model="visitors"
          :format-options="{ notation: 'compact', maximumFractionDigits: 1 }"
          :class="styles.Root"
        >
          <NumberFlow.Segments />
          <NumberFlow.HiddenValueText />
        </NumberFlow.Root>
      </div>
    </div>
    <button type="button" :class="button.Root" @click="shuffle">Shuffle</button>
  </div>
</template>
