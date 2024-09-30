<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SegmentGroupItemHiddenInputBaseProps extends PolymorphicProps {}
export interface SegmentGroupItemHiddenInputProps
  extends SegmentGroupItemHiddenInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context'
import { useForwardExpose } from '../../utils'

defineProps<SegmentGroupItemHiddenInputProps>()

const segmentGroup = useSegmentGroupContext()
const itemProps = useSegmentGroupItemPropsContext()

useForwardExpose()
</script>

<template>
  <ark.input v-bind="segmentGroup.getItemHiddenInputProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.input>
</template>
