<script setup lang="ts">
import { NumberInput } from '@ark-ui/vue/number-input'
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <p>Value: {{ value }}</p>
  <NumberInput.Root v-model="value">
    <NumberInput.Label>Label</NumberInput.Label>
    <NumberInput.Input />
    <NumberInput.Control>
      <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
      <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
    </NumberInput.Control>
  </NumberInput.Root>
</template>
