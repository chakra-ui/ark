<script lang="ts" setup>
import { ref } from 'vue'
import {
  NumberInput,
  NumberInputControl,
  NumberInputDecrementTrigger,
  NumberInputInput,
  NumberInputIncrementTrigger,
  NumberInputLabel,
  NumberInputScrubber,
} from '.'
import './number-input.css'

const value = ref('14')
</script>
<template>
  <NumberInput v-model="value" :min="-50" :max="50" clampValueOnBlur>
    <NumberInputScrubber />
    <NumberInputLabel>Label</NumberInputLabel>
    <NumberInputInput />
    <NumberInputControl>
      <NumberInputDecrementTrigger>
        <button>-1</button>
      </NumberInputDecrementTrigger>
      <NumberInputIncrementTrigger>
        <button>+1</button>
      </NumberInputIncrementTrigger>
    </NumberInputControl>
  </NumberInput>
</template>
