<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ProgressTrackProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useProgressContext } from './use-progress-context'

defineProps<ProgressTrackProps>()
const progress = useProgressContext()
</script>

<template>
  <ark.div v-bind="progress.getTrackProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
