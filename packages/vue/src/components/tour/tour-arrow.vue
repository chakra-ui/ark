<script lang="ts">
import type { HTMLAttributes } from "vue";
import type { PolymorphicProps } from "../factory";

export interface TourArrowBaseProps extends PolymorphicProps {}
export interface TourArrowProps
	extends TourArrowBaseProps,
		/**
		 * @vue-ignore
		 */
		HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTourContext } from './use-tour-context'
import { useForwardExpose } from '../../utils'

defineProps<TourArrowProps>()
const tour = useTourContext()

useForwardExpose()
</script>

<template>
  <ark.div v-if="tour.step?.arrow" v-bind="tour.getArrowProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
