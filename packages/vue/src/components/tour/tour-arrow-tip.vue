<script lang="ts">
import type { HTMLAttributes } from "vue";
import type { PolymorphicProps } from "../factory";

export interface TourArrowTipBaseProps extends PolymorphicProps {}
export interface TourArrowTipProps
	extends TourArrowTipBaseProps,
		/**
		 * @vue-ignore
		 */
		HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTourContext } from './use-tour-context'
import { useForwardExpose } from '../../utils'

defineProps<TourArrowTipProps>()
const tour = useTourContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="tour.getArrowTipProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
