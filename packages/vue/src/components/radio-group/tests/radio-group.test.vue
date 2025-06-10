<script setup lang="ts">
import { ref } from 'vue'
import { RadioGroup, type RadioGroupRootEmits, type RadioGroupRootProps } from '../..'
import { useForwardPropsEmits } from '../../..'

const items = ref([
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte', disabled: true },
])

const props = defineProps<RadioGroupRootProps>()
const emits = defineEmits<RadioGroupRootEmits>()
const localProps = useForwardPropsEmits(props, emits)
</script>

<template>
  <RadioGroup.Root v-bind="localProps">
    <RadioGroup.Label>Framework</RadioGroup.Label>
    <RadioGroup.Indicator />
    <RadioGroup.Item v-for="item in items" :key="item.value" :value="item.value" :disabled="item.disabled">
      <RadioGroup.ItemText>{{ item.label }}</RadioGroup.ItemText>
      <RadioGroup.ItemControl />
      <RadioGroup.ItemHiddenInput />
    </RadioGroup.Item>
  </RadioGroup.Root>
</template>
