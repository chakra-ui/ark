<script setup lang="ts">
import { RadioGroup, useRadioGroup } from '@ark-ui/vue/radio-group'
import { ref } from 'vue'

const frameworks = ref(['React', 'Solid', 'Vue'])

const radioGroup = useRadioGroup()
</script>

<template>
  <button @click="radioGroup.focus()">Focus</button>

  <RadioGroup.RootProvider :value="radioGroup">
    <RadioGroup.Label>Framework</RadioGroup.Label>
    <RadioGroup.Indicator />
    <RadioGroup.Item v-for="framework in frameworks" :key="framework" :value="framework">
      <RadioGroup.ItemText>{{ framework }}</RadioGroup.ItemText>
      <RadioGroup.ItemControl />
      <RadioGroup.ItemHiddenInput />
    </RadioGroup.Item>
  </RadioGroup.RootProvider>
</template>
