<script lang="ts">
import type * as dateInput from '@zag-js/date-input'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DateInputSegmentBaseProps extends PolymorphicProps {
  segment: dateInput.DateSegment
  index?: number
}
export interface DateInputSegmentProps
  extends
    DateInputSegmentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDateInputContext } from './use-date-input-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const props = defineProps<DateInputSegmentProps>()
const dateInput = useDateInputContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="dateInput.getSegmentProps({ segment, index })" :as-child="asChild">{{ segment.text }}</ark.span>
</template>
