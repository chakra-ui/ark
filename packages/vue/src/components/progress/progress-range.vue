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

defineProps<ProgressRangeProps>()
const progress = useProgressContext()
</script>

<template>
  <ark.div v-bind="progress.getRangeProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
