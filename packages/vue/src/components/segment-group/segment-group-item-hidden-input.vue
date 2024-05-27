<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SegmentGroupItemHiddenInputProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context'

defineProps<SegmentGroupItemHiddenInputProps>()

const segmentGroup = useSegmentGroupContext()
const itemProps = useSegmentGroupItemPropsContext()
</script>

<template>
  <ark.input v-bind="segmentGroup.getItemHiddenInputProps(itemProps)" :as-child="asChild" />
</template>
