<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseSegmentGroupReturn } from './use-segment-group'

interface RootProviderProps {
  value: UnwrapRef<UseSegmentGroupReturn>
}

export interface SegmentGroupRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface SegmentGroupRootProviderProps
  extends SegmentGroupRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { SegmentGroupProvider } from './use-segment-group-context'
import {parts} from './segment-group.anatomy'

const props = defineProps<SegmentGroupRootProviderProps>()
const segmentGroup = computed(() => props.value)

SegmentGroupProvider(segmentGroup)
</script>

<template>
  <ark.div
    v-bind="segmentGroup.getRootProps()"
    :data-scope="parts.root.attrs['data-scope']"
    :data-part="parts.root.attrs['data-part']"
    :as-child="asChild"
  >
    <slot />
  </ark.div>
</template>
