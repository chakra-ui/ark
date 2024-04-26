<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface SegmentGroupItemTextProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context'

defineProps<SegmentGroupItemTextProps>()
const segmentGroup = useSegmentGroupContext()
const itemProps = useSegmentGroupItemPropsContext()
const { itemText } = segmentGroupAnatomy.build()
</script>

<template>
  <ark.span
    v-bind="segmentGroup.getItemTextProps(itemProps)"
    :data-scope="itemText.attrs['data-scope']"
    :data-part="itemText.attrs['data-part']"
    :as-child="asChild"
  >
    <slot />
  </ark.span>
</template>
