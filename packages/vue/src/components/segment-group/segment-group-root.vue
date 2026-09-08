<script lang="ts">
import type { RootState } from '@zag-js/radio-group'
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'
import type { RootEmits, RootProps } from './segment-group.types.ts'

export interface SegmentGroupRootState extends RootState {}
export interface SegmentGroupRootBaseProps extends RootProps, PolymorphicProps {}
export interface SegmentGroupRootProps
  extends
    SegmentGroupRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface SegmentGroupRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useSegmentGroup } from './use-segment-group.ts'
import { SegmentGroupProvider } from './use-segment-group-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = withDefaults(defineProps<SegmentGroupRootProps>(), {
  disabled: undefined,
  readOnly: undefined,
} satisfies BooleanDefaults<RootProps>)

defineSlots<PolymorphicSlots<SegmentGroupRootState>>()

const emits = defineEmits<SegmentGroupRootEmits>()

const segmentGroup = useSegmentGroup(props, emits)
SegmentGroupProvider(segmentGroup)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="segmentGroup.getRootProps()" :state="segmentGroup.getRootState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
