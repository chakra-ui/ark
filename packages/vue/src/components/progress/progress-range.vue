<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ProgressRangeBaseProps extends PolymorphicProps {}
export interface ProgressRangeProps
  extends ProgressRangeBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useProgressContext } from './use-progress-context'
import { useForwardExpose } from '../../utils'

defineProps<ProgressRangeProps>()
const progress = useProgressContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="progress.getRangeProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
