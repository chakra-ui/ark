<script lang="ts">
import type { StepActionTriggerProps } from "@zag-js/tour";
import type { ButtonHTMLAttributes } from "vue";
import type { PolymorphicProps } from "../factory";

export interface TourActionTriggerBaseProps
	extends StepActionTriggerProps,
		PolymorphicProps {}
export interface TourActionTriggerProps
	extends TourActionTriggerBaseProps,
		/**
		 * @vue-ignore
		 */
		ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTourContext } from './use-tour-context'
import { useForwardExpose } from '../../utils'

const props = defineProps<TourActionTriggerBaseProps>()
const tour = useTourContext()
const slots = defineSlots()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="tour.getActionTriggerProps(props)" :as-child="asChild">
    <slot>{{ slots.default?.() || props.action.label }}</slot>
  </ark.button>
</template>
