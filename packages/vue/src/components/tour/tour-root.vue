<script lang="ts">
import type { BooleanDefaults } from '../../types'
import type { RenderStrategyProps } from '../../utils'
import type { RootEmits, RootProps } from './tour.types'

export interface TourRootBaseProps extends RootProps, RenderStrategyProps {}
export interface TourRootProps extends TourRootBaseProps {}
export interface TourRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider, useForwardExpose } from '../../utils'
import { useTour } from './use-tour'
import { TourProvider } from './use-tour-context'

const props = withDefaults(defineProps<TourRootProps>(), {
  closeOnEscape: undefined,
  closeOnInteractOutside: undefined,
  keyboardNavigation: undefined,
  preventInteraction: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<TourRootEmits>()
const tour = useTour(props, emits)

TourProvider(tour)
RenderStrategyPropsProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)

useForwardExpose()
</script>

<template>
  <slot />
</template>
