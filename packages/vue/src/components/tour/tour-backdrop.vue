<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TourBackdropBaseProps extends PolymorphicProps {}
export interface TourBackdropProps
  extends TourBackdropBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useRenderStrategyProps, useForwardExpose } from '../../utils'
import { Presence } from '../presence'
import { useTourContext } from './use-tour-context'

defineProps<TourBackdropProps>()
const tour = useTourContext()
const renderStrategy = useRenderStrategyProps()

useForwardExpose()
</script>

<template>
  <Presence
    v-if="tour.step?.backdrop"
    v-bind="tour.getBackdropProps()"
    :hidden="!tour.open"
    :present="tour.open"
    :lazy-mount="renderStrategy.lazyMount"
    :unmount-on-exit="renderStrategy.unmountOnExit"
  >
    <slot />
  </Presence>
</template>
