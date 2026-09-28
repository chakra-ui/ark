<script lang="ts">
import type { SpotlightState } from '@zag-js/tour'
import { type HTMLAttributes, computed } from 'vue'
import { useRenderStrategyProps } from '../../utils/use-render-strategy.ts'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface TourSpotlightState extends SpotlightState {}
export interface TourSpotlightBaseProps extends PolymorphicProps {}
export interface TourSpotlightProps
  extends
    TourSpotlightBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { mergeProps } from '@zag-js/vue'
import { ark } from '../factory.ts'
import { usePresence } from '../presence/index.ts'
import { useTourContext } from './use-tour-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TourSpotlightProps>()

defineSlots<PolymorphicSlots<TourSpotlightState>>()

const tour = useTourContext()
const renderStrategy = useRenderStrategyProps()

const presence = usePresence(
  computed(() => ({
    ...renderStrategy.value,
    present: tour.value.open,
  })),
)
const mergedProps = computed(() => mergeProps(tour.value.getSpotlightProps(), presence.value.presenceProps))

useForwardExpose()
</script>

<template>
  <ark.div
    v-if="!presence.unmounted"
    v-bind="mergedProps"
    :state="tour.getSpotlightState()"
    :hidden="mergedProps.hidden || !tour.step?.target?.()"
    :as-child="asChild"
  >
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
