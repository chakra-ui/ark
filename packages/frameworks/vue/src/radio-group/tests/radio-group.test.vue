<script setup lang="ts">
import { RadioGroup } from '../'

const frameworks = ['React', 'Solid', 'Svelte', 'Vue']
</script>

<template>
  <RadioGroup.Root>
    <RadioGroup.Label>Framework</RadioGroup.Label>
    <RadioGroup.Indicator />
    <RadioGroup.Item
      v-for="framework in frameworks"
      :key="framework"
      :value="framework"
      :disabled="framework === 'Svelte'"
    >
      <RadioGroup.ItemText>{{ framework }}</RadioGroup.ItemText>
      <RadioGroup.ItemControl />
    </RadioGroup.Item>
  </RadioGroup.Root>
</template>
