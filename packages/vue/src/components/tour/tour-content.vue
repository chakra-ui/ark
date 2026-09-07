<script lang="ts">
import type { ContentState } from '@zag-js/tour'
import { mergeProps } from '@zag-js/vue'
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'

export interface TourContentState extends ContentState {}
export interface TourContentBaseProps extends PolymorphicProps {}
export interface TourContentProps
  extends
    TourContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useTourContext } from './use-tour-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TourContentProps>()

defineSlots<PolymorphicSlots<TourContentState>>()

const tour = useTourContext()
const presence = usePresenceContext()
const mergedProps = computed(() => mergeProps(tour.value.getContentProps(), presence.value.presenceProps))

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild" :state="tour.getContentState()">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
