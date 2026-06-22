<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SegmentGroupIndicatorBaseProps extends PolymorphicProps {}
export interface SegmentGroupIndicatorProps
  extends
    SegmentGroupIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useSegmentGroupContext } from './use-segment-group-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<SegmentGroupIndicatorProps>()
const segmentGroup = useSegmentGroupContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="segmentGroup.getIndicatorProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
