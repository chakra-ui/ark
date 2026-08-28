<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './segment-group.types.ts'

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
import { parts } from './segment-group.anatomy.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = withDefaults(defineProps<SegmentGroupRootProps>(), {
  disabled: undefined,
  readOnly: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<SegmentGroupRootEmits>()

const segmentGroup = useSegmentGroup(props, emits)
SegmentGroupProvider(segmentGroup)

useForwardExpose()
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
