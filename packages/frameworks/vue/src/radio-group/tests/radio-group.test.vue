<script setup lang="ts">
import { ref } from 'vue'
import { RadioGroup } from '../'

const items = ref([
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte', disabled: true },
])
</script>

<template>
  <RadioGroup.Root>
    <RadioGroup.Label>Framework</RadioGroup.Label>
    <RadioGroup.Indicator />
    <RadioGroup.Item
      v-for="item in items"
      :key="item.value"
      :value="item.value"
      :disabled="item.disabled"
    >
      <RadioGroup.ItemText>{{ item.label }}</RadioGroup.ItemText>
      <RadioGroup.ItemControl />
    </RadioGroup.Item>
  </RadioGroup.Root>
</template>
