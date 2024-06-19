<script setup lang="ts">
import { ref } from 'vue'
import { RadioGroup } from '../..'

const frameworks = ref(['React', 'Solid', 'Vue'])
</script>

<template>
  <RadioGroup.Root model-value="Solid">
    <RadioGroup.Label>Framework</RadioGroup.Label>
    <RadioGroup.Indicator />
    <RadioGroup.Item v-for="framework in frameworks" :key="framework" :value="framework">
      <RadioGroup.ItemText>{{ framework }}</RadioGroup.ItemText>
      <RadioGroup.ItemControl />
      <RadioGroup.ItemHiddenInput />
    </RadioGroup.Item>
  </RadioGroup.Root>
</template>
