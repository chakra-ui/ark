<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SegmentGroupItemControlProps
  extends PolymorphicProps,
    /* @vue-ignore */ HTMLAttributes {}
</script>

<script setup lang="ts">
import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { computed, useAttrs } from 'vue'
import { ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context'

defineProps<SegmentGroupItemControlProps>()
const attrs = useAttrs()

const segmentGroup = useSegmentGroupContext()
const itemProps = useSegmentGroupItemPropsContext()
const controlProps = computed(() => ({
  ...attrs,
  ...segmentGroup.value.getItemControlProps(itemProps),
}))

const { itemControl } = segmentGroupAnatomy.build()
</script>

<template>
  <ark.div
    v-bind="controlProps"
    :as-child="asChild"
    :data-scope="itemControl.attrs['data-scope']"
    :data-part="itemControl.attrs['data-part']"
  >
    <slot />
  </ark.div>
  <input v-bind="segmentGroup.getItemHiddenInputProps(itemProps)" />
</template>
