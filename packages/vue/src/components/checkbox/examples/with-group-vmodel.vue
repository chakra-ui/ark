<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox, CheckboxGroup } from '../..'
import { CheckIcon } from './icons'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
]

const value = ref<string[]>([])
</script>

<template>
  <pre>{{ value.join(', ') }}</pre>
  <CheckboxGroup v-model="value">
    <div>Choose your favorite framework:</div>
    <div style="display: flex; gap: 20px; margin: 12px">
      <Checkbox.Root v-for="item in items" :value="item.value" :key="item.value">
        <Checkbox.Label>{{ item.label }}</Checkbox.Label>
        <Checkbox.Control>
          <Checkbox.Indicator>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.HiddenInput />
      </Checkbox.Root>
    </div>
  </CheckboxGroup>
</template>
