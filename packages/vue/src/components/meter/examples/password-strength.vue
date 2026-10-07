<script setup lang="ts">
import { Meter } from '@ark-ui/vue/meter'
import { computed, ref } from 'vue'
import styles from 'styles/meter.module.css'

const score = (password: string) => {
  let points = 0
  if (password.length >= 8) points++
  if (password.length >= 12) points++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) points++
  if (/\d/.test(password)) points++
  if (/[^a-zA-Z0-9]/.test(password)) points++
  return points
}

const labels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong']

const password = ref('')
const strength = computed(() => score(password.value))
</script>

<template>
  <div :class="styles.Field">
    <input
      v-model="password"
      type="password"
      :class="styles.Input"
      placeholder="Choose a password"
      aria-label="Password"
    />
    <Meter.Root
      :class="[styles.Root, styles.Graded]"
      :modelValue="strength"
      :max="5"
      :low="2"
      :high="3"
      :optimum="5"
      :translations="{ value: ({ value }) => labels[value] }"
    >
      <Meter.Label :class="styles.Label">Strength</Meter.Label>
      <Meter.ValueText :class="styles.ValueText" />
      <Meter.Track :class="styles.Track">
        <Meter.Indicator :class="styles.Indicator" />
      </Meter.Track>
    </Meter.Root>
    <span :class="styles.Hint">Use 12 or more characters with a mix of letters, numbers and symbols.</span>
  </div>
</template>
