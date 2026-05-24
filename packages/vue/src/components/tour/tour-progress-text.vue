<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TourProgressTextBaseProps extends PolymorphicProps {}
export interface TourProgressTextProps
  extends
    TourProgressTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useTourContext } from './use-tour-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TourProgressTextProps>()
const tour = useTourContext()
const slots = defineSlots()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="tour.getProgressTextProps()" :as-child="asChild">
    <slot>{{ slots.default?.() || tour.getProgressText() }}</slot>
  </ark.div>
</template>
