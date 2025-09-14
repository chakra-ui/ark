<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface BottomSheetBackdropBaseProps extends PolymorphicProps {}
export interface BottomSheetBackdropProps
  extends BottomSheetBackdropBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose, useRenderStrategyProps } from '../../utils'
import { Presence } from '../presence'
import { useBottomSheetContext } from './use-bottom-sheet-context'

defineProps<BottomSheetBackdropProps>()
const bottomSheet = useBottomSheetContext()
const renderStrategy = useRenderStrategyProps()

useForwardExpose()
</script>

<template>
  <Presence
    v-bind="bottomSheet.getBackdropProps()"
    :present="bottomSheet.open"
    :lazy-mount="renderStrategy.lazyMount"
    :unmount-on-exit="renderStrategy.unmountOnExit"
  >
    <slot />
  </Presence>
</template>
