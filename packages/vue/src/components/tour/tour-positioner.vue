<script lang="ts">
import { type HTMLAttributes, computed } from "vue";
import { useRenderStrategyProps } from "../../utils";
import type { PolymorphicProps } from "../factory";

export interface TourPositionerBaseProps extends PolymorphicProps {}
export interface TourPositionerProps
	extends TourPositionerBaseProps,
		/**
		 * @vue-ignore
		 */
		HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { PresenceProvider, usePresence } from '../presence'
import { useTourContext } from './use-tour-context'
import { useForwardExpose } from '../../utils'

defineProps<TourPositionerProps>()

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
  <ark.div v-if="!presence.unmounted" v-bind="tour.getPositionerProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
