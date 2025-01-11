<script lang="ts">
import type { HTMLAttributes } from "vue";
import type { PolymorphicProps } from "../factory";

export interface TourProgressTextBaseProps extends PolymorphicProps {}
export interface TourProgressTextProps
	extends TourProgressTextBaseProps,
		/**
		 * @vue-ignore
		 */
		HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTourContext } from './use-tour-context'
import { useForwardExpose } from '../../utils'

defineProps<TourProgressTextProps>()
const tour = useTourContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="tour.getProgressTextProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
