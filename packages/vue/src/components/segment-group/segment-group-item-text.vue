<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SegmentGroupItemTextBaseProps extends PolymorphicProps {}
export interface SegmentGroupItemTextProps
  extends SegmentGroupItemTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context'
import { parts } from './segment-group.anatomy'
import { useForwardExpose } from '../../utils'

defineProps<SegmentGroupItemTextProps>()

const segmentGroup = useSegmentGroupContext()
const itemProps = useSegmentGroupItemPropsContext()

useForwardExpose()
</script>

<template>
  <ark.span
    v-bind="segmentGroup.getItemTextProps(itemProps)"
    :data-scope="parts.itemText.attrs['data-scope']"
    :data-part="parts.itemText.attrs['data-part']"
    :as-child="asChild"
  >
    <slot />
  </ark.span>
</template>
