<script lang="ts">
import type { SegmentProps } from '@zag-js/date-input'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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
const segmentGroupProps = useDateInputSegmentGroupPropsContext()
const dateInput = useDateInputContext()

useForwardExpose()

const currentSegment = computed(() => {
  const segments = dateInput.value.getSegments(segmentGroupProps!.value)
  return segments.find((s) => s.type === props.segment.type) ?? props.segment
})

const mergedProps = computed(() =>
  dateInput.value.getSegmentProps({ segment: currentSegment.value, index: segmentGroupProps!.value.index }),
)
</script>

<template>
  <ark.span v-bind="mergedProps" :as-child="asChild">{{ currentSegment.text }}</ark.span>
</template>
