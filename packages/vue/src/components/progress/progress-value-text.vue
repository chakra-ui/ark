<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ProgressValueTextBaseProps extends PolymorphicProps {}
export interface ProgressValueTextProps
  extends
    ProgressValueTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useProgressContext } from './use-progress-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ProgressValueTextProps>()
const progress = useProgressContext()
const slots = defineSlots()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="progress.getValueTextProps()" :as-child="asChild">
    <slot>{{ slots.default?.() || progress.percentAsString }}</slot>
  </ark.span>
</template>
