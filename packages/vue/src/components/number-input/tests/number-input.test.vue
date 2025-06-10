<script lang="ts" setup>
import { NumberInput, type NumberInputRootEmits, type NumberInputRootProps } from '../..'
import { useForwardPropsEmits } from '../../..'

const props = defineProps<NumberInputRootProps>()
const emits = defineEmits<NumberInputRootEmits>()
const localProps = useForwardPropsEmits(props, emits)
</script>

<template>
  <NumberInput.Root v-bind="localProps">
    <NumberInput.Label>
      Label:
      <NumberInput.ValueText />
    </NumberInput.Label>
    <NumberInput.Input />
    <NumberInput.Scrubber />
    <NumberInput.Control>
      <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
      <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
    </NumberInput.Control>
  </NumberInput.Root>
</template>
