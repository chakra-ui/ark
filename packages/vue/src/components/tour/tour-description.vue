<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TourDescriptionBaseProps extends PolymorphicProps {}
export interface TourDescriptionProps
  extends TourDescriptionBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTourContext } from './use-tour-context'
import { useForwardExpose } from '../../utils'

defineProps<TourDescriptionProps>()
const tour = useTourContext()
const slots = defineSlots()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="tour.getDescriptionProps()" :as-child="asChild">
    <slot>{{ slots.default?.() || tour.step?.title }}</slot>
  </ark.div>
</template>
