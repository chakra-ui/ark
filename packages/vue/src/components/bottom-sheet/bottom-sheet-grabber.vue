<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface BottomSheetGrabberBaseProps extends PolymorphicProps {}
export interface BottomSheetGrabberProps
  extends BottomSheetGrabberBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useBottomSheetContext } from './use-bottom-sheet-context'
import { useForwardExpose } from '../../utils'

defineProps<BottomSheetGrabberProps>()

const bottomSheet = useBottomSheetContext()
useForwardExpose()
</script>

<template>
  <ark.div v-bind="bottomSheet.getGrabberProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
