<script lang="ts">
import type { ItemProps } from '@zag-js/radio-group'
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SegmentGroupItemBaseProps extends ItemProps, PolymorphicProps {}
export interface SegmentGroupItemProps
  extends SegmentGroupItemBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { SegmentGroupItemPropsProvider } from './use-segment-group-item-props-context'
import { SegmentGroupItemProvider } from './use-segment-group-item-context'
import { ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'
import { parts } from './segment-group.anatomy'

const props = defineProps<SegmentGroupItemProps>()
const segmentGroup = useSegmentGroupContext()

SegmentGroupItemPropsProvider(props)
SegmentGroupItemProvider(computed(() => segmentGroup.value.getItemState(props)))
</script>

<template>
  <ark.label
    v-bind="segmentGroup.getItemProps(props)"
    :data-scope="parts.item.attrs['data-scope']"
    :data-part="parts.item.attrs['data-part']"
    :as-child="asChild"
  >
    <slot />
  </ark.label>
</template>
