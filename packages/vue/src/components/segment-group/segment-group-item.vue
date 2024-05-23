<script lang="ts">
import type { ItemProps } from '@zag-js/radio-group'
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SegmentGroupItemProps
  extends PolymorphicProps,
    ItemProps,
    /* @vue-ignore */ LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { computed } from 'vue'
import { SegmentGroupItemPropsProvider } from './use-segment-group-item-props-context'
import { SegmentGroupItemProvider } from './use-segment-group-item-context'
import { ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'

const props = defineProps<SegmentGroupItemProps>()
const segmentGroup = useSegmentGroupContext()
const { item } = segmentGroupAnatomy.build()

SegmentGroupItemPropsProvider(props)
SegmentGroupItemProvider(computed(() => segmentGroup.value.getItemState(props)))
</script>

<template>
  <ark.label
    v-bind="segmentGroup.getItemProps(props)"
    :data-scope="item.attrs['data-scope']"
    :data-part="item.attrs['data-part']"
    :as-child="asChild"
  >
    <slot />
  </ark.label>
</template>
