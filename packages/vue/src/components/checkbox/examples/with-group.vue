<script setup lang="ts">
import { Checkbox, CheckboxGroup } from '../..'
import { CheckIcon } from './icons'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
]
</script>

<template>
  <CheckboxGroup :defaultValue="['react']" @valueChange="console.log">
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
