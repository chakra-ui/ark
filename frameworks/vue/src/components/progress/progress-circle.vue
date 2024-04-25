<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface ProgressCircleProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useProgressContext } from './use-progress-context'

defineProps<ProgressCircleProps>()
const progress = useProgressContext()
</script>

<template>
  <ark.svg v-bind="progress.circleProps" :as-child="asChild">
    <slot />
  </ark.svg>
</template>
