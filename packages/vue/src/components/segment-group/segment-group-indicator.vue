<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SegmentGroupIndicatorBaseProps extends PolymorphicProps {}
export interface SegmentGroupIndicatorProps
  extends SegmentGroupIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { parts } from './segment-group.anatomy'
import { useSegmentGroupContext } from './use-segment-group-context'

defineProps<SegmentGroupIndicatorProps>()
const segmentGroup = useSegmentGroupContext()
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
