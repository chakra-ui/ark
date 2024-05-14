<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface ProgressRangeProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useProgressContext } from './use-progress-context'

defineProps<ProgressRangeProps>()
const progress = useProgressContext()
</script>

<template>
  <ark.div v-bind="progress.rangeProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
