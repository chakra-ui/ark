<script lang="ts">
import type { RootState } from '@zag-js/radio-group'
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'
import type { UseSegmentGroupReturn } from './use-segment-group.ts'

interface RootProviderProps {
  value: UnwrapRef<UseSegmentGroupReturn>
}

export interface SegmentGroupRootProviderState extends RootState {}
export interface SegmentGroupRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface SegmentGroupRootProviderProps
  extends
    SegmentGroupRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { SegmentGroupProvider } from './use-segment-group-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<SegmentGroupRootProviderProps>()

defineSlots<PolymorphicSlots<SegmentGroupRootProviderState>>()
const segmentGroup = computed(() => props.value)

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
