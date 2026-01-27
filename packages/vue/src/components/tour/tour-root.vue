<script lang="ts">
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { RootEmits } from './tour.types'
import type { UseTourReturn } from './use-tour'

interface RootProps {
  tour: UnwrapRef<UseTourReturn>
}

export interface TourRootBaseProps extends RootProps, RenderStrategyProps {}
export interface TourRootProps extends TourRootBaseProps {}
export interface TourRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed, type UnwrapRef } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { PresenceProvider, usePresence } from '../presence'
import { TourProvider } from './use-tour-context'

const props = defineProps<TourRootProps>()
const emits = defineEmits<TourRootEmits>()

const tour = computed(() => props.tour)

const presence = usePresence(
  computed(() => ({
    present: tour.value.open,
    lazyMount: props.lazyMount,
    unmountOnExit: props.unmountOnExit,
  })),
  emits,
)

TourProvider(tour)
PresenceProvider(presence)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))

useForwardExpose()
</script>

<template>
  <slot />
</template>
