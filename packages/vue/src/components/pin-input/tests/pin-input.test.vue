<script setup lang="ts">
import { PinInput, type PinInputRootEmits, type PinInputRootProps } from '../../index.ts'
import { useForwardPropsEmits } from '../../../index.ts'

const props = defineProps<PinInputRootProps>()
const emits = defineEmits<PinInputRootEmits>()
const localProps = useForwardPropsEmits(props, emits)
</script>

<template>
  <PinInput.Root :count="3" v-bind="localProps">
    <PinInput.Label>Label</PinInput.Label>
    <PinInput.Control>
      <PinInput.Input v-for="id in [0, 1, 2]" :key="id" :index="id" />
    </PinInput.Control>
    <PinInput.HiddenInput />
  </PinInput.Root>
</template>
