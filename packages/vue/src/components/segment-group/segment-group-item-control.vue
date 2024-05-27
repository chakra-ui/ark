<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SegmentGroupItemControlProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context'

defineProps<SegmentGroupItemControlProps>()

const segmentGroup = useSegmentGroupContext()
const itemProps = useSegmentGroupItemPropsContext()
const { itemControl } = segmentGroupAnatomy.build()
</script>

<template>
  <ark.div
    v-bind="segmentGroup.getItemControlProps(itemProps)"
    :as-child="asChild"
    :data-scope="itemControl.attrs['data-scope']"
    :data-part="itemControl.attrs['data-part']"
  >
    <slot />
  </ark.div>
</template>
