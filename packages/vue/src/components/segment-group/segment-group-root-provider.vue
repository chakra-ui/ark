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
import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { computed } from 'vue'
import { ark } from '../factory'
import { SegmentGroupProvider } from './use-segment-group-context'

const props = defineProps<SegmentGroupRootProviderProps>()
const segmentGroup = computed(() => props.value)

SegmentGroupProvider(segmentGroup)
const { root } = segmentGroupAnatomy.build()
</script>

<template>
  <ark.div
    v-bind="segmentGroup.getRootProps()"
    :data-scope="root.attrs['data-scope']"
    :data-part="root.attrs['data-part']"
    :as-child="asChild"
  >
    <slot />
  </ark.div>
</template>
