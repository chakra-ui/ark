<script setup lang="ts">
import { PinInput } from '@ark-ui/vue/pin-input'
import { ref } from 'vue'
import styles from 'styles/pin-input.module.css'

const expected = '1234'
const invalid = ref(false)
const verified = ref(false)

const onValueChange = () => {
  invalid.value = false
  verified.value = false
}

const onValueComplete = (details: { valueAsString: string }) => {
  const matches = details.valueAsString === expected
  invalid.value = !matches
  verified.value = matches
}
</script>

<template>
  <div class="stack">
    <PinInput.Root
      :class="styles.Root"
      :count="4"
      otp
      :invalid="invalid"
      @value-change="onValueChange"
      @value-complete="onValueComplete"
    >
      <PinInput.Label :class="styles.Label">Enter {{ expected }} to verify</PinInput.Label>
      <PinInput.Control :class="styles.Control">
        <PinInput.Input v-for="id in [0, 1, 2, 3]" :key="id" :index="id" :class="styles.Input" />
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput.Root>
    <p v-if="invalid">Invalid code</p>
    <p v-if="verified">Code verified</p>
  </div>
</template>
