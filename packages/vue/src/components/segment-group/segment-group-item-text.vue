<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SegmentGroupItemTextBaseProps extends PolymorphicProps {}
export interface SegmentGroupItemTextProps
  extends
    SegmentGroupItemTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useSegmentGroupContext } from './use-segment-group-context.ts'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<SegmentGroupItemTextProps>()

const segmentGroup = useSegmentGroupContext()
const itemProps = useSegmentGroupItemPropsContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="segmentGroup.getItemTextProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.span>
</template>
