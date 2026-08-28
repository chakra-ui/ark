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
import { parts } from './segment-group.anatomy.ts'
import { useSegmentGroupContext } from './use-segment-group-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<SegmentGroupIndicatorProps>()
const segmentGroup = useSegmentGroupContext()

useForwardExpose()
</script>

<template>
  <ark.div
    v-bind="segmentGroup.getIndicatorProps()"
    :as-child="asChild"
    :data-scope="parts.indicator.attrs['data-scope']"
    :data-part="parts.indicator.attrs['data-part']"
  >
    <slot />
  </ark.div>
</template>
