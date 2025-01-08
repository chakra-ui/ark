<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SegmentGroupItemControlBaseProps extends PolymorphicProps {}
export interface SegmentGroupItemControlProps
  extends SegmentGroupItemControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { parts } from './segment-group.anatomy'
import { useSegmentGroupContext } from './use-segment-group-context'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context'

defineProps<SegmentGroupItemControlProps>()

const segmentGroup = useSegmentGroupContext()
const itemProps = useSegmentGroupItemPropsContext()

useForwardExpose()
</script>

<template>
  <ark.div
    v-bind="segmentGroup.getItemControlProps(itemProps)"
    :as-child="asChild"
    :data-scope="parts.itemControl.attrs['data-scope']"
    :data-part="parts.itemControl.attrs['data-part']"
  >
    <slot />
  </ark.div>
</template>
