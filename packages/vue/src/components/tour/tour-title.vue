<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TourTitleBaseProps extends PolymorphicProps {}
export interface TourTitleProps
  extends TourTitleBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTourContext } from './use-tour-context'
import { useForwardExpose } from '../../utils'

defineProps<TourTitleProps>()
const tour = useTourContext()
const slots = defineSlots()

useForwardExpose()
</script>

<template>
  <ark.h2 v-bind="tour.getTitleProps()" :as-child="asChild">
    <slot>{{ slots.default?.() || tour.step?.title }}</slot>
  </ark.h2>
</template>
