<script setup lang="ts">
import { ref } from 'vue'
import {
  RadioGroup,
  RadioGroupLabel,
  Radio,
  RadioLabel,
  RadioInput,
  RadioControl,
  type RadioGroupProps,
} from '../index'

const options = [
  { id: 'apple', label: 'Apples' },
  { id: 'orange', label: 'Oranges' },
  { id: 'mango', label: 'Mangoes' },
  { id: 'grape', label: 'Grapes' },
]

const currentValue = ref<RadioGroupProps['modelValue']>('apple')
</script>
<template>
  <RadioGroup v-model="currentValue">
    <RadioGroupLabel as="h3">Fruits: {{ currentValue }}</RadioGroupLabel>
    <Radio
      v-for="(option, idx) in options"
      :key="idx"
      :value="option.id"
      :disabled="option.id === 'mango'"
      :style="{ fontWeight: option.id === currentValue ? 'bold' : 'inherit' }"
    >
      <RadioLabel>{{ option.label }}</RadioLabel>
      <RadioInput />
      <RadioControl />
    </Radio>
  </RadioGroup>
</template>
