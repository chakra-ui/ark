<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TourArrowTipBaseProps extends PolymorphicProps {}
export interface TourArrowTipProps
  extends
    TourArrowTipBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useTourContext } from './use-tour-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TourArrowTipProps>()
const tour = useTourContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="tour.getArrowTipProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
