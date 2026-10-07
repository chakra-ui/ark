<script setup lang="ts">
import type { BooleanDefaults } from '../../../types.ts'
import { NumberFlow, useNumberFlow, type NumberFlowValueChangeDetails } from '../index.ts'
import type { RootProps } from '../number-flow.types.ts'

interface Props extends RootProps {
  onValueChange?: (details: NumberFlowValueChangeDetails) => void
}

const props = withDefaults(defineProps<Props>(), {
  continuous: undefined,
  trend: undefined,
  respectMotionPreference: undefined,
  live: undefined,
} satisfies BooleanDefaults<RootProps>)

const numberFlow = useNumberFlow(props)
</script>

<template>
  <NumberFlow.RootProvider :value="numberFlow">
    <NumberFlow.Segments />
    <NumberFlow.HiddenValueText />
  </NumberFlow.RootProvider>
  <button @click="numberFlow.setValue(13.5)">Update</button>
</template>
