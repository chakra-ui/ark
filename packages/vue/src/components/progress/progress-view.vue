<script lang="ts">
import type { ViewProps } from '@zag-js/progress'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ProgressViewBaseProps extends ViewProps, PolymorphicProps {}
export interface ProgressViewProps
  extends ProgressViewBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useProgressContext } from './use-progress-context'
import { useForwardExpose } from '../../utils'

const props = defineProps<ProgressViewProps>()
const progress = useProgressContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="progress.getViewProps(props)" :as-child="asChild">
    <slot />
  </ark.span>
</template>
