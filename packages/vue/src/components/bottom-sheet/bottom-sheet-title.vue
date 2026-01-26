<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface BottomSheetTitleBaseProps extends PolymorphicProps {}
export interface BottomSheetTitleProps
  extends
    BottomSheetTitleBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useBottomSheetContext } from './use-bottom-sheet-context'
import { useForwardExpose } from '../../utils'

defineProps<BottomSheetTitleProps>()

const bottomSheet = useBottomSheetContext()
useForwardExpose()
</script>

<template>
  <ark.h2 v-bind="bottomSheet.getTitleProps()" :as-child="asChild">
    <slot />
  </ark.h2>
</template>
