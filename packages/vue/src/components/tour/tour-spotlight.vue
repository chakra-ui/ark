<script lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { useRenderStrategyProps } from '../../utils/use-render-strategy'
import type { PolymorphicProps } from '../factory'

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
import { ark } from '../factory'
import { PresenceProvider, usePresence } from '../presence'
import { useTourContext } from './use-tour-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

defineProps<TourSpotlightProps>()

const tour = useTourContext()
const renderStrategy = useRenderStrategyProps()

const presence = usePresence(
  computed(() => ({
    ...renderStrategy.value,
    present: tour.value.open,
  })),
)
PresenceProvider(presence)

useForwardExpose()
</script>

<template>
  <ark.div
    v-if="!presence.unmounted"
    v-bind="tour.getSpotlightProps()"
    :hidden="!tour.open || !tour.step?.target?.()"
    :as-child="asChild"
  >
    <slot />
  </ark.div>
</template>
