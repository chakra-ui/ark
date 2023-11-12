<script setup lang="ts">
import { ref } from 'vue'
import { RadioGroup } from './'
import './radio-group.css'

const frameworks = ref(['React', 'Solid', 'Vue'])
</script>

<template>
  <Story title="Radio Group">
    <Variant title="Basic">
      <RadioGroup.Root>
        <RadioGroup.Label>Framework</RadioGroup.Label>
        <RadioGroup.Indicator />
        <RadioGroup.Item v-for="framework in frameworks" :key="framework" :value="framework">
          <RadioGroup.ItemText>{{ framework }}</RadioGroup.ItemText>
          <RadioGroup.ItemControl />
        </RadioGroup.Item>
      </RadioGroup.Root>
    </Variant>
  </Story>
</template>
