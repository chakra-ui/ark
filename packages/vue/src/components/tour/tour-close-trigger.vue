<script lang="ts">
import type { ButtonHTMLAttributes } from "vue";
import type { PolymorphicProps } from "../factory";

export interface TourCloseTriggerBaseProps extends PolymorphicProps {}
export interface TourCloseTriggerProps
	extends TourCloseTriggerBaseProps,
		/**
		 * @vue-ignore
		 */
		ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTourContext } from './use-tour-context'
import { useForwardExpose } from '../../utils'

defineProps<TourCloseTriggerProps>()
const tour = useTourContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="tour.getCloseTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
