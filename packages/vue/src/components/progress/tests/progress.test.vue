<script setup lang="ts">
import { Progress, type ProgressRootEmits, type ProgressRootProps } from '../../index.ts'
import { useForwardPropsEmits } from '../../../index.ts'

const props = defineProps<ProgressRootProps>()
const emits = defineEmits<ProgressRootEmits>()
const localProps = useForwardPropsEmits(props, emits)
</script>

<template>
  <Progress.Root v-bind="localProps">
    <Progress.Label>Label</Progress.Label>
    <Progress.ValueText />
    <Progress.View state="loading" />
    <Progress.Track>
      <Progress.Range />
    </Progress.Track>
    <Progress.Circle>
      <Progress.CircleTrack />
      <Progress.CircleRange />
    </Progress.Circle>
  </Progress.Root>
</template>
