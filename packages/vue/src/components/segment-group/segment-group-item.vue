<script lang="ts">
import type { BooleanDefaults } from '../../types.ts'
import type { ItemProps, ItemState } from '@zag-js/radio-group'
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface SegmentGroupItemState extends ItemState {}
export interface SegmentGroupItemBaseProps extends ItemProps, PolymorphicProps {}
export interface SegmentGroupItemProps
  extends
    SegmentGroupItemBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { SegmentGroupItemPropsProvider } from './use-segment-group-item-props-context.ts'
import { SegmentGroupItemProvider } from './use-segment-group-item-context.ts'
import { ark } from '../factory.ts'
import { useSegmentGroupContext } from './use-segment-group-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = withDefaults(defineProps<SegmentGroupItemProps>(), {
  disabled: undefined,
  invalid: undefined,
} satisfies BooleanDefaults<ItemProps>)

defineSlots<PolymorphicSlots<SegmentGroupItemState>>()
const segmentGroup = useSegmentGroupContext()

SegmentGroupItemPropsProvider(props)
SegmentGroupItemProvider(computed(() => segmentGroup.value.getItemState(props)))

useForwardExpose()
</script>

<template>
  <ark.label v-bind="segmentGroup.getItemProps(props)" :state="segmentGroup.getItemState(props)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.label>
</template>
