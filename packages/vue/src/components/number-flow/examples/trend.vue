<script setup lang="ts">
import { NumberFlow } from '@ark-ui/vue/number-flow'
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-vue-next'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import styles from 'styles/number-flow.module.css'

const open = 182.4

const price = ref(open)
const change = computed(() => (price.value - open) / open)
const direction = computed(() => (change.value >= 0 ? 'up' : 'down'))

let id: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  id = setInterval(() => {
    price.value = Math.max(1, price.value + (Math.random() - 0.48) * 3)
  }, 1600)
})

onUnmounted(() => clearInterval(id))
</script>

<template>
  <div :class="styles.Card">
    <div :class="styles.Header">
      <span :class="styles.Label">ARK · Nasdaq</span>
      <span :class="styles.Badge" :data-trend="direction">
        <TrendingUpIcon v-if="direction === 'up'" />
        <TrendingDownIcon v-else />
        <NumberFlow.Root
          :model-value="change"
          :format-options="{
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            signDisplay: 'always',
          }"
          :class="styles.Root"
        >
          <NumberFlow.Segments />
          <NumberFlow.HiddenValueText />
        </NumberFlow.Root>
      </span>
    </div>
    <NumberFlow.Root
      v-model="price"
      :trend="true"
      :format-options="{ style: 'currency', currency: 'USD' }"
      :class="[styles.Root, styles.Display, styles.Trend]"
    >
      <NumberFlow.Segments />
      <NumberFlow.HiddenValueText />
    </NumberFlow.Root>
    <span :class="styles.Caption">Digits roll in the direction the price moved.</span>
  </div>
</template>
