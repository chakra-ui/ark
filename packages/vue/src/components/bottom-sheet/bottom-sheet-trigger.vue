<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface BottomSheetTriggerBaseProps extends PolymorphicProps {}
export interface BottomSheetTriggerProps
  extends BottomSheetTriggerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useBottomSheetContext } from './use-bottom-sheet-context'
import { useForwardExpose } from '../../utils'

defineProps<BottomSheetTriggerProps>()

const bottomSheet = useBottomSheetContext()
useForwardExpose()
</script>

<template>
  <ark.button v-bind="bottomSheet.getTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
