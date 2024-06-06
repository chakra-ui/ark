<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ProgressCircleTrackProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useProgressContext } from './use-progress-context'

defineProps<ProgressCircleTrackProps>()
const progress = useProgressContext()
</script>

<template>
  <ark.circle v-bind="progress.getCircleTrackProps()" :as-child="asChild">
    <slot />
  </ark.circle>
</template>
