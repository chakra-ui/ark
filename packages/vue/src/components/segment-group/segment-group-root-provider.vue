<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseSegmentGroupReturn } from './use-segment-group.ts'

interface RootProviderProps {
  value: UnwrapRef<UseSegmentGroupReturn>
}

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
const segmentGroup = computed(() => props.value)

SegmentGroupProvider(segmentGroup)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="segmentGroup.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
