<script lang="ts">
import type { SegmentGroupProps, SegmentGroupState } from '@zag-js/date-input'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface DateInputSegmentGroupState extends SegmentGroupState {}
export interface DateInputSegmentGroupBaseProps extends PolymorphicProps, SegmentGroupProps {}
export interface DateInputSegmentGroupProps
  extends
    DateInputSegmentGroupBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { useDateInputContext } from './use-date-input-context.ts'
import { DateInputSegmentGroupPropsProvider } from './use-date-input-segment-group-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<DateInputSegmentGroupProps>()
defineSlots<PolymorphicSlots<DateInputSegmentGroupState>>()
const dateInput = useDateInputContext()
const segmentGroupProps = computed(() => ({ index: props.index }))

DateInputSegmentGroupPropsProvider(segmentGroupProps)
useForwardExpose()
</script>

<template>
  <ark.div
    v-bind="dateInput.getSegmentGroupProps(segmentGroupProps)"
    :state="dateInput.getSegmentGroupState(segmentGroupProps)"
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
