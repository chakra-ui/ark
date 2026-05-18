<script setup lang="ts">
import { SignaturePad, type SignaturePadRootEmits, type SignaturePadRootProps } from '../../index.ts'
import { useForwardPropsEmits } from '../../../index.ts'

const props = defineProps<SignaturePadRootProps>()
const emits = defineEmits<SignaturePadRootEmits>()
const localProps = useForwardPropsEmits(props, emits)
</script>

<template>
  <SignaturePad.Root v-bind="localProps">
    <SignaturePad.Label>Sign below</SignaturePad.Label>
    <SignaturePad.Control>
      <SignaturePad.Segment />
      <SignaturePad.ClearTrigger>Clear</SignaturePad.ClearTrigger>
      <SignaturePad.Guide />
    </SignaturePad.Control>
  </SignaturePad.Root>
</template>
