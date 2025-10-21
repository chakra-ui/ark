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
import { mergeProps } from '@zag-js/vue'
import { computed } from 'vue'
import { useRenderStrategyProps } from '../../utils/use-render-strategy'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { usePresence } from '../presence'
import { ark } from '../factory'
import { useTourContext } from './use-tour-context'

defineProps<TourBackdropProps>()

const tour = useTourContext()
const renderStrategy = useRenderStrategyProps()

const presence = usePresence(
  computed(() => ({
    ...renderStrategy.value,
    present: tour.value.open,
  })),
)

const mergedProps = computed(() => mergeProps(tour.value.getBackdropProps(), presence.value.presenceProps))

useForwardExpose()
</script>

<template>
  <ark.div v-if="tour.step?.backdrop && !presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
