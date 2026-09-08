<script lang="ts">
import type { PositionerState } from '@zag-js/tour'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface TourPositionerState extends PositionerState {}
export interface TourPositionerBaseProps extends PolymorphicProps {}
export interface TourPositionerProps
  extends
    TourPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'
import { useTourContext } from './use-tour-context.ts'

defineProps<TourPositionerProps>()

defineSlots<PolymorphicSlots<TourPositionerState>>()

const tour = useTourContext()
const presence = usePresenceContext()

useForwardExpose()
</script>

<template>
  <ark.div
    v-if="!presence.unmounted"
    v-bind="tour.getPositionerProps()"
    :state="tour.getPositionerState()"
    :as-child="asChild"
  >
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
