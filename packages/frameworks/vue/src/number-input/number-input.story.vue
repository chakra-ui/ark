<script lang="ts" setup>
import { ref } from 'vue'
import {
  NumberInput,
  NumberInputControl,
  NumberInputDecrementTrigger,
  NumberInputIncrementTrigger,
  NumberInputInput,
  NumberInputLabel,
  NumberInputScrubber,
} from '.'
import './number-input.css'
const val = ref('1.00')
</script>

<template>
  <Story title="Number Input">
    <Variant title="Basic">
      <NumberInput>
        <NumberInputScrubber />
        <NumberInputLabel>Label</NumberInputLabel>
        <NumberInputInput />
        <NumberInputControl>
          <NumberInputDecrementTrigger>-1</NumberInputDecrementTrigger>
          <NumberInputIncrementTrigger>+1</NumberInputIncrementTrigger>
        </NumberInputControl>
      </NumberInput>
    </Variant>

    <Variant title="FractionDigits">
      <NumberInput v-model="val" :minFractionDigits="2" :maxFractionDigits="3">
        <NumberInputScrubber />
        <NumberInputLabel>Label</NumberInputLabel>
        <NumberInputInput />
        <NumberInputControl>
          <NumberInputDecrementTrigger>-1</NumberInputDecrementTrigger>
          <NumberInputIncrementTrigger>+1</NumberInputIncrementTrigger>
        </NumberInputControl>
      </NumberInput>
    </Variant>
  </Story>
</template>
