<script setup lang="ts">
import { RadioGroup } from '@ark-ui/vue/radio-group'
import { ref } from 'vue'

const frameworks = ref(['React', 'Solid', 'Vue', 'Svelte'])
</script>

<template>
  <RadioGroup.Root>
    <RadioGroup.Label>Framework</RadioGroup.Label>
    <RadioGroup.Indicator />
    <RadioGroup.Item v-for="framework in frameworks" :key="framework" :value="framework">
      <RadioGroup.ItemText>{{ framework }}</RadioGroup.ItemText>
      <RadioGroup.ItemControl />
      <RadioGroup.ItemHiddenInput />
    </RadioGroup.Item>
  </RadioGroup.Root>
</template>
