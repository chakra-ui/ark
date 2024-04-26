<script lang="ts">
import type { RootEmits, RootProps } from './segment-group.types'

export interface SegmentGroupRootProps extends RootProps, PolymorphicProps {}
export interface SegmentGroupRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { ark, type PolymorphicProps } from '../factory'
import { useSegmentGroup } from './use-segment-group'
import { SegmentGroupProvider } from './use-segment-group-context'

const props = defineProps<SegmentGroupRootProps>()
const emits = defineEmits<SegmentGroupRootEmits>()

const segmentGroup = useSegmentGroup(props, emits)
SegmentGroupProvider(segmentGroup)
const { root } = segmentGroupAnatomy.build()
</script>

<template>
  <ark.div
    v-bind="segmentGroup.rootProps"
    :data-scope="root.attrs['data-scope']"
    :data-part="root.attrs['data-part']"
    :as-child="asChild"
  >
    <slot />
  </ark.div>
</template>
