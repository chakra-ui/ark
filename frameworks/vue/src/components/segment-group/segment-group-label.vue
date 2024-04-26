<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface SegmentGroupLabelProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { useSegmentGroupContext } from './use-segment-group-context'

defineProps<SegmentGroupLabelProps>()
const segmentGroup = useSegmentGroupContext()
const { label } = segmentGroupAnatomy.build()
</script>

<template>
  <ark.label
    v-bind="segmentGroup.labelProps"
    :as-child="asChild"
    :data-scope="label.attrs['data-scope']"
    :data-part="label.attrs['data-part']"
  >
    <slot />
  </ark.label>
</template>
