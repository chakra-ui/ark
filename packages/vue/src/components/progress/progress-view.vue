<script lang="ts">
import type { ViewProps } from '@zag-js/progress'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ProgressViewBaseProps extends ViewProps, PolymorphicProps {}
export interface ProgressViewProps
  extends
    ProgressViewBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useProgressContext } from './use-progress-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<ProgressViewProps>()
const progress = useProgressContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="progress.getViewProps(props)" :as-child="asChild">
    <slot />
  </ark.span>
</template>
