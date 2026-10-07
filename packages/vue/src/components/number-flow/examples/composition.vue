<script setup lang="ts">
import { NumberFlow } from '@ark-ui/vue/number-flow'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

const value = ref(1299.99)
</script>

<template>
  <div :class="styles.Card">
    <span :class="styles.Label">Total due</span>
    <NumberFlow.Root
      v-model="value"
      :format-options="{ style: 'currency', currency: 'USD' }"
      :class="[styles.Root, styles.Display]"
    >
      <NumberFlow.Segments v-slot="{ segment }">
        <NumberFlow.Digit
          v-if="segment.kind === 'digit'"
          :segment="segment"
          :class="segment.place < 0 ? styles.Fraction : undefined"
        />
        <NumberFlow.Symbol
          v-else
          :segment="segment"
          :class="segment.type === 'currency' ? styles.Currency : undefined"
        />
      </NumberFlow.Segments>
      <NumberFlow.HiddenValueText />
    </NumberFlow.Root>
    <button type="button" :class="button.Root" @click="value = Math.round(Math.random() * 500_000) / 100">
      Update total
    </button>
  </div>
</template>
