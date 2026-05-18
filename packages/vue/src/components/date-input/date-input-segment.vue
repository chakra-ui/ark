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
import { createSplitProps } from '../create-split-props.ts'
import { ark } from '../factory.ts'
import { useDateInputContext } from './use-date-input-context.ts'
import { useDateInputSegmentGroupPropsContext } from './use-date-input-segment-group-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<DateInputSegmentProps>()
const [segmentProps] = createSplitProps<Pick<SegmentProps, 'segment'>>()(props, ['segment'])
const segmentGroupProps = useDateInputSegmentGroupPropsContext()
const dateInput = useDateInputContext()

useForwardExpose()

const mergedProps = computed(() =>
  dateInput.value.getSegmentProps({ ...segmentProps, index: segmentGroupProps!.value.index }),
)
</script>

<template>
  <ark.span v-bind="mergedProps" :as-child="asChild">{{ segmentProps.segment.text }}</ark.span>
</template>
