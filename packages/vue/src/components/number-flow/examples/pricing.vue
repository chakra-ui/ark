<script setup lang="ts">
import { NumberFlow } from '@ark-ui/vue/number-flow'
import { computed, ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

const prices = { monthly: 24, yearly: 19.2 }
const options = ['monthly', 'yearly'] as const

type Billing = keyof typeof prices

const billing = ref<Billing>('monthly')
const price = computed(() => prices[billing.value])
</script>

<template>
  <div :class="styles.Card">
    <div :class="styles.Header">
      <span :class="styles.Label">Pro plan</span>
      <div :class="styles.Toggle">
        <button
          v-for="option in options"
          :key="option"
          type="button"
          :class="styles.ToggleItem"
          :aria-pressed="billing === option"
          @click="billing = option"
        >
          {{ option === 'monthly' ? 'Monthly' : 'Yearly' }}
        </button>
      </div>
    </div>
    <div :class="styles.Price">
      <NumberFlow.Root
        :model-value="price"
        :trend="true"
        :format-options="{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }"
        :class="styles.Root"
      >
        <NumberFlow.Segments />
        <NumberFlow.HiddenValueText />
      </NumberFlow.Root>
      <span :class="styles.Period">/ month</span>
    </div>
    <span :class="styles.Caption">
      {{ billing === 'yearly' ? 'Billed $230.40 a year. You save 20%.' : 'Billed monthly. Cancel anytime.' }}
    </span>
    <button type="button" :class="button.Root" data-variant="solid">Get started</button>
  </div>
</template>
