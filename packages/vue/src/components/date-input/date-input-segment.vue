<script lang="ts">
import type { SegmentProps, SegmentState } from '@zag-js/date-input'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface DateInputSegmentState extends SegmentState {}
export interface DateInputSegmentBaseProps extends PolymorphicProps, Pick<SegmentProps, 'segment'> {}
export interface DateInputSegmentProps
  extends
    DateInputSegmentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { useDateInputContext } from './use-date-input-context.ts'
import { useDateInputSegmentGroupPropsContext } from './use-date-input-segment-group-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<DateInputSegmentProps>()
defineSlots<PolymorphicSlots<DateInputSegmentState>>()
const segmentGroupProps = useDateInputSegmentGroupPropsContext()
const dateInput = useDateInputContext()

useForwardExpose()

type IndexedSegment = SegmentProps['segment'] & { index?: number }

const currentSegment = computed(() => {
  const segments = dateInput.value.getSegments(segmentGroupProps!.value)
  // `type` alone doesn't identify a segment, since multiple segments can share it (e.g. `literal`)
  const index = (props.segment as IndexedSegment).index
  return (typeof index === 'number' ? segments[index] : undefined) ?? props.segment
})

const segmentArgs = computed(() => ({
  segment: currentSegment.value,
  index: segmentGroupProps!.value.index,
}))

const mergedProps = computed(() => dateInput.value.getSegmentProps(segmentArgs.value))
</script>

<template>
  <ark.span v-bind="mergedProps" :state="dateInput.getSegmentState(segmentArgs)" :as-child="asChild">
    {{ currentSegment.text }}
  </ark.span>
</template>
