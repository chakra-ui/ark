<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface ProgressTrackProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useProgressContext } from './use-progress-context'

defineProps<ProgressTrackProps>()
const progress = useProgressContext()
</script>

<template>
  <ark.div v-bind="progress.trackProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
