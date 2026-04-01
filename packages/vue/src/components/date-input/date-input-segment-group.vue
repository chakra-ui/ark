<script lang="ts">
import type { SegmentGroupProps } from '@zag-js/date-input'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

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
import { ark } from '../factory'
import { useDateInputContext } from './use-date-input-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const props = defineProps<DateInputSegmentGroupProps>()
const dateInput = useDateInputContext()
const segmentGroupProps = { index: props.index }

useForwardExpose()
</script>

<template>
  <ark.div v-bind="dateInput.getSegmentGroupProps(segmentGroupProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
