<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ProgressCircleRangeBaseProps extends PolymorphicProps {}
export interface ProgressCircleRangeProps
  extends ProgressCircleRangeBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useProgressContext } from './use-progress-context'
import { useForwardExpose } from '../../utils'

defineProps<ProgressCircleRangeProps>()
const progress = useProgressContext()

useForwardExpose()
</script>

<template>
  <ark.circle v-bind="progress.getCircleRangeProps()" :as-child="asChild">
    <slot />
  </ark.circle>
</template>
