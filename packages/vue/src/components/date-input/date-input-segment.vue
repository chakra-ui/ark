<script lang="ts">
import type { SegmentProps } from '@zag-js/date-input'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DateInputSegmentBaseProps extends PolymorphicProps, SegmentProps {}
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
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import { useDateInputContext } from './use-date-input-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const props = defineProps<DateInputSegmentProps>()
const [segmentProps] = createSplitProps<SegmentProps>()(props, ['segment', 'index'])
const dateInput = useDateInputContext()

useForwardExpose()

const mergedProps = computed(() => dateInput.value.getSegmentProps(segmentProps))
</script>

<template>
  <ark.span v-bind="mergedProps" :as-child="asChild">{{ segmentProps.segment.text }}</ark.span>
</template>
