<script lang="ts">
import type { HTMLAttributes } from "vue";
import type { PolymorphicProps } from "../factory";

export interface TourControlBaseProps extends PolymorphicProps {}
export interface TourControlProps
	extends TourControlBaseProps,
		/**
		 * @vue-ignore
		 */
		HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useForwardExpose } from '../../utils'
import { tourAnatomy } from './tour.anatomy'

defineProps<TourControlProps>()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="{ ...tourAnatomy.build().control.attrs }" :as-child="asChild">
    <slot />
  </ark.div>
</template>
