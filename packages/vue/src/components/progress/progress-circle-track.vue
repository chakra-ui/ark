<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ProgressCircleTrackBaseProps extends PolymorphicProps {}
export interface ProgressCircleTrackProps
  extends ProgressCircleTrackBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useProgressContext } from './use-progress-context'
import { useForwardExpose } from '../../utils'

defineProps<ProgressCircleTrackProps>()
const progress = useProgressContext()

useForwardExpose()
</script>

<template>
  <ark.circle v-bind="progress.getCircleTrackProps()" :as-child="asChild">
    <slot />
  </ark.circle>
</template>
