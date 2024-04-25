<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface ProgressCircleRangeProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useProgressContext } from './use-progress-context'

defineProps<ProgressCircleRangeProps>()
const progress = useProgressContext()
</script>

<template>
  <ark.div v-bind="progress.circleRangeProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
