<script lang="ts">
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { RootEmits, RootProps } from './bottom-sheet.types'

export interface BottomSheetRootBaseProps extends RootProps, RenderStrategyProps {}
export interface BottomSheetRootProps extends BottomSheetRootBaseProps {}
export interface BottomSheetRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { useBottomSheet } from './use-bottom-sheet'
import { BottomSheetProvider } from './use-bottom-sheet-context'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy'
import type { BooleanDefaults } from '../../types'
import { computed } from 'vue'

const props = withDefaults(defineProps<BottomSheetRootProps>(), {
  closeOnEscape: undefined,
  closeOnInteractOutside: undefined,
  defaultOpen: undefined,
  modal: undefined,
  open: undefined,
  preventScroll: undefined,
  restoreFocus: undefined,
  trapFocus: undefined,
  preventDragOnScroll: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<BottomSheetRootEmits>()
const bottomSheet = useBottomSheet(props, emits)

BottomSheetProvider(bottomSheet)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))

useForwardExpose()
</script>

<template>
  <slot />
</template>
