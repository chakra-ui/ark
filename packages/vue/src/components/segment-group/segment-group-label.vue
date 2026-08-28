<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SegmentGroupLabelBaseProps extends PolymorphicProps {}
export interface SegmentGroupLabelProps
  extends
    SegmentGroupLabelBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useSegmentGroupContext } from './use-segment-group-context.ts'
import { parts } from './segment-group.anatomy.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<SegmentGroupLabelProps>()
const segmentGroup = useSegmentGroupContext()

useForwardExpose()
</script>

<template>
  <ark.span
    v-bind="segmentGroup.getLabelProps()"
    :as-child="asChild"
    :data-scope="parts.label.attrs['data-scope']"
    :data-part="parts.label.attrs['data-part']"
  >
    <slot />
  </ark.span>
</template>
