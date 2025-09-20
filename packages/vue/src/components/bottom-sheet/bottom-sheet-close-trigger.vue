<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface BottomSheetCloseTriggerBaseProps extends PolymorphicProps {}
export interface BottomSheetCloseTriggerProps
  extends BottomSheetCloseTriggerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useBottomSheetContext } from './use-bottom-sheet-context'
import { useForwardExpose } from '../../utils'

defineProps<BottomSheetCloseTriggerProps>()
const bottomSheet = useBottomSheetContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="bottomSheet.getCloseTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
