<script lang="ts">
import type { RenderStrategyProps } from "../../utils";
import type { RootEmits } from "./tour.types";
import type { UseTourReturn } from "./use-tour";

interface RootProps {
	tour: UnwrapRef<UseTourReturn>;
}

export interface TourRootBaseProps extends RootProps, RenderStrategyProps {}
export interface TourRootProps extends TourRootBaseProps {}
export interface TourRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed, type UnwrapRef } from 'vue'
import { RenderStrategyPropsProvider, useForwardExpose } from '../../utils'
import { TourProvider } from './use-tour-context'

const props = defineProps<TourRootProps>()
const tour = computed(() => props.tour)

TourProvider(tour)
RenderStrategyPropsProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)

useForwardExpose()
</script>

<template>
  <slot />
</template>
