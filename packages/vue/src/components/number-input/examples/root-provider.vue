<script setup lang="ts">
import { NumberInput, useNumberInput } from '@ark-ui/vue/number-input'

const numberInput = useNumberInput()
</script>

<template>
  <button @click="numberInput.focus()">Focus</button>

  <NumberInput.RootProvider :value="numberInput">
    <NumberInput.Label>Label</NumberInput.Label>
    <NumberInput.Input />
    <NumberInput.Control>
      <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
      <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
    </NumberInput.Control>
  </NumberInput.RootProvider>
</template>
