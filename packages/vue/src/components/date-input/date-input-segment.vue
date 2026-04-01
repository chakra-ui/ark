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
import { ark } from '../factory'
import { useDateInputContext } from './use-date-input-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const props = defineProps<DateInputSegmentProps>()
const dateInput = useDateInputContext()

useForwardExpose()

const segmentProps = computed(() => dateInput.value.getSegmentProps({ segment: props.segment, index: props.index }))
</script>

<template>
  <ark.span v-bind="segmentProps" :as-child="asChild">{{ segment.text }}</ark.span>
</template>
