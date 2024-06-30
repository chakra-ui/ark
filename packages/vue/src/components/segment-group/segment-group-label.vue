<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SegmentGroupLabelBaseProps extends PolymorphicProps {}
export interface SegmentGroupLabelProps
  extends SegmentGroupLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'
import {parts} from './segment-group.anatomy'


defineProps<SegmentGroupLabelProps>()
const segmentGroup = useSegmentGroupContext()
</script>

<template>
  <ark.label
    v-bind="segmentGroup.getLabelProps()"
    :as-child="asChild"
    :data-scope="parts.label.attrs['data-scope']"
    :data-part="parts.label.attrs['data-part']"
  >
    <slot />
  </ark.label>
</template>
