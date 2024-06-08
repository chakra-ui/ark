<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SegmentGroupIndicatorProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { useSegmentGroupContext } from './use-segment-group-context'

defineProps<SegmentGroupIndicatorProps>()
const segmentGroup = useSegmentGroupContext()
const { indicator } = segmentGroupAnatomy.build()
</script>

<template>
  <ark.div
    v-bind="segmentGroup.getIndicatorProps()"
    :as-child="asChild"
    :data-scope="indicator.attrs['data-scope']"
    :data-part="indicator.attrs['data-part']"
  >
    <slot />
  </ark.div>
</template>
