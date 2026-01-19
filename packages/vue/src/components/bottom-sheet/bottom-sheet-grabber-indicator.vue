<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface BottomSheetGrabberIndicatorBaseProps extends PolymorphicProps {}
export interface BottomSheetGrabberIndicatorProps
  extends
    BottomSheetGrabberIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useBottomSheetContext } from './use-bottom-sheet-context'
import { useForwardExpose } from '../../utils'

defineProps<BottomSheetGrabberIndicatorProps>()

const bottomSheet = useBottomSheetContext()
useForwardExpose()
</script>

<template>
  <ark.div v-bind="bottomSheet.getGrabberIndicatorProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
